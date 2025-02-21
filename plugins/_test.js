import { generateWAMessageFromContent } from '@whiskeysockets/baileys';
import * as fs from 'fs';

const handler = async (m, { conn, text, participants }) => {
    try {
        const users = participants.map((u) => conn.decodeJid(u.id));
        const quoted = m.quoted ? await m.getQuotedObj() : null;
        const quotedText = quoted?.text || quoted?.message?.conversation || '';

        if (!quoted) return;

        const msg = generateWAMessageFromContent(
            m.chat,
            { [quoted.mtype || 'extendedTextMessage']: quoted.message[quoted.mtype] || { text: quotedText } },
            { quoted: m, userJid: conn.user.id }
        );

        await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

    } catch {
        const users = participants.map((u) => conn.decodeJid(u.id));
        const quoted = m.quoted ? m.quoted : m;
        const mime = (quoted.msg || quoted).mimetype || '';
        const isMedia = /image|video|sticker|audio/.test(mime);
        const more = String.fromCharCode(8206);
        const masss = more.repeat(850);
        const htextos = text || '';

        if (isMedia) {
            var mediax = await quoted.download?.();
            if (quoted.mtype === 'imageMessage') {
                conn.sendMessage(m.chat, { image: mediax, mentions: users, caption: htextos }, { quoted: m });
            } else if (quoted.mtype === 'videoMessage') {
                conn.sendMessage(m.chat, { video: mediax, mentions: users, mimetype: 'video/mp4', caption: htextos }, { quoted: m });
            } else if (quoted.mtype === 'audioMessage') {
                conn.sendMessage(m.chat, { audio: mediax, mentions: users, mimetype: 'audio/mpeg', fileName: 'Hidetag.mp3' }, { quoted: m });
            } else if (quoted.mtype === 'stickerMessage') {
                conn.sendMessage(m.chat, { sticker: mediax, mentions: users }, { quoted: m });
            }
        } else {
            await conn.relayMessage(
                m.chat,
                {
                    extendedTextMessage: {
                        text: `${masss}\n${htextos}\n`,
                        contextInfo: {
                            mentionedJid: users,
                            externalAdReply: {
                                thumbnail: imagen1,
                                sourceUrl: 'https://chat.whatsapp.com/FCS6htvAmlT7nq006lxU4I'
                            }
                        }
                    }
                },
                {}
            );
        }
    }
};

handler.help = ['notify2 <txt>'];
handler.tags = ['gc'];
handler.command = /^(hidetag2|notify2|notificar2|notifi2|noti2|n2|hidet2)$/i;
handler.group = true;
handler.admin = true;

export default handler;