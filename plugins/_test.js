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

          results.push({ title, subtitle, link });
        });

        return results;
      } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
        return [];
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
        console.error("Error:", error.response ? error.response.data : error.message);
        return null;
      }
    },
    getAudio: async (trackName, artist, urlMusic, token) => {
      const url = 'https://aaplmusicdownloader.com/api/composer/swd.php';
      const data = { song_name: trackName, artist_name: artist, url: urlMusic, token };
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent': 'MyApp/1.0',
        'Referer': 'https://aaplmusicdownloader.com/song.php#'
      };

      try {
        const response = await axios.post(url, qs.stringify(data), { headers });
        return response.data.dlink || null;
      } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
        return null;
      }
    },
    download: async (urls) => {
      const musicData = await appledown.getData(urls);
      if (!musicData) return null;

      const url = 'https://aaplmusicdownloader.com/song.php';
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'MyApp/1.0',
        'Referer': 'https://aaplmusicdownloader.com/'
      };
      const data = `data=${encodeURIComponent(JSON.stringify([
        musicData.name,
        musicData.albumname,
        musicData.artist,
        musicData.thumb,
        musicData.duration,
        musicData.url
      ]))}`;

      try {
        const response = await axios.post(url, data, { headers });
        const $ = cheerio.load(response.data);

        const trackName = $('td:contains("Track Name:")').next().text();
        const albumName = $('td:contains("Album:")').next().text();
        const duration = $('td:contains("Duration:")').next().text();
        const artist = $('td:contains("Artist:")').next().text();
        const thumb = $('figure.image img').attr('src');
        const urlMusic = urls;
        const token = $('a#download_btn').attr('token');
        const downloadLink = await appledown.getAudio(trackName, artist, urlMusic, token);

        if (!downloadLink) return null;

        return { name: trackName, albumname: albumName, artist, thumb, duration, token, download: downloadLink };
      } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
        return null;
      }
    }
  };

  conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });

  let dataos = await appleMusic.search(text);
  if (!dataos.length) return m.reply(`*[ ❌ ] No se encontraron resultados en Apple Music.*`);

  let dataos2 = await appledown.download(dataos[0].link);
  if (!dataos2 || !dataos2.download) return m.reply(`*[ ❌ ] No se pudo generar el audio.*`);

  let { name, artist, thumb, duration, download } = dataos2;

  m.reply(`*[ ☕ ] Enviando ${name} (${artist}/${duration})*`);

  const doc = {
    audio: { url: download },
    mimetype: 'audio/mp4',
    fileName: `${name}.mp3`,
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        mediaType: 2,
        title: name,
        sourceUrl: '',
        thumbnail: await (await conn.getFile(thumb)).data
      }
    }
  };

  try {
    await conn.sendMessage(m.chat, doc, { quoted: m });
    await conn.sendMessage(m.chat, { react: { text: '🎵', key: m.key } });
  } catch (error) {
    console.error("Error enviando audio:", error);
    m.reply(`*[ ❌ ] Hubo un problema al enviar el audio. Intenta de nuevo más tarde.*`);
  }
};

handler.help = ['aplays *<txt>*'];
handler.tags = ['descargas'];
handler.command = /^(aplays)$/i;
handler.register = true;

export default handler;