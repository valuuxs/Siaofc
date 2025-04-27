/*
import { sticker } from '../lib/sticker.js'
import axios from 'axios'

let handler = async (m, { conn, usedPrefix, command, text }) => {
  const query = text || m.quoted?.text || m.quoted?.caption || m.quoted?.description
  if (!query) throw m.reply(`Ingresa el texto, Ejemplo:\n\n${usedPrefix + command} Hola mundo!`)
  m.react('🕐')

  try {
    let url = `https://api.nekorinn.my.id/maker/bratvid?text=${encodeURIComponent(query)}`
    let res = await axios.get(url, {
      responseType: 'arraybuffer',
      timeout: 10000
    })
    let contentType = res.headers['content-type']
    if (!contentType || !contentType.startsWith('video/')) throw m.reply('error en la API.')

   
    let bratSticker = await sticker(res.data, null, global.packname, global.author)
    
    
    await conn.sendFile(m.chat, bratSticker, null, { asSticker: true }, m)
    m.react('✅')
  } catch (err) {
    console.error(err)
    m.reply(`❌ Error: ${err.message}`)
  }
}

handler.help = ['bratvid <texto>']
handler.command = ['bratvid']
handler.tags = ['sticker']
handler.limit = false

export default handler
*/
import { sticker } from '../lib/sticker.js'
import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, text }) => {
  const query = text || m.quoted?.text || m.quoted?.caption || m.quoted?.description
  if (!query) return m.reply(`🍪 Ingresa un texto.\n\n> \`\`\`Ejemplo:\`\`\`\n${usedPrefix + commad} Hola Mundo`)
  
  if (query.length > 100) {
    return m.reply('*⚠️ El texto es demasiado largo. Usa menos de 100 caracteres.*')
  }

  try {
    await m.react('⏳')

    const url = `https://api.nekorinn.my.id/maker/bratvid?text=${encodeURIComponent(query)}`
    const res = await fetch(url)

    if (!res.ok) {
      return m.reply('Error: La API no pudo procesar tu solicitud. Intenta más tarde.')
    }

    const contentType = res.headers.get('content-type') || ''
    if (!contentType.startsWith('video/')) {
      return m.reply('Error interno: La API no devolvió un video válido.')
    }

    const buffer = await res.buffer()
    const bratSticker = await sticker(buffer, { packname: global.packname, author: global.author })

    await conn.sendFile(m.chat, bratSticker, null, { asSticker: true }, m)
    await m.react('✅')

  } catch (err) {
    console.error(err)
    m.reply('❌ Error de conexión o interno. Por favor intenta nuevamente más tarde.')
  }
}

handler.help = ['bratvid <texto>']
handler.command = ['bratvid']
handler.tags = ['sticker']
handler.limit = false

export default handler