import fetch from 'node-fetch';

const handler = async (m, { conn, command, text, isAdmin }) => {
    const isMute = command === 'mute';
    const isUnmute = command === 'unmute';

    if (!isAdmin) {
        throw '🍬 *Solo un administrador puede ejecutar este comando*';
    }

    const sender = m.sender;
    const mentionedJid = m.mentionedJid && m.mentionedJid[0];
    const target = mentionedJid || (m.quoted ? m.quoted.sender : text);
    const creatorJid = global.owner[0][0] + '@s.whatsapp.net';

    if (!target) {
        throw isMute
            ? '🗣️ *Menciona a la persona que deseas mutar*'
            : '🗣️ *Menciona a la persona que deseas desmutar*';
    }

    if (target === conn.user.jid) {
        throw '🥵 *No puedes mutar el bot*';
    }

    if (target === creatorJid) {
        throw '🍬 *No puedes mutar el creador del grupo*';
    }

    const groupMetadata = await conn.groupMetadata(m.chat);
    const groupOwner = groupMetadata.owner || m.chat.split('-')[0] + '@s.whatsapp.net';
    if (target === groupOwner) {
        throw '🍭 *No puedes mutar el creador del grupo*';
    }

    const user = global.db.data.users[target] || {};

    if (isMute) {
        if (user.mute) {
            throw '🍭 *Este usuario ya ha sido mutado*';
        }

        const contactMsg = {
            key: {
                participants: '0@s.whatsapp.net',
                fromMe: false,
                id: 'Halo',
            },
            message: {
                locationMessage: {
                    name: '𝗨𝘀𝘂𝗮𝗿𝗶𝗼 𝗺𝘂𝘁𝗮𝗱𝗼',
                    jpegThumbnail: await (await fetch('https://telegra.ph/file/f8324d9798fa2ed2317bc.png')).buffer(),
                    vcard: 'BEGIN:VCARD\nVERSION:3.0\nFN:Unlimited\nTEL;waid=19709001746:+1 (970) 900-1746\nEND:VCARD',
                },
            },
            participant: '0@s.whatsapp.net',
        };

        await conn.reply(m.chat, '*Tus mensajes serán eliminados*', contactMsg, null, { mentions: [target] });
        user.mute = true;
    }

    if (isUnmute) {
        if (!user.mute) {
            throw '🍭 *Este usuario no ha sido mutado*';
        }

        const contactMsg = {
            key: {
                participants: '0@s.whatsapp.net',
                fromMe: false,
                id: 'Halo',
            },
            message: {
                locationMessage: {
                    name: '𝗨𝘀𝘂𝗮𝗿𝗶𝗼 𝗱𝗲𝗺𝘂𝘁𝗮𝗱𝗼',
                    jpegThumbnail: await (await fetch('https://telegra.ph/file/aea704d0b242b8c41bf15.png')).buffer(),
                    vcard: 'BEGIN:VCARD\nVERSION:3.0\nFN:Unlimited\nTEL;waid=19709001746:+1 (970) 900-1746\nEND:VCARD',
                },
            },
            participant: '0@s.whatsapp.net',
        };

        await conn.reply(m.chat, '*Tus mensajes no serán eliminados*', contactMsg, null, { mentions: [target] });
        user.mute = false;
    }
};

handler.command = ['mute', 'unmute'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;