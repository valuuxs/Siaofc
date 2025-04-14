/* 
Created by Crxstian Escobar 🌙
*/

const handler = async (m, {conn, usedPrefix, text}) => {
  if (isNaN(text) && !text.match(/@/g)) {
  } else if (isNaN(text)) {
    var number = text.split`@`[1];
  } else if (!isNaN(text)) {
    var number = text;
  }
  if (!text && !m.quoted) return conn.reply(m.chat, `*🍃 Menciona algún administrador que desea degradar.*`, m);
  if (number.length > 13 || (number.length < 11 && number.length > 0)) return conn.reply(m.chat, `*⚠️ El usuario ingresado es incorrecto.*`, m);
  try {
    if (text) {
      var user = number + '@s.whatsapp.net';
    } else if (m.quoted.sender) {
      var user = m.quoted.sender;
    } else if (m.mentionedJid) {
      var user = number + '@s.whatsapp.net';
    }
  } catch (e) {
  } finally {
    const groupMetadata = await conn.groupMetadata(m.chat);
    if (user === groupMetadata.owner) {
      return conn.reply(m.chat, `*🌵 No puedes degradar al Creador del Grupo!*`, m);
    }
    conn.groupParticipantsUpdate(m.chat, [user], 'demote');
    conn.reply(m.chat, `*🌵 El usuario fue degradado.*`, m);
  }
};

handler.help = ['*<@tag>*'].map((v) => 'demote ' + v);
handler.tags = ['gc'];
handler.command = /^(demote|quitarpoder|quitaradmin|quitarpija|degradar)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
handler.fail = null;
export default handler;