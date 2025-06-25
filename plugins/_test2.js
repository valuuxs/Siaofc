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


import fetch from 'node-fetch';
import fs from 'fs';
import { fileTypeFromBuffer } from 'file-type';
import StickerLy from '../lib/stickerly.js';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const userSession = global.stickerlySessions ||= {};

  // Etapa 1: búsqueda de packs
  if (!text || isNaN(text)) {
    if (!text) return m.reply(`*🔍 Escribe una palabra clave para buscar stickers.*\n\nEjemplo:\n${usedPrefix + command} anime`);

    const stickerly = new StickerLy();
    const results = await stickerly.search(text);

    if (!results.length) return m.reply(`❌ No se encontraron resultados para: *${text}*`);

    userSession[m.sender] = results;

    const msg = results.slice(0, 5).map((p, i) => {
      return `*${i + 1}.* ${p.name}\n👤 ${p.author}\n🧩 ${p.stickerCount} stickers\n🔗 ${p.url}`;
    }).join('\n\n');

    return m.reply(`✅ *Resultados para:* ${text}\n\nResponde con el número del paquete para enviarlo:\n\n${msg}`);
  }

  // Etapa 2: envío del pack elegido
  const selectedIndex = parseInt(text) - 1;
  const userPacks = userSession[m.sender];

  if (!userPacks || !userPacks[selectedIndex]) return m.reply('❌ No tengo un resultado guardado. Primero busca un pack con una palabra clave.');

  const pack = userPacks[selectedIndex];
  const stickerly = new StickerLy();
  const details = await stickerly.detail(pack.url);

  m.reply(`📦 Enviando stickers del pack: *${details.name}* por *${details.author.name}*`);

  for (let i = 0; i < details.stickers.length; i++) {
    const sticker = details.stickers[i];
    const res = await fetch(sticker.imageUrl);
    const buffer = await res.buffer();
    const type = await fileTypeFromBuffer(buffer);
    if (!type) continue;

    // Enviar como sticker (solo si es imagen estática)
    if (!sticker.isAnimated && type.mime.startsWith('image/')) {
      await conn.sendFile(m.chat, buffer, 'sticker.webp', '', m, { asSticker: true });
      await new Promise(resolve => setTimeout(resolve, 700)); // delay para evitar flood
    }
  }

  delete userSession[m.sender];
};

handler.help = ['stickerly <texto>'];
handler.tags = ['sticker'];
handler.command = /^stickerly$/i;

export default handler;