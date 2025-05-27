import fetch from 'node-fetch'
var handler = async (m, { text,  usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, `*${xia} Ingrese una petición para que Gemini lo responda.*`, m)
try {

    conn.sendPresenceUpdate('composing', m.chat) // Writing
var apii = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${text}`)
var res = await apii.json()
await m.reply(res.result)
} catch {
await m.react('✖️')
await conn.reply(m.chat, `*✖️ Gemini no puede responder a esa pregunta.*`, m)
}}
handler.command = ['gemini']
handler.help = ['gemini']
handler.tags = ['ai']

export default handler