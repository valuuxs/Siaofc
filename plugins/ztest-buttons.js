
//Buttons - Message Im Interactive
/*
let handler = async (m, { conn }) => {
    let imageUrl = 'https://files.catbox.moe/ilr818.jpg';

    conn.sendMessage(m.chat, { 
        image: { url: imageUrl }, 
        caption: 'Hola usuario de WhatsApp esto solo es un test de botones que no tiene nada que ver con lo demás.', 
        footer: '© Տһᥲძᨣᥕ Ɓᨣƚ Uᥣ𝗍rᥲ', 
        buttons: [
            {
                buttonId: `.ping`,
                buttonText: { displayText: 'ᯓᡣ𐭩 ⍴іᥒg' }
            }
        ],
        viewOnce: true,
        headerType: 4
    }, { quoted: m });
}

handler.tag = ['test'];
handler.help = ['p'];
handler.command = ['buttontest'];

export default handler;
/*
// Buttons Ix

let handler = async (m, { conn }) => {

    conn.sendMessage(m.chat, { 
        text: 'TITLE', 
        footer: dev, 
        buttons: [
            {
                buttonId: `.owner`,
                buttonText: { displayText: 'Owner' },
                type: 1
            }
        ],
        viewOnce: true
    }, { quoted: m });
}

handler.tag = ['info'];
handler.help = ['p'];
handler.command = ['p'];
*/

import yts from 'yt-search';
import fetch from 'node-fetch';
import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';

const handler = async (m, { conn, args, usedPrefix }) => {
    if (!args[0]) return conn.reply(m.chat, '*`Por favor ingresa un término de búsqueda`*', m);

    await m.react('🕓');
    try {
        let searchResults = await searchVideos(args.join(" "));

        if (!searchResults.length) throw new Error('No se encontraron resultados.');

        let video = searchResults[0];
        let thumbnail = await (await fetch(video.miniatura)).buffer();

        let messageText = `> *𝖸𝗈𝗎𝖳𝗎𝖻𝖾 𝖯𝗅𝖺𝗒 🧇.*\n\n`;
        messageText += `${video.titulo}\n\n`;
        messageText += `• *𝖣𝗎𝗋𝖺𝖼𝗂𝗈𝗇:* ${video.duracion || 'No disponible'}\n`;
        messageText += `• *𝖠𝗎𝗍𝗈𝗋:* ${video.canal || 'Desconocido'}\n`;
        messageText += `• *𝖯𝗎𝖻𝗅𝗂𝖼𝖺𝖽𝗈:* ${convertTimeToSpanish(video.publicado)}\n`;
        messageText += `• *𝖫𝗂𝗇𝗄:* ${video.url}\n`;

        await conn.sendMessage(m.chat, {
            image: thumbnail,
            caption: messageText,
            footer: 'ᴘʀᴇꜱɪᴏɴᴀ ᴇʟ ʙᴏᴛᴏɴ ᴘᴀʀᴀ ᴇʟ ᴛ𝗂𝗉𝗈 𝗍𝖾 𝖽𝖾𝗌𝖼𝖺𝗋𝗀𝖺.',
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true
            },
            buttons: [
                {
                    buttonId: `${usedPrefix}ytmp3x ${video.url}`,
                    buttonText: { displayText: '🎧 𝖠𝗎𝖽𝗂𝗈' },
                    type: 1,
                },
                {
                    buttonId: `${usedPrefix}ytmp4x ${video.url}`,
                    buttonText: { displayText: '𝖵𝗂𝖽𝖾𝗈 🎥' },
                    type: 1,
                }
            ],
            headerType: 1,
            viewOnce: true
        }, { quoted: m });

        await m.react('✅');
    } catch (e) {
        console.error(e);
        await m.react('✖️');
        conn.reply(m.chat, '*`Error al buscar el video.`*', m);
    }
};

handler.help = ['play *<texto>*'];
handler.tags = ['dl'];
handler.command = ['playx2'];
export default handler;

async function searchVideos(query) {
    try {
        const res = await yts(query);
        return res.videos.slice(0, 10).map(video => ({
            titulo: video.title,
            url: video.url,
            miniatura: video.thumbnail,
            canal: video.author.name,
            publicado: video.timestamp || 'No disponible',
            vistas: video.views || 'No disponible',
            duracion: video.duration.timestamp || 'No disponible'
        }));
    } catch (error) {
        console.error('Error en yt-search:', error.message);
        return [];
    }
}

function convertTimeToSpanish(timeText) {
    return timeText
        .replace(/year/, 'año').replace(/years/, 'años')
        .replace(/month/, 'mes').replace(/months/, 'meses')
        .replace(/day/, 'día').replace(/days/, 'días')
        .replace(/hour/, 'hora').replace(/hours/, 'horas')
        .replace(/minute/, 'minuto').replace(/minutes/, 'minutos');
}