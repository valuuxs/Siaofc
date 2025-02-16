import axios from 'axios';
import cheerio from 'cheerio';
import qs from 'qs';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    throw m.reply(`*[ 🎧 ] Hace falta el título del audio de AppleMusic.*\n\n*[ 💡 ] Ejemplo:* ${usedPrefix + command} Paulo Londra - Camara Lenta`);
  }

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

          results.push({ title, subtitle, link });
        });

        return results;
      } catch (error) {
        console.error("Error en la búsqueda:", error.response ? error.response.data : error.message);
        return null;
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
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'MyApp/1.0',
            'Referer': 'https://aaplmusicdownloader.com/'
          }
        });
        return response.data;
      } catch (error) {
        console.error("Error en getData:", error.response ? error.response.data : error.message);
        return null;
      }
    },
    download: async (urls) => {
      const musicData = await appledown.getData(urls);
      if (!musicData || !musicData.url) {
        console.error("Error: No se pudo obtener información de la canción.");
        return null;
      }

      try {
        const url = 'https://aaplmusicdownloader.com/song.php';
        const headers = {
          'authority': 'aaplmusicdownloader.com',
          'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
          'cache-control': 'max-age=0',
          'content-type': 'application/x-www-form-urlencoded',
          'origin': 'https://aaplmusicdownloader.com',
          'referer': 'https://aaplmusicdownloader.com/',
          'user-agent': 'MyApp/1.0'
        };
        const data = `data=${encodeURIComponent(JSON.stringify([
          musicData.name,
          musicData.albumname,
          musicData.artist,
          musicData.thumb,
          musicData.duration,
          musicData.url
        ]))}`;
        
        const response = await axios.post(url, data, { headers });
        const htmlData = response.data;
        const $ = cheerio.load(htmlData);
        
        const trackName = $('td:contains("Track Name:")').next().text();
        const albumName = $('td:contains("Album:")').next().text();
        const duration = $('td:contains("Duration:")').next().text();
        const artist = $('td:contains("Artist:")').next().text();
        const thumb = $('figure.image img').attr('src');
        const urlMusic = urls;
        const token = $('a#download_btn').attr('token');
        
        return {
          name: trackName,
          albumname: albumName,
          artist: artist,
          url: urlMusic,
          thumb: thumb,
          duration: duration,
          token: token
        };
      } catch (error) {
        console.error("Error en download:", error.response ? error.response.data : error.message);
        return null;
      }
    }
  };

  conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });

  try {
    let dataos = await appleMusic.search(text);
    if (!dataos || dataos.length === 0) {
      return m.reply('*[ ❌ ] No se encontraron resultados para tu búsqueda.*');
    }

    let dataos2 = await appledown.download(dataos[0].link);
    if (!dataos2) {
      return m.reply('*[ ❌ ] Ocurrió un error al obtener el audio.*');
    }

    let { name, albumname, artist, url, thumb, duration, download } = dataos2;
    if (!download) {
      return m.reply('*[ ❌ ] No se pudo generar el enlace de descarga.*');
    }

    m.reply(`*[ ☕ ] Enviando ${name} (${artist}/${duration})*\n\n> ${url}`);
    
    const doc = {
      audio: { url: download },
      mimetype: 'audio/mp4', // Se mantiene igual
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
    console.error("Error en handler:", error);
    return m.reply('*[ ❌ ] Hubo un error al procesar tu solicitud.*');
  }
};

handler.help = ['aplayw *<txt>*'];
handler.tags = ['descargas'];
handler.command = /^(aplays)$/i;
handler.register = true;

export default handler;