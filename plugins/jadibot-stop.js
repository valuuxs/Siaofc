
let handler  = async (m, { conn }) => {
if (global.conn.user.jid == conn.user.jid) conn.reply(m.chat, `*☁️ El bot principal no se puede apagar.*`, m, rcanal)
else {
await conn.reply(m.chat, `*El Subbot fue desactivado exitosamente*`, m)
conn.ws.close()
}}
handler.command = handler.help = ['stop', 'byebot'];
handler.tags = ['serbot'];
handler.owner = true
handler.private = true
//handler.register = true
export default handler