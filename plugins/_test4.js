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
  const link = args[0]
  if (!link) return m.reply('🚩 Ingresa un enlace de TikTok.')

  try {
    await m.react('🔍')

    // Detectar tipo
    const tipo = await detectarTipo(link)

    if (tipo === 'ft') {
      // ✅ FT - Imagen: usar Panda
      const res = await ttimg(link)
      const { data } = res
      if (typeof data === 'string') throw data
      for (let img of data) {
        await conn.sendMessage(m.chat, { image: { url: img } }, { quoted: m })
      }
      await m.react('🖼️')

    } else if (tipo === 'video') {
      // ✅ Video: usar TikWM
      const res = await tiktokdl(link)
      const { data } = res || {}
      if (!data || !data.play) throw '*❌ No se pudo obtener el video.*'

      const videoURL = data.play
      const info = `🎬 *Descripción:*\n${data.title || 'Sin descripción'}`

      await conn.sendFile(m.chat, videoURL, 'tiktok.mp4', info, m)
      await m.react('✅')

    } else {
      // ❌ Otro tipo de contenido
      throw '*❌ No se pudo determinar si el enlace es de video o imágenes.*'
    }

  } catch (err) {
    console.error(err)
    await m.reply(typeof err === 'string' ? err : '*❌ Ocurrió un error inesperado.*')
    await m.react('❌')
  }
}

// Detecta si es FT (fotos) o video
async function detectarTipo(link) {
  try {
    const { data: html } = await axios.get(link, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    })

    if (html.includes('"photoMode":true') || html.includes('"photoPost":true')) return 'ft'
    if (html.includes('"video":') || html.includes('"videoData":')) return 'video'
    return 'otro'
  } catch {
    return 'otro'
  }
}

// API FT - dlpanda
async function ttimg(link) {
  try {
    const url = `https://dlpanda.com/es?url=${link}&token=G7eRpMaa`
    const res = await axios.get(url)
    const $ = cheerio.load(res.data)
    const imgs = []
    $('div.col-md-12 > img').each((_, el) => {
      const src = $(el).attr('src')
      if (src) imgs.push(src)
    })
    if (!imgs.length) return { data: '🚩 No se encontraron imágenes en el enlace.' }
    return { data: imgs }
  } catch (e) {
    return { data: '🚩 Error al obtener las imágenes.' }
  }
}

// API video - TikWM
async function tiktokdl(url) {
  const api = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`
  const res = await fetch(api)
  return await res.json()
}

handler.help = ['tiktok <url>']
handler.tags = ['downloader']
handler.command = /^(tck)$/i
export default handler