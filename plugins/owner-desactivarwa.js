import { prepareWAMessageMedia, generateWAMessageFromContent, getDevice } from '@whiskeysockets/baileys';
import yts from 'yt-search';

const handler = async (m, { conn, text, usedPrefix }) => {
    if (!text) throw "⚠️ *Por favor, ingrese el texto para buscar en YouTube.*";

    const results = await yts(text);
    if (!results || !results.videos.length) return m.reply('> *[❗] No se encontraron videos.*');

    const videos = results.videos.slice(0, 10);
    const media = await prepareWAMessageMedia({ image: { url: videos[0].thumbnail } }, { upload: conn.waUploadToServer });

    const interactiveMessage = {
        body: {
            text: `*—◉ Resultados encontrados:* ${results.videos.length}\n\n` +
                  `Selecciona una opción para descargar en MP3 o MP4.`,
        },
        footer: { text: "Shadow Bot" },
        header: {
            title: "*< YouTube Search />*",
            hasMediaAttachment: true,
            imageMessage: media.imageMessage,
        },
        nativeFlowMessage: {
            buttons: [
                {
                    name: 'single_select',
                    buttonParamsJson: JSON.stringify({
                        title: 'OPCIONES DISPONIBLES',
                        sections: videos.map((video) => ({
                            title: video.title,
                            rows: [
                                {
                                    header: video.title,
                                    title: 'Descargar MP3',
                                    description: video.author.name,
                                    id: `.ytmp3 ${video.url}`
                                },
                                {
                                    header: video.title,
                                    title: 'Descargar MP4',
                                    description: video.author.name,
                                    id: `.ytmp4 ${video.url}`
                                }
                            ]
                        }))
                    })
                }
            ],
            messageParamsJson: ''
        }
    };

    const msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                interactiveMessage,
            },
        },
    }, { userJid: conn.user.jid, quoted: m });

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
};

handler.help = ['ytsearch <texto>'];
handler.tags = ['search'];
handler.command = /^(tesytx)$/i;
export default handler;