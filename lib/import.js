import Helper from './helper.js'

/**
 * @template T
 * @param {string} module
 * @returns {Promise<T>}
 */
export default async function importLoader(module) {
    const filePath = Helper.__filename(module)
    const imported = await import(`${filePath}?id=${Date.now()}`) // fuerza recarga
    return 'default' in imported ? imported.default : imported
}