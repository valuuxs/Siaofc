const handler = async (m, { conn, text, command }) => {
  if (!text) {
    return conn.reply(m.chat, '🔥 Por favor ingresa un texto.', m);
  }

  const body = `SELECCIONA UNA OPCIÓN`;

  await conn.sendMessage(m.chat, {
    text: body,
    footer: 'Opciones disponibles',
    buttons: [
      {
        buttonId: '.tocar1',
        buttonText: { displayText: 'Tocar1' },
        type: 1,
      },
      {
        buttonId: '.tocar2',
        buttonText: { displayText: 'Tocar2' },
        type: 1,
      },
    ],
    headerType: 1,
  }, { quoted: m });
};

handler.command = ['tocar'];
export default handler;

// Manejadores para los botones
const tocar1Handler = async (m, { conn }) => {
  await conn.reply(m.chat, 'Hola', m);
};
const tocar2Handler = async (m, { conn }) => {
  await conn.reply(m.chat, 'Bye', m);
};

tocar1Handler.command = ['tocar1'];
tocar2Handler.command = ['tocar2'];

export { tocar1Handler, tocar2Handler };