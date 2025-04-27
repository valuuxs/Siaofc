
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

   
    let bratSticker = await sticker(res.data, null, global?.info?.packname ?? m.name ?? '', global.info.author)
    
    
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