const { prepareWAMessageMedia, generateWAMessageFromContent, getDevice } = (await import('@whiskeysockets/baileys')).default;
import yts from 'yt-search';

const handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw "⚠️ *Por favor, ingrese el texto para buscar en YouTube.*";

    const results = await yts(text);
    if (!results || !results.videos.length) return m.reply('> *[❗] Error: No se encontraron videos.*');

    const video = results.videos[0];
    const media = await prepareWAMessageMedia({ image: { url: video.thumbnail } }, { upload: conn.waUploadToServer });

    const messageText = `*—◉ Resultado encontrado:*\n\n` +
        `*📌 Título:* ${video.title}\n` +
        `*📤 Autor:* ${video.author.name}\n` +
        `*🔗 Enlace:* ${video.url}\n`;

    await conn.sendMessage(m.chat, {
        image: media.imageMessage,
        caption: messageText,
        footer: "Shadow Bot",
        buttons: [
            {
                buttonId: `${usedPrefix}ytmp3 ${video.url}`,
                buttonText: { displayText: 'Descargar MP3' },
                type: 1,
            },
            {
                buttonId: `${usedPrefix}ytmp4 ${video.url}`,
                buttonText: { displayText: 'Descargar MP4' },
                type: 1,
            }
        ],
        headerType: 1
    }, { quoted: m });
};

handler.help = ['ytsearch <texto>'];
handler.tags = ['search'];
handler.command = /^(tesytt)$/i;
export default handler;