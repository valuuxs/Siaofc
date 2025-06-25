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

import stickerlys from './plugins/_stickerlys.js'; // ajusta la ruta si está en otra carpeta

const query = 'anime'; // Puedes cambiarlo por cualquier palabra clave

stickerlys(query)
  .then(result => {
    if (!result.status) {
      console.error('❌ Error:', result.message);
      return;
    }

    console.log(`✅ Resultados encontrados para: "${query}"\n`);

    for (const pack of result.data) {
      console.log(`📦 Nombre: ${pack.name}`);
      console.log(`👤 Autor: ${pack.author}`);
      console.log(`🧩 Stickers: ${pack.stickerCount}`);
      console.log(`🌐 URL: ${pack.url}`);
      console.log(`🖼️ Thumbnail: ${pack.thumbnailUrl}`);
      console.log('---');
    }
  })
  .catch(err => console.error('❌ Error inesperado:', err));