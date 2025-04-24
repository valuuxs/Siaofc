/*import fetch from 'node-fetch';

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) {
    return conn.reply(
      m.chat,
      `*🧇 Por favor, ingresa un enlace o título dea canción para buscar en Spotify.*`,
      m
    );
  }

  await m.react('🕓');

  try {
    let url = text;

    if (!/spotify\.com\/track\/[a-zA-Z0-9]+/i.test(text)) {
      const searchRes = await fetch(`https://delirius-apiofc.vercel.app/search/spotify?q=${encodeURIComponent(text)}`);
      const searchJson = await searchRes.json();

      if (!Array.isArray(searchJson.data) || !searchJson.data[0]?.url) {
        await m.react('❌');
        return conn.reply(m.chat, '*❌ No se encontraron resultados para esa búsqueda.*', m);
      }

      url = searchJson.data[0].url;
    }

    // Descargar desde la API
    //const response = await fetch(`https://dark-core-api.vercel.app/api/download/spotify?key=api&url=${encodeURIComponent(url)}`);
const response = await fetch(`https://api.vreden.my.id/api/spotify?url=${encodeURIComponent(url)}`);
    const result = await response.json();

    if (result.success && result.downloadLink) {
      const { downloadLink } = result;

      await conn.sendMessage(m.chat, { audio: { url: downloadLink }, mimetype: 'audio/mpeg' }, { quoted: m });
      await m.react('✅');
    } else {
      await m.react('❌');
      conn.reply(m.chat, `*⚠️ No se pudo descargar la música. Puede deberse a restricciones o problemas con el enlace.*`, m);
    }
  } catch (error) {
    console.error(error);
    await m.react('❌');
    conn.reply(m.chat, '*❌ Ocurrió un error al procesar tu solicitud.*', m);
  }
};

handler.help = ['spotify'];
handler.tags = ['descargas'];
handler.command = /^(spotify|spotifydl|spdl)$/i;

export default handler;*/

import fetch from 'node-fetch';

let handler = async (m, { conn, command, text }) => {
  if (!text) {
    return conn.reply(
      m.chat,
      `*🧇 Por favor, ingresa un enlace o título de una canción para buscar en Spotify.*`,
      m
    );
  }

  await m.react('🕓');

  try {
    let url = text;

    if (!/spotify\.com\/track\/[a-zA-Z0-9]+/i.test(text)) {
      const searchRes = await fetch(`https://delirius-apiofc.vercel.app/search/spotify?q=${encodeURIComponent(text)}`);
      const searchJson = await searchRes.json();

      if (!Array.isArray(searchJson.data) || !searchJson.data[0]?.url) {
        await m.react('❌');
        return conn.reply(m.chat, '*❌ No se encontraron resultados para esa búsqueda.*', m);
      }

      url = searchJson.data[0].url;
    }

    const response = await fetch(`https://api.vreden.my.id/api/spotify?url=${encodeURIComponent(url)}`);
    const result = await response.json();

    if (result.result?.status && result.result?.music) {
      const { title, artists, cover, music } = result.result;

      // Primero enviamos la información
      await conn.sendMessage(
        m.chat,
        {
          text:
            `「 Spotify 」\n` +
            `🎵 *Título:* ${title}\n` +
            `🎤 *Artista:* ${artists}`,
          contextInfo: {
            externalAdReply: {
              title: title,
              body: artists,
              thumbnail: await (await fetch(cover)).buffer(),
              sourceUrl: url,
              mediaType: 1
            }
          }
        },
        { quoted: m }
      );

      // Luego el audio
      await conn.sendMessage(
        m.chat,
        { audio: { url: music }, mimetype: 'audio/mpeg' },
        { quoted: m }
      );

      await m.react('✅');
    } else {
      console.log("Respuesta inesperada:", result);
      await m.react('❌');
      conn.reply(m.chat, '*⚠️ No se pudo descargar la música. Puede deberse a restricciones o problemas con el enlace.*', m);
    }
  } catch (error) {
    console.error(error);
    await m.react('❌');
    conn.reply(m.chat, '*❌ Ocurrió un error al procesar tu solicitud.*', m);
  }
};

handler.help = ['spotify'];
handler.tags = ['descargas'];
handler.command = /^(spotify|spotifydl|spdl)$/i;

export default handler;