/*
import { sticker } from '../lib/sticker.js'
import axios from 'axios'

let handler = async (m, { conn, usedPrefix, command, text }) => {
  const query = text || m.quoted?.text || m.quoted?.caption || m.quoted?.description
  if (!query) throw m.reply(`Ingresa el texto, Ejemplo:\n${usedPrefix + command} Hola mundo!`)
  m.react('🕐')

  try {
    let url = `https://api.nekorinn.my.id/maker/bratvid?text=${encodeURIComponent(query)}`
    let res = await axios.get(url, {
      responseType: 'arraybuffer',
      timeout: 10000
    })
    let contentType = res.headers['content-type']
    if (!contentType || !contentType.startsWith('video/')) throw m.reply('error en la API.')

   
    let bratSticker = await sticker(res.data, null, global.packname, global.author)
    
    
    await conn.sendFile(m.chat, bratSticker, null, { asSticker: true }, m)
    m.react('✅')
  } catch (err) {
    console.error(err)
    m.reply(`❌ Error: ${err.message}`)
  }
}

handler.help = ['bratvid <texto>']
handler.command = ['bratvid']
handler.tags = ['sticker']
handler.limit = false

export default handler
*/

import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { tmpdir } from 'os';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchSticker = async (text, attempt = 1) => {
    try {
        const response = await axios.get('https://api.nekorinn.my.id/maker/bratvid', {
            params: { text },
            responseType: 'arraybuffer',
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 429 && attempt <= 3) {
            const retryAfter = Number(error.response.headers['retry-after']) || 5;
            await delay(retryAfter * 1000);
            return fetchSticker(text, attempt + 1);
        }
        throw error;
    }
};

const handler = async (m, { text, conn }) => {
    if (!text) {
        return conn.reply(m.chat, '*🍪 Por favor, ingresa un texto para realizar tu sticker.*', m);
    }

    let outputFilePath;
    try {
        const buffer = await fetchSticker(text);
        outputFilePath = path.join(tmpdir(), `sticker-${Date.now()}.webp`);
        fs.writeFileSync(outputFilePath, buffer);

        await conn.sendMessage(m.chat, {
            sticker: { url: outputFilePath },
        }, { quoted: m });
    } catch (error) {
        console.error('Error en bratvid:', error?.response?.data || error);
        return conn.sendMessage(m.chat, {
            text: '*❌ Error en la API.*',
        }, { quoted: m });
    } finally {
        if (outputFilePath && fs.existsSync(outputFilePath)) {
            fs.unlinkSync(outputFilePath);
        }
    }
};

handler.command = ['bratvid'];
handler.tags = ['sticker'];
handler.help = ['bratvid <texto>'];

export default handler;