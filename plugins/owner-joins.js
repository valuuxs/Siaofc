/*let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})( [0-9]{1,3})?/i

let handler = async (m, { conn, text, isOwner, usedPrefix, command }) => {

if (!text) return m.reply(`[ ℹ️ ] Ingresa el enlace del Grupo.*`)
try {
let [_, code] = text.match(linkRegex) || []
if (!code) return m.reply('*[ ⚠️ ] Enlace inválido.*')
let res = await conn.groupAcceptInvite(code)
m.reply(`*[ ℹ️ ] Me uní correctamente al Grupo.*`)
} catch (e) {
return m.reply(`✘ Ocurrió un error. ${e.message}`)}}

handler.help = ['join <link>']
handler.tags = ['owner']
handler.command = ['join', 'entrar'] 
handler.rowner = true

export default handler*/

let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})(?:\s+([0-9]{1,3}))?/i

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply(`🚩 Ingresa el enlace del Grupo.\n> *Ejemplo:* ${usedPrefix + command} <enlace> <número de días>.`)

    try {
        let [_, code, expired] = text.match(linkRegex) || []
        if (!code) return m.reply('🚩 Enlace inválido.')

        let res = await conn.groupAcceptInvite(code).catch(err => {
            // Manejo de errores específicos
            if (err.message.includes('not-allowed')) throw '✘ No puedo unirme al grupo. Es posible que haya sido eliminado antes.'
            if (err.message.includes('too-many-groups')) throw '✘ No puedo unirme, he alcanzado el límite de grupos.'
            throw '✘ Ocurrió un error al intentar unirme. Verifica el enlace e inténtalo de nuevo.'
        })

        if (!res) return // Si la unión al grupo falló, ya se mostró un mensaje de error

        m.reply(`🚩 Me uní correctamente al Grupo.`)

        // Si el usuario especifica días, se configura el tiempo de permanencia
        if (expired) {
            expired = Math.min(999, Math.max(1, isNumber(expired) ? parseInt(expired) : 0))
            let chats = global.db.data.chats[res] || (global.db.data.chats[res] = {})
            chats.expired = +new Date() + expired * 1000 * 60 * 60 * 24
            m.reply(`🚩 Permaneceré en el grupo durante *${expired}* días.`)
        }
    } catch (e) {
        return m.reply(e.toString()) // Muestra el mensaje de error adecuado
    }
}

handler.help = ['join *<link> <días>*']
handler.tags = ['owner']
handler.command = ['join', 'entrar']
handler.rowner = true // Solo el creador del bot puede usarlo

export default handler

const isNumber = (x) => (x = parseInt(x), typeof x === 'number' && !isNaN(x))