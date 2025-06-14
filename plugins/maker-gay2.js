import uploadImage from '../lib/uploadImage.js';
import { sticker } from '../lib/sticker.js';

const effects = ['jail', 'gay', 'glass', 'wasted', 'triggered', 'lolice', 'simpcard', 'horny'];

const handler = async (m, { conn, usedPrefix, text }) => {
  const effect = text.trim().toLowerCase();
  if (!effects.includes(effect)) {
    throw `
*✳️ USO CORRECTO DEL COMANDO ✳️*
*👉 Use:* ${usedPrefix}stickermaker (efecto) 
- Y responda a una imagen
*✅ Ejemplo:* ${usedPrefix}stickermaker jail
*🧩 Lista de efectos disponibles:*
${effects.map((ef) => `_> ${ef}_`).join('\n')}
`.trim();
  }

  const q = m.quoted ? m.quoted : m;
  const mime = (q.msg || q).mimetype || '';
  if (!mime) throw '*_🔰 No se encontró la imagen_*\n\n*_✅ Responda a una imagen_*';
  if (!/image\/(jpe?g|png)/.test(mime)) throw `*_⚠️ Formato no admitido_*\n\n*_👉🏻 Responda a una imagen válida (jpg o png)_*`;

  const img = await q.download();
  const url = await uploadImage(img);
  const apiUrl = `https://some-random-api.com/canvas/${encodeURIComponent(effect)}?avatar=${encodeURIComponent(url)}`;

  try {
    const stiker = await sticker(null, apiUrl, global.packname, global.author);
    conn.sendFile(m.chat, stiker, null, { asSticker: true });
  } catch (e) {
    m.reply('*_⚠️ Ocurrió un error al hacer la conversión a sticker_*\n\n*_✳️ Enviando imagen en su lugar..._*');
    await conn.sendFile(m.chat, apiUrl, 'image.png', null, m);
  }
};

handler.help = ['stickmaker (efecto)'];
handler.tags = ['maker'];
handler.command = /^(stickmaker|stickermaker|stickermarker|cs)$/i;

export default handler;