import { readdirSync, statSync, unlinkSync, existsSync, readFileSync, watch, rmSync, promises as fs} from "fs"
import path, { join } from 'path'

let handler  = async (m, { conn: parentw, usedPrefix, command}, args) => {

let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let uniqid = `${who.split`@`[0]}`
let userS = `${conn.getName(who)}`

try {
await fs.rmdir("./JadiBots/" + uniqid, { recursive: true, force: true })
await parentw.sendMessage(m.chat, { text: '*🚮 Sesión de SubBot eliminado con éxito.*' }, { quoted: fkontak })
} catch(err) {
if (err.code === 'ENOENT' && err.path === `./JadiBots/${uniqid}`) {
await parentw.sendMessage(m.chat, { text: "*☁️ No cuentas con ninguna sesión de Subbot*" }, { quoted: fkontak })
} else {
await m.react(✖️)
}}}

handler.tags = ['serbot']
handler.help = ['delsession']
handler.command = /^(deletesess?ion|eliminarsesion|borrarsesion|delsess?ion|cerrarsesion|delserbot|logout)$/i
handler.fail = null

export default handler