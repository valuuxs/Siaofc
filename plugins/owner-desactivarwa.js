import yts from 'yt-search';
import baileys from '@whiskeysockets/baileys';

async function sendAlbumMessage(jid, medias, options = {}) {
    if (medias.length < 2) {
        throw new RangeError("Se requieren al menos 2 elementos para el carrusel.");
    }

    const caption = options.text || options.caption || "";
    const delay = !isNaN(options.delay) ? options.delay : 500;
    delete options.text;
    delete options.caption;
    delete options.delay;

    const album = baileys.generateWAMessageFromContent(
        jid,
        {
            messageContextInfo: {},
            albumMessage: {
                expectedImageCount: medias.filter(media => media.type === "image").length,
                expectedVideoCount: medias.filter(media => media.type === "video").length,
                ...(options.quoted
                    ? {
                        contextInfo: {
                            remoteJid: options.quoted.key.remoteJid,
                            fromMe: options.quoted.key.fromMe,
                            stanzaId: options.quoted.key.id,
                            participant: options.quoted.key.participant || options.quoted.key.remoteJid,
                            quotedMessage: options.quoted.message,
                        },
                    }
                    : {}),
            },
        },
        {}
    );

    await conn.relayMessage(album.key.remoteJid, album.message, { messageId: album.key.id });

    for (let i = 0; i < medias.length; i++) {
        const { type, data, caption } = medias[i];
        const msg = await baileys.generateWAMessage(
            album.key.remoteJid,
            { [type]: data, ...(i === 0 ? { caption } : {}) },
            { upload: conn.waUploadToServer }
        );
        msg.message.messageContextInfo = {
            messageAssociation: { associationType: 1, parentMessageKey: album.key },
        };
        await conn.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });
        await baileys.delay(delay);
    }

    return album;
}

var handler = async (m, { text, conn }) => {
    if (!text) return conn.reply(m.chat, `*[ 🔎 ] Por favor, ingresa una búsqueda de YouTube.*`, m);

    try {
        conn.reply(m.chat, '*Buscando...* 🔍', m);

        let results = await yts(text);
        let videos = results.all.filter(v => v.type === 'video').slice(0, 5); // Tomamos solo 5 resultados

        if (!videos.length) {
            return conn.reply(m.chat, `No se encontraron resultados para *${text}*`, m);
        }

        const medias = videos.map(v => ({
            type: 'image',
            data: { url: v.thumbnail },
            caption: `🎥 *${v.title}*\n📡 *Canal:* ${v.author.name}\n🕝 *Duración:* ${v.timestamp}\n📆 *Subido:* ${v.ago}\n👀 *Vistas:* ${v.views}\n🔗 *Enlace:* ${v.url}`
        }));

        await sendAlbumMessage(m.chat, medias, {
            caption: `🔎 *Resultados de YouTube para:* "${text}"`,
            quoted: m
        });

    } catch (error) {
        console.error(error);
        conn.reply(m.chat, 'Ocurrió un error al realizar la búsqueda. Intenta de nuevo más tarde.', m);
    }
};

handler.help = ['ytsearch'];
handler.tags = ['buscador'];
handler.command = ['youtubesearch', 'ytsearch', 'yts'];
handler.register = true;

export default handler;