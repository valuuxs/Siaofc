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
handler.command = ['ig', 'instagram'];
handler.tags = ['download'];

export default handler;

/*

import axios from 'axios';

let handler = async (m, { conn, usedPrefix, args, command, text }) => {
    if (!args[0]) {

        return conn.reply(m.chat, `*${xdownload} Por favor, ingresa un link de Instagram.*`, m);
    }

    const igUrlRegex = /^https?:\/\/www\.instagram\.com\/([a-zA-Z0-9_-]+)\/.*$/;
    if (!igUrlRegex.test(args[0])) {
        await m.react('✖️');
        return conn.reply(m.chat, `*⚠️ El link de Instagram no es correcto*`, m);
    }

    try {
        await m.react('⏳');
        const response = await axios.get(
            `https://restapi-v2.simplebot.my.id/download/instagram?url=${encodeURIComponent(args[0])}`
        );

        const data = response.data;
        if (!data.status || !data.result || !data.result.downloadUrls) throw new Error('Respuesta inválida de la API');

        const { title, downloadUrls } = data.result;
        const sentUrls = new Set();

        for (let url of downloadUrls) {
            if (sentUrls.has(url)) continue;
            sentUrls.add(url);

            const isImage = /\.(jpe?g|png|webp|heic|tiff|bmp)(\?|$)/i.test(url);
            const caption = `\`\`\`◜Instagram - Download◞\`\`\`\n\n*🌴 \`Título:\`* ${title}*`;
            if (isImage) {
                await conn.sendMessage(
                    m.chat,
                    { image: { url }, caption },
                    { quoted: m }
                );
            } else {
                await conn.sendMessage(
                    m.chat,
                    { video: { url }, caption },
                    { quoted: m }
                );
            }
        }

        await m.react('✅');
    } catch (error) {
        console.error(error);
        await m.react('❌');
        return conn.reply(m.chat, `*❌ Error al descargar contenido de Instagram.*`, m);
    }
};

handler.help = ['ig <link>'];
handler.tags = ['dl'];
handler.command = /^(ig|igdl|instagram)$/i;

export default handler;*/
