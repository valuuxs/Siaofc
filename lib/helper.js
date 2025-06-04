//Dev.Criss 🇦🇱
// @ts-check
import yargs from 'yargs'
import os from 'os'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { createRequire } from 'module'
import fs from 'fs'
import Stream, { Readable } from 'stream'

const __filename = (pathURL = import.meta, rmPrefix = os.platform() !== 'win32') => {
    const raw = typeof pathURL === 'string' ? pathURL : pathURL.url
    if (!raw) throw new Error('Invalid pathURL input')
    return rmPrefix ? fileURLToPath(raw) : pathToFileURL(raw).href
}

const __dirname = (pathURL = import.meta) => {
    const filePath = __filename(pathURL, true)
    return fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()
        ? filePath
        : path.dirname(filePath)
}

const __require = (dir = import.meta) => {
    const raw = typeof dir === 'string' ? dir : dir.url
    return createRequire(raw)
}

const checkFileExists = (file) => fs.promises.access(file, fs.constants.F_OK).then(() => true).catch(() => false)

const API = (name, path = '/', query = {}, apikeyqueryname) => {
    const base = global.APIs?.[name] || name
    const apikey = global.APIKeys?.[base]
    const params = new URLSearchParams({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: apikey } : {}) })
    return base + path + (params.toString() ? `?${params}` : '')
}

const opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
const prefix = new RegExp('^[' + (opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-]/g, '\\$&') + ']')

const saveStreamToFile = (stream, file) => new Promise((resolve, reject) => {
    const writable = stream.pipe(fs.createWriteStream(file))
    writable.once('finish', () => {
        resolve()
        writable.destroy()
    })
    writable.once('error', (err) => {
        writable.destroy()
        reject(err)
    })
})

const kDestroyed = Symbol('kDestroyed')
const kIsReadable = Symbol('kIsReadable')

const isNodeStream = (obj) => obj &&
    (obj._readableState || obj._writableState || (typeof obj.write === 'function' && typeof obj.on === 'function') || (typeof obj.pipe === 'function' && typeof obj.on === 'function'))

const isDestroyed = (stream) => {
    if (!isNodeStream(stream)) return null
    const state = stream._writableState || stream._readableState
    return !!(stream.destroyed || stream[kDestroyed] || state?.destroyed)
}

const isReadableNodeStream = (obj, strict = false) => {
    return !!(obj && typeof obj.pipe === 'function' && typeof obj.on === 'function' &&
        (!strict || (typeof obj.pause === 'function' && typeof obj.resume === 'function')) &&
        (!obj._writableState || obj._readableState?.readable !== false) &&
        (!obj._writableState || obj._readableState))
}

const isReadableFinished = (stream, strict) => {
    const rState = stream._readableState
    if (rState?.errored) return false
    return !!(rState?.endEmitted || (strict === false && rState?.ended && rState?.length === 0))
}

const isReadableStream = (stream) => {
    if (typeof Stream.isReadable === 'function') return Stream.isReadable(stream)
    if (stream?.[kIsReadable] != null) return stream[kIsReadable]
    if (typeof stream?.readable !== 'boolean') return null
    if (isDestroyed(stream)) return false
    return isReadableNodeStream(stream) && !!stream.readable && !isReadableFinished(stream)
        || stream instanceof fs.ReadStream || stream instanceof Readable
}

export default {
    __filename,
    __dirname,
    __require,
    checkFileExists,
    API,
    saveStreamToFile,
    isReadableStream,
    opts,
    prefix
}