import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix, text }) => {

  try {
    await m.react('👑');
    const imageUrl = 'https://files.catbox.moe/qmhhxy.png'; // Cambié la URL al enlace de la imagen
    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];

    const str = `
🌐 *\`Menú Owner\`*
────────────────────────────
*🌴 Nombre:* MvrcoSexo
*☕ Creador:* MvrcoSex
*📚 Librería:* Baileys
*⏰ Uptime:* ${uptime}
*🚀 Type:* NodeJs
*🧇 Usuarios regs:* ${rtotalreg}
*🥞 Usuarios totales:* ${totalreg}
${readMore}
\`Lista de Comandos\`
𑂯 ׁ${xowner} ${usedPrefix}update
𑂯 ׁ${xowner} ${usedPrefix}leavegc
𑂯 ׁ${xowner} ${usedPrefix}blocklist
𑂯 ׁ${xowner} ${usedPrefix}grouplist
𑂯 ׁ${xowner} ${usedPrefix}restart
𑂯 ׁ${xowner} ${usedPrefix}join
𑂯 ׁ${xowner} ${usedPrefix}chetar
𑂯 ׁ${xowner} ${usedPrefix}banchat 
𑂯 ׁ${xowner} ${usedPrefix}unbanchat
𑂯 ׁ${xowner} ${usedPrefix}banuser
𑂯 ׁ${xowner} ${usedPrefix}unbanuser
𑂯 ׁ${xowner} ${usedPrefix}dsowner
𑂯 ׁ${xowner} ${usedPrefix}autoadmin 
> ${club}
`.trim();

    await conn.sendMessage(m.chat, {
      image: { url: imageUrl },  // Cambié "video" por "image"
      caption: str,
      mentions: [m.sender],
    }, { quoted: fkontak });

  } catch (e) {
    conn.reply(m.chat, `*❌ Error al enviar el menú.*\n${e}`, m);
  }
};

handler.command = /^(menuowner)$/i;
handler.fail = null;

export default handler;
