/*const handler = async (m, { conn, text }) => {
  if (!text) throw '*[❗] Ingresa el mensaje a enviar con la ubicación*';

  const mensaje = '[❗𝐋𝐈𝐕𝐄 𝐓𝐄𝐒𝐓❗]\n\n' + text + '\n\nEste es un test de liveLocationMessage';

  await conn.relayMessage(m.chat, {
    liveLocationMessage: {
      degreesLatitude: 35.685506276233525,
      degreesLongitude: 139.75270667105852,
      accuracyInMeters: 0,
      degreesClockwiseFromMagneticNorth: 2,
      caption: mensaje,
      sequenceNumber: 2,
      timeOffset: 3,
    },
  }, {}).catch(e => m.reply('*[⚠️] Error al enviar liveLocationMessage:* ' + e));

  m.reply('*[✅] Mensaje de ubicación en vivo enviado exitosamente.*');
};

handler.help = ['testlive <mensaje>'];
handler.tags = ['test'];
handler.command = /^testlive$/i;
handler.owner = true;
*/

import stickerlys from './plugins/_stickerly.js'; // ajusta la ruta si está en otra carpeta

const handler = async (m, { text, conn, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`*✳️ Ejemplo de uso:*\n${usedPrefix + command} anime`);
  }

  const res = await stickerlys(text);

  if (!res.status || !res.data.length) {
    return m.reply(`❌ No se encontraron resultados para *${text}*.`);
  }

  const packs = res.data.slice(0, 10); // Limitar a los primeros 10 packs
  let txt = `*🔍 Resultados de Sticker.ly para:* "${text}"\n\n`;

  for (const pack of packs) {
    txt += `*📦 Nombre:* ${pack.name}\n`;
    txt += `👤 Autor: ${pack.author}\n`;
    txt += `🧩 Stickers: ${pack.stickerCount}\n`;
    txt += `🌐 URL: ${pack.url}\n`;
    txt += `🖼️ Thumbnail: ${pack.thumbnailUrl}\n`;
    txt += `──────────────\n`;
  }

  m.reply(txt.trim());
};

handler.command = /^stickerly$/i;
handler.help = ['stickerly <texto>'];
handler.tags = ['internet'];
handler.register = true;

export default handler;