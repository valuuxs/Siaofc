const handler = async (m, { conn }) => {
  // Verifica si los audios están activados en el chat
  if (!db.data.chats[m.chat].audios) return;
  if (!db.data.settings[conn.user.jid].audios_bot && !m.isGroup) return;

  const audioUrl = 'https://files.catbox.moe/u9lir2.opus'; // Enlace del audio

  // Indica que el bot está "grabando"
  await conn.sendPresenceUpdate('recording', m.chat);

  // Envía el audio como nota de voz
  await conn.sendMessage(m.chat, {
    audio: { url: audioUrl },
    ptt: true, // Lo envía como nota de voz
    mimetype: 'audio/ogg; codecs=opus',
    fileName: 'audio.opus'
  }, { quoted: m });
};

// Configurar el comando para que responda a "A", "a" o "ª"
handler.customPrefix = /^(a|A|ª)$/i;
handler.command = new RegExp(); // Permite usar solo el prefijo sin más texto

export default handler;