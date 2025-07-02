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
  const canalJid = '120363318267632676@newsletter'; // 🔁 Reemplaza con tu canal real

  const q = m.quoted ? m.quoted : m;

  try {
    // 🛡️ Verifica si el bot es miembro del grupo/canal
    const groupMetadata = await conn.groupMetadata(canalJid);
    const isBotParticipant = groupMetadata.participants?.some(p => p.id === conn.user.jid);

    if (!isBotParticipant) {
      return conn.reply(m.chat, '❌ No puedo enviar al canal porque no soy miembro o no tengo permisos.', m);
    }

    if (!q) {
      return conn.reply(m.chat, '⚠️ Responde al mensaje que deseas publicar en el canal.', m);
    }

    // 📤 Reenviar mensaje al canal
    await conn.forwardMessage(canalJid, q);

    // ✅ Confirmación al usuario
    await conn.reply(m.chat, '✅ Publicado correctamente en el canal.', m);

  } catch (e) {
    console.error('[publicar -> canal]', e);
    return conn.reply(m.chat, '❌ Ocurrió un error al intentar publicar en el canal.', m);
  }
};

handler.help = ['publicar'];
handler.command = ['publicar'];
handler.group = false;

export default handler;