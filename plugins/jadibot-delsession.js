import { promises as fs } from "fs"
import path from "path"

let handler = async (m, { conn, usedPrefix, command }) => {
  let parentw = conn
  let who = m.mentionedJid && m.mentionedJid[0]
    ? m.mentionedJid[0]
    : m.fromMe
    ? conn.user.jid
    : m.sender

  let uniqid = `${who.split`@`[0]}`
  let sessionPath = `./JadiBots/${uniqid}`

  // Solo permitir que el bot principal elimine sesiones
  if (global.conn.user.jid !== conn.user.jid) {
    let link = `https://api.whatsapp.com/send/?phone=${global.conn.user.jid.split`@`[0]}&text=${usedPrefix + command}&type=phone_number&app_absent=0`
    return conn.sendMessage(m.chat, {
      text: `⚠️ Este comando solo puede ejecutarlo el *bot principal*.\n\n👉 Ejecuta el comando desde el bot principal:\n${link}`
    }, { quoted: m })
  }

  try {
    await fs.rm(sessionPath, { recursive: true, force: true })
    await conn.sendMessage(m.chat, { text: '✅ Sesión de SubBot eliminada con éxito.' }, { quoted: m })
    await conn.sendMessage(m.chat, { text: '🚪 SubBot cerrado correctamente.' }, { quoted: m })
  } catch (err) {
    if (err.code === 'ENOENT') {
      await conn.sendMessage(m.chat, { text: '⚠️ No se encontró ninguna sesión activa para eliminar.' }, { quoted: m })
    } else {
      console.error('[❌ ERROR AL ELIMINAR SESIÓN]', err)
      await conn.sendMessage(m.chat, { text: '❌ Ocurrió un error al intentar eliminar la sesión.' }, { quoted: m })
    }
  }
}

handler.command = /^(deletesess?ion|eliminarsesion|borrarsesion|delsess?ion|cerrarsesion)$/i
//handler.private = true
handler.fail = null

export default handler