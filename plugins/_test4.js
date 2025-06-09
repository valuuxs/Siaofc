/*import axios from 'axios'
import cheerio from 'cheerio'
let handler = async (m, { conn, text: tiktok, args, command, usedPrefix}) => {
if (!tiktok) throw '🚩 Ingresa un enlace de una publicación de fotos de TikTok junto al comando.'  
let imagesSent
if (imagesSent) return
imagesSent = true    
try {   
let tioShadow = await ttimg(tiktok)
let result = tioShadow?.data
for (let d of result) {
  await conn.sendMessage(m.chat, {image: {url: d}}, {quoted: m})
 }
imagesSent = false
} catch {
    imagesSent = false    
    throw m.react('✖️')
 }
}
handler.help = ['tiktokimg *<url>*']
handler.tags = ['img', 'downloader']
handler.command = /^(ttimg|tiktokimg)$/i
export default handler;
handler.register = true 

async function ttimg(link) {
    try {    
        let url = `https://dlpanda.com/es?url=${link}&token=G7eRpMaa`
        let response = await axios.get(url)
        const html = response.data
        const $ = cheerio.load(html)
        let imgSrc = [];
        $('div.col-md-12 > img').each((index, element) => {
            imgSrc.push($(element).attr('src'))
        })
        if (imgSrc.length === 0) {
            return { data: '🚩 No se encontraron imágenes en el enlace proporcionado.*' }
        }
        return { data: imgSrc }
    } catch (error) {
        console.lo (error);
        return { data: '🚩 No se obtuvo respuesta de la página, intenta más tarde.'}
    }
}*/

import fetch from 'node-fetch'
import axios from 'axios'
import cheerio from 'cheerio'

var handler = async (m, { conn, args }) => {
    if (!args[0]) return m.reply(`*${xdownload} Por favor, ingresa la URL de TikTok.*`);
    if (!args[0].match(/(https?:\/\/)?(www\.)?(vm\.|vt\.)?tiktok\.com\//)) {
        return m.reply(`*⚠️ El enlace ingresado no es válido. Asegúrate de que sea un link de TikTok.*`);
    }

    await m.react('⏳');

    try {
        const url = args[0];
        const videoData = await tiktokdl(url);

        if (videoData && videoData.data && (videoData.data.play || videoData.data.wmplay)) {
            const { play, wmplay, title } = videoData.data;
            const videoURL = play || wmplay;
            const info = `\`\`\`◜ TikTok - Video ◞\`\`\`\n\n*📖 Descripción:*\n> ${title || 'Sin descripción'}`;

            await conn.sendFile(m.chat, videoURL, "tiktok.mp4", info, m);
            await m.react('✅');
        } else {
            // Si no hay video, intentar como imagen
            const imgData = await ttimg(url);
            if (Array.isArray(imgData.data) && imgData.data.length > 0) {
                await m.reply('*🖼 Publicación detectada como imagen, enviando...*');
                for (let img of imgData.data) {
                    await conn.sendMessage(m.chat, { image: { url: img } }, { quoted: m });
                }
                await m.react('✅');
            } else {
                throw new Error(typeof imgData.data === 'string' ? imgData.data : '❌ No se pudo obtener contenido.');
            }
        }

    } catch (error) {
        console.error(error);
        await conn.reply(m.chat, `*❌ Error:* ${error.message || error}`, m);
        await m.react('❌');
    }
};

handler.help = ['tiktok <url>'];
handler.tags = ['descargas'];
handler.command = /^(tt|tiktok|tk)$/i;
export default handler;

// ─────────────────────────────────────────────

async function tiktokdl(url) {
    const api = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`;
    const res = await fetch(api);
    return await res.json();
}

async function ttimg(link) {
    try {
        let url = `https://dlpanda.com/es?url=${link}&token=G7eRpMaa`;
        let response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        let imgSrc = [];
        $('div.col-md-12 > img').each((i, el) => imgSrc.push($(el).attr('src')));
        if (imgSrc.length === 0) return { data: '🚩 No se encontraron imágenes en el enlace proporcionado.' };
        return { data: imgSrc };
    } catch (error) {
        console.error(error);
        return { data: '🚩 No se obtuvo respuesta de la página, intenta más tarde.' };
    }
}