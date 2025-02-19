/*import yts from 'yt-search';
import fetch from 'node-fetch';

const handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) {
  return conn.reply(m.chat, '🔥Por favor ingresa la música que deseas descargar.', m);
}

  const isVideo = /vid|2|mp4|v$/.test(command);
  const search = await yts(text);

  if (!search.all || search.all.length === 0) {
    throw "No se encontraron resultados para tu búsqueda.";
  }

  const videoInfo = search.all[0];
  const body = `「✦」ძᥱsᥴᥲrgᥲᥒძ᥆ *<${videoInfo.title}>*\n\n> ✦ ᥴᥲᥒᥲᥣ » *${videoInfo.author.name || 'Desconocido'}*\n*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*\n> ✰ ᥎іs𝗍ᥲs » *${videoInfo.views}*\n*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*\n> ⴵ ძᥙrᥲᥴі᥆ᥒ » *${videoInfo.timestamp}*\n*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*\n> ✐ ⍴ᥙᑲᥣіᥴᥲძ᥆ » *${videoInfo.ago}*\n*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*\n> 🜸 ᥣіᥒk » ${videoInfo.url}\n`;

  if (command === 'play' || command === 'play2' || command === 'playvid') {
    await conn.sendMessage(m.chat, {
      image: { url: videoInfo.thumbnail },
      caption: body,
      footer: dev,
      buttons: [
        {
          buttonId: `.yta ${videoInfo.url}`,
          buttonText: {
            displayText: 'ᯓᡣ𐭩 ᥲᥙძі᥆',
          },
        },
        {
          buttonId: `.ytv ${videoInfo.url}`,
          buttonText: {
            displayText: 'ᯓᡣ𐭩 ᥎іძᥱ᥆',
          },
        },
      ],
      viewOnce: true,
      headerType: 4,
    }, { quoted: m });
    m.react('🕒');

  } else if (command === 'yta' || command === 'ytmp3') {
    m.react(rwait);
    let audio;
    try {
      audio = await (await fetch(`https://api.alyachan.dev/api/youtube?url=${videoInfo.url}&type=mp3&apikey=Gata-Dios`)).json();
    } catch (error) {
      try {
        audio = await (await fetch(`https://delirius-apiofc.vercel.app/download/ytmp3?url=${videoInfo.url}`)).json();
      } catch (error) {
        audio = await (await fetch(`https://api.vreden.my.id/api/ytmp3?url=${videoInfo.url}`)).json();
      }
    }

    if (!audio.data || !audio.data.url) throw "No se pudo obtener el audio.";
    conn.sendFile(m.chat, audio.data.url, videoInfo.title, '', m, null, { mimetype: "audio/mpeg", asDocument: false });
    m.react('🍋');

  } else if (command === 'ytv' || command === 'ytmp4') {
    m.react('🎭');
    let video;
    try {
      video = await (await fetch(`https://api.alyachan.dev/api/youtube?url=${videoInfo.url}&type=mp4&apikey=Gata-Dios`)).json();
    } catch (error) {
      try {
        video = await (await fetch(`https://delirius-apiofc.vercel.app/download/ytmp4?url=${videoInfo.url}`)).json();
      } catch (error) {
        video = await (await fetch(`https://api.vreden.my.id/api/ytmp4?url=${videoInfo.url}`)).json();
      }
    }

    if (!video.data || !video.data.url) throw "No se pudo obtener el video.";
    await conn.sendMessage(m.chat, {
      video: { url: video.data.url },
      mimetype: "video/mp4",
      caption: ``,
    }, { quoted: m });
    m.react(done);

  } else {
    throw "Comando no reconocido.";
  }
};

handler.help = ['play', 'playvid', 'ytv', 'ytmp4', 'yta', 'play2', 'ytmp3'];
handler.command = ['play', 'playvid', 'ytv', 'ytmp4', 'yta', 'play2', 'ytmp3'];
handler.tags = ['dl'];
handler.register = true;

export default handler;

const getVideoId = (url) => {
  const regex = /(?:v=|\/)([0-9A-Za-z_-]{11})./;
  const match = url.match(regex);
  if (match) {
    return match[1];
  }
  throw new Error("Invalid YouTube URL");
};




const handler = async (m, { conn }) => {
  
  const audioUrl = 'https://files.catbox.moe/u9lir2.opus'; // Enlace del audio

  // Indica que el bot está "grabando"
  await conn.sendPresenceUpdate('recording', m.chat);

  // Envía el audio como nota de voz
  await conn.sendMessage(m.chat, {
    audio: { url: audioUrl },
    ptt: true, // Lo envía como nota de voz
    mimetype: 'audio/ogg; codecs=opus',
    fileName: 'audio.opus'
  }, { quoted: m });
};

// Configurar el comando para que responda a "A", "a" o "ª"
handler.customPrefix = /^(a|A|ª)$/i;
handler.command = new RegExp(); // Permite usar solo el prefijo sin más texto

export default handler;




import yts from 'yt-search';
import fetch from 'node-fetch';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, '🪙Por favor ingresa la música que deseas descargar.', m);
  }

  const search = await yts(text);
  if (!search.all || search.all.length === 0) {
    throw "No se encontraron resultados para tu búsqueda.";
  }

  const videoInfo = search.all[0];
  const body = `「✦」Descargando *<${videoInfo.title}>*\n\n> ✦ Canal » *${videoInfo.author.name || 'Desconocido'}*\n> ✰ Vistas » *${videoInfo.views}*\n> ⏳ Duración » *${videoInfo.timestamp}*\n> 📅 Publicado » *${videoInfo.ago}*\n> 🔗 Link » ${videoInfo.url}`;

  if (command === 'play' || command === 'play2' || command === 'playvid') {
    await conn.sendMessage(m.chat, {
      image: { url: videoInfo.thumbnail },
      caption: body,
      footer: "Descarga desde YouTube",
      buttons: [
        { buttonId: `.yta ${videoInfo.url}`, buttonText: { displayText: '🎵 Audio' } },
        { buttonId: `.ytv ${videoInfo.url}`, buttonText: { displayText: '🎥 Video' } },
      ],
      viewOnce: true,
      headerType: 4,
    }, { quoted: m });
    m.react('🕒');

  } else if (command === 'yta' || command === 'ytmp3') {
    m.react('🎶');
    const audioApis = [
      `https://api.alyachan.dev/api/youtube?url=${videoInfo.url}&type=mp3&apikey=Gata-Dios`,
      `https://delirius-apiofc.vercel.app/download/ytmp3?url=${videoInfo.url}`,
      `https://api.vreden.my.id/api/ytmp3?url=${videoInfo.url}`
    ];
    
    const audio = await fetchWithFallback(audioApis);
    conn.sendFile(m.chat, audio.data.url, videoInfo.title, '', m, null, { mimetype: "audio/mpeg", asDocument: false });
    m.react('✅');

  } else if (command === 'ytv' || command === 'ytmp4') {
    m.react('📹');
    const videoApis = [
      `https://api.alyachan.dev/api/youtube?url=${videoInfo.url}&type=mp4&apikey=Gata-Dios`,
      `https://delirius-apiofc.vercel.app/download/ytmp4?url=${videoInfo.url}`,
      `https://api.vreden.my.id/api/ytmp4?url=${videoInfo.url}`
    ];
    
    const video = await fetchWithFallback(videoApis);
    await conn.sendMessage(m.chat, {
      video: { url: video.data.url },
      mimetype: "video/mp4",
      caption: '',
    }, { quoted: m });
    m.react('✅');

  } else {
    throw "Comando no reconocido.";
  }
};

handler.help = ['play', 'playvid', 'ytv', 'ytmp4', 'yta', 'play2', 'ytmp3'];
handler.command = ['play', 'playvid', 'ytv', 'ytmp4', 'yta', 'play2', 'ytmp3'];
handler.tags = ['dl'];
handler.register = true;

export default handler;

// Función para obtener MP3 o MP4 desde múltiples APIs
const fetchWithFallback = async (urls) => {
  for (const url of urls) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.data && data.data.url) return data;
    } catch (error) {
      console.log(`Error con la API: ${url}`, error);
    }
  }
  throw "No se pudo obtener el archivo.";
};

// Función mejorada para obtener el ID del video
const getVideoId = (url) => {
  const regex = /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/|v\/))([^#&?]{11})/;
  const match = url.match(regex);
  if (match) return match[1];
  throw new Error("URL de YouTube inválida");
};*/