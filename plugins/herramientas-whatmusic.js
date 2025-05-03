import fs from 'fs'
import acrcloud from 'acrcloud'

let acr = new acrcloud({
  host: 'identify-eu-west-1.acrcloud.com',
  access_key: 'c33c767d683f78bd17d4bd4991955d81',
  access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu'
})

let handler = async (m) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!/audio|video/.test(mime)) {
    return m.reply('*☕ Por favor, responde a un audio o video para identificar la música.*')
  }

  try {
    let media = await q.download()
    if (!media) throw '*❌ No se pudo descargar el archivo de audio/video.*'

    let ext = mime.split('/')[1]
    let file = `./tmp/${m.sender}-${Date.now()}.${ext}`
    fs.writeFileSync(file, media)

    let res = await acr.identify(fs.readFileSync(file))
    let { code, msg } = res.status
    if (code !== 0) throw msg
    if (!res.metadata?.music?.length) throw '*⚠️ No se encontró ninguna coincidencia de música.*'

    let info = res.metadata.music[0]
    let { title, artists, album, genres, release_date } = info

    let txt = `
\`\`\`乂 BÚSQUEDA - ACRCLOUD\`\`\`

≡ *🌴 Título:* ${title}
≡ *👤 Artista:* ${artists?.map(v => v.name).join(', ') || 'No encontrado'}
≡ *🌿 Álbum:* ${album?.name || 'No encontrado'}
≡ *🌵 Género:* ${genres?.map(v => v.name).join(', ') || 'No encontrado'}
≡ *🌳 Lanzamiento:* ${release_date || 'No encontrado'}
    `.trim()

    m.reply(txt)
  } catch (e) {
    m.reply(`Error: ${e}`)
  } finally {
    // Limpieza segura del archivo temporal
    try { fs.unlinkSync(file) } catch {}
  }
}

handler.command = /^quemusica|quemusicaes|whatmusic$/i
export default handler