import axios from 'axios';

const handler = async (m, { conn, text }) => {
    if (!text) return m.reply(`*${xtools} Por favor, ingrese el título de la canción que desea buscar la letra.*`);

    await m.react('⌛');

    try {
        const res = await axios.get(`https://fastrestapis.fasturl.cloud/music/songlyrics-v1?text=${encodeURIComponent(text)}`);
        const data = res.data;

        if (data.status !== 200 || !data.result || !data.result.answer) {
            await m.react('✖️');
            return m.reply('*✖️ Canción no encontrada o no se pudieron recuperar los datos.*');
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

        let response = `*${song || 'Título desconocido'} - ${artist || 'Artista desconocido'}*\n`;
        if (album) response += `*🌲 \`Álbum:\`* ${album}\n`;

        if ((plain_lyrics || '').length > 4000) {
            response += `*🌿 \`Letra:\`*\n> *La letra es demasiado larga para mostrar.*`;
        } else {
            response += `*🌿 \`Letra:\`*\n\n${plain_lyrics || '> *Letra no disponible.*'}`;
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
        }, { quoted: fkontak });

        await m.react('✅');

    } catch (err) {
        console.error('Error al buscar la letra:', err.message);
        await m.react('✖️');
        await m.reply('No se pudieron obtener los datos de las letras. Por favor, inténtelo de nuevo.');
    }
};

handler.help = ['letra'];
handler.tags = ['music'];
handler.command = /^(letra|lyrics|lirik|liric|lyric)$/i;

export default handler;