import yts from 'yt-search';
import { generateWAMessageFromContent, proto } from '@whiskeysockets/baileys';

var handler = async (m, { text, conn }) => {
    if (!text) return conn.reply(m.chat, `*[ 🔎 ] Por favor, ingresa una búsqueda de YouTube.*`, m);

    try {
        await m.react('🔍');
        let results = await yts(text);
        let videos = results.all.filter(v => v.type === 'video').slice(0, 5); // Tomamos solo 5 resultados

        if (!videos.length) {
            return conn.reply(m.chat, `No se encontraron resultados para *${text}*`, m);
        }

        let cards = videos.map(video => ({
            body: proto.Message.InteractiveMessage.Body.create({
                text: `🎥 *Título:* ${video.title}\n📡 *Canal:* ${video.author.name}\n🕝 *Duración:* ${video.timestamp}\n📆 *Subido:* ${video.ago}\n👀 *Vistas:* ${video.views}`
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
                text: 'YouTube Search'
            }),
            header: proto.Message.InteractiveMessage.Header.create({
                title: '',
                hasMediaAttachment: true,
                imageMessage: {
                    url: video.thumbnail
                }
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                buttons: [
                    {
                        name: "cta_copy",
                        buttonParamsJson: JSON.stringify({
                            display_text: "📺 Ver Video",
                            id: "123456789",
                            copy_code: video.url
                        })
                    }
                ]
            })
        }));

        const msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: `🔎 *Resultados de YouTube para:* "${text}"`
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: '_YouTube Search_'
                        }),
                        header: proto.Message.InteractiveMessage.Header.create({
                            hasMediaAttachment: false
                        }),
                        carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.create({
                            cards: cards
                        })
                    })
                }
            }
        }, { quoted: m });

        await m.react('✅');
        await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

    } catch (error) {
        console.error(error);
        conn.reply(m.chat, 'Ocurrió un error al realizar la búsqueda. Intenta de nuevo más tarde.', m);
    }
};

handler.help = ['ytsearch'];
handler.tags = ['buscador'];
handler.command = ['ytxm'];
handler.register = true;

export default handler;