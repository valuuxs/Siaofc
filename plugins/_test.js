/*import {webp2png} from '../lib/webp2mp4.js';
const handler = async (m, {conn, usedPrefix, command}) => {
  const notStickerMessage = `*[❗𝐈𝐍𝐅𝐎❗] 𝚁𝙴𝚂𝙿𝙾𝙽𝙳𝙰 𝙰𝙻 𝚂𝚃𝙸𝙲𝙺𝙴𝚁 𝚀𝚄𝙴 𝙳𝙴𝚂𝙴𝙴 𝙲𝙾𝙽𝚅𝙴𝚁𝚃𝙸𝚁 𝙴𝙽 𝙸𝙼𝙰𝙶𝙴𝙽 𝙲𝙾𝙽 𝙴𝙻 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 ${usedPrefix + command}*`;
  if (!m.quoted) throw notStickerMessage;
  const q = m.quoted || m;
  const mime = q.mediaType || '';
  if (!/sticker/.test(mime)) throw notStickerMessage;
  const media = await q.download();
  const out = await webp2png(media).catch((_) => null) || Buffer.alloc(0);
  await conn.sendFile(m.chat, out, 'error.png', null, m);
};
handler.help = ['toimg (reply)'];
handler.tags = ['sticker'];
handler.command = ['toimg', 'jpg', 'img'];
export default handler;*/

import { webp2png } from '../lib/webp2mp4.js';

const handler = async (m, { conn, usedPrefix, command }) => {
  try {
    if (!m.quoted) throw `*[ ℹ️ ] Responda a un sticker con el comando ${usedPrefix + command} para convertirlo en imagen.*`;

    const q = m.quoted;
    const mime = q.mimetype || '';

    if (!mime.includes('webp')) throw '*[❗𝐈𝐍𝐅𝐎❗] El archivo adjunto no es un sticker.*';

    const media = await q.download();
    if (!media) throw '*[❗𝐄𝐑𝐑𝐎𝐑❗] No se pudo descargar el sticker.*';

    const out = await webp2png(media).catch(() => null);
    if (!out || out.length === 0) throw '*[❗𝐄𝐑𝐑𝐎𝐑❗] No se pudo convertir el sticker en imagen.*';

    await conn.sendFile(m.chat, out, 'sticker.png', '*Aquí tienes tu imagen!*', m);
  } catch (error) {
    m.reply(error);
  }
};

handler.help = ['toimg (reply)'];
handler.tags = ['sticker'];
handler.command = ['toimg', 'jpg', 'img'];

export default handler;