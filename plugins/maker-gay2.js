import uploadImage from '../lib/uploadImage.js';
import { sticker } from '../lib/sticker.js';

const effects = ['jail', 'gay', 'glass', 'wasted', 'triggered', 'lolice', 'simpcard', 'horny'];

const handler = async (m, { conn, usedPrefix, text }) => {
  const effect = text.trim().toLowerCase();
  
  if (!effects.includes(effect)) {
    throw `
*_✳️ USO CORRECTO DEL COMANDO ✳️_*
*👉 Use:* ${usedPrefix}stickermaker (efecto) 
*_✅ Ejemplo:_* ${usedPrefix}stickermaker gay
*List Effects:*
${effects.map((e) => `_> ${e}_`).join('\n')}
`.trim();
  }

  const q = m.quoted ? m.quoted : m;
  const mime = (q.msg || q).mimetype || '';

  if (!mime) throw '*_🔰 No se encontró la imagen_*\n\n*_✅ Responda a una imagen JPG o PNG_*';
  if (!/image\/(jpe?g|png)/.test(mime)) {
    throw '*⚠️ Formato no admitido*\n\nSolo se aceptan imágenes JPG o PNG. No stickers ni formatos raros.';
  }

  try {
    const img = await q.download();
    const url = await uploadImage(img);
    const apiUrl = global.API('https://some-random-api.com/canvas/', encodeURIComponent(effect), {
      avatar: url,
    });

    const stiker = await sticker(null, apiUrl, global.packname, global.author);
    await conn.sendFile(m.chat, stiker, null, { asSticker: true });
  } catch (e) {
    console.error(e);
    await m.reply('*_⚠️ Ocurrió un error al generar el sticker._*\n\n*_🔄 Enviando como imagen en su lugar..._*');
    try {
      const img = await q.download();
      const url = await uploadImage(img);
      const apiUrl = global.API('https://some-random-api.com/canvas/', encodeURIComponent(effect), {
        avatar: url,
      });
      await conn.sendFile(m.chat, apiUrl, 'efecto.png', null, m);
    } catch (err) {
      console.error(err);
      m.reply('*❌ No se pudo generar ni sticker ni imagen. Intenta con otra imagen JPG o PNG.*');
    }
  }
};

handler.help = ['stickermaker (efecto)'];
handler.tags = ['maker'];
handler.command = /^(stickermaker|stickmaker|cs)$/i;
export default handler;