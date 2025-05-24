import axios from 'axios';

const handler = async (m, { conn, text, command, usedPrefix }) => {
  if (!text) {
    throw `*[❗] Ingresa el nombre de la canción*\n\n*Ejemplo:* ${usedPrefix + command} someone like you`;
  }

  try {
    const res = await axios.get(`https://fastrestapis.fasturl.cloud/music/songlyrics-v1?text=${encodeURIComponent(text)}`);
    const data = res.data;

    if (data.status !== 200 || !data.result?.answer) {
      throw '*[❗] No se encontró la canción o la letra no está disponible.*';
    }

    const {
      song, artist, album, plain_lyrics,
      genre, year, Youtube_URL
    } = data.result.answer;

    let mensaje = `🎵 *${song || 'Título desconocido'}* - ${artist || 'Artista desconocido'}\n`;
    if (album) mensaje += `💿 Álbum: ${album}\n`;
    if (genre) mensaje += `🎼 Género: ${genre}\n`;
    if (year) mensaje += `📅 Año: ${year}\n`;
    if (Youtube_URL) mensaje += `📹 YouTube: ${Youtube_URL}\n`;
    mensaje += `\n📜 *Letra:*\n${plain_lyrics || 'Letra no disponible.'}`;

    await conn.sendMessage(m.chat, { text: mensaje }, { quoted: m });

  } catch (e) {
    console.error(e);
    throw '*[❗] Error al obtener la letra. Inténtalo más tarde.*';
  }
};

handler.help = ['letra <nombre>'];
handler.tags = ['music'];
handler.command = /^letra|lyrics$/i;

export default handler;