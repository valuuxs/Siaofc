import yts from 'yt-search';
import fs from 'fs';
import ytdl from 'ytdl-core';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*[❗] Escribe el nombre de la canción.*\n\nEjemplo:\n*${usedPrefix + command} Begin You*`;

  try {
    const results = await yts(text);
    if (!results || results.all.length === 0) throw '*[❗] No se encontraron resultados.*';

    let teks = `*[❗] Puedes descargar el video que quieras con:*\n\n`;
    teks += `◉ *${usedPrefix}audio <número>*\n`;
    teks += `◉ *${usedPrefix}video <número>*\n\n`;
    teks += `Ejemplo:\n*${usedPrefix}audio 2*\n*${usedPrefix}video 3*\n\n`;

    results.all.slice(0, 5).forEach((v, i) => {
      teks += `*[${i + 1}]* *${v.title}*\n`;
      teks += `🕒 *Duración:* ${v.timestamp}\n`;
      teks += `📅 *Subido:* ${v.ago}\n`;
      teks += `👁 *Vistas:* ${v.views}\n`;
      teks += `🔗 *Link:* ${v.url}\n\n`;
    });

    await conn.sendMessage(m.chat, { text: teks }, { quoted: m });

    global.videoList = { from: m.sender, urls: results.all.map(v => v.url) };
  } catch (err) {
    console.error('Error en la búsqueda:', err);
    await m.reply('*[❗] Error al buscar la canción, intenta con otro nombre.*');
  }
};

const downloadHandler = async (m, { conn, text, usedPrefix }) => {
  if (!text || isNaN(text) || parseInt(text) < 1) {
    throw `*[❗] Debes escribir un número válido.*\n\nEjemplo:\n*${usedPrefix}audio 2*`;
  }

  const index = parseInt(text) - 1;
  if (!global.videoList || global.videoList.from !== m.sender || !global.videoList.urls[index]) {
    throw '*[❗] No tienes una búsqueda activa o el número es inválido.*';
  }

  const videoUrl = global.videoList.urls[index];

  try {
    const tmpFolder = './tmp'; // ✅ Usando ./tmp/
    if (!fs.existsSync(tmpFolder)) {
      fs.mkdirSync(tmpFolder, { recursive: true }); // ✅ Crea la carpeta si no existe
    }

    const audioPath = `${tmpFolder}/audio_${m.sender}.mp3`;
    const stream = ytdl(videoUrl, { filter: 'audioonly' });

    const writeStream = fs.createWriteStream(audioPath);
    stream.pipe(writeStream);

    writeStream.on('finish', async () => {
      await conn.sendMessage(m.chat, {
        audio: fs.readFileSync(audioPath),
        mimetype: 'audio/mp4'
      }, { quoted: m });

      fs.unlinkSync(audioPath); // ✅ Borra el archivo después de enviarlo
    });
  } catch (err) {
    console.error('Error en la descarga:', err);
    await m.reply('*[❗] Hubo un error al procesar la descarga.*');
  }
};

handler.help = ['playlist <texto>'];
handler.tags = ['search'];
handler.command = /^(playlist)$/i;

downloadHandler.help = ['audio <número>'];
downloadHandler.tags = ['downloader'];
downloadHandler.command = /^(audio)$/i;

export { handler, downloadHandler };