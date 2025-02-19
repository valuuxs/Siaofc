const handler = async (m, { conn }) => {
  /*if (!db.data.chats[m.chat].audios) return;
  if (!db.data.settings[conn.user.jid].audios_bot && !m.isGroup) return;
*/
  const vn = 'https://files.catbox.moe/u9lir2.opus'; // Enlace de tu audio Opus

  conn.sendPresenceUpdate('recording', m.chat);
  conn.sendMessage(m.chat, {
    audio: { url: vn },
    ptt: true, // Lo envía como nota de voz
    mimetype: 'audio/ogg; codecs=opus',
    fileName: 'audio.opus'
  }, { quoted: m });
};

// Comando que activará el audio
handler.customPrefix = /^(a|ª|A)$/; 
handler.command = new RegExp; 

export default handler;