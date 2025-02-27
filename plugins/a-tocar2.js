const handler = async (m, { conn }) => {
  const message = "👋 ¡Hola! ¿Qué deseas hacer?";
  
  const buttons = [
    { buttonId: 'saludo', buttonText: { displayText: '👋 Saludar' }, type: 1 },
    { buttonId: 'despedida', buttonText: { displayText: '👋 Despedirse' }, type: 1 },
    { buttonId: 'hora', buttonText: { displayText: '⏰ Saber la hora' }, type: 1 }
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

// Evento para manejar los botones presionados
const buttonHandler = async (m, { conn }) => {
  const buttonId = m?.message?.interactiveResponseMessage?.buttonId;

  if (!buttonId) return;

  if (buttonId === 'saludo') {
    await conn.sendMessage(m.chat, { text: "👋 ¡Hola! ¿Cómo estás?" }, { quoted: m });
  } else if (buttonId === 'despedida') {
    await conn.sendMessage(m.chat, { text: "👋 ¡Adiós! Que tengas un buen día." }, { quoted: m });
  } else if (buttonId === 'hora') {
    const ahora = new Date().toLocaleTimeString('es-PE', { timeZone: 'America/Lima' });
    await conn.sendMessage(m.chat, { text: `⏰ La hora actual es: ${ahora}` }, { quoted: m });
  }
};

handler.customPrefix = /^(saludo|despedida|hora)$/;
handler.command = new RegExp;
export { buttonHandler };