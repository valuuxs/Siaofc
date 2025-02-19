const handler = async (m, { conn }) => {
  const audioUrl = 'https://files.catbox.moe/1itpj8.mp3'; // Nuevo enlace del audio

  // Indica que el bot está "grabando"
  await conn.sendPresenceUpdate('recording', m.chat);

  // Envía el audio como nota de voz
  await conn.sendMessage(m.chat, {
    audio: { url: audioUrl },
    ptt: true, // Se envía como nota de voz
    mimetype: 'audio/mpeg', // Cambiado a MP3
    fileName: 'audio.mp3'
  }, { quoted: m });
};

// Configurar el comando para que responda exactamente a "tio que rico"
handler.customPrefix = /^tio que rico$/i;
handler.command = true;

export default handler;