const handler = async (m, { conn }) => {
  const audioUrl = 'https://files.catbox.moe/1itpj8.mp3'; // Enlace del nuevo audio

  // Verifica que el mensaje sea exactamente "tio que rico"
  if (!/^tio que rico$/i.test(m.text)) return;

  // Indica que el bot está "grabando"
  await conn.sendPresenceUpdate('recording', m.chat);

  // Envía el audio como mensaje de voz
  await conn.sendMessage(m.chat, {
    audio: { url: audioUrl },
    ptt: true, // Se envía como nota de voz
    mimetype: 'audio/mpeg', // Formato MP3
    fileName: 'tio_que_rico.mp3'
  }, { quoted: m });
};

export default handler;