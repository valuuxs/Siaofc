import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text) throw `*Ejemplo de uso:*\n${usedPrefix + command} Shadow Bot`

    // Puedes cambiar 'fluffy-logo' por otro estilo (mira abajo)
    const estilo = 'fluffy-logo'
    const url = `https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=${estilo}&text=${encodeURIComponent(text)}`

    const stiker = await sticker(null, url, 'FlamingText', 'ShadowBot')

    if (!stiker) throw 'Error al generar el sticker.'

    await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
  } catch (err) {
    console.error(err)
    m.reply(typeof err === 'string' ? err : 'Ocurrió un error al generar el sticker.')
  }
}

handler.help = ['flamestick <texto>']
handler.tags = ['sticker']
handler.command = /^flamestick$/i
handler.group = false
// handler.limit = true

export default handler