const axios = require('axios');

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    throw `*[❗] Ingresa el título de la canción que deseas buscar*\n\n*Ejemplo:* ${usedPrefix + command} perfect ed sheeran`;
  }

  try {
    const res = await axios.get(`https://fastrestapis.fasturl.cloud/music/songlyrics-v1?text=${encodeURIComponent(text)}`);
    const data = res.data;

    if (data.status !== 200 || !data.result?.answer) {
      throw '*[❗] No se encontró la canción o no se pudo recuperar la letra.*';
    }

    const {
      song,
      artist,
      album,
      plain_lyrics,
      genre,
      year,
      Youtube_URL,
      album_artwork_url,
    } = data.result.answer;

    const caption = `
*🎵 Título:* ${song || 'Desconocido'}
*🎤 Artista:* ${artist || 'Desconocido'}
${album ? `*💿 Álbum:* ${album}` : ''}
${genre ? `*🎼 Género:* ${genre}` : ''}
${year ? `*📅 Año:* ${year}` : ''}
${Youtube_URL ? `*📹 YouTube:* ${Youtube_URL}` : ''}

*📜 Letra:*
${plain_lyrics || 'No disponible.'}`.trim();

    await conn.sendMessage(m.chat, {
      text: caption,
      contextInfo: {
        externalAdReply: {
          title: song || 'Letra de canción',
          body: artist || 'Artista',
          thumbnailUrl: album_artwork_url || null,
          sourceUrl: Youtube_URL || null,
          mediaType: 1,
          renderLargerThumbnail: true,
          showAdAttribution: true,
        },
      },
    }, { quoted: m });

  } catch (err) {
    console.error(err);
    throw '*[❗] Ocurrió un error al obtener la letra. Intenta nuevamente más tarde.*';
  }
};

handler.help = ['letra <canción>'];
handler.tags = ['music'];
handler.command = /^letra|lyrics$/i;

module.exports = handler;