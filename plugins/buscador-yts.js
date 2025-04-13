import yts from 'yt-search'


let handler = async(m, { conn, text, usedPrefix, command }) => {

  if (!text) return conn.reply(m.chat, `*🔎 Por favor, ingresa un texto para buscar en Youtube.*\n> *\`Ejemplo:\`* .${command} Bing Bang`, m);

  let results = await yts(text)
  let tes = results.videos

  if (!tes.length) throw '```⚠️ No se encontraron resultados.```'

  let ms = tes.map(v => `
° ${v.title}

≡ 🌵 *\`Duración:\`* ${v.timestamp}
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
handler.command = ['ytsearch', 'yts']

export default handler