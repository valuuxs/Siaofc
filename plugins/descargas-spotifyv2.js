import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`🧇 Por favor, ingresa el enlace o nombre de una canción de Spotify.`);
  await m.react('🕒');
  
  const isSpotifyUrl = /https?:\/\/(open\.)?spotify\.com\/(track|album|playlist)\/[a-zA-Z0-9]+/.test(text);

  try {
    let res = await fetch(`https://api.nekorinn.my.id/downloader/spotifyplay?q=${encodeURIComponent(text)}`);
    if (!res.ok) throw new Error('Error al contactar con la API.');

    let json = await res.json();
    if (!json.result || !json.result.downloadUrl) {
      if (isSpotifyUrl) {
        throw new Error('El enlace de Spotify no es válido o no se pudo procesar.');
      } else {
        throw new Error('No se encontró la canción.');
      }
    }

    await conn.sendMessage(m.chat, { audio: { url: json.result.downloadUrl }, mimetype: 'audio/mpeg' }, { quoted: m });
    await m.react('✅');
  } catch (err) {
    console.error(err);
    await m.reply(`❌ ${err.message}`);
    await m.react('❌');
  }
}

handler.help = ['spotify *<texto>*']
handler.tags = ['descargas']
handler.command = ['testeo']

export default handler