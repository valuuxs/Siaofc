import yts from 'yt-search';
import ytdl from 'ytdl-core';
import fs from 'fs';

let searchResults = {}; // Guarda los resultados por usuario

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    throw `*[❗] Ingresa el nombre de la canción.*\n\n*Ejemplo:*\n*${usedPrefix + command} Begin You*`;
  }

  try {
    const results = await yts(text);

    if (!results || results.all.length === 0) {
      throw '*[❗] No se encontraron resultados. Intenta con otro título.*';
    }

    // Guardamos los resultados en la variable global usando el ID del usuario
    searchResults[m.sender] = results.all.slice(0, 5); // Guarda los primeros 5 resultados

    // Creamos el mensaje con la lista de canciones
    let teks = `*[❗] Elige una canción con:*  *${usedPrefix}audio <número>*\n\n`;
    results.all.slice(0, 5).forEach((v, i) => {
      teks += `*[${i + 1}]* *${v.title}*\n`;
      teks += `↳ 🕒 *_Duración:_* ${v.timestamp}\n`;
      teks += `↳ 📥 *_Subido:_* ${v.ago}\n`;
      teks += `↳ 👁 *_Vistas:_* ${v.views}\n\n`;
    });

    // Enviar el mensaje correctamente según la versión de Baileys
    await conn.sendMessage(m.chat, { text: teks }, { quoted: m });

  } catch (err) {
    console.error('Error al buscar canciones:', err);
    await m.reply('*[❗] Error al buscar la canción. Inténtalo de nuevo.*');
  }
};

handler.help = ['playlist *<texto>*'];
handler.tags = ['search'];
handler.command = /^(playlist)$/i;

export default handler;

// ================== HANDLER PARA DESCARGAR LA CANCIÓN ==================

const downloadHandler = async (m, { conn, text, usedPrefix }) => {
  if (!text || isNaN(text)) {
    throw `*[❗] Debes escribir el número de la canción.*\n\n*Ejemplo:*\n*${usedPrefix}audio 2*`;
  }

  const index = parseInt(text) - 1;
  const userResults = searchResults[m.sender];

  if (!userResults || !userResults[index]) {
    throw '*[❗] No tienes una búsqueda activa o el número es inválido.*';
  }

  try {
    const video = userResults[index]; // Obtiene la canción elegida
    const audioStream = ytdl(video.url, { filter: 'audioonly' });

    const filePath = `./tmp/${Date.now()}.mp3`;
    const writeStream = fs.createWriteStream(filePath);

    audioStream.pipe(writeStream);

    writeStream.on('finish', async () => {
      await conn.sendMessage(m.chat, { 
        audio: fs.readFileSync(filePath), 
        mimetype: 'audio/mp4' 
      }, { quoted: m });
      fs.unlinkSync(filePath); // Elimina el archivo después de enviarlo
    });

  } catch (err) {
    console.error('Error al descargar audio:', err);
    await m.reply('*[❗] Error al descargar el audio. Inténtalo de nuevo.*');
  }
};

downloadHandler.help = ['audio *<número>*'];
downloadHandler.tags = ['downloader'];
downloadHandler.command = /^(audio)$/i;

export default downloadHandler;