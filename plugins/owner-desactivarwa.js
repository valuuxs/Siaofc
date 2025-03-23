const { prepareWAMessageMedia, generateWAMessageFromContent, getDevice } = (await import('@whiskeysockets/baileys')).default;
import yts from 'yt-search';

const handler = async (m, { conn, text }) => {
    const device = await getDevice(m.key.id);

    if (!text) throw "⚠️ *Por favor, ingrese el texto para buscar en YouTube.*";

    const results = await yts(text);
    if (!Array.isArray(results.videos) || results.videos.length === 0) return m.reply('> *[❗] Error: No se encontraron videos.*');

    if (device !== 'desktop' && device !== 'web') {
        const videos = results.videos.slice(0, 20);
        const randomVideo = videos[Math.floor(Math.random() * videos.length)];

        const media = await prepareWAMessageMedia(
            { image: { url: randomVideo.thumbnail } }, 
            { upload: conn.waUploadToServer }
        );

        const sections = videos.map((video) => ({
            title: video.title,
            rows: [
                {
                    title: 'Descargar MP3',
                    description: `${video.title} - ${video.author.name}`,
                    rowId: `.ytmp3 ${video.url}`
                },
                {
                    title: 'Descargar MP4',
                    description: `${video.title} - ${video.author.name}`,
                    rowId: `.ytmp4 ${video.url}`
                }
            ]
        }));

        const listMessage = {
            viewOnceMessage: {
                message: {
                    interactiveMessage: {
                        body: { 
                            text: `*—◉ Resultados obtenidos:* ${results.videos.length}\n*—◉ Video aleatorio:*\n*-› Título:* ${randomVideo.title}\n*-› Autor:* ${randomVideo.author.name}\n*-› Vistas:* ${randomVideo.views}\n*-› Enlace:* ${randomVideo.url}` 
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
                                        title: 'Opciones Disponibles',
                                        sections
                                    })
                                }
                            ],
                            messageParamsJson: ''
                        }
                    }
                }
            }
        };

        const msg = generateWAMessageFromContent(m.chat, listMessage, { userJid: conn.user.jid, quoted: m });
        conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

    } else {
        const teks = results.videos.map((v) => `
° *_${v.title}_*
↳ 🔗 *Enlace:* ${v.url}
↳ 🕒 *Duración:* ${v.timestamp}
↳ 📅 *Publicado:* ${v.ago}
↳ 👁 *Vistas:* ${v.views}
`).join('\n\n━━━━━━━━━━━━━━\n\n');

        conn.sendFile(m.chat, results.videos[0].thumbnail, 'resultado.jpg', teks.trim(), m);      
    }    
};

handler.help = ['ytsearch <texto>'];
handler.tags = ['search'];
handler.command = /^(tesytx)$/i;
export default handler;