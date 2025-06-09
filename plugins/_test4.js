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

let handler = async (m, { conn, args, command }) => {
    if (!args[0]) return await m.reply(`*🚩 Ingresa un enlace de TikTok.*`);
    const url = args[0].trim();

    if (!/^https?:\/\/(www\.)?(vt\.|vm\.|tiktok\.com)/i.test(url)) {
        return await m.reply(`*⚠️ Enlace inválido. Asegúrate de que sea un link de TikTok.*`);
    }

    await m.react('⏳');

    try {
        const video = await tiktokdl(url);
        const { play, wmplay, title } = video?.data || {};

        if (play || wmplay) {
            const videoURL = play || wmplay;
            const caption = `\`\`\`◜ TikTok - Video ◞\`\`\`\n\n*📖 Descripción:*\n> ${title || 'Sin descripción'}`;
            await conn.sendFile(m.chat, videoURL, 'tiktok.mp4', caption, m);
            await m.react('✅');
            return;
        }

    } catch (e) {
        console.log('[TT-Video] Error:', e);
    }

    // Si no funcionó como video, intenta como galería
    try {
        const imageResult = await ttimg(url);
        const images = imageResult?.data;

        if (Array.isArray(images) && images.length) {
            for (let img of images) {
                await conn.sendMessage(m.chat, { image: { url: img } }, { quoted: m });
            }
            await m.react('🖼️');
            return;
        } else {
            throw new Error(typeof images === 'string' ? images : 'No se encontraron imágenes.');
        }

    } catch (e) {
        console.log('[TT-IMG] Error:', e);
        await m.reply(`*❌ No se pudo obtener contenido del enlace.*\n\n${e.message || e}`);
        await m.react('❌');
    }
};

handler.help = ['tiktok *<url>*'];
handler.tags = ['descargas'];
handler.command = /^(tt|tiktok|tks)$/i;
export default handler;

// === Funciones auxiliares ===

async function tiktokdl(url) {
    const api = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`;
    const res = await fetch(api);
    if (!res.ok) throw new Error('Error al obtener video.');
    return await res.json();
}

async function ttimg(link) {
    try {
        const url = `https://dlpanda.com/es?url=${encodeURIComponent(link)}&token=G7eRpMaa`;
        const res = await axios.get(url);
        const $ = cheerio.load(res.data);
        const images = [];

        $('div.col-md-12 > img').each((_, el) => {
            const src = $(el).attr('src');
            if (src) images.push(src);
        });

        return images.length ? { data: images } : { data: '🚩 No se encontraron imágenes en el enlace.' };
    } catch (err) {
        return { data: '🚩 No se pudo obtener imágenes, intenta más tarde.' };
    }
}