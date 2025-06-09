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
handler.register = true 

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

  // Detectar tipo de contenido (ft o video)
  const tipo = await detectarTipo(tiktok)

  if (tipo === 'ft') {
    // Descargar imágenes usando API 1 (ttimg)
    try {
      const tioShadow = await ttimg(tiktok)
      const result = tioShadow?.data
      if (typeof result === 'string') throw result // mensaje de error
      for (let d of result) {
        await conn.sendMessage(m.chat, { image: { url: d } }, { quoted: m })
      }
    } catch (e) {
      await m.reply(e.toString())
    }
  } else if (tipo === 'video') {
    // Descargar video usando API 2 (tiktokdl)
    try {
      await m.react('⏳')
      const tiktokData = await tiktokdl(tiktok)
      if (!tiktokData || !tiktokData.data) throw '*❌ Error al obtener datos de la API.*'

      const { play, wmplay, title } = tiktokData.data
      const videoURL = play || wmplay
      const info = `\`\`\`◜ TikTok - Download ◞\`\`\`\n\n*📖 Descripción:*\n> ${title || 'Sin descripción'}`

      if (videoURL) {
        await conn.sendFile(m.chat, videoURL, 'tiktok.mp4', info, m)
        await m.react('✅')
      } else {
        await m.reply('*❌ No se pudo descargar el video.*')
      }
    } catch (error) {
      console.error(error)
      await m.reply(`*❌ Error:* ${error.message || error}`)
      await m.react('❌')
    }
  } else {
    await m.reply('🚩 No se pudo determinar el tipo de contenido TikTok.')
  }
}

// Función para detectar tipo de contenido (ft o video)
async function detectarTipo(link) {
  try {
    const res = await axios.get(link)
    const html = res.data
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

// Función para descargar imágenes (ft) - API 1
async function ttimg(link) {
  try {
    const url = `https://dlpanda.com/es?url=${link}&token=G7eRpMaa`
    const response = await axios.get(url)
    const html = response.data
    const $ = cheerio.load(html)
    let imgSrc = []
    $('div.col-md-12 > img').each((i, el) => {
      imgSrc.push($(el).attr('src'))
    })
    if (imgSrc.length === 0) {
      return { data: '🚩 No se encontraron imágenes en el enlace proporcionado.' }
    }
    return { data: imgSrc }
  } catch (error) {
    console.log(error)
    return { data: '🚩 No se obtuvo respuesta de la página, intenta más tarde.' }
  }
}

// Función para descargar videos - API 2
async function tiktokdl(url) {
  const api = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`
  const res = await fetch(api)
  return await res.json()
}

handler.help = ['tiktok']
handler.tags = ['downloader']
handler.command = /^(tes)$/i

export default handler