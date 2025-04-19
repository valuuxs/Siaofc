const fetch = require('node-fetch');

let handler = async (m, { conn }) => {
  try {
    const imageUrl = 'https://example.com/tuimagen.jpg'; // reemplaza con la URL real de tu imagen
    const res = await fetch(imageUrl);
    const buffer = await res.buffer();

    await conn.sendMessage(m.chat, {
      image: buffer,
      caption: 'Aquí tienes una imagen de prueba enviada con Shadow Bot!'
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, '❎ Hubo un error al enviar la imagen.', m);
  }
};

handler.command = /^testimg$/i;
export default handler;