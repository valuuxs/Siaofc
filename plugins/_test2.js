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

export default handler;*/


import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return m.reply(`☕ *Debes escribir un prompt para generar la imagen.*\n\n📌 *Ejemplo:* ${usedPrefix + command} anime girl with sword`);
  }

  let prompt = encodeURIComponent(args.join(' '));
  let url = `https://star-void-api.vercel.app/ai/pollinations?prompt=${prompt}`;

  try {
    m.react('🧠');
    await conn.sendMessage(m.chat, {
      image: { url },
      caption: `🧠 *Imagen generada con Pollinations AI*\n\n🔍 *Prompt:* ${args.join(' ')}`
    }, { quoted: m });
  } catch (e) {
    console.error(e);
    m.reply('❌ Ocurrió un error al generar la imagen. Intenta nuevamente.');
  }
};

handler.help = ['pollinations <texto>'];
handler.tags = ['ai', 'imagen'];
handler.command = ['pollinations', 'aiimg', 'imgai', 'generateimg'];
export default handler;