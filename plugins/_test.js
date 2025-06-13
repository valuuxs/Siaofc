import yts from 'yt-search';
import fetch from 'node-fetch';

const handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) return m.reply(`✧ Ejemplo de uso: ${usedPrefix + command} Joji - Ew`);

  try {
    const search = await yts(text);
    const vid = search.videos[0];
    if (!vid) return m.reply('❌ No se encontró el video. Intenta con otro título.');

    const { title, thumbnail, timestamp, url, author, description } = vid;
    await conn.sendMessage(m.chat, { react: { text: '📽️', key: m.key }});

    const caption = `🎬 *YOUTUBE VIDEO* 🎬

✧ \`Título:\` ${title}
✧ \`Duración:\` ${timestamp}
✧ \`Artista:\` ${author.name}
✧ \`Descripción:\`

${description || 'sin descripción'}

> ${wm}`;

    await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption }, { quoted: m });

    const headers = {
      accept: "*/*",
      "accept-language": "es-ES,es;q=0.9",
      "sec-ch-ua": '"Not A(Brand";v="99", "Chromium";v="115"',
      "sec-ch-ua-mobile": "?1",
      "sec-ch-ua-platform": '"Android"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      referer: "https://id.ytmp3.mobi/",
      "referrer-policy": "strict-origin-when-cross-origin"
    };

    const initRes = await fetch(`https://d.ymcdn.org/api/v1/init?p=y&23=1llum1n471&_=${Math.random()}`, { headers });
    const init = await initRes.json();

    const id = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/))([^&?/]+)/)?.[1];
    const convertURL = `${init.convertURL}&v=${id}&f=mp4&_=${Math.random()}`;
    const convertRes = await fetch(convertURL, { headers });
    const convert = await convertRes.json();

    let info = {};
    for (let i = 0; i < 6; i++) {
      const status = await fetch(convert.progressURL, { headers });
      info = await status.json();
      if (info.progress == 3) break;
      await new Promise(r => setTimeout(r, 1500));
    }

    if (!convert.downloadURL) throw '❌ Error al obtener el enlace de descarga.';

    await conn.sendMessage(m.chat, {
      video: { url: convert.downloadURL },
      mimetype: 'video/mp4',
      fileName: `${info.title || title}.mp4`
    }, { quoted: m });

  } catch (err) {
    console.error('[YTV ERROR]', err);
    m.reply('❌ Ocurrió un error al descargar el video.');
  }
};

handler.help = ['ytv'].map(v => v + ' *<consulta>*');
handler.tags = ['downloader'];
handler.command = /^ytv$/i;

export default handler;