import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text) {
      throw `*${usedPrefix + command} Por favor, ingresa un texto para realizar tu sticker.*`
    }

    const url = `https://api.nekorinn.my.id/maker/brat-v2?text=${encodeURIComponent(text)}`
    const stiker = await sticker(null, url, 'cmd by', 'kenisawaDev')

    if (!stiker) throw 'Error al generar el sticker.'

    await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
  } catch (err) {
    console.error(err)
    m.reply(typeof err === 'string' ? err : 'Ocurrió un error al generar el sticker.')
  }
}

handler.help = ['brat2 <texto>']
handler.tags = ['sticker']
handler.command = /^brat2$/i
handler.group = false
// handler.limit = true

export default handler