import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix, isPrems }) => {
  try {
    await m.react('🎮');

    const _uptime = process.uptime() * 1000;
    const uptime = clockString(_uptime);
    const pp = 'https://files.catbox.moe/9d4ria.jpg';
    const img = await (await fetch(pp)).buffer()
    const shadow = `${date}`;
    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];
    const txt = `${await conn.getName(m.sender)}, Welcome to my game menu, follow me on Instagram, thank you very much.`;

    const text = `
> 👋🏻 ¡Hola!, ${taguser}

\`\`\`${date}||${hora}\`\`\`

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

  await conn.sendLuffy(m.chat, txt, shadow, text, img, img, ig, fkontak)

  } catch (e) {
    conn.reply(m.chat, '✖️ Error en el comando. Inténtalo más tarde.', m);
  }
};

handler.command = /^(menuff|menufreefire|ff|ffcomandos|comandosff|comandosfreefire|freefire|freefir|freefiri)$/i;
handler.fail = null;

export default handler;

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}