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

import yts from 'yt-search';
import fetch from 'node-fetch'; // Usar 'node-fetch' correctamente

const handler = async (m, { conn, args, text }) => {
  if (!args[0]) return m.reply('*⚠️ Ingresa una URL de un video o audio de YouTube.*');

  const url = args[0];
  const ytRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
  if (!ytRegex.test(url)) return m.reply('⚠️ Ingresa un enlace válido de YouTube.');

  try {
    await m.react('🕒');

    const res = await fetch(`https://nirkyy-dev.hf.space/api/v1/youtube-audio-v2?url=${encodeURIComponent(url)}`);
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

    const json = await res.json();
    if (!json.data) return m.reply('❌ No se pudo obtener el audio. Intenta con otro enlace.');

    const search = await yts(text || url);
    const vid = search.videos?.[0];

    const fileName = vid?.title ? `${vid.title}.mp3` : 'audio.mp3';

    await conn.sendMessage(m.chat, {
      audio: { url: json.data },
      mimetype: 'audio/mpeg',
      fileName
    }, { quoted: m });

    await m.react('✅');

  } catch (e) {
    console.error('[YTMP3 ERROR]', e);
    await m.react('✖️');
    m.reply('⚠️ La descarga ha fallado. Es posible que el archivo sea muy pesado o que el enlace no sea válido.');
  }
};

handler.help = ['ytmp3 <url>'];
handler.command = ['ytmp32'];
handler.tags = ['descargas'];

export default handler;