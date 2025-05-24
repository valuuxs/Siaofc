/*let handler = async (m, { conn, command }) => {
  let message = '';
  let imageUrl = '';
  let emoji = '';

  switch (command) {
    case 'kalahari':
    case 'mapakalahari':
      message = "Mapa Kalahari - Free Fire";
      imageUrl = 'https://files.catbox.moe/qs0h5r.jpg';
      emoji = '🏜️';
      break;
    case 'purgatorio':
    case 'mapapurgatorio':
      message = "Mapa Purgatorio - Free Fire";
      imageUrl = 'https://files.catbox.moe/qs0h5r.jpg';
      emoji = '🏞️';
      break;
    default:
      return;
  }

  if (m.isGroup) {
    m.react(emoji);
    await conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: message }, { mimetype: 'image/jpeg' });
  }
};

handler.help = ['kalahari', 'purgatorio'];
handler.tags = ['ff'];
handler.command = ['kalahari', 'mapakalahari', 'purgatorio', 'mapapurgatorio'];
handler.admin = true;
handler.botAdmin = false;
handler.group = true;

export default handler;*/



const axios = require('axios');

const handler = async (m, {
    conn,
    text
}) => {
    if (!text) return m.reply('Introduzca el título de la canción que desea buscar.');

    try {
        // Enviar una solicitud a la API FastRest
        const res = await axios.get(`https://fastrestapis.fasturl.cloud/music/songlyrics-v1?text=${encodeURIComponent(text)}`);
        const data = res.data;

        // Comprueba si la respuesta fue exitosa
        if (data.status !== 200 || !data.result || !data.result.answer) {
            return m.reply('Canción no encontrada o no se pudieron recuperar los datos.');
        }

        // Obtener datos de la respuesta
        const {
            answer
        } = data.result;
        const {
            song,
            artist,
            album,
            plain_lyrics,
            genre,
            year,
            Youtube_URL,
            album_artwork_url,
            preview_audio_url,
            related_songs,
        } = answer;

        // Formato responsable
        let response = `🎵 *${song || 'Título desconocido'}* - ${artist || 'Artista desconocido'}\n`;
        if (album) response += `💿 Album: ${album}\n`;
        if (genre) response += `🎼 Género: ${genre}\n`;
        if (year) response += `📅 Año: ${year}\n`;
        if (Youtube_URL) response += `📹 YouTube: ${Youtube_URL}\n`;

        // Añadir letra
        response += `\n📜 *Letra:*\n${plain_lyrics || 'Letra no disponible.'}`;

        // Establecer contextInfo para miniaturas
        const contextInfo = {};
        if (album_artwork_url) {
            contextInfo.thumbnailUrl = album_artwork_url; // Tambahkan thumbnailUrl ke contextInfo
        }

        // Envía un mensaje con conn.sendMessage
        await conn.sendMessage(m.chat, {
            text: response,
            contextInfo: {
                externalAdReply: {
                    title: song || 'Lagu',
                    body: artist || 'Artis',
                    thumbnailUrl: album_artwork_url || undefined, // Utilice la URL en miniatura si está disponible
                    sourceUrl: Youtube_URL || undefined, // Opcional: enlace de YouTube
                    mediaType: 1, // 1 para fotos
                    renderLargerThumbnail: true, // Mostrar miniaturas más grandes
                },
                ...contextInfo, // Incluir información de contexto adicional
            },
        }, {
            quoted: m
        });

    } catch (err) {
        console.error('Error al buscar la letra:', err.message);
        await m.reply('No se pudieron obtener los datos de las letras. Por favor, inténtelo de nuevo.');
    }
};

handler.help = ['letra'];
handler.tags = ['music'];
handler.command = /^(letra|lyrics)$/i;

module.exports = handler;