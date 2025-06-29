import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, args }) => {
  try {
    if (!args || !args[0]) {
      return conn.reply(m.chat, `*${xdownload} Por favor, ingresa una URL válida de Instagram.*`, m);
    }

    if (!args[0].match(/(https:\/\/www.instagram.com)/gi)) {
      return conn.reply(m.chat, `*⚠️ Ingresa una URL válida.*`, m);
    }

    m.react('🕒');
    const old = new Date();

    const res = await fetch(`https://api.sylphy.xyz/download/instagram?url=${encodeURIComponent(args[0])}&apikey=Sylphiette's`);
    const json = await res.json();

    if (!json.status || !json.result?.dl) {
      return conn.reply(m.chat, `Error al obtener el video.\n\n${JSON.stringify(json, null, 2)}`, m);
    }

    const { caption, username, like, comment, isVideo, dl } = json.result;

    await conn.sendFile(m.chat, dl, 'instagram.mp4', 
`
\`\`\`◜Instagram - Download◞\`\`\`

👤 *@${username}*
> ${caption || 'Sin descripción'}`, m);

  } catch (e) {
    return conn.reply(m.chat, `Error: ${e.message}`, m);
  }
};

handler.help = ['instagram'];
handler.command = ['ig2', 'instagram2'];
handler.tags = ['download'];

export default handler;