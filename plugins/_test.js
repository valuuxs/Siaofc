import fetch from 'node-fetch';
import FormData from 'form-data';
import cheerio from 'cheerio';

async function alfixdRaw(fileBuffer) {
  try {
    const form = new FormData();
    form.append('file', fileBuffer, 'upload.jpg');

    const res = await fetch('https://upfilegh.alfiisyll.biz.id/upload', {
      method: 'POST',
      body: form,
      headers: form.getHeaders(),
    });

    if (!res.ok) throw new Error(`Error del servidor: ${res.status}`);

    const html = await res.text();
    const $ = cheerio.load(html);
    const rawUrl = $('#rawUrlLink').attr('href');

    if (!rawUrl) throw new Error('No se encontró el enlace de imagen sin procesar.');
    return rawUrl;
  } catch (err) {
    console.error('[alfixdRaw] Error:', err.message);
    return null;
  }
}

async function uploadImage(imageBuffer) {
  if (!Buffer.isBuffer(imageBuffer)) throw new Error('Búfer de imagen no válido.');
  return alfixdRaw(imageBuffer);
}

export async function handler(m, { conn, usedPrefix, command }) {
  m.reply('⏳ La IA está retocando tu imagen, por favor espere...');
  try {
    const q = m.quoted || m;
    const mime = (q.msg || q).mimetype || q.mediaType || '';

    if (!/^image\/(jpe?g|png)$/.test(mime)) {
      return m.reply(`Envía una imagen con el comando *${usedPrefix + command}* o etiqueta una imagen (solo JPG/PNG).`);
    }

    const img = await q.download();
    const rawUrl = await uploadImage(img);

    if (!rawUrl) return m.reply('Error al cargar la imagen. Intenta nuevamente.');

    const apiUrl = `https://beta.anabot.my.id/api/ai/toEnhance?imageUrl=${encodeURIComponent(rawUrl)}&apikey=freeApikey`;
    const res = await fetch(apiUrl);
    const json = await res.json();

    if (json.status !== 200 || !json.data?.result) {
      return m.reply('No se pudo mejorar la imagen. Intenta más tarde.');
    }

    const enhancedImg = await fetch(json.data.result);
    const buffer = await enhancedImg.buffer();

    await conn.sendMessage(m.chat, {
      image: buffer,
      caption: '✨ Imagen Mejorada!',
      mimetype: 'image/png'
    }, { quoted: m });

  } catch (err) {
    console.error('[Enhancer Handler] Error:', err);
    m.reply('Ocurrió un error al procesar la imagen.');
  }
}

handler.help = ['hd', 'remini', 'hdr'];
handler.tags = ['tools'];
//handler.premium = false;
//handler.limit = true;
handler.command = ['iahd'];