import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix, isPrems }) => {
  try {
    await m.react('🔊');

    let img = 'https://files.catbox.moe/2xuz8m.jpg';
    let insta = 'https://instagram.com/dev.criss_vx';

    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];

    const text = `
︵᷼   MENÚ AUDIOS࣭
✿ *Hᴏʟᴀ ${taguser}*\n${saludo}

> ꒰꛱Este menú sigue siendo desarrollado por *Cristian Escobar*

↷✦; \`Audios\` ❞ ☕︵᷼ 
`.trim();

    conn.sendMessage(m.chat, {
      text: text,
      contextInfo: {
        mentionedJid: conn.parseMention(text),
        isForwarded: true,
        forwardingScore: 999,
        externalAdReply: {
          title: `${await conn.getName(m.sender)}, This is the Audios Menu. You can follow me on Instagram by clicking here`,
          body: dev,
          thumbnail: await (await fetch(img)).buffer(),
          sourceUrl: insta,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: fkontak });

  } catch (e) {
    conn.reply(m.chat, '❎ Error en el comando. Inténtalo más tarde.', m);
  }
};

handler.command = /^(menuaudios)$/i;
handler.fail = null;

export default handler;

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
