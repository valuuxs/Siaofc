import axios from 'axios';
import cheerio from 'cheerio';

async function dl(url) {
  try {
    const res = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });

    const $ = cheerio.load(res.data);
    const tag = $('script[data-test-id="video-snippet"]');

    if (tag.length) {
      const result = JSON.parse(tag.text());
      return {
        title: result.name,
        download: result.contentUrl
      };
    } else {
      const json = JSON.parse($("script[data-relay-response='true']").eq(0).text());
      const result = json.response.data["v3GetPinQuery"].data;
      return {
        title: result.title,
        download: result.imageLargeUrl
      };
    }
  } catch {
    return { error: 'No se pudo descargar el contenido.' };
  }
}

let handler = async (m, { conn, text }) => {
  if (!text || !text.includes("https://") || !text.includes("pinterest.com")) {
    return m.reply(`*⚠️ Por favor, ingresa un enlace válido de Pinterest.*\n> *Ejemplo:* .pinterest https://www.pinterest.com/pin/123456789`);
  }

  try {
    m.react("⌛");
    const media = await dl(text);
    if (!media || media.error || !media.download) {
      return conn.reply(m.chat, '```❌ No se pudo obtener el contenido del enlace.```', m);
    }

    const isVideo = media.download.includes(".mp4");

    await conn.sendMessage(m.chat, {
      [isVideo ? "video" : "image"]: { url: media.download },
      caption: media.title || 'Contenido de Pinterest'
    }, { quoted: m });

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

  } catch (error) {
    console.error(error);
    conn.reply(m.chat, '```⚠️ Error al descargar el contenido de Pinterest.```', m);
  }
};

handler.help = ['pinterest'];
handler.command = ['pinterestdl', 'pindl'];
handler.tags = ['downloader'];

export default handler;