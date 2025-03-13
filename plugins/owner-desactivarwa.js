const { prepareWAMessageMedia, generateWAMessageFromContent, getDevice } = (await import('@whiskeysockets/baileys')).default;
import yts from 'yt-search';

const handler = async (m, { conn, text, usedPrefix, command }) => {
    const device = await getDevice(m.key.id);

    if (!text) throw "⚠️ *Por favor, ingrese el texto para buscar en YouTube.*";

    const results = await yts(text);
    if (!results || !results.videos.length) return m.reply('> *[❗] Error: No se encontraron videos.*');

    const videos = results.videos.slice(0, 20);
    const randomIndex = Math.floor(Math.random() * videos.length);
    const randomVideo = videos[randomIndex];

    const media = await prepareWAMessageMedia({ image: { url: randomVideo.thumbnail } }, { upload: conn.waUploadToServer });

    const interactiveMessage = {
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
                        title: 'OPCIONES DISPONIBLES',
                        sections: videos.map((video) => ({
                            title: video.title,
                            rows: [
                                {
                                    header: video.title,
                                    title: video.author.name,
                                    description: 'Descargar MP3',
                                    id: `.ytmp3 ${video.url}`
                                },
                                {
                                    header: video.title,
                                    title: video.author.name,
                                    description: 'Descargar MP4',
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

    // Capturar respuesta de botones interactivos y ejecutar comando manualmente
    conn.ev.on('messages.upsert', async (upsert) => {
        const msg = upsert.messages[0];
        if (!msg.message) return;

        // Captura de respuestas de lista
        if (msg.message.listResponseMessage) {
            const selectedId = msg.message.listResponseMessage.singleSelectReply.selectedRowId;
            console.log('Comando recibido:', selectedId);
            if (selectedId.startsWith('.ytmp3') || selectedId.startsWith('.ytmp4')) {
                const [cmd, url] = selectedId.split(' ');
                // Simular mensaje de comando para que lo procese el bot
                const fakeMsg = {
                    ...msg,
                    message: { conversation: selectedId },
                    text: selectedId
                };
                conn.ev.emit('messages.upsert', { messages: [fakeMsg], type: 'append' });
            }
        }
    });
};

handler.help = ['ytsearch <texto>'];
handler.tags = ['search'];
handler.command = /^(tesyt3)$/i;
export default handler;