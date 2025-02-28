let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})( [0-9]{1,3})?/i

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

export default handler