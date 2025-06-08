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

/*

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

export default handler;*/

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`*📥 Ingresa un enlace de YouTube válido.*\n\n*📌 Ejemplo:*\n${usedPrefix + command} https://youtube.com/watch?v=gjdS0-46EL4`);
  }

  if (!text.match(/(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/\S+/gi)) {
    return m.reply('❌ El enlace proporcionado no parece ser válido de YouTube.');
  }

  try {
    const api = `https://star-void-api.vercel.app/download/youtube?url=${encodeURIComponent(text)}`;
    const res = await fetch(api);
    const json = await res.json();

    if (!json || !json.video || !json.audio) {
      return m.reply('⚠️ No se pudo obtener el video/audio. Puede que el enlace no sea compatible.');
    }

    const caption = `✅ *Descarga exitosa*\n\n📹 *Título:* ${json.title || 'Sin título'}\n📦 *Tamaño video:* ${json.video.size || 'N/A'}\n🎧 *Tamaño audio:* ${json.audio.size || 'N/A'}`;

    await conn.sendMessage(m.chat, {
      video: { url: json.video.url },
      caption
    }, { quoted: m });

    await conn.sendMessage(m.chat, {
      document: { url: json.audio.url },
      mimetype: 'audio/mpeg',
      fileName: `${json.title || 'audio'}.mp3`
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    m.reply('❌ Ocurrió un error al procesar el enlace. Intenta nuevamente.');
  }
};

handler.help = ['ytstar', 'ytstarvid'].map(c => c + ' <enlace>');
handler.tags = ['descargas', 'audio', 'video'];
handler.command = /^ytstar|ytstarvid$/i;

export default handler;