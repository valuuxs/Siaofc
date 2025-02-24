import yts from 'yt-search';
import fetch from 'node-fetch';

const handler = async (m, { conn, args, usedPrefix }) => {
    if (!args[0]) return conn.reply(m.chat, '*`Por favor ingresa un término de búsqueda`*', m);

    await m.react('🕓');
    try {
        let searchResults = await searchVideos(args.join(" "));
        if (!searchResults.length) throw new Error('No se encontraron resultados.');

        let video = searchResults[0];

        let thumbnail;
        try {
            thumbnail = await fetch(video.miniatura).then(res => res.arrayBuffer());
        } catch (err) {
            console.error("Error al obtener la miniatura:", err.message);
            thumbnail = null;
        }

        let messageText = `> *YouTube Play 🧇.*\n\n`;
        messageText += `🎵 *${video.titulo}*\n\n`;
        messageText += `• *Duración:* ${video.duracion}\n`;
        messageText += `• *Autor:* ${video.canal}\n`;
        messageText += `• *Publicado:* ${video.publicado}\n`;
        messageText += `• *Enlace:* ${video.url}\n`;

        let sections = searchResults.slice(1, 11).map((v, index) => ({
            title: `${index + 1}┃ ${v.titulo}`,
            rows: [
                {
                    title: `🎶 Descargar MP3`,
                    description: `Duración: ${v.duracion}`,
                    id: `${usedPrefix}ytmp3 ${v.url}`
                },
                {
                    title: `🎥 Descargar MP4`,
                    description: `Duración: ${v.duracion}`,
                    id: `${usedPrefix}ytmp4 ${v.url}`
                }
            ]
        }));

        await conn.sendMessage(m.chat, {
            image: thumbnail ? { jpegThumbnail: thumbnail } : null,
            caption: messageText,
            footer: 'ᴘʀᴇꜱɪᴏɴᴀ ᴇʟ ʙᴏᴛᴏɴ ᴘᴀʀᴀ ᴇʟ ᴛɪᴘᴏ ᴅᴇ ᴅᴇꜱᴄᴀʀɢᴀ.',
            contextInfo: { mentionedJid: [m.sender] },
            buttons: [
                {
                    buttonId: `${usedPrefix}yta ${video.url}`,
                    buttonText: { displayText: 'ᯓᡣ𐭩 ᥲᥙძі᥆' },
                    type: 1,
                },
                {
                    buttonId: `${usedPrefix}ytmp4 ${video.url}`,
                    buttonText: { displayText: 'ᯓᡣ𐭩 ᥎іძᥱ᥆' },
                    type: 1,
                },
                {
                    type: 4,
                    nativeFlowInfo: {
                        name: 'single_select',
                        paramsJson: JSON.stringify({
                            title: 'Más resultados',
                            sections: sections,
                        }),
                    },
                },
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

handler.help = ['playxxx *<texto>*'];
handler.tags = ['dl'];
handler.command = ['playxxx'];
export default handler;

async function searchVideos(query) {
    try {
        const res = await yts(query);
        return res.videos.slice(0, 10).map(video => ({
            titulo: video.title,
            url: video.url,
            miniatura: video.thumbnail,
            canal: video.author.name,
            publicado: typeof video.ago === 'string' ? convertTimeToSpanish(video.ago) : 'No disponible',
            vistas: video.views || 'No disponible',
            duracion: video.duration || 'No disponible'
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