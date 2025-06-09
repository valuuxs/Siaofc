/*import axios from 'axios'
import cheerio from 'cheerio'
let handler = async (m, { conn, text: tiktok, args, command, usedPrefix}) => {
if (!tiktok) throw '🚩 Ingresa un enlace de una publicación de fotos de TikTok junto al comando.'  
let imagesSent
if (imagesSent) return
imagesSent = true    
try {   
let tioShadow = await ttimg(tiktok)
let result = tioShadow?.data
for (let d of result) {
  await conn.sendMessage(m.chat, {image: {url: d}}, {quoted: m})
 }
imagesSent = false
} catch {
    imagesSent = false    
    throw m.react('✖️')
 }
}
handler.help = ['tiktokimg *<url>*']
handler.tags = ['img', 'downloader']
handler.command = /^(ttimg|tiktokimg)$/i
export default handler;

async function ttimg(link) {
    try {    
        let url = `https://dlpanda.com/es?url=${link}&token=G7eRpMaa`
        let response = await axios.get(url)
        const html = response.data
        const $ = cheerio.load(html)
        let imgSrc = [];
        $('div.col-md-12 > img').each((index, element) => {
            imgSrc.push($(element).attr('src'))
        })
        if (imgSrc.length === 0) {
            return { data: '🚩 No se encontraron imágenes en el enlace proporcionado.*' }
        }
        return { data: imgSrc }
    } catch (error) {
        console.lo (error);
        return { data: '🚩 No se obtuvo respuesta de la página, intenta más tarde.'}
    }
}*/


import axios from 'axios'
import cheerio from 'cheerio'
import fetch from 'node-fetch'

let handler = async (m, { conn, args }) => {
  const tiktok = args[0]
  if (!tiktok) throw '🚩 Ingresa un enlace de TikTok junto al comando.'

  const tipo = await detectarTipo(tiktok)

  if (tipo === 'ft') {
    // Solo usar API de imágenes
    try {
      const { data } = await ttimg(tiktok)
      if (typeof data === 'string') throw data // mensaje de error
      for (let img of data) {
        await conn.sendMessage(m.chat, { image: { url: img } }, { quoted: m })
      }
    } catch (e) {
      await m.reply(e.toString())
    }
  } else if (tipo === 'video') {
    // Solo usar API de video
    try {
      await m.react('⏳')
      const res = await tiktokdl(tiktok)
      const { data } = res || {}
      if (!data) throw '*❌ Error al obtener datos de la API.*'

      const { play, wmplay, title } = data
      const videoURL = play || wmplay

      // Si no hay video, no enviar nada
      if (!videoURL || videoURL.includes('.mp3')) {
        return await m.reply('*❌ No se encontró un video para descargar.*')
      }

      const info = `\`\`\`◜ TikTok - Download ◞\`\`\`\n\n*📖 Descripción:*\n> ${title || 'Sin descripción'}`
      await conn.sendFile(m.chat, videoURL, 'tiktok.mp4', info, m)
      await m.react('✅')
    } catch (error) {
      console.error(error)
      await m.reply(`*❌ Error:* ${error.message || error}`)
      await m.react('❌')
    }
  } else {
    await m.reply('🚩 No se pudo determinar si el enlace es de video o fotos.')
  }
}

// Detectar si es una publicación de fotos (ft) o video
async function detectarTipo(link) {
  try {
    const { data: html } = await axios.get(link)
    if (html.includes('"photoPost":true') || html.includes('"photoMode":true')) {
      return 'ft'
    } else if (html.includes('"video":')) {
      return 'video'
    }
    return 'desconocido'
  } catch {
    return 'desconocido'
  }
}

// API de imágenes (dlpanda)
async function ttimg(link) {
  try {
    const url = `https://dlpanda.com/es?url=${link}&token=G7eRpMaa`
    const res = await axios.get(url)
    const $ = cheerio.load(res.data)
    const imgSrc = []
    $('div.col-md-12 > img').each((i, el) => {
      imgSrc.push($(el).attr('src'))
    })
    if (!imgSrc.length) return { data: '🚩 No se encontraron imágenes.' }
    return { data: imgSrc }
  } catch (err) {
    console.error(err)
    return { data: '🚩 Error al obtener las imágenes, intenta más tarde.' }
  }
}

// API de video (tikwm)
async function tiktokdl(url) {
  const api = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`
  const res = await fetch(api)
  return await res.json()
}

handler.help = ['tiktok <url>']
handler.tags = ['downloader']
handler.command = /^(tess)$/i

export default handler