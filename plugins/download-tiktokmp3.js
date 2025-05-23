import fetch from 'node-fetch';

let handler = async (m, { conn, args }) => {
  if (!args[0]) {
    return m.reply(`*${xdownload} Por favor, ingresa un link de TikTok.*`);
  }

  try {
    m.react('⌛');

    const apiUrl = `https://eliasar-yt-api.vercel.app/api/search/tiktok?query=${args[0]}`;
    const response = await fetch(apiUrl);
    
    if (!response.ok) throw new Error('No se pudo obtener información del video.');

    const json = await response.json();
    const res = json.results;

    if (!res || !res.audio) {
      throw new Error('No se encontró audio en el video proporcionado.');
    }

    const info = `*\`Autor:\`* ${res.author}\n*\`Título:\`* ${res.title}`;
    const audioUrl = res.audio;

    await conn.sendMessage(m.chat, {
      audio: { url: audioUrl },
      mimetype: 'audio/mpeg'
    }, { quoted: m });

    m.react('✅');
  } catch (e) {
    console.error(e);
    m.reply(`*❌ Ocurrió un error:* ${e.message || 'Error desconocido'}`);
    m.react('✖️');
  }
};

handler.command = ['tiktokmp3', 'ttmp3'];
export default handler;
