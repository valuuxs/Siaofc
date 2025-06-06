import { promises as fs } from "fs"

let handler = async (m, { conn: parentw }) => {
  let who = m.mentionedJid && m.mentionedJid[0]
    ? m.mentionedJid[0]
    : m.fromMe
    ? parentw.user.jid
    : m.sender

  let uniqid = `${who.split`@`[0]}`
  let dir = `./JadiBots/${uniqid}`

  try {
    await fs.rmdir(dir, { recursive: true, force: true })
    await parentw.sendMessage(m.chat, { text: '*🚮 Sesión de SubBot eliminado con éxito.*' }, { quoted: fkontak })
  } catch (err) {
    if (err.code === 'ENOENT') {
      await parentw.sendMessage(m.chat, { text: "*☁️ No cuentas con ninguna sesión de Subbot*" }, { quoted: fkontak })
    } else {
      await m.react('✖️')
      console.error(err)
    }
  }
}

handler.tags = ['serbot']
handler.help = ['delsession']
handler.command = /^(deletesess?ion|eliminarsesion|borrarsesion|delsess?ion|cerrarsesion|delserbot|logout)$/i
handler.fail = null

export default handler