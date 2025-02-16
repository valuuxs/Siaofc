import fetch from 'node-fetch';
import axios from 'axios';

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) return conn.reply(m.chat, `*[ ℹ️ ] Hace falta el título del audio de SoundCloud.*\n\n*[ 💡 ] Ejemplo:* ${usedPrefix + command} Floyymenor - Peligrosa`, m, rcanal);

  await m.react('🕒'); // Reacción inicial
  try {
    let api = await fetch(`https://apis-starlights-team.koyeb.app/starlight/soundcloud-search?text=${encodeURIComponent(text)}`);
    let json = await api.json();

    if (!json.length) return m.reply('*[ ❌ ] No se encontraron resultados en SoundCloud.*', null, rcanal);

    let { url, title } = json[0];

    let api2 = await fetch(`https://apis-starlights-team.koyeb.app/starlight/soundcloud?url=${url}`);
    let json2 = await api2.json();

    let { link: dl_url, quality, image } = json2;

    if (!dl_url) return m.reply('*[ ❌ ] No se pudo obtener el audio.*', null, rcanal);

    let audio = await getBuffer(dl_url);

    let txt = `> ${title}\n`;
    txt += `ㅤ  *⇄ㅤ     ◁   ㅤ  ❚❚ㅤ     ▷ㅤ     ↻*\n02:48 ━━━━◉───── 06:10`;

    await conn.sendFile(m.chat, image, 'thumbnail.jpg', txt, m, rcanal);
    await conn.sendMessage(m.chat, { audio: audio, fileName: `${title}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m });

    await m.react('🎵'); // Reacción final
  } catch (error) {
    console.error("Error en SoundCloud handler:", error.message);
    await m.react('❌');
    m.reply('*[ ❌ ] Hubo un problema al procesar la solicitud.*', null, rcanal);
  }
};

handler.help = ['splay *<txt>*'];
handler.tags = ['descargas'];
handler.command = ['soundclouds', 'splay'];

export default handler;

const getBuffer = async (url, options) => {
  try {
    const res = await axios({
      method: 'get',
      url,
      headers: {
        'DNT': 1,
        'Upgrade-Insecure-Requests': 1,
      },
      ...options,
      responseType: 'arraybuffer',
    });
    return res.data;
  } catch (e) {
    console.error("Error en getBuffer:", e.message);
    return null;
  }
};