import fetch from 'node-fetch';
import yts from 'yt-search';
import baileys, { proto, generateWAMessageContent, generateWAMessageFromContent } from '@whiskeysockets/baileys';

async function createImage(url, conn) {
    const { imageMessage } = await generateWAMessageContent({ image: { url } }, { upload: conn.waUploadToServer });
    return imageMessage;
}

var handler = async (m, { text, conn }) => {
    if (!text) return conn.reply(m.chat, '[ 🔎 ] Por favor, ingresa una búsqueda de YouTube.', m);
    await m.react('🕓');

    try {
        conn.reply(m.chat, '*Buscando...* 🔍', m);

        let results = await yts(text);
        let videos = results.all.filter(v => v.type === 'video').slice(0, 5); // Tomamos solo 5 resultados

        if (!videos.length) {
            return conn.reply(m.chat, `No se encontraron resultados para *${text}*`, m);
        }

        let push = [];

        for (let v of videos) {
            let image = await createImage(v.thumbnail, conn);

            push.push({
                body: proto.Message.InteractiveMessage.Body.fromObject({
                    text: `🎥 *${v.title}*\n📡 *Canal:* ${v.author.name}\n🕝 *Duración:* ${v.timestamp}\n📆 *Subido:* ${v.ago}\n👀 *Vistas:* ${v.views}`
                }),
                footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: '' }),
                header: proto.Message.InteractiveMessage.Header.fromObject({
                    title: '',
                    hasMediaAttachment: true,
                    imageMessage: image
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                    buttons: [
                        {
                            "name": "cta_copy",
                            "buttonParamsJson": `{"display_text":"📺 Ver en YouTube","id":"123456789","copy_code":"${v.url}"}`
                        }
                    ]
                })
            });
        }

        const msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                        body: proto.Message.InteractiveMessage.Body.create({ text: `🔎 *Resultados de:* "${text}"` }),
                        footer: proto.Message.InteractiveMessage.Footer.create({ text: '`Y T - S E A R C H`' }),
                        header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
                        carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards: [...push] })
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
handler.command = ['you'];
handler.register = true;

export default handler;