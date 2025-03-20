
import { sticker } from '../lib/sticker.js';
import axios from 'axios';

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
    if (!text) return m.reply(`🌿 Ingresa Un Texto Para Realizar Tu Sticker\n> *Ejemplo:* ${usedPrefix + command} Shadow`);

    let apiUrl = `https://api.fgmods.xyz/api/maker/${command}?text=${encodeURIComponent(text)}&apikey=elrebelde21`;

    try {
        // Descarga la imagen desde la API
        let { data } = await axios.get(apiUrl, { responseType: 'arraybuffer' });

        // Convierte la imagen en sticker
        let stiker = await sticker(data, null, global.packname, global.author);

        // Envía el sticker
        await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, true, {
            contextInfo: {
                forwardingScore: 200,
                isForwarded: false,
                externalAdReply: {
                    showAdAttribution: false,
                    title: wm,
                    body: dev,
                    mediaType: 2,
                    sourceUrl: command === 'attp' ? channel : redes,
                    thumbnail: imagen1
                }
            }
        }, { quoted: m });
        
    } catch (error) {
        console.error(error);
        m.reply('❌ Ocurrió un error al generar el sticker. Inténtalo más tarde.');
    }
};

handler.command = handler.help = ['ttp', 'attp'];
handler.tags = ['sticker'];
export default handler;