import yts from 'yt-search';

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

export default handler;