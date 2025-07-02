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


import fetch from 'node-fetch';

let handler = async(m, { conn, args, text }) => {

if (!text) return m.reply(`《★》Ingresa Un Link De YouTube\n> *Ejemplo:* https://youtube.com/shorts/ZisXJqH1jtw?si=0RZacIJU5zhoCmWh`);

m.react(rwait);

const response = await fetch(`https://api.neoxr.eu/api/youtube?url=${text}&type=video&quality=480p&apikey=GataDios`)
const json = await response.json()

await conn.sendMessage(m.chat, { video: { url: json.data.url }, mimetype: "video/mp4", caption: `${dev}`, }, { quoted: m })
m.react(done)
}

handler.command = ['ytmp4', 'ymp4']

export default handler;*/

const handler = async (m, { conn }) => {
  const canalJid = '120363318267632676@newsletter'; // 📨 JID del canal
  const q = m.quoted ? m.quoted : m;

  if (!q || !q.mtype) {
    return conn.reply(m.chat, '⚠️ Responde a una imagen, video o sticker que quieras enviar al canal.', m);
  }

  const type = q.mtype;

  if (!['imageMessage', 'videoMessage', 'stickerMessage'].includes(type)) {
    return conn.reply(m.chat, '⚠️ Solo se permiten imágenes, videos o stickers.', m);
  }

  try {
    const media = await q.download();
    if (!media) throw 'No se pudo descargar el archivo.';

    // Arma el mensaje según el tipo
    let content = {};
    if (type === 'imageMessage') {
      content = { image: media, caption: '📷 Imagen reenviada al canal.' };
    } else if (type === 'videoMessage') {
      content = { video: media, caption: '🎥 Video reenviado al canal.' };
    } else if (type === 'stickerMessage') {
      content = { sticker: media };
    }

    await conn.sendMessage(canalJid, content);

    return conn.reply(m.chat, '✅ Archivo enviado correctamente al canal.', m);
  } catch (e) {
    console.error(e);
    return conn.reply(m.chat, '❌ Ocurrió un error al enviar al canal.', m);
  }
};

handler.help = ['send2channel'];
handler.tags = ['tools'];
handler.command = ['send2channel', 'enviarcanal', 'reenviar'];
handler.group = false;
handler.admin = false;

export default handler;