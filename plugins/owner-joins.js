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
    if (!text) return m.reply(`*[ ℹ️ ] Ingresa el enlace del Grupo.*`)

    try {
        let [_, code, expired] = text.match(linkRegex) || []
        if (!code) return m.reply('*[ ⚠️ ] enlace inválido.*')

        let res = await conn.groupAcceptInvite(code)
        m.reply(`*[ ✅ ] Shadow se unió correctamente al grupo.*\n*¡Disfruta del Bot en tu grupo!*`)

        if (expired) {
            expired = Math.min(999, Math.max(1, isNumber(expired) ? parseInt(expired) : 0))
            let chats = global.db.data.chats[res] || (global.db.data.chats[res] = {})
            chats.expired = +new Date() + expired * 1000 * 60 * 60 * 24
            m.reply(`*[ ⌛ ] Shadow permanecerá en el grupo durante \`${expired}\` días.*`)
        }
    } catch {
        return m.reply(`*[ ❌ ] Ocurrió un error al otrar al grupo.*`) 
    }
}

handler.help = ['join *<link> <días>*']
handler.tags = ['owner']
handler.command = ['join', 'entrar']
handler.rowner = true

export default handler

const isNumber = (x) => (x = parseInt(x), typeof x === 'number' && !isNaN(x))