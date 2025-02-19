const handler = async (m, { conn, text, command }) => {
  if (command === 'tocar') {
    if (!text) {
      return conn.reply(m.chat, '🔥 Por favor ingresa un texto.', m);
    }

    const body = `SELECCIONA UNA OPCIÓN`;

    await conn.sendMessage(m.chat, {
      image: { url: 'https://files.catbox.moe/2mdbm7.jpg' },
      caption: body,
      footer: 'Prueba de botones',
      buttons: [
        {
          buttonId: '.tocar1',
          buttonText: { displayText: 'Tocar1' },
          type: 1
        },
        {
          buttonId: '.tocar2',
          buttonText: { displayText: 'Tocar2' },
          type: 1
        }
      ],
      viewOnce: true,
      headerType: 4,
    }, { quoted: m });
  } else if (command === 'tocar1') {
    await conn.reply(m.chat, 'Hola', m);
  } else if (command === 'tocar2') {
    await conn.reply(m.chat, 'Bye', m);
  }
};

handler.command = ['tocar', 'tocar1', 'tocar2'];

export default handler;