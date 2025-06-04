import { readdirSync, existsSync, readFileSync, watch } from 'fs'
import { join, resolve } from 'path'
import { format } from 'util'
import syntaxerror from 'syntax-error'
import importFile from './import.js'
import Helper from './helper.js'

const __dirname = Helper.__dirname(import.meta)
const pluginFolder = Helper.__dirname(join(__dirname, '../plugins/index'))
const pluginFilter = filename => /\.(mc)?js$/.test(filename)

let watcher = {}
let plugins = {}
let pluginFolders = []

async function filesInit(folderPath = pluginFolder, filter = pluginFilter, conn) {
    const folder = resolve(folderPath)
    if (watcher[folder]) return

    pluginFolders.push(folder)

    await Promise.all(readdirSync(folder).filter(filter).map(async filename => {
        try {
            const filePath = global.__filename(join(folder, filename))
            const module = await import(filePath)
            plugins[filename] = 'default' in module ? module.default : module
        } catch (e) {
            conn?.logger?.error(e)
            delete plugins[filename]
        }
    }))

    const watching = watch(folder, reload.bind(null, conn, folder, filter))
    watching.on('close', () => deletePluginFolder(folder, true))
    watcher[folder] = watching

    return plugins
}

function deletePluginFolder(folder, isAlreadyClosed = false) {
    const resolved = resolve(folder)
    if (!watcher[resolved]) return
    if (!isAlreadyClosed) watcher[resolved].close()
    delete watcher[resolved]
    pluginFolders = pluginFolders.filter(f => f !== resolved)
}

async function reload(conn, folder = pluginFolder, filter = pluginFilter, _ev, filename) {
    if (!filter(filename)) return
    const filePath = global.__filename(join(folder, filename), true)

    if (plugins[filename]) {
        if (existsSync(filePath)) {
            conn.logger?.info(`updated plugin - '${filename}'`)
        } else {
            conn.logger?.warn(`deleted plugin - '${filename}'`)
            return delete plugins[filename]
        }
    } else {
        conn.logger?.info(`new plugin - '${filename}'`)
    }

    const err = syntaxerror(readFileSync(filePath), filename, {
        sourceType: 'module',
        allowAwaitOutsideFunction: true
    })

    if (err) {
        conn.logger?.error(`Syntax error in '${filename}':\n${format(err)}`)
        return
    }

    try {
        const module = await importFile(filePath).catch(console.error)
        if (module) plugins[filename] = module
    } catch (e) {
        conn.logger?.error(`Failed to load plugin '${filename}':\n${format(e)}`)
    } finally {
        plugins = Object.fromEntries(Object.entries(plugins).sort(([a], [b]) => a.localeCompare(b)))
    }
}

export { pluginFolder, pluginFilter, plugins, watcher, pluginFolders, filesInit, deletePluginFolder, reload }