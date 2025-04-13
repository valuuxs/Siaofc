/*import { addExif } from '../lib/sticker.js'
let handler = async (m, { conn, text }) => {
  if (!m.quoted) return conn.reply(m.chat, '*🍪 Por favor, responde al sticker.*', m, rcanal)
  let stiker = false
  try {
    let [packname, ...author] = text.split('|')
    author = (author || []).join('|')
    let mime = m.quoted.mimetype || ''
    if (!/webp/.test(mime)) return m.reply(`*⚠️ El archivo adjunto no es un sticker, por favor responde a un sticker.*`)
    let img = await m.quoted.download()
    if (!img) return m.reply(`*🍪 Responde al sticker.*`)
    stiker = await addExif(img, packname || '', author || '')
  } catch (e) {
    console.error(e)
    if (Buffer.isBuffer(e)) stiker = e
  } finally {
    if (stiker) conn.sendFile(m.chat, stiker, 'wm.webp', '', m)
    else return m.reply(`*🍪 Responde al sticker.*`)
  }
}
handler.help = ['wm']
handler.tags = ['sticker']
handler.command = ['take', 'wm']

export default handler*/

import { addExif } from '../lib/sticker.js'

let handler = async (m, { conn, text }) => {

  if (!m.quoted) return conn.reply(m.chat, '*🍪 Por favor, responde al sticker.*', m, rcanal)
  
  let stiker = false
  try {
    // Se separa el texto para obtener el nombre del paquete y el autor
    let [packname, ...author] = text.split('|')
    author = (author || []).join('|')
    
    // Se valida si el archivo es un sticker (webp)
    let mime = m.quoted.mimetype || ''
    if (!/webp/.test(mime)) return conn.reply(m.chat, '*⚠️ El archivo adjunto no es un sticker, por favor responde a un sticker.*', m)
    
    // Descarga el archivo citado
    let img = await m.quoted.download()
    if (!img) return conn.reply(m.chat, '*🍪 Responde al sticker.*', m)
    
    // Se añade el EXIF al sticker
    stiker = await addExif(img, packname || '', author || '')
  } catch (e) {
    console.error(e)
    if (Buffer.isBuffer(e)) stiker = e
  } finally {
    // Si se ha creado el sticker, lo envía
    if (stiker) conn.sendFile(m.chat, stiker, 'wm.webp', '', m, rcanal)
    else return conn.reply(m.chat, '*🍪 Responde al sticker.*', m)
  }
}

handler.help = ['wm']
handler.tags = ['sticker']
handler.command = ['take', 'wm']

export default handler