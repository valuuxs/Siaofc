import { youtubedl } from '@bochilteam/scraper';

const handler = async (m, { conn, args }) => {
  if (!args[0]) return m.reply(`*❗ Ingresa una URL de un video de YouTube*`);

  const url = args[0];
  if (!url.match(/(youtu\.be|youtube\.com)/i)) {
    return m.reply('*⚠️ Ingresa un link válido de YouTube.*');
  }

  try {
    await m.react('🕒');
    const res = await youtubedl(url, {
      quality: '128kbps',
      type: 'audio'
    });

    const audio = res.audio?.url;
    const title = res.title || 'audio';
    const thumbnail = res.thumbnail || `https://i.ytimg.com/vi/${res.videoId}/maxresdefault.jpg`;

    if (!audio) {
      await m.react('✖️');
      return m.reply('*❌ No se pudo obtener el audio.*');
    }

    await conn.sendMessage(m.chat, {
      audio: { url: audio },
      mimetype: 'audio/mpeg',
      fileName: `${title}.mp3`
    }, { quoted: m });

    await m.react('✅');
  } catch (err) {
    await m.react('✖️');
    console.error(err);
    m.reply('*⚠️ La descarga ha fallado. Puede que el video esté bloqueado o muy pesado.*');
  }
};

handler.help = ['ytmp3 *<url>*'];
handler.command = ['ytes'];
handler.tags = ['descargas'];

export default handler;