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

const handler = async (m, { conn, args, usedPrefix, command }) => {
  const url = args[0];
  if (!url || !/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//.test(url)) {
    return await m.reply(`*❗ Uso incorrecto*\n\nEjemplo:\n${usedPrefix + command} https://youtube.com/watch?v=kLpH1nSLJSs`);
  }

  try {
    const api = `https://nirkyy-dev.hf.space/api/v1/youtube-audio-v2?url=${encodeURIComponent(url)}`;
    const res = await fetch(api);

    if (!res.ok) {
      throw `⚠️ Error ${res.status} al contactar la API.`;
    }

    const json = await res.json();

    if (!json.success || !json.data) {
      throw '⚠️ No se pudo obtener el audio. Asegúrate de que el enlace sea válido.';
    }

    const audioUrl = json.data;

    // Validar tamaño opcionalmente (WhatsApp permite hasta ~100 MB, pero se recomienda <16 MB para audio)
    const head = await fetch(audioUrl, { method: 'HEAD' });
    const contentLength = head.headers.get('content-length');
    if (contentLength && Number(contentLength) > 16000000) {
      throw '⚠️ El archivo de audio es muy grande para enviarlo por WhatsApp.';
    }

    await conn.sendMessage(m.chat, {
      audio: { url: audioUrl },
      mimetype: 'audio/mpeg',
      fileName: 'yt-audio.mp3',
      ptt: false
    }, { quoted: m });

  } catch (err) {
    console.error(err);
    await m.reply(typeof err === 'string' ? err : '❌ Error al convertir el video.\n\nVerifica el enlace o intenta más tarde.');
  }
};

handler.command = /^ytmp3v2$/i;
handler.help = ['ytmp3 <url>'];
handler.tags = ['downloader'];

export default handler;


