const handler = async (m, { conn }) => {
  const message = "👋 ¡Hola! ¿Qué deseas hacer?";
  
  const buttons = [
    { buttonId: '.saludo', buttonText: { displayText: '👋 Saludar' }, type: 1 },
    { buttonId: '.despedida', buttonText: { displayText: '👋 Despedirse' }, type: 1 },
    { buttonId: '.hora', buttonText: { displayText: '⏰ Saber la hora' }, type: 1 }
  ];

  const buttonMessage = {
    text: message,
    footer: 'Elige una opción:',
    buttons: buttons,
    headerType: 1
  };

  await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
};

handler.command = ['menuprueba'];
export default handler;

// Handlers de respuestas
const handlerSaludo = async (m, { conn }) => {
  await conn.sendMessage(m.chat, { text: "👋 ¡Hola! ¿Cómo estás?" }, { quoted: m });
};
const handlerDespedida = async (m, { conn }) => {
  await conn.sendMessage(m.chat, { text: "👋 ¡Adiós! Que tengas un buen día." }, { quoted: m });
};
const handlerHora = async (m, { conn }) => {
  const ahora = new Date().toLocaleTimeString('es-PE', { timeZone: 'America/Lima' });
  await conn.sendMessage(m.chat, { text: `⏰ La hora actual es: ${ahora}` }, { quoted: m });
};

// Registrar los comandos adicionales
handlerSaludo.command = ['saludo'];
handlerDespedida.command = ['despedida'];
handlerHora.command = ['hora'];

export { handlerSaludo, handlerDespedida, handlerHora };