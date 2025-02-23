import yts from 'yt-search';
import fetch from 'node-fetch';

const handler = async (m, { conn, text, command }) => {
    if (!text) {
        return conn.reply(m.chat, 'Por favor ingresa la música o video que deseas descargar.', m);
    }

    const search = await yts(text);
    if (!search.all || search.all.length === 0) {
        throw "No se encontraron resultados para tu búsqueda.";
    }

    const videoInfo = search.all[0];

    if (command === 'yta' || command === 'ytmp3') {
        m.react('🎶');
        const audio = await fetchWithFallback([
            `https://api.alyachan.dev/api/youtube?url=${videoInfo.url}&type=mp3&apikey=Gata-Dios`,
            `https://delirius-apiofc.vercel.app/download/ytmp3?url=${videoInfo.url}`,
            `https://api.vreden.my.id/api/ytmp3?url=${videoInfo.url}`
        ]);
        await conn.sendFile(m.chat, audio.data.url, `${videoInfo.title}.mp3`, '', m, null, { mimetype: "audio/mpeg" });

    } else if (command === 'ytv' || command === 'ytmp4') {
        m.react('📹');
        const video = await fetchWithFallback([
            `https://api.alyachan.dev/api/youtube?url=${videoInfo.url}&type=mp4&apikey=Gata-Dios`,
            `https://delirius-apiofc.vercel.app/download/ytmp4?url=${videoInfo.url}`,
            `https://api.vreden.my.id/api/ytmp4?url=${videoInfo.url}`
        ]);
        await conn.sendMessage(m.chat, { video: { url: video.data.url }, mimetype: "video/mp4" }, { quoted: m });

    } else {
        throw "Comando no reconocido.";
    }
};

handler.help = ['yta', 'ytmp3', 'ytv', 'ytmp4'];
handler.command = ['yta', 'ytmp3', 'ytv', 'ytmp4'];
handler.tags = ['dl'];
handler.register = true;

export default handler;

// Función para obtener MP3 o MP4 desde múltiples APIs
const fetchWithFallback = async (urls) => {
    for (const url of urls) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.data && data.data.url) return data;
        } catch (error) {
            console.log(`Error con la API: ${url}`, error);
        }
    }
    throw "No se pudo obtener el archivo.";
};