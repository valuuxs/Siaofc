/*import fetch from 'node-fetch'
import yts from 'yt-search'

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) return m.reply(`╭━━〔 *❗ 𝙀𝙅𝙀𝙈𝙋𝙇𝙊 ❗* 〕━━⬣
┃ ✦ ${usedPrefix + command} Joji - Glimpse of Us
╰━━━━━━━━━━━━━━━━━━⬣`);

  await conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key }})

  let results = await yts(text)

  if (!results || !results.videos || results.videos.length === 0)
    return m.reply('❎ No se encontraron resultados en YouTube.')

  let tes = results.videos[0]
  const apiUrl = `https://www.apis-anomaki.zone.id/downloader/yta?url=${encodeURIComponent(tes.url)}`

  try {
    const res = await fetch(apiUrl)
    const json = await res.json()

    if (!json.result || !json.result.data || !json.result.data.downloadURL)
      return m.reply('❎ No se pudo obtener el audio.')

    const { downloadURL } = json.result.data
    const mention = `@${m.sender.split('@')[0]}`

    const caption = `
╭━━〔 *📥 PLAY AUDIO* 〕━━⬣
┃ ✦ *Título:* ${tes.title}
┃ ✦ *Artista:* ${tes.author.name}
┃ ✦ *Duración:* ${tes.timestamp || tes.duration}
┃ ✦ *Publicado:* ${tes.ago}
╰━━━━━━━━━━━━━━━━━━⬣
⌬ *Enlace:* ${tes.url}
⌬ *Pedido por:* ${mention}
⌬ *Shadow Bot - MD*
`.trim()

    await conn.sendMessage(m.chat, {
      image: { url: tes.thumbnail },
      caption,
      mentions: [m.sender]
    }, { quoted: m })

    await conn.sendMessage(m.chat, {
      audio: { url: downloadURL },
      mimetype: 'audio/mp4',
      fileName: `${tes.title}.mp3`,
      mentions: [m.sender]
    }, { quoted: m })

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})

  } catch (err) {
    console.error(`Error: ${err.message}`)
    await conn.sendMessage(m.chat, { react: { text: '❎', key: m.key }})
    await m.reply('❎ Error al obtener el audio. Intenta nuevamente.')
  }
}*/

handler.help = ['play *<texto>*']
handler.tags = ['downloader']
handler.command = /^(keni)$/i
handler.disable = false

export default handler

import fetch from 'node-fetch';

let handler = async (m, { conn, args, text, command }) => {
  if (!text) {
    return m.reply(`${xdownload} *Por favor, ingresa una URL válida de YouTube.*`);
  }

  if (!/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//i.test(text)) {
    return m.reply('⚠️ *El enlace proporcionado no parece ser de YouTube.*');
  }

  m.react('⏳');

  try {
    const res = await fetch(`https://api.neoxr.eu/api/youtube?url=${encodeURIComponent(text)}&type=video&quality=480p&apikey=GataDios`);
    const json = await res.json();

    if (!json.status || !json.data?.url) {
      return m.reply('*✖️ No se pudo obtener el video. Intenta con otro enlace.*');
    }

    await conn.sendMessage(m.chat, {
      video: { url: json.data.url },
      mimetype: 'video/mp4',
      caption: `> ${club}`,
    }, { quoted: m });

    m.react('✅');
  } catch (error) {
    console.error(error);
    m.reply('*✖️ Ocurrió un error al procesar tu solicitud.*');
    m.react('✖️');
  }
};

handler.command = ['ytmp4', 'ymp4'];

export default handler;