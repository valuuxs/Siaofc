/*import yts from 'yt-search';
import fetch from 'node-fetch';

const fetchWithFallback = async (urls) => {
    for (const url of urls) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
            const data = await response.json();
            if (data?.data?.url) return data.data.url;
        } catch (error) {
            console.log(`Error en la API: ${url}`, error.message);
        }
    }
    throw "No se pudo obtener el archivo.";
};

const handler = async (m, { conn, text, command }) => {
    try {
        if (!text) {
            const msg = (command === 'play') 
                ? '*[ 🎧 ] Ingresa el nombre o título de una canción de YouTube.*' 
                : '*[ 📽️ ] Ingresa el nombre o título de un vídeo de YouTube.*';
            return conn.reply(m.chat, msg, m);
        }

        const search = await yts(text);
        if (!search?.all?.length) throw "No se encontraron resultados.";

        const videoInfo = search.all[0];
        const urls = {
            mp3: [
                `https://delirius-apiofc.vercel.app/download/ytmp3?url=${videoInfo.url}`,
                `https://api.vreden.my.id/api/ytmp3?url=${videoInfo.url}`
            ],
            mp4: [
                `https://delirius-apiofc.vercel.app/download/ytmp4?url=${videoInfo.url}`,
                `https://api.vreden.my.id/api/ytmp4?url=${videoInfo.url}`
            ]
        };

        let fileUrl;
        if (command === 'play') {
            m.react('🎧');
            fileUrl = await fetchWithFallback(urls.mp3);
            await conn.sendFile(m.chat, fileUrl, `${videoInfo.title}.mp3`, '' m, null, { mimetype: "audio/mpeg" });
        } else if (command === 'play2') {
            m.react('📹');
            fileUrl = await fetchWithFallback(urls.mp4);
            await conn.sendMessage(m.chat, { video: { url: fileUrl }, mimetype: "video/mp4" }, { quoted: m });
        } else {
            throw "Comando no reconocido.";
        }
    } catch (error) {
        conn.reply(m.chat, `⚠️ Error: ${error}`, m);
    }
};

handler.help = ['play', 'play2'];
handler.command = ['play', 'play2'];
handler.tags = ['descargas'];
handler.register = true;

export default handler;
*/


import yts from 'yt-search';
import fetch from 'node-fetch';

const fetchWithFallback = async (urls) => {
    for (const url of urls) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
            const data = await response.json();
            if (data?.data?.url) return data.data.url;
            if (data?.download?.url) return data.download.url;
            if (data?.result?.download?.url) return data.result.download.url;
        } catch (error) {
            console.log(`Error en la API: ${url}`, error.message);
        }
    }
    throw "No se pudo obtener el archivo.";
};

const handler = async (m, { conn, text, command }) => {
    try {
        if (!text) {
            const msg = (command === 'play') 
                ? '*[ 🎧 ] Ingresa el nombre o título de una canción de YouTube.*' 
                : '*[ 📽️ ] Ingresa el nombre o título de un vídeo de YouTube.*';
            return conn.reply(m.chat, msg, m, { quoted: fkontak });
        }

        const search = await yts(text);
        if (!search?.all?.length) throw "No se encontraron resultados.";

        const videoInfo = search.all[0];
        const urls = {
            mp3: [
                `https://delirius-apiofc.vercel.app/download/ytmp3?url=${videoInfo.url}`,
                `https://api.vreden.my.id/api/ytmp3?url=${videoInfo.url}`
            ],
            mp4: [
                `https://delirius-apiofc.vercel.app/download/ytmp4?url=${videoInfo.url}`,
                `https://api.vreden.my.id/api/ytmp4?url=${videoInfo.url}`
            ]
        };

        let fileUrl;
        if (command === 'play') {
            m.react('🎧');
            fileUrl = await fetchWithFallback(urls.mp3);
            await conn.sendFile(m.chat, fileUrl, `${videoInfo.title}.mp3`, '', m, { quoted: fkontak, mimetype: "audio/mpeg" });
        } else if (command === 'play2') {
            m.react('📹');
            fileUrl = await fetchWithFallback(urls.mp4);
            await conn.sendMessage(m.chat, { video: { url: fileUrl }, mimetype: "video/mp4" }, { quoted: m, contextInfo: { mentionedJid: [fkontak.key.participant] } });
        } else {
            throw "Comando no reconocido.";
        }
    } catch (error) {
        conn.reply(m.chat, `⚠️ Error: ${error}`, m, { quoted: fkontak });
    }
};

handler.help = ['play', 'play2'];
handler.command = ['play', 'play2'];
handler.tags = ['descargas'];
handler.register = true;

export default handler;