import { webp2png } from '../lib/webp2mp4.js';

const handler = async (m, { conn, usedPrefix, command }) => {
  try {
    if (!m.quoted) throw `*☕ Responde a un sticker con el comando ${usedPrefix + command} para convertirlo en imagen.*`;

    const q = m.quoted;
    const mime = q.mimetype || '';

    if (!mime.includes('webp')) throw '*ℹ️ El archivo adjunto no es un sticker.*';

    const media = await q.download();
    if (!media) throw '```❌ No se pudo descargar el sticker```';

    const out = await webp2png(media).catch(() => null);
    if (!out || out.length === 0) throw '*ℹ️ Solo se pueden convertir stickers estáticos. Los stickers animados no son compatibles.*';

    await conn.sendFile(m.chat, out, 'sticker.png', '*Aquí tienes tu imagen!*', m);
  } catch (error) {
    m.reply(error);
  }
};

handler.help = ['toimg (reply)'];
handler.tags = ['sticker'];
handler.command = ['toimg', 'jpg', 'img'];

export default handler;