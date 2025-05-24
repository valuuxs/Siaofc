import axios from 'axios';

const handler = async (m, { conn, text }) => {
    if (!text) return m.reply('Introduzca el título de la canción que desea buscar.');

    try {
        const res = await axios.get(`https://fastrestapis.fasturl.cloud/music/songlyrics-v1?text=${encodeURIComponent(text)}`);
        const data = res.data;

        if (data.status !== 200 || !data.result || !data.result.answer) {
            return m.reply('Canción no encontrada o no se pudieron recuperar los datos.');
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
            related_songs,
        } = data.result.answer;

        let response = `🎵 *${song || 'Título desconocido'}* - ${artist || 'Artista desconocido'}\n`;
        if (album) response += `💿 Álbum: ${album}\n`;
        if (genre) response += `🎼 Género: ${genre}\n`;
        if (year) response += `📅 Año: ${year}\n`;
        if (Youtube_URL) response += `📹 YouTube: ${Youtube_URL}\n`;

        if ((plain_lyrics || '').length > 4000) {
            response += `\n📜 *Letra:*\nLa letra es demasiado larga para mostrar.`;
        } else {
            response += `\n📜 *Letra:*\n${plain_lyrics || 'Letra no disponible.'}`;
        }

        if (related_songs && related_songs.length) {
            response += `\n\n🔗 *Canciones Relacionadas:*\n`;
            related_songs.slice(0, 3).forEach((s, i) => {
                response += `- ${s.title || 'Sin título'} por ${s.artist || 'Desconocido'}\n`;
            });
        }

        await conn.sendMessage(m.chat, {
            text: response,
            contextInfo: {
                externalAdReply: {
                    title: song || 'Canción',
                    body: artist || 'Artista',
                    thumbnailUrl: album_artwork_url || null,
                    sourceUrl: Youtube_URL || null,
                    mediaType: 1,
                    renderLargerThumbnail: true,
                }
            }
        }, { quoted: m });

    } catch (err) {
        console.error('Error al buscar la letra:', err.message);
        await m.reply('No se pudieron obtener los datos de las letras. Por favor, inténtelo de nuevo.');
    }
};

handler.help = ['letra'];
handler.tags = ['music'];
handler.command = /^(letra|lyrics|lirik)$/i;

export default handler;