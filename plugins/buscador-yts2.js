import yts from 'yt-search'

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `*🔎 ¿Qué deseas buscar en YouTube?*`, m)

  let results = await yts(text)
  let tes = results.videos

  if (!tes.length) throw '```⚠️ No se encontraron resultados.```'

  let ms = tes.map(v => `
° ${v.title}

≡ 🌳 *\`Duración:\`* ${v.timestamp}
≡ 🌴 *\`Publicado:\`* ${v.ago}
≡ 🍁 *\`Vistas:\`* ${v.views.toLocaleString()}
≡ 🌿 *\`Enlace:\`* ${v.url}
`.trim()).join('\n________________________\n\n')

  let teks = `\`\`\`乂 YOUTUBE - SEARCH\`\`\`\n\n${ms}`
  teks += `\n\n> sʜᴀᴅᴏᴡ ᴜʟᴛʀᴀ ᴍᴅ`

  conn.sendFile(m.chat, tes[0].image, 'yts.jpeg', teks, m)
}

handler.help = ['ytsearch'] 
handler.tags = ['buscador']
handler.command = ['ytsearch2', 'yts2']

export default handler