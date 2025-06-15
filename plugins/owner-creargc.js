
let handler = async (m, { conn, text }) => {
if (!text) return m.reply(`*${xowner} Ingresa un nombre para crear el grupo.*`)

try{
let group = await conn.groupCreate(text, [m.sender])
let link = await conn.groupInviteCode(group.gid)
m.reply(`*☁️ Grupo creado con éxito.*`)
m.reply('https://chat.whatsapp.com/' + url)
} catch (e) {
m.reply(`*✖️ Ocurrió un error, es posible que el grupo tenga lid activado.*`)
}
}
handler.help = ['grupocrear <nombre>']
handler.tags = ['owner']
handler.command = ['creargc', 'newgc', 'creargrupo', 'grupocrear']
handler.rowner = true

export default handler
/*
let handler = async (m, { conn, text }) => {
  if (!text) return m.reply(`*${xowner} Ingresa un nombre para crear el grupo.*`)
  try {
    let group = await conn.groupCreate(text, [m.sender])
    let link = await conn.groupInviteCode(group.gid)
    m.reply(`*☁️ El grupo fue creado con éxito*\n\n🌐 Enlace: https://chat.whatsapp.com/${link}`)
  } catch (e) {
    console.error(e)
    m.reply(`*✖️ Ocurrió un error al crear el grupo.*`)
  }
}

handler.help = ['grupocrear <nombre>']
handler.tags = ['owner']
handler.command = ['creargc', 'newgc', 'creargrupo', 'grupocrear']
handler.rowner = true

export default handler*/