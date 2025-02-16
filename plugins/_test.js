import axios from 'axios';
import cheerio from 'cheerio';
import qs from 'qs';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw m.reply(`*[ 🎧 ] Hace falta el título del audio de AppleMusic.*\n\n*[ 💡 ] Ejemplo:* ${usedPrefix + command} Paulo Londra - Camara Lenta`);

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
        console.error("Error:", error.message);
        return [];
      }
    }
  };

  const appledown = {
    download: async (url) => {
      try {
        const { data } = await axios.get(`https://aaplmusicdownloader.com/api/applesearch.php?url=${url}`);
        if (!data || !data.url) throw new Error("No se pudo obtener información del audio.");

        const response = await axios.post('https://aaplmusicdownloader.com/api/composer/swd.php', qs.stringify({
          song_name: data.name,
          artist_name: data.artist,
          url: data.url,
          token: 'TOKEN'
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'User-Agent': 'MyApp/1.0'
          }
        });

        if (!response.data.dlink) throw new Error("No se pudo generar el enlace de descarga.");

        return {
          name: data.name,
          artist: data.artist,
          album: data.albumname,
          duration: data.duration,
          thumb: data.thumb,
          url: data.url,
          download: response.data.dlink
        };

      } catch (error) {
        console.error("Error:", error.message);
        return null;
      }
    }
  };

  conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });

  let searchResults = await appleMusic.search(text);
  if (!searchResults.length) return m.reply("*[ ❌ ] No se encontraron resultados en Apple Music.*");

  let musicData = await appledown.download(searchResults[0].link);
  if (!musicData) return m.reply("*[ ❌ ] No se pudo obtener el audio.*");

  let { name, artist, album, duration, thumb, url, download } = musicData;

  m.reply(`*[ ☕ ] Enviando ${name} (${artist} - ${album} / ${duration})*\n\n> ${url}`);

  try {
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
  } catch (error) {
    console.error("Error al enviar audio:", error.message);
    m.reply("*[ ❌ ] Hubo un problema al enviar el audio.*");
  }
};

handler.help = ['aplays *<txt>*'];
handler.tags = ['descargas'];
handler.command = /^(aplays)$/i;
handler.register = true;

export default handler;