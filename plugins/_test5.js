import fetch from 'node-fetch';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    const insta = 'https://instagram.com/dev.criss_vx';
    const img = 'https://files.catbox.moe/xr2m6u.jpg'; // reemplaza con tu imagen
    const mensaje = `Hola @${m.sender.split('@')[0]}, gracias por usar *Shadow Bot*!\n\nSigue al Dev Criss en Instagram!`;

    await conn.sendMessage(m.chat, {
      text: mensaje,
      contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardingScore: 999,
        externalAdReply: {
          title: `${await conn.getName(m.sender)}, gracias por usar Shadow Bot`,
          body: 'Desarrollado por Dev Criss',
          thumbnail: await (await fetch(img)).buffer(),
          sourceUrl: insta,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });
    
  } catch (e) {
    console.error(e);
    conn.reply(m.chat, '❎ Ocurrió un error al enviar el mensaje.', m);
  }
};

handler.command = /^promo$/i;
handler.help = ['promo'];
handler.tags = ['info'];

export default handler;