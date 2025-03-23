const { prepareWAMessageMedia, generateWAMessageFromContent, getDevice } = (await import('@whiskeysockets/baileys')).default;
import yts from 'yt-search';

const handler = async (m, { conn, text }) => {
    const device = await getDevice(m.key.id);

    if (!text) throw "⚠️ *Por favor, ingrese el texto para buscar en YouTube.*";

    const results = await yts(text);
    if (!results || !results.videos) return m.reply('> *[❗] Error: No se encontraron videos.*');

    const videos = results.videos.slice(0, 20); // Tomamos hasta 20 resultados

    if (device !== 'desktop' && device !== 'web') {
        // Elegimos un video aleatorio
        const randomVideo = videos[Math.floor(Math.random() * videos.length)];
        const media = await prepareWAMessageMedia({ image: { url: randomVideo.thumbnail } }, { upload: conn.waUploadToServer });

        // Sección de botones de descarga
        const sections = [
            {
                title: "Descargar en Audio",
                rows: videos.map(video => ({
                    title: video.title,
                    description: `Duración: ${video.timestamp} | Vistas: ${video.views}`,
                    id: `.ytmp3 ${video.url}`
                }))
            },
            {
                title: "Descargar en Video",
                rows: videos.map(video => ({
                    title: video.title,
                    description: `Duración: ${video.timestamp} | Vistas: ${video.views}`,
                    id: `.ytmp4 ${video.url}`
                }))
            }
        ];

        // Mensaje interactivo
        const interactiveMessage = {
            body: { 
                text: `*—◉ Resultados obtenidos:* ${videos.length}\n\n🎬 *Video aleatorio:*\n📌 *Título:* ${randomVideo.title}\n👤 *Autor:* ${randomVideo.author.name}\n👁️ *Vistas:* ${randomVideo.views}\n🔗 *Enlace:* ${randomVideo.url}` 
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
                        name: "single_select",
                        buttonParamsJson: JSON.stringify({
                            title: "Opciones de Descarga",
                            sections: sections,
                        }),
                    }
                ],
                messageParamsJson: "{}"
            }
        };

        const msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    interactiveMessage,
                },
            },
        }, { userJid: conn.user.jid, quoted: m });

        conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

    } else {
        // Si el usuario está en Desktop/Web, mostrar los resultados en texto
        const teks = videos.map((v) => {
            return `
🎬 *_${v.title}_*
🔗 *Enlace:* ${v.url}
🕒 *Duración:* ${v.timestamp}
📅 *Publicado:* ${v.ago}
👁️ *Vistas:* ${v.views}`;
        }).join('\n\n━━━━━━━━━━━━━━\n\n');

        conn.sendFile(m.chat, videos[0].thumbnail, 'resultado.jpg', teks.trim(), m);      
    }    
};

handler.help = ['ytsearch <texto>'];
handler.tags = ['search'];
handler.command = /^(tesytt)$/i;
export default handler;