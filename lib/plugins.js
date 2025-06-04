import { readdirSync, existsSync, readFileSync, watch } from 'fs'
import { join, resolve } from 'path'
import { format } from 'util'
import syntaxerror from 'syntax-error'
import importFile from './import.js'
import Helper from './helper.js'

const __dirname = Helper.__dirname(import.meta)
const defaultPluginFolder = Helper.__dirname(join(__dirname, '../plugins/index'))
const pluginFilter = filename => /\.(mc)?js$/.test(filename)

let watcher = {}
let plugins = {}
let pluginFolders = []

async function filesInit(folderPath = defaultPluginFolder, filterFn = pluginFilter, conn) {
  const folder = resolve(folderPath)
  if (folder in watcher) return
  pluginFolders.push(folder)

  await Promise.all(readdirSync(folder).filter(filterFn).map(async filename => {
    try {
      const filePath = global.__filename(join(folder, filename))
      const module = await import(filePath)
      if (module) plugins[filename] = 'default' in module ? module.default : module
    } catch (e) {
      conn?.logger.error(e)
      delete plugins[filename]
    }
  }))

  const watching = watch(folder, reload.bind(null, conn, folder, filterFn))
  watching.on('close', () => deletePluginFolder(folder, true))
  watcher[folder] = watching

  return plugins
}

function deletePluginFolder(folder, isAlreadyClosed = false) {
  const resolved = resolve(folder)
  if (!(resolved in watcher)) return
  if (!isAlreadyClosed) watcher[resolved].close()
  delete watcher[resolved]
  pluginFolders.splice(pluginFolders.indexOf(resolved), 1)
}

async function reload(conn, folderPath = defaultPluginFolder, filterFn = pluginFilter, _event, filename) {
  if (!filterFn(filename)) return

  const filePath = global.__filename(join(folderPath, filename), true)

  if (!existsSync(filePath)) {
    if (filename in plugins) {
      conn?.logger.warn(`deleted plugin - '${filename}'`)
      delete plugins[filename]
    }
    return
  }

  if (filename in plugins) {
    conn?.logger.info(`updated plugin - '${filename}'`)
  } else {
    conn?.logger.info(`new plugin - '${filename}'`)
  }

  const err = syntaxerror(readFileSync(filePath), filename, {
    sourceType: 'module',
    allowAwaitOutsideFunction: true
  })

  if (err) {
    conn.logger.error(`syntax error while loading '${filename}'\n${format(err)}`)
    return
  }

  try {
    const module = await importFile(global.__filename(filePath))
    if (module) plugins[filename] = 'default' in module ? module.default : module
  } catch (e) {
    conn?.logger.error(`error requiring plugin '${filename}'\n${format(e)}`)
  } finally {
    // Ordena plugins por nombre
    plugins = Object.fromEntries(Object.entries(plugins).sort(([a], [b]) => a.localeCompare(b)))
  }
}

export {
  defaultPluginFolder as pluginFolder,
  pluginFilter,
  plugins,
  watcher,
  pluginFolders,
  filesInit,
  deletePluginFolder,
  reload
}