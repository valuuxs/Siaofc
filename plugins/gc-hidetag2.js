/*import {generateWAMessageFromContent} from '@whiskeysockets/baileys';
import * as fs from 'fs';
const handler = async (m, {conn, text, participants, isOwner, isAdmin}) => {
  try {
    const users = participants.map((u) => conn.decodeJid(u.id));
    const q = m.quoted ? m.quoted : m || m.text || m.sender;
    const c = m.quoted ? await m.getQuotedObj() : m.msg || m.text || m.sender;
    const msg = conn.cMod(m.chat, generateWAMessageFromContent(m.chat, {[m.quoted ? q.mtype : 'extendedTextMessage']: m.quoted ? c.message[q.mtype] : {text: '' || c}}, {quoted: fkontak, userJid: conn.user.id}), text || q.text, conn.user.jid, {mentions: users});
    await conn.relayMessage(m.chat, msg.message, {messageId: msg.key.id});
  } catch {

    const users = participants.map((u) => conn.decodeJid(u.id));
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    const isMedia = /image|video|sticker|audio/.test(mime);
    const more = String.fromCharCode(8206);
    const masss = more.repeat(850);
    const htextos = `${text ? text : '*¡Hola! 😸*'}`;
    if ((isMedia && quoted.mtype === 'imageMessage') && htextos) {
      var mediax = await quoted.download?.();
      conn.sendMessage(m.chat, {image: mediax, mentions: users, caption: htextos, mentions: users}, {quoted: fkontak});
    } else if ((isMedia && quoted.mtype === 'videoMessage') && htextos) {
      var mediax = await quoted.download?.();
      conn.sendMessage(m.chat, {video: mediax, mentions: users, mimetype: 'video/mp4', caption: htextos}, {quoted: fkontak});
    } else if ((isMedia && quoted.mtype === 'audioMessage') && htextos) {
      var mediax = await quoted.download?.();
      conn.sendMessage(m.chat, {audio: mediax, mentions: users, mimetype: 'audio/mpeg', fileName: `Hidetag.mp3`}, {quoted: fkontak});
    } else if ((isMedia && quoted.mtype === 'stickerMessage') && htextos) {
      var mediax = await quoted.download?.();
      conn.sendMessage(m.chat, {sticker: mediax, mentions: users}, {quoted: fkontak});
    } else {
      await conn.relayMessage(m.chat, {extendedTextMessage: {text: `${masss}\n${htextos}\n`, ...{contextInfo: {mentionedJid: users, externalAdReply: {thumbnail: imagen1, sourceUrl: 'https://chat.whatsapp.com/Caj518FwPjHLVmGn48GvhW'}}}}}, {});
    }
  }
};
handler.help = ['Aviso *<txt>*'];
handler.tags = ['gc'];
handler.command = /^(viso)$/i;
handler.customPrefix = /a|A/i;
handler.group = true;
handler.admin = false;
export default handler;*/

import { generateWAMessageFromContent } from '@whiskeysockets/baileys';
import * as fs from 'fs';

// Contacto personalizado con imagen y nombre
const fkontak = {
  key: {
    fromMe: false,
    participant: '0@s.whatsapp.net',
    remoteJid: 'status@broadcast'
  },
  message: {
    contactMessage: {
      displayName: 'Notificación del Admin',
      vcard: `
BEGIN:VCARD
VERSION:3.0
FN:Notificación del Admin
ORG:ShadowBot;
TEL;type=CELL;type=VOICE;waid=51999999999:+51 999 999 999
END:VCARD`,
      thumbnail: fs.readFileSync('./media/admin.jpg'), // Imagen personalizada
      jpegThumbnail: fs.readFileSync('./media/admin.jpg')
    }
  }
};

// Miniatura para el AdReply
const imagen1 = fs.readFileSync('./src/catalogo.jpg'); // Imagen de ejemplo para AdReply

const handler = async (m, { conn, text, participants }) => {
  const users = participants.map(u => conn.decodeJid(u.id));
  const quoted = m.quoted || m;
  const content = quoted.msg || quoted;
  const mime = content.mimetype || '';
  const isMedia = /image|video|sticker|audio/.test(mime);
  const htextos = text || '*¡Hola! 😸*';
  const invisible = String.fromCharCode(8206).repeat(850);

  try {
    const msgType = quoted ? quoted.mtype : 'extendedTextMessage';
    const msgContent = quoted
      ? await m.getQuotedObj().then(q => q.message[msgType])
      : { text: content.text || htextos };

    const msg = conn.cMod(
      m.chat,
      generateWAMessageFromContent(m.chat, { [msgType]: msgContent }, { quoted: fkontak, userJid: conn.user.id }),
      htextos,
      conn.user.jid,
      { mentions: users }
    );

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

  } catch {
    try {
      const media = await quoted.download?.();
      if (isMedia && quoted.mtype === 'imageMessage') {
        await conn.sendMessage(m.chat, { image: media, caption: htextos, mentions: users }, { quoted: fkontak });
      } else if (quoted.mtype === 'videoMessage') {
        await conn.sendMessage(m.chat, { video: media, caption: htextos, mimetype: 'video/mp4', mentions: users }, { quoted: fkontak });
      } else if (quoted.mtype === 'audioMessage') {
        await conn.sendMessage(m.chat, { audio: media, mimetype: 'audio/mpeg', fileName: 'Hidetag.mp3', mentions: users }, { quoted: fkontak });
      } else if (quoted.mtype === 'stickerMessage') {
        await conn.sendMessage(m.chat, { sticker: media, mentions: users }, { quoted: fkontak });
      } else {
        throw new Error('Not media');
      }
    } catch {
      await conn.relayMessage(m.chat, {
        extendedTextMessage: {
          text: `${invisible}\n${htextos}\n`,
          contextInfo: {
            mentionedJid: users,
            externalAdReply: {
              thumbnail: 'https://files.catbox.moe/rbwbyk.jpg',
              sourceUrl: 'https://chat.whatsapp.com/Caj518FwPjHLVmGn48GvhW',
              title: 'ShadowBot Notifica',
              body: 'Notificación global'
            }
          }
        }
      }, {});
    }
  }
};

handler.help = ['Aviso *<txt>*'];
handler.tags = ['gc'];
handler.command = /^(viso)$/i;
handler.customPrefix = /a|A/i;
handler.group = true;
handler.admin = false;

export default handler;

