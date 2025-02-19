const handler = async (m, { conn, text }) => {
  if (!text) {
    return conn.reply(m.chat, '🔥 Por favor ingresa un texto.', m);
  }

  const body = `SELECCIONA UNA OPCIÓN`;

  const templateButtons = [
    { index: 1, quickReplyButton: { displayText: 'Tocar1', id: '.tocar1' } },
    { index: 2, quickReplyButton: { displayText: 'Tocar2', id: '.tocar2' } },
  ];

  const buttonMessage = {
    text: body,
    footer: 'Opciones disponibles',
    templateButtons: templateButtons,
    headerType: 1,
  };

  await conn.sendMessage(m.chat, buttonMessage);
};

handler.command = ['tocar'];
export default handler;

// Manejadores de respuestas a los botones
const tocar1Handler = async (m, { conn }) => {
  await conn.reply(m.chat, 'Hola', m);
};
const tocar2Handler = async (m, { conn }) => {
  await conn.reply(m.chat, 'Bye', m);
};

tocar1Handler.command = ['tocar1'];
tocar2Handler.command = ['tocar2'];

export { tocar1Handler, tocar2Handler };