import uploadImage from '../lib/uploadImage.js';
import { sticker } from '../lib/sticker.js';

const effects = ['jail', 'gay', 'glass', 'wasted', 'triggered', 'lolice', 'simpcard', 'horny'];

const handler = async (m, { conn, usedPrefix, text }) => {
  const effect = text.trim().toLowerCase();

  if (!effects.includes(effect)) {
    throw `
*✳️ USO CORRECTO DEL COMANDO*
👉 *Usa:* ${usedPrefix}stickermaker (efecto) 
🔁 *Responde a una imagen JPG/PNG*

✅ *Ejemplo:* ${usedPrefix}stickermaker jail

📜 *Efectos disponibles:*
${effects.map(e => `- ${e}`).join('\n')}
`.trim();
  }

  const q = m.quoted ? m.quoted : m;
  const mime = (q.msg || q).mimetype || '';
  if (!mime || !/image\/(jpe?g|png)/.test(mime)) {
    throw '*⚠️ Responde a una imagen en formato JPG o PNG.*';
  }

  try {
    const img = await q.download();
    const uploadedUrl = await uploadImage(img);

    if (!uploadedUrl) throw '*❌ Error al subir la imagen.*';

    const apiUrl = global.API('https://some-random-api.com/canvas/', effect, {
      avatar: uploadedUrl,
    });

    // Opcional para depuración
    // await m.reply(`🌐 URL de la API:\n${apiUrl}`);

    try {
      const stiker = await sticker(null, apiUrl, global.packname, global.author);
      if (stiker) {
        return await conn.sendFile(m.chat, stiker, null, { asSticker: true }, m);
      } else {
        throw '*⚠️ No se pudo generar el sticker.*';
      }
    } catch (e) {
      await m.reply('*⚠️ No se pudo generar el sticker. Enviando la imagen como respuesta...*');
      return await conn.sendFile(m.chat, apiUrl, 'effect.png', null, m);
    }

  } catch (err) {
    console.error(err);
    throw '*❌ No se pudo generar ni sticker ni imagen. Intenta con otra imagen JPG o PNG.*';
  }
};

handler.help = ['stickermaker (efecto)'];
handler.tags = ['maker'];
handler.command = /^(stickmaker|stickermaker|stickermarker|cs)$/i;
export default handler;