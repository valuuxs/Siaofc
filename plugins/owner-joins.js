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


let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})(?:\s(\d{1,3}))?/i

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`[ ℹ️ ] Ingresa el enlace del Grupo.`)  
    
    let [_, code, expired] = text.match(linkRegex) || []  
    if (!code) return m.reply('*[ ⚠️ ] Enlace inválido.*')  

    try {
        let res = await conn.groupAcceptInvite(code)  
        expired = Math.floor(Math.min(999, Math.max(1, isNumber(expired) ? parseInt(expired) : 0)))  

        if (!expired) {
            m.reply(`*[ ℹ️ ] Me uní correctamente al Grupo.*`)
        } else {
            m.reply(`🚩 Me uní correctamente al Grupo Durante *${expired}* días.`)
        }

        let chats = global.db.data.chats[res] || (global.db.data.chats[res] = {})  
        if (expired) chats.expired = +new Date() + expired * 1000 * 60 * 60 * 24  

    } catch (e) {
        let errorMsg = '✘ Ocurrió un error.'
        if (e.message.includes('revoke')) errorMsg = '*✘ No puedo unirme. Parece que el enlace ha sido revocado o es inválido.*'
        if (e.message.includes('remove')) errorMsg = '*✘ No puedo unirme. Fui eliminado del grupo anteriormente.*'
        m.reply(errorMsg)
    }
}

handler.help = ['join <link> <días>']
handler.tags = ['owner']
handler.command = ['join', 'entrar']
handler.rowner = true

export default handler

const isNumber = (x) => (x = parseInt(x), typeof x === 'number' && !isNaN(x))