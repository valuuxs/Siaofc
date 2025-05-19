import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix, isPrems }) => {
  try {
    await m.react('👑');

    let img = 'https://files.catbox.moe/9t8o4o.jpg';
    let insta = 'https://instagram.com/dev.criss_vx';

    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];

    const text = `
꡴ㅤ   ︵ᤢ⏜   ᷃ᩚ   ☕᪶     ᷃ᩚ ⏜ᤢ︵    ㅤ᪬
‎ ‎꒲꒲  *𝖧𐐫𝗅⍺*  ׅ ෫ׄ᷼͝${taguser}  ಒ
 ‎ ‎ ‎ ‎ ‎ ‎ ‎౨ৎ  ‎ ‎ ‎ ‎*𝖡𝗂𝖾𝗇𝗏𝖾𝗇𝗂𝖽𝗈* ‎ ‎  ‎ ‎✿̮    ׅ  𝖺𝗅   ୂ  
 ⿻    *𝖬𝖾𝗇𝗎*    ෨    *𝖮𝗐𝗇𝖾𝗋*    𑇙ᰍ
`.trim();

    conn.sendMessage(m.chat, {
      text: text,
      contextInfo: {
        mentionedJid: conn.parseMention(text),
        isForwarded: true,
        forwardingScore: 999,
        externalAdReply: {
          title: `${await conn.getName(m.sender)}, Welcome to my developer menu, follow me on Instagram, thank you very much.`,
          body: dev,
          thumbnail: await (await fetch(img)).buffer(),
          sourceUrl: insta,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: fkontak });

  } catch (e) {
    conn.reply(m.chat, '✖️ Error en el comando. Inténtalo más tarde.', m);
  }
};

handler.command = /^(menuowner)$/i;
handler.fail = null;

export default handler;

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
