import MessageType from '@whiskeysockets/baileys';
import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

let handler = async (m, { conn, text, participants }) => {
  let users = participants.map(u => conn.decodeJid(u.id));
  let q = m.quoted ? m.quoted : m;
  let c = m.quoted ? m.quoted : m.msg;
  let mime = (q.msg || q).mimetype || '';
  let isMedia = /image|video|sticker|audio/.test(mime);

  if (isMedia) {
    let media = await q.download?.();
    
    if (mime.includes('image')) {
      await conn.sendMessage(m.chat, { image: media, mentions: users, caption: text || '' }, { quoted: m });
    } else if (mime.includes('video')) {
      await conn.sendMessage(m.chat, { video: media, mentions: users, mimetype: 'video/mp4', caption: text || '' }, { quoted: m });
    } else if (mime.includes('audio')) {
      await conn.sendMessage(m.chat, { audio: media, mentions: users, mimetype: 'audio/mpeg', fileName: 'Hidetag.mp3' }, { quoted: m });
    } else if (mime.includes('sticker')) {
      await conn.sendMessage(m.chat, { sticker: media, mentions: users }, { quoted: m });
    }
  } else {
    const msg = conn.cMod(m.chat,
      generateWAMessageFromContent(m.chat, {
        [c.toJSON ? q.mtype : 'extendedTextMessage']: c.toJSON ? c.toJSON() : { text: text || c || '' }
      }, { userJid: conn.user.id }),
      text || q.text, conn.user.jid, { mentions: users }
    );
    
    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
  }
};

handler.help = ['notify <txt>'];
handler.tags = ['gc'];
handler.command = /^(hidetag3|notify3|notificar3|notifi3|noti3|n3|hidet3)$/i;
handler.group = true;
handler.admin = true;

export default handler;