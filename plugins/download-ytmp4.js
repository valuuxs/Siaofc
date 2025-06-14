import fetch from 'node-fetch'
import yts from 'yt-search'

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw m.reply(`✧ Ejemplo: ${usedPrefix}${command} Waguri Edit`);

  await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }});

  let results = await yts(text);
  let tes = results.videos[0];

  if (!tes) return m.reply(`✧ No se encontró ningún video con ese nombre.`);

  const apiUrl = `https://www.apis-anomaki.zone.id/downloader/ytv?url=${encodeURIComponent(tes.url)}`;

  try {
    const respuesta = await fetch(apiUrl);
    const keni = await respuesta.json();

    if (!keni.result || !keni.result.formats || !keni.result.formats.length)
      return m.reply('✧ No se pudo obtener el video desde la API.');

    const { url, qualityLabel, fps } = keni.result.formats[0];
    const { title } = keni.result;

    if (!url || !/^https?:\/\//.test(url)) 
      return m.reply('✧ Enlace del video no válido.');

    const caption = `
*╭┈┈┈ ๑💮 PLAY VIDEO 💮๑ ┈┈╮*

📌 *Titulo:* ${tes.title || 'No encontrado'}
⏱️ *Duración:* ${tes.duration || 'No encontrado'}
📥 *Calidad:* ${qualityLabel || 'No encontrado'}
🎞️ *FPS:* ${fps || 'No encontrado'}

🧾 Pedido de: @${m.sender.split('@')[0]}
${wm}
*╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╯*`.trim();

    await conn.sendMessage(m.chat, {
      video: { url: url },
      mimetype: "video/mp4",
      fileName: title + `.mp4`,
      caption,
      mentions: [m.sender]
    }, { quoted: m });

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }});

  } catch (error) {
    console.error(`Error: ${error.message}`);
    await conn.sendMessage(m.chat, { react: { text: '❎', key: m.key }})
    m.reply('✧ Ocurrió un error al intentar descargar el video.');
  }
};

handler.help = ['playvideo *<consulta>*'];
handler.tags = ['downloader'];
handler.command = /^(playvideo|playvid)$/i;
handler.register = true;
handler.disable = false;

export default handler;