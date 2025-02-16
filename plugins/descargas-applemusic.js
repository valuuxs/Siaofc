import axios from 'axios';
import cheerio from 'cheerio';
import qs from 'qs';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`*[ 🎧 ] Hace falta el título del audio de AppleMusic.*\n\n*[ 💡 ] Ejemplo:* ${usedPrefix + command} Paulo Londra - Camara Lenta`);

  const appleMusic = {
    search: async (query) => {
      const url = `https://music.apple.com/us/search?term=${query}`;
      try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const results = [];

        $('.desktop-search-page .section[data-testid="section-container"] .grid-item').each((index, element) => {
          const title = $(element).find('.top-search-lockup__primary__title').text().trim();
          const subtitle = $(element).find('.top-search-lockup__secondary').text().trim();
          const link = $(element).find('.click-action').attr('href');

          results.push({
            title,
            subtitle,
            link
          });
        });

        return results;
      } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
        return { success: false, message: error.message };
      }
    }
  };

  const appledown = {
    getData: async (urls) => {
      const url = `https://aaplmusicdownloader.com/api/applesearch.php?url=${urls}`;
      try {
        const response = await axios.get(url, {
          headers: {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'X-Requested-With': 'XMLHttpRequest'
          }
        });
        return response.data;
      } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
        return { success: false, message: error.message };
      }
    }
  };

  conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });

  let dataos = await appleMusic.search(text);
  if (!dataos || dataos.length === 0) {
    return m.reply("*[ ❌ ] No se encontraron resultados en Apple Music.*");
  }

  let dataos2 = await appledown.getData(dataos[0].link);
  if (!dataos2 || !dataos2.url) {
    return m.reply("*[ ❌ ] No se pudo descargar el audio.*");
  }

  let { name, albumname, artist, url, thumb, duration, download } = dataos2;

  m.reply(`*[ ☕ ] Enviando ${name} (${artist}/${duration})*\n\n> ${url}`);

  const doc = {
    audio: { url: download },
    mimetype: 'audio/mp4',
    fileName: `${name}.mp3`,
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        mediaType: 2,
        mediaUrl: url,
        title: name,
        sourceUrl: url,
        thumbnail: await (await conn.getFile(thumb)).data
      }
    }
  };

  await conn.sendMessage(m.chat, doc, { quoted: m });
  await conn.sendMessage(m.chat, { react: { text: '🎵', key: m.key } });
};

handler.help = ['aplay *<txt>*'];
handler.tags = ['descargas'];
handler.command = /^(aplay|amusic|applemusic|applemusicplay)$/i;
handler.register = true;

export default handler;