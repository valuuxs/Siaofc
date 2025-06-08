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



const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`*🌌 Ingresa un texto para generar una imagen.*\n\n*📌 Uso:*\n${usedPrefix + command} una galaxia sobre un castillo futurista`);
  }

  try {
    const url = `https://star-void-api.vercel.app/ai/pollinations?prompt=${encodeURIComponent(text)}`;
    const caption = `🧠 *Prompt:* ${text}\n🎨 *Imagen generada con IA*`;

    await conn.sendMessage(m.chat, {
      image: { url },
      caption
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    m.reply('❌ Ocurrió un error al generar la imagen. Intenta con otro prompt.');
  }
};

handler.help = ['polli', 'aiimg'].map(c => c + ' <texto>');
handler.tags = ['ia', 'herramientas'];
handler.command = /^polli|aiimg$/i;

export default handler;