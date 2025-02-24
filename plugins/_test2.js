import fetch from "node-fetch";
import yts from "yt-search";

let handler = async (m, { conn, text }) => {
  if (!text) {
    return m.reply("*[ 📥 ] Ingresa el título o link de Youtube.*");
  }

  await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

  let ytres = await yts(text);
  let video = ytres.videos[0];

  if (!video) {
    return m.reply("*[ ⚠️ ] Video no encontrado*");
  }

  let { title, thumbnail, timestamp, views, ago, url } = video;

  let vistas = parseInt(views).toLocaleString("es-ES") + " vistas";

  let HS = `*\`YOUTUBE - DESCARGAS\`*

ᜊ *Duración:* ${timestamp}
ᜊ *Vistas:* ${vistas}
ᜊ *Subido:* ${ago}
ᜊ *Enlace:* ${url}

> *[ ℹ️ ]* sᥱ ᥱs𝗍ᥲ ᥱᥒ᥎іᥲᥒძ᥆ sᥙ ᥲᥙძі᥆, ᥱs⍴ᥱrᥱ ᥙᥒ m᥆mᥱᥒ𝗍᥆...`;

  let thumb = (await conn.getFile(thumbnail))?.data;

  let JT = {
    contextInfo: {
      externalAdReply: {
        title: title, body: "",
        mediaType: 1, previewType: 0,
        mediaUrl: url, sourceUrl: url,
        thumbnail: thumb, renderLargerThumbnail: true,
      }
    }
  };

  await conn.reply(m.chat, HS, m, JT);

  try {
    let api = await fetch(`https://api.vreden.web.id/api/ytplaymp3?query=${url}`);
    let json = await api.json();
    let { download } = json.result;

    await conn.sendMessage(m.chat, { audio: { url: download.url }, caption: ``, mimetype: "audio/mpeg" }, { quoted: m });

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

  } catch (error) {
    console.error(error);
    m.reply("*[ ❌ ] Ocurrió un error al intentar obtener el audio del video.*");

    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
  }
};

handler.command = /^(ytmp3)$/i;
handler.register = true

export default handler;