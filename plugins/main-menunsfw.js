import fetch from 'node-fetch';

const handler = async (m, {conn, usedPrefix, text, isPrems}) => {

  try {
    const img = './media/menus/Menu3.jpg';
    const more = String.fromCharCode(8206);
    const readMore = more.repeat(850);
    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];

    const str = `> 👋🏻 ¡Hola!, ${taguser}

Bienvenido al menu \`\`\`Caliente\`\`\` 🥵🔥
donde podrás disfrutar de los diversas descargas de contenido, gifs & fotos para que te la jales 😏

╭╼[ *DESCARGAS NSFW* ]
┃ ⓘ 𝐽𝑎𝑙𝑎𝑡𝑒 𝑙𝑎 𝑡𝑟𝑖𝑝𝑎 𝑓𝑎𝑠𝑡
┃📥➺ .xnxxdl
┃📥➺ .xvdl
┃📥➺ .phdl
╰━━━━━━⋆★⋆━━━━━━⬣

╭╼[ *BÚSQUEDAS NSFW*]
┃🔎➺ .xnxxsearch 
┃🔎➺ .xvsearch 
┃🔎➺ .phsearch
┃🔎➺ .r34
╰━━━━━━⋆★⋆━━━━━━⬣

╭╼[ *GIFS NSFW*]
┃🔥➺ .anal
┃🔥➺ .follar
┃🔥➺ .coger
┃🔥➺ .coger2
┃🔥➺ .penetrar
┃🔥➺ .sexo
┃🔥➺ .violar
┃🔥➺ .rusa
┃🔥➺ .sixnine
┃🔥➺ .pies
┃🔥➺ .mamada
┃🔥➺ .lickpussy
┃🔥➺ .grabboobs
┃🔥➺ .suckboobs
┃🔥➺ .cum
┃🔥➺ .fap
┃🔥➺ .manosear
┃🔥➺ .lesbianas
╰━━━━━━⋆★⋆━━━━━━⬣
`.trim();

    conn.sendMessage(m.chat, { image: { url: img }, caption: str, mentions: [m.sender] }, { quoted: fkontak });

await conn.sendMessage(m.chat, { react: { text: '🔥', key: m.key } });

  } catch {
    conn.reply(m.chat,'*[ ℹ️ ] Error al enviar el video.*\n\n${e}', m);
  }
};

handler.help = ['menunsfw']
handler.command = /^(menunsfw|comandosnsfw|menuhorny|hornymenu|labiblia|menu18|menu+18)$/i;
handler.fail = null;

export default handler;