import axios from 'axios';
import cheerio from 'cheerio';
import qs from 'qs';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`*[ 🎵 ] Hace falta el título del audio de AppleMusic.*\n\n*[ 💡 ] Ejemplo:* ${usedPrefix + command} Paulo Londra - Camara Lenta`);

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

          if (title && link) {
            results.push({ title, subtitle, link });
          }
        });

        return results.length ? results : null;
      } catch (error) {
        console.error("Error en appleMusic.search:", error.message);
        return null;
      }
    }
  };

  const appledown = {
    download: async (urls) => {
      try {
        const musicData = await axios.get(`https://aaplmusicdownloader.com/api/applesearch.php?url=${urls}`, {
          headers: {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'X-Requested-With': 'XMLHttpRequest'
          }
        });

        if (!musicData.data || !musicData.data.url) {
          throw new Error("No se pudo obtener datos de la API.");
        }

        return {
          name: musicData.data.name,
          albumname: musicData.data.albumname,
          artist: musicData.data.artist,
          url: musicData.data.url,
          thumb: musicData.data.thumb,
          duration: musicData.data.duration,
          download: musicData.data.url
        };
      } catch (error) {
        console.error("Error en appledown.download:", error.message);
        return null;
      }
    }
  };

  conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });

  const dataos = await appleMusic.search(text);
  if (!dataos || !dataos[0] || !dataos[0].link) {
    return m.reply("*[ ❌ ] No se encontraron resultados en Apple Music.*");
  }

  const dataos2 = await appledown.download(dataos[0].link);
  if (!dataos2) {
    return m.reply("*[ ❌ ] No se pudo descargar el audio.*");
  }

  const { name, artist, url, thumb, duration, download } = dataos2;

  m.reply(`*[ ☕ ] Enviando ${name} (${artist}/${duration})*\n\n> ${url}`);

  try {
    const thumbnailBuffer = await (await conn.getFile(thumb)).data;
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
          thumbnail: thumbnailBuffer
        }
      }
    };

    await conn.sendMessage(m.chat, doc, { quoted: m });
    await conn.sendMessage(m.chat, { react: { text: '🎵', key: m.key } });
  } catch (error) {
    console.error("Error al enviar audio:", error.message);
    m.reply("*[ ❌ ] Hubo un problema al enviar el archivo.*");
  }
};

handler.help = ['aplay *<txt>*'];
handler.tags = ['descargas'];
handler.command = /^(aplay|amusic|applemusic|applemusicplay)$/i;
handler.register = true;

export default handler;