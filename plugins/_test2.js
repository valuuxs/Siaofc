/*const handler = async (m, { conn, text }) => {
  if (!text) throw '*[❗] Ingresa el mensaje a enviar con la ubicación*';

  const mensaje = '[❗𝐋𝐈𝐕𝐄 𝐓𝐄𝐒𝐓❗]\n\n' + text + '\n\nEste es un test de liveLocationMessage';

  await conn.relayMessage(m.chat, {
    liveLocationMessage: {
      degreesLatitude: 35.685506276233525,
      degreesLongitude: 139.75270667105852,
      accuracyInMeters: 0,
      degreesClockwiseFromMagneticNorth: 2,
      caption: mensaje,
      sequenceNumber: 2,
      timeOffset: 3,
    },
  }, {}).catch(e => m.reply('*[⚠️] Error al enviar liveLocationMessage:* ' + e));

  m.reply('*[✅] Mensaje de ubicación en vivo enviado exitosamente.*');
};

handler.help = ['testlive <mensaje>'];
handler.tags = ['test'];
handler.command = /^testlive$/i;
handler.owner = true;


import fetch from 'node-fetch';

let handler = async(m, { conn, args, text }) => {

if (!text) return m.reply(`《★》Ingresa Un Link De YouTube\n> *Ejemplo:* https://youtube.com/shorts/ZisXJqH1jtw?si=0RZacIJU5zhoCmWh`);

m.react(rwait);

const response = await fetch(`https://api.neoxr.eu/api/youtube?url=${text}&type=video&quality=480p&apikey=GataDios`)
const json = await response.json()

await conn.sendMessage(m.chat, { video: { url: json.data.url }, mimetype: "video/mp4", caption: `${dev}`, }, { quoted: m })
m.react(done)
}

handler.command = ['ytmp4', 'ymp4']

export default handler;*/


import {generateWAMessageFromContent} from '@whiskeysockets/baileys';
import * as fs from 'fs';

const handler = async (m, {conn, text, participants, isOwner, isAdmin}) => {
  try {
    const users = participants.map((u) => conn.decodeJid(u.id));
    const q = m.quoted ? m.quoted : m || m.text || m.sender;
    const c = m.quoted ? await m.getQuotedObj() : m.msg || m.text || m.sender;
    const msg = conn.cMod(
      m.chat,
      generateWAMessageFromContent(
        m.chat,
        {[m.quoted ? q.mtype : 'extendedTextMessage']: m.quoted ? c.message[q.mtype] : {text: '' || c}},
        {quoted: m, userJid: conn.user.id}
      ),
      text || q.text,
      conn.user.jid,
      {mentions: users}
    );
    await conn.relayMessage(m.chat, msg.message, {messageId: msg.key.id});
  } catch {
    const users = participants.map((u) => conn.decodeJid(u.id));
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    const isMedia = /image|video|sticker|audio/.test(mime);
    const more = String.fromCharCode(8206);
    const masss = more.repeat(850);
    const htextos = `${text ? text : 'CHEE'}`; // Texto personalizado o vacío.

    if ((isMedia && quoted.mtype === 'imageMessage') && htextos) {
      var mediax = await quoted.download?.();
      conn.sendMessage(
        m.chat,
        {image: mediax, mentions: users, caption: htextos},
        {quoted: m}
      );
    } else if ((isMedia && quoted.mtype === 'videoMessage') && htextos) {
      var mediax = await quoted.download?.();
      conn.sendMessage(
        m.chat,
        {video: mediax, mentions: users, mimetype: 'video/mp4', caption: htextos},
        {quoted: m}
      );
    } else if ((isMedia && quoted.mtype === 'audioMessage') && htextos) {
      var mediax = await quoted.download?.();
      conn.sendMessage(
        m.chat,
        {audio: mediax, mentions: users, mimetype: 'audio/mpeg', fileName: `Hidetag.mp3`},
        {quoted: m}
      );
    } else if ((isMedia && quoted.mtype === 'stickerMessage') && htextos) {
      var mediax = await quoted.download?.();
      conn.sendMessage(
        m.chat,
        {sticker: mediax, mentions: users},
        {quoted: m}
      );
    } else {
      await conn.relayMessage(
        m.chat,
        {
          extendedTextMessage: {
            text: `${masss}\n${htextos}\n`,
            ...{
              contextInfo: {
                mentionedJid: users,
                externalAdReply: {
                  thumbnail: 'https://telegra.ph/file/03d1e7fc24e1a72c60714.jpg',
                  sourceUrl: global.canal
                }
              }
            }
          }
        },
        {}
      );
    }
  }
};

handler.help = ['hidetag'];
handler.tags = ['group'];
handler.command = /^(h)$/i;
handler.group = true;
handler.admin = true;

export default handler;
