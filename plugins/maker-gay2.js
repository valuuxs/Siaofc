import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix, isPrems }) => {
  try {
    await m.react('👑');

    // Validación previa
    if (typeof conn.sendLuffy !== 'function') throw new Error('❌ La función conn.sendLuffy no está definida.');
    if (!global.fkontak) throw new Error('❌ El objeto fkontak no está definido en el entorno global.');

    const taguser = '@' + m.sender.split('@')[0];
    const img = 'https://files.catbox.moe/9d4ria.jpg';
    const insta = 'https://instagram.com/dev.criss_vx';
    const shadow = 'Menú Owner';
    const txt = `Welcome to my developer menu, follow me on Instagram, thank you very much.`;

    const text = `
 ꡴ㅤ   ︵ᤢ⏜   ᷃ᩚ   ☕᪶     ᷃ᩚ ⏜ᤢ︵    ㅤ᪬
‎ ‎꒲꒲  *𝖧𐐫𝗅⍺*  ׅ ෫ׄ᷼͝${taguser}  ಒ
 ‎ ‎ ‎ ‎ ‎ ‎ ‎౨ৎ  ‎ ‎ ‎ ‎*𝖡𝗂𝖾𝗇𝗏𝖾𝗇𝗂𝖽𝗈* ‎ ‎  ‎ ‎✿̮    ׅ  𝖺𝗅   ୂ  
 ⿻    *𝖬𝖾𝗇𝗎*    ෨    *𝖮𝗐𝗇𝖾𝗋*    𑇙ᰍ

🌴 ⪧ *BotName:* Shadow Ultra
🖥️ ⪧ *Platform:* Linux
🚀 ⪧ *Type:* NodeJs
📚 ⪧ *Librería:* Baileys

෨   \`ᴏᴡɴᴇʀ ᴄᴏᴍᴍᴀɴᴅs\`    𓈒𓏸    ☁︎ 
𑂯 ׁ${usedPrefix}update
𑂯 ׁ${usedPrefix}leavegc
𑂯 ׁ${usedPrefix}blocklist
𑂯 ׁ${usedPrefix}grouplist
𑂯 ׁ${usedPrefix}restart
𑂯 ׁ${usedPrefix}join
𑂯 ׁ${usedPrefix}chetar
𑂯 ׁ${usedPrefix}banchat 
𑂯 ׁ${usedPrefix}unbanchat
𑂯 ׁ${usedPrefix}banuser
𑂯 ׁ${usedPrefix}unbanuser
𑂯 ׁ${usedPrefix}dsowner
𑂯 ׁ${usedPrefix}autoadmin 
`.trim();

    // Envío del mensaje personalizado con imagen y link
    await conn.sendLuffy(m.chat, txt, shadow, text, img, img, insta, fkontak);

  } catch (err) {
    console.error('[❌ ERROR EN menuowner]', err);
    let msg = '✖️ Ocurrió un error al ejecutar el comando.';
    if (err.message.includes('sendLuffy')) msg += '\n↳ La función especial de envío no está definida.';
    if (err.message.includes('fkontak')) msg += '\n↳ No se encontró el contacto de referencia (fkontak).';
    conn.reply(m.chat, msg, m);
  }
};

handler.command = /^(me)$/i;
handler.fail = null;

export default handler;