import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`🙀 Por favor, ingresa el enlace o nombre de una canción de Spotify.`);
  await m.react('🕒');
  
  const isSpotifyUrl = /https?:\/\/(open\.)?spotify\.com\/(track|album|playlist)\/[a-zA-Z0-9]+/.test(text);

  try {
    // Puedes cambiar de API o endpoint si quieres manejarlo distinto según sea enlace o texto
    let url = `https://api.nekorinn.my.id/downloader/spotifyplay?q=${encodeURIComponent(text)}`;
    
    let res = await fetch(url);
    if (!res.ok) throw new Error('Error al contactar con la API');

    let json = await res.json();
    if (!json.result || !json.result.downloadUrl) throw new Error('No se encontró la canción.');

    let caption = isSpotifyUrl ? '🎵 Enlace detectado. Aquí tienes tu descarga:' : '🎶 Búsqueda realizada. Aquí tienes la canción:';

    await conn.sendMessage(m.chat, { text: caption }, { quoted: m });
    await conn.sendMessage(m.chat, { audio: { url: json.result.downloadUrl }, mimetype: 'audio/mpeg' }, { quoted: m });
    await m.react('✅');
  } catch (err) {
    console.error(err);
    await m.reply('❌ Ocurrió un error al intentar descargar la canción. Asegúrate de que el nombre o enlace sea correcto.');
    await m.react('❌');
  }
}

handler.help = ['spotify *<texto>*']
handler.tags = ['descargas']
handler.command = ['spotifyx', 'spotifydlx', 'spdlx']

export default handler