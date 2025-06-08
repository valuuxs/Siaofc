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

// plugins/pollinations.js
import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args.length) {
    return m.reply(`⚠️ Usa un *prompt* para generar la imagen.\nEjemplo: *${usedPrefix + command} paisaje cyberpunk nocturno*`);
  }
  let prompt = encodeURIComponent(args.join(' '));
  let url = `https://star-void-api.vercel.app/ai/pollinations?prompt=${prompt}`;

  try {
    m.react && await m.react('🧠');
    let msg = await conn.sendMessage(m.chat, { image: { url }, caption: `🧠 *AI Image Generated*\n\n📝 *Prompt:* ${args.join(' ')}` }, { quoted: m });

    // Si quieres, puedes agregar botones:
    let buttons = [
      { buttonId: `${usedPrefix + command} ${args.join(' ')}`, buttonText: { displayText: 'Regenerar' }, type: 1 },
      { buttonId: 'menu', buttonText: { displayText: '📋 Menú' }, type: 1 }
    ];
    await conn.sendMessage(m.chat, { text: '¿Quieres otra?', footer: 'Shadow Ultra', buttons, headerType: 1 }, { quoted: msg });

  } catch (e) {
    console.error(e);
    m.reply('❌ Ocurrió un error generando la imagen. Intenta más tarde.');
  }
};

handler.help = ['pollinations <texto>'];
handler.tags = ['ai'];
handler.command = ['pollinations','aiimg','imgai','genimg'];

export default handler;