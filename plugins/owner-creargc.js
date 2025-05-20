let handler = async (m, { conn, text }) => {
if (!text) return m.reply(`*${xowner} Ingresa un nombre para crear el grupo.*`)
try{
m.reply(`*☁️ El grupo fue creado con éxito*`)
let group = await conn.groupCreate(text, [m.sender])
let link = await conn.groupInviteCode(group.gid)
m.reply('https://chat.whatsapp.com/' + url)
} catch (e) {
m.reply(`*✖️ Ocurrió un error.*`)
}
}
handler.help = ['grupocrear <nombre>']
handler.tags = ['owner']
handler.command = ['creargc', 'newgc', 'creargrupo', 'grupocrear']
handler.rowner = true

export default handler