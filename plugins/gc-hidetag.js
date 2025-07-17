import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

let handler = async (m, { conn, text, participants }) => {
  try {
    // Obtener los usuarios mencionados
    let users = participants.map(u => conn.decodeJid(u.id));

    // Si el mensaje tiene algún archivo citado (como una imagen, video, etc.)
    let quoted = m.quoted ? m.quoted : m;
    let mime = (quoted.msg || quoted).mimetype || '';
    let isMedia = /image|video|sticker|audio/.test(mime);

    // Texto de respuesta
    const htextos = text || '*¡Hola! 😸*'; // Texto predeterminado

    // Si es una imagen citada
    if (isMedia && quoted.mtype === 'imageMessage') {
      var mediax = await quoted.download?.(); // Descargar la imagen
      conn.sendMessage(m.chat, {
        image: mediax,
        mentions: users,
        caption: htextos, // El texto que acompaña la imagen
        mentions: users
      }, { quoted: m });

    }
    // Si es un video citado
    else if (isMedia && quoted.mtype === 'videoMessage') {
      var mediax = await quoted.download?.(); // Descargar el video
      conn.sendMessage(m.chat, {
        video: mediax,
        mentions: users,
        mimetype: 'video/mp4',
        caption: htextos
      }, { quoted: m });

    }
    // Si es un audio citado
    else if (isMedia && quoted.mtype === 'audioMessage') {
      var mediax = await quoted.download?.(); // Descargar el audio
      conn.sendMessage(m.chat, {
        audio: mediax,
        mentions: users,
        mimetype: 'audio/mpeg',
        fileName: `Hidetag.mp3`
      }, { quoted: m });

    }
    // Si es un sticker citado
    else if (isMedia && quoted.mtype === 'stickerMessage') {
      var mediax = await quoted.download?.(); // Descargar el sticker
      conn.sendMessage(m.chat, {
        sticker: mediax,
        mentions: users
      }, { quoted: m });

    }
    // Si no hay archivo, solo enviamos un texto con la imagen
    else {
      const more = String.fromCharCode(8206);
      const masss = more.repeat(850); // Espacios invisibles para evitar que se corte el mensaje largo

      // La URL de la imagen externa
      const imagen1 = 'https://example.com/your-image.jpg';

      // Enviamos el mensaje con texto y la imagen externa como miniatura
      await conn.relayMessage(m.chat, {
        extendedTextMessage: {
          text: `${masss}\n${htextos}\n`,
          contextInfo: {
            mentionedJid: users,
            externalAdReply: {
              thumbnailUrl: imagen1,
              sourceUrl: 'https://chat.whatsapp.com/HqhAoXS8TCcJIn0KrbJZKz'
            }
          }
        }
      }, {});
    }

  } catch (error) {
    console.error(error);
  }
};

handler.help = ['notify <txt>'];
handler.tags = ['gc'];
handler.command = /^(hidetag|notify|notificar|notifi|noti|n|hidet|aviso)$/i;
handler.group = true;
handler.admin = true;

export default handler;
