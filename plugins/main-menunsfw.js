import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix, text, isPrems }) => {

  try {
    const img = './src/catalogo.jpg';
    const more = String.fromCharCode(8206);
    const readMore = more.repeat(850);
    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];

    const str = `
🌐 *Menú NSFW del Bot*
────────────────────────────
👤 *Usuario:* ${taguser}
🔰 *Rol:* ${role}
📈 *Nivel:* ${level} (${exp} XP)
💎 *Gemas:* ${diamantes}
⏱️ *Activo:* ${uptime}
👥 *Usuarios registrados:* ${rtotalreg}/${totalreg}
${readMore}

       *\`Buscadores\`*
╰➤ ׄ  ׄ⃟🪱˚ .xnxxsearch *texto*
╰➤ ׄ  ׄ⃟🪱˚ .xvsearch *texto*
╰➤ ׄ  ׄ⃟🪱˚ .phsearch *texto*
╰➤ ׄ  ׄ⃟🪱˚ .r34 *texto*

       *\`Descargas\`*
╰➤ ׄ  ׄ⃟🧋˚ .xnxxdl *ulr*
╰➤ ׄ  ׄ⃟🧋˚ .xvdl *url*
╰➤ ׄ  ׄ⃟🧋˚ .phdl *url*

       *\`Gifs\`* 🦪
╰➤ ׄ  ׄ⃟🦪˚ .follar *@tag*
╰➤ ׄ  ׄ⃟🦪˚ .coger *@tag*
╰➤ ׄ  ׄ⃟🦪˚ .coger2 *@tag*
╰➤ ׄ  ׄ⃟🦪˚ .penetrar *@tag*
╰➤ ׄ  ׄ⃟🦪˚ .anal *@tag*
╰➤ ׄ  ׄ⃟🦪˚ .sexo *@tag*
╰➤ ׄ  ׄ⃟🦪˚ .violar *@tag*
╰➤ ׄ  ׄ⃟🦪˚ .rusa *@tag*
╰➤ ׄ  ׄ⃟🦪˚ .sixnine *@tag*
╰➤ ׄ  ׄ⃟🦪˚ .pies *@tag*
╰➤ ׄ  ׄ⃟🦪˚ .mamada *@tag*
╰➤ ׄ  ׄ⃟🦪˚ .lickpussy *@tag*
╰➤ ׄ  ׄ⃟🦪˚ .grabboobs *@tag*
╰➤ ׄ  ׄ⃟🦪˚ .suckboobs *@tag*
╰➤ ׄ  ׄ⃟🦪˚ .cum *@tag*
╰➤ ׄ  ׄ⃟🦪˚ .fap *@tag*
╰➤ ׄ  ׄ⃟🦪˚ .manosear *@tag*
╰➤ ׄ  ׄ⃟🦪˚ .lesbianas *@tag*

       *\`Contenido\`* 🍒 
╰➤ ׄ  ׄ⃟🍒˚ .pack
╰➤ ׄ  ׄ⃟🍒˚ .pack2
╰➤ ׄ  ׄ⃟🍒˚ .pack3
╰➤ ׄ  ׄ⃟🍒˚ .videoxxx
╰➤ ׄ  ׄ⃟🍒˚ .videoxxx2
╰➤ ׄ  ׄ⃟🍒˚ .randomxxx
╰➤ ׄ  ׄ⃟🍒˚ .nsfwloli
╰➤ ׄ  ׄ⃟🍒˚ .nsfwfoot
╰➤ ׄ  ׄ⃟🍒˚ .nsfwass
╰➤ ׄ  ׄ⃟🍒˚ .nsfwbdsm
╰➤ ׄ  ׄ⃟🍒˚ .nsfwcum
╰➤ ׄ  ׄ⃟🍒˚ .nsfwero
╰➤ ׄ  ׄ⃟🍒˚ .nsfwfemdom
╰➤ ׄ  ׄ⃟🍒˚ .nsfwglass
╰➤ ׄ  ׄ⃟🍒˚ .nsfworgy
╰➤ ׄ  ׄ⃟🍒˚ .yuri
╰➤ ׄ  ׄ⃟🍒˚ .yuri2
╰➤ ׄ  ׄ⃟🍒˚ .yaoi
╰➤ ׄ  ׄ⃟🍒˚ .yaoi2
╰➤ ׄ  ׄ⃟🍒˚ .panties
╰➤ ׄ  ׄ⃟🍒˚ .tetas
╰➤ ׄ  ׄ⃟🍒˚ .booty
╰➤ ׄ  ׄ⃟🍒˚ .ecchi
╰➤ ׄ  ׄ⃟🍒˚ .furro
╰➤ ׄ  ׄ⃟🍒˚ .hentai
╰➤ ׄ  ׄ⃟🍒˚ .trapito
╰➤ ׄ  ׄ⃟🍒˚ .imagenlesbians
╰➤ ׄ  ׄ⃟🍒˚ .pene
╰➤ ׄ  ׄ⃟🍒˚ .porno
╰➤ ׄ  ׄ⃟🍒˚ .pechos

> Pᴏʀɴʜᴜʙ: @BʏKɪʟʟᴢN`.trim();

    conn.sendMessage(m.chat, { image: { url: img }, caption: str, mentions: [m.sender] }, { quoted: fkontak });

    await conn.sendMessage(m.chat, { react: { text: '🔥', key: m.key } });

  } catch {
    conn.reply(m.chat, '*[ ℹ️ ] Error al enviar el menú.*\n\n> ${e}', m);
  }
};

handler.help = ['menunsfw']
handler.command = /^(menunsfw|comandosnsfw|menuhorny|hornymenu|labiblia|menu18|menu+18|menucaliente|menuporno|pornomenu|menuxxx)$/i;
handler.fail = null;

export default handler;