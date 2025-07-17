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

    // Obtener la descripción de la cita si está disponible
    let description = quoted.text || htextos; // Si el archivo citado tiene un texto, se usa; de lo contrario, se usa htextos.

    // Si es un video citado
    if (isMedia && quoted.mtype === 'videoMessage') {
      var mediax = await quoted.download?.(); // Descargar el video
      conn.sendMessage(m.chat, {
        video: mediax, // Enviamos el video descargado
        mentions: users, // Mencionamos a los usuarios
        mimetype: 'video/mp4', // Tipo MIME para video
        caption: description // El texto o descripción que acompaña el video
      }, { quoted: m });

    }
    // Si es una imagen citada
    else if (isMedia && quoted.mtype === 'imageMessage') {
      var mediax = await quoted.download?.(); // Descargar la imagen
      conn.sendMessage(m.chat, {
        image: mediax, // Enviamos la imagen descargada
        mentions: users, // Mencionamos a los usuarios
        caption: description // El texto o descripción que acompaña la imagen
      }, { quoted: m });

    }
    // Si es un audio citado
    else if (isMedia && quoted.mtype === 'audioMessage') {
      var mediax = await quoted.download?.(); // Descargar el audio
      conn.sendMessage(m.chat, {
        audio: mediax, // Enviamos el audio descargado
        mentions: users, // Mencionamos a los usuarios
        mimetype: 'audio/mpeg', // Tipo MIME para audio
        fileName: `Hidetag.mp3` // Nombre del archivo de audio
      }, { quoted: m });

    }
    // Si es un sticker citado
    else if (isMedia && quoted.mtype === 'stickerMessage') {
      var mediax = await quoted.download?.(); // Descargar el sticker
      conn.sendMessage(m.chat, {
        sticker: mediax, // Enviamos el sticker descargado
        mentions: users // Mencionamos a los usuarios
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
          text: `${masss}\n${description}\n`,
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
