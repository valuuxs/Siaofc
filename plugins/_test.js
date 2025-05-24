import axios from 'axios';
import FormData from 'form-data';
import cheerio from 'cheerio';

async function subirImagen(imgBuffer) {
  try {
    const form = new FormData();
    form.append('file', imgBuffer, 'imagen.jpg');

    const res = await axios.post('https://upfilegh.alfiisyll.biz.id/upload', form, {
      headers: form.getHeaders()
    });

    const $ = cheerio.load(res.data);
    return $('#rawUrlLink').attr('href') || null;
  } catch (e) {
    console.error('[subirImagen] Error:', e.message);
    return null;
  }
}

export async function handler(m, { conn, usedPrefix, command }) {
  m.reply('⏳ Retocando tu imagen...');

  try {
    const q = m.quoted || m;
    const mime = (q.msg || q).mimetype || q.mediaType || '';

    if (!/^image\/(jpe?g|png)$/.test(mime))
      return m.reply(`Envía o etiqueta una imagen JPG/PNG con *${usedPrefix + command}*`);

    const imgBuffer = await q.download();
    const url = await subirImagen(imgBuffer);

    if (!url) return m.reply('No se pudo subir la imagen.');

    const { data: json } = await axios.get(`https://beta.anabot.my.id/api/ai/toEnhance`, {
      params: {
        imageUrl: url,
        apikey: 'freeApikey'
      }
    });

    if (json.status !== 200 || !json.data?.result)
      return m.reply('No se pudo mejorar la imagen. Intenta luego.');

    const { data: enhancedBuffer } = await axios.get(json.data.result, { responseType: 'arraybuffer' });

    await conn.sendMessage(m.chat, {
      image: enhancedBuffer,
      caption: '✨ Imagen Mejorada!',
      mimetype: 'image/png'
    }, { quoted: m });

  } catch (e) {
    console.error('[iahd] Error:', e.message);
    m.reply('Ocurrió un error al procesar la imagen.');
  }
}

handler.help = ['hd', 'remini', 'hdr'];
handler.tags = ['tools'];
handler.command = ['iahd'];