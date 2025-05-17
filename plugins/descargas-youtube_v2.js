import axios from 'axios'
import qs from 'qs'

async function searchYouTube(query) {
  if (!query || !query.trim()) throw new Error('Búsqueda vacía')

  const res = await axios.get('https://www.youtube.com/results', {
    params: { search_query: query },
    headers: { 'User-Agent': 'Mozilla/5.0' }
  })

  const videoId = res.data.match(/"videoId":"(.*?)"/)?.[1]
  if (!videoId) throw new Error('Video no encontrado')

  return `https://www.youtube.com/watch?v=${videoId}`
}

async function ssvidDownloader(url, forceType = null) {
  if (!/^https:\/\/(www\.)?(youtube\.com|youtu\.be)\//.test(url)) {
    throw new Error('URL no válida')
  }

  const res = await axios.post(
    'https://ssvid.net/api/ajax/search',
    qs.stringify({ query: url, vt: 'home' }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest'
      }
    }
  )

  const data = res.data
  if (!data || data.status !== 'ok') throw new Error('No se encontraron datos del video.')

  const { title, a: author, t: duration, vid } = data
  const thumbnail = `https://img.youtube.com/vi/${vid}/hqdefault.jpg`
  const formats = []

  for (const q in data.links?.mp4 || {}) {
    const v = data.links.mp4[q]
    formats.push({ quality: v.q_text, size: v.size, format: v.f, type: 'video', k: v.k })
  }

  for (const q in data.links?.mp3 || {}) {
    const a = data.links.mp3[q]
    formats.push({ quality: a.q_text, size: a.size, format: a.f, type: 'audio', k: a.k })
  }

  if (!formats.length) throw new Error('No se encontraron formatos disponibles.')

  formats.sort((a, b) => {
    if (a.type !== b.type) return a.type === 'audio' ? -1 : 1
    return parseFloat(a.size) - parseFloat(b.size)
  })

  let selected = formats.find(f => f.quality.includes('360p')) || formats[0]
  if (forceType === 'audio') selected = formats.find(f => f.type === 'audio') || selected
  if (forceType === 'video') selected = formats.find(f => f.type === 'video') || selected
  if (!selected || !selected.k) throw new Error('No se pudo convertir al formato seleccionado')

  const conv = await axios.post(
    'https://ssvid.net/api/ajax/convert',
    qs.stringify({ vid, k: selected.k }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest',
        'Referer': 'https://ssvid.net/',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10)'
      }
    }
  )

  const converted = conv.data
  const downloadUrl = converted?.url || converted?.dlink
  if (!downloadUrl) throw new Error('No se pudo obtener el link de descarga')

  return {
    title,
    author,
    duration,
    thumbnail,
    download: {
      url: downloadUrl,
      format: selected.format,
      quality: selected.quality,
      size: selected.size,
      type: selected.type
    }
  }
}

function createCaption(res, label) {
  return `\`${label}\`\n\n🎀 Título: ${res.title}\n✨ Autor: ${res.author}\n🕐 Duración: ${res.duration}\n📌 Calidad: ${res.download.quality}`
}

const handler = async (m, { text, command, conn }) => {
  if (!text) {
    return m.reply(`Ejemplo:\n.play Lovers Rock\n.ytmp3 <link>\n.ytmp4 <link>`)
  }

  await conn.sendMessage(m.chat, { react: { text: '🎀', key: m.key } })

  try {
    if (command === 'playyt') {
      const url = await searchYouTube(text)
      const res = await ssvidDownloader(url, 'audio')
      const caption = createCaption(res, 'Y O U T U B E - P L A Y')

      await conn.sendMessage(m.chat, {
        text: caption,
        contextInfo: {
          externalAdReply: {
            title: res.title,
            body: 'Play Music 🧸',
            thumbnailUrl: res.thumbnail,
            sourceUrl: url,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: m })

      await conn.sendMessage(m.chat, {
        audio: { url: res.download.url },
        mimetype: 'audio/mp4',
        ptt: false
      }, { quoted: m })
    }

    if (command === 'ytmp3_v2') {
      if (!text.includes('youtu')) return m.reply('No es un link de YouTube válido')
      const res = await ssvidDownloader(text, 'audio')
      const caption = createCaption(res, 'Y O U T U B E - A U D I O')

      await conn.sendMessage(m.chat, {
        text: caption,
        contextInfo: {
          externalAdReply: {
            title: res.title,
            body: 'YouTube Audio ✨',
            thumbnailUrl: res.thumbnail,
            sourceUrl: text,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: m })

      await conn.sendMessage(m.chat, {
        audio: { url: res.download.url },
        mimetype: 'audio/mp4',
        ptt: false
      }, { quoted: m })
    }

    if (command === 'ytmp4_v2') {
      if (!text.includes('youtu')) return m.reply('No es un link de YouTube válido')
      const res = await ssvidDownloader(text, 'video')
      const caption = createCaption(res, 'Y O U T U B E - V I D E O')

      await conn.sendMessage(m.chat, {
        video: { url: res.download.url },
        mimetype: 'video/mp4',
        caption
      }, { quoted: m })
    }
  } catch (e) {
    return m.reply(e.message || 'Ocurrió un error inesperado')
  }

  await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
}

handler.help = handler.command = ['playyt', 'ytmp3_v2', 'ytmp4_v2']
handler.tags = ['downloader']

export default handler