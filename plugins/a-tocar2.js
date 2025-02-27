import { generateWAMessageFromContent, proto } from '@whiskeysockets/baileys';

const handler = async (m, { conn }) => {
  const buttons = [
    {
      buttonId: '.opcion1',
      buttonText: { displayText: '✅ Opción 1' },
      type: 1
    },
    {
      buttonId: '.opcion2',
      buttonText: { displayText: '📌 Opción 2' },
      type: 1
    },
    {
      buttonId: '.opcion3',
      buttonText: { displayText: '🎵 Opción 3' },
      type: 1
    }
  ];

  const buttonMessage = {
    text: "👋 ¡Hola! ¿Qué opción eliges?",
    footer: "Selecciona una opción:",
    buttons: buttons,
    headerType: 1
  };

  await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
};

handler.command = ['menuprueba'];
export default handler;