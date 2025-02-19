/*import yts from 'yt-search';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    throw `*[❗] Nombre de la canción faltante. Por favor, ingrese el comando más el nombre/título de una canción.*\n\n*—◉ Ejemplo:*\n*${usedPrefix + command} Begin You*`;
  }

  try {
    const results = await yts(text);

    if (!results || results.all.length === 0) {
      throw '*[❗] No se encontraron resultados. Intenta con otro título.*';
    }

    const textoInfo = `*[❗] Puedes descargar el video que quieras de la siguiente forma:*
◉ ${usedPrefix}audio <número>
◉ ${usedPrefix}video <número> 

*—◉ Ejemplos:*
*◉ ${usedPrefix}audio 5*
*◉ ${usedPrefix}video 8*`;

    const teks = results.all
      .map((v, i) => {
        return `[${i + 1}] ${v.title}
↳ 🫐 *_Link :_* ${v.url}
↳ 🕒 *_Duración :_* ${v.timestamp}
↳ 📥 *_Subido :_* ${v.ago}
↳ 👁 *_Vistas :_* ${v.views}`;
      })
      .join('\n\n◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦\n\n');

    const thumbnail = results.all[0]?.thumbnail || null;

    if (thumbnail) {
      await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: textoInfo + '\n\n' + teks });
    } else {
      await conn.sendMessage(m.chat, { text: textoInfo + '\n\n' + teks });
    }
  } catch (err) {
    console.error('Error en la búsqueda de YouTube:', err);
    await m.reply('*[❗] Error al buscar la canción. Inténtalo nuevamente con otro título.*');
  }
};

handler.help = ['playlist *<texto>*'];
handler.tags = ['search'];
handler.command = /^(playlist|playlist2)$/i;

export default handler;*/

import yts from 'yt-search';
import ytdl from 'ytdl-core';
import fs from 'fs';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    throw `*[❗] Nombre de la canción faltante. Ingresa el comando más el nombre de la canción.*\n\n*Ejemplo:*\n*${usedPrefix + command} Begin You*`;
  }

  try {
    const results = await yts(text);

    if (!results || results.all.length === 0) {
      throw '*[❗] No se encontraron resultados. Intenta con otro título.*';
    }

    const video = results.all[0]; // Toma el primer resultado
    const audioStream = ytdl(video.url, { filter: 'audioonly' });

    const filePath = `./tmp/${Date.now()}.mp3`;
    const writeStream = fs.createWriteStream(filePath);

    audioStream.pipe(writeStream);

    writeStream.on('finish', async () => {
      await conn.sendMessage(m.chat, { 
        audio: fs.readFileSync(filePath), 
        mimetype: 'audio/mp4' 
      });
      fs.unlinkSync(filePath); // Elimina el archivo después de enviarlo
    });

  } catch (err) {
    console.error('Error al obtener audio de YouTube:', err);
    await m.reply('*[❗] Error al descargar el audio. Inténtalo de nuevo.*');
  }
};

handler.help = ['audio *<texto>*'];
handler.tags = ['downloader'];
handler.command = /^audio$/i;

export default handler;