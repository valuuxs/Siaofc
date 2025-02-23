import fetch from 'node-fetch';

const handler = async (m, {conn, usedPrefix, text, isPrems}) => {

  try {
    //const img = './media/menus/Menu2.jpg';
    const videoUrl = 'https://files.catbox.moe/7ha109.mp4' // URL fija del video
    const more = String.fromCharCode(8206);
    const readMore = more.repeat(850);
    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];

    const str = `> 👋🏻 ¡Hola!, ${taguser}

\`\`\`${fechaHora}\`\`\`

╭─• *MENÚ FREE FIRE*
│ 𝘉𝘪𝘦𝘯𝘷𝘦𝘯𝘪𝘥𝘰
│ 𝘚𝘶𝘮𝘦́𝘳𝘨𝘦𝘵𝘦 𝘦𝘯 𝘦𝘴𝘵𝘢
│ 𝘢𝘷𝘦𝘯𝘵𝘶𝘳𝘢 𝘥𝘦𝘭 𝘤𝘢𝘵𝘢́𝘭𝘰𝘨𝘰 
│ 𝘥𝘦 𝘧𝘳𝘦𝘦 𝘧𝘪𝘳𝘦.
╰─────────────•

╭╼[ *LISTAS DE VS INTERNOS*]
┃ ⓘ 𝐶𝑜𝑙𝑜𝑐𝑎 𝑙𝑎 ℎ𝑜𝑟𝑎 𝑦 𝑒𝑙 𝑝𝑎𝑖𝑠 𝑠𝑒𝑔𝑢𝑖𝑑𝑜
┃      𝑎𝑙𝑔𝑢𝑛𝑎 𝑚𝑜𝑑𝑎𝑙𝑖𝑑𝑎𝑑.
┃🍀➺ .inmasc4
┃🍀➺ .infem4
┃🍀➺ .inmixto4
┃🪻➺ .inmasc6
┃🪻➺ .infem6
┃🪻➺ .inmixto6
╰━━━━━━⋆★⋆━━━━━━⬣

╭╼[ *MAPAS DE FREE FIRE*]
┃🗼➺ .bermuda
┃🏝️➺ .purgatorio
┃🏜️➺ .kalahari
┃🏗️➺ .nexterra
┃🏞️➺ .alpes
╰━━━━━━⋆★⋆━━━━━━⬣

╭╼[ *ENCUESTA*]
┃⚙️➺ .encuesta
┃⚙️➺ .sala
╰━━━━━━⋆★⋆━━━━━━⬣
`.trim();
/*
    conn.sendMessage(m.chat, { image: { url: img }, caption: str, mentions: [m.sender] }, { quoted: fkontak });

await conn.sendMessage(m.chat, { react: { text: '🎮', key: m.key } });
*/

  } catch {
    conn.reply(m.chat,'╰⊱❌⊱ *_ERROR_* ⊱❌⊱╮\n\n*_EL MENÚ FF ESTÁ FALLANDO INTENTE DE NUEVO MÁS TARDE_*', m);
  }
};

handler.command = /^(menuff|comandosff)$/i;
handler.fail = null;

export default handler;

function clockString(ms) {
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(':');
}