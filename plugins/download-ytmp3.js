/*import axios from 'axios';
import crypto from 'crypto';

const savetube = {
  api: {
    base: "https://media.savetube.me/api",
    cdn: "/random-cdn",
    info: "/v2/info", 
    download: "/download"
  },
  headers: {
    'accept': '',
    'content-type': 'application/json',
    'origin': 'https://yt.savetube.me',
    'referer': 'https://yt.savetube.me/',
    'user-agent': 'Postify/1.0.0'
  },
  formats: ['mp3'],

  crypto: {
    hexToBuffer: (hexString) => {
      const matches = hexString.match(/.{1,2}/g);
      return Buffer.from(matches.join(''), 'hex');
    },

    decrypt: async (enc) => {
      const secretKey = 'C5D58EF67A7584E4A29F6C35BBC4EB12';
      const data = Buffer.from(enc, 'base64');
      const iv = data.slice(0, 16);
      const content = data.slice(16);
      const key = savetube.crypto.hexToBuffer(secretKey);

      const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
      let decrypted = decipher.update(content);
      decrypted = Buffer.concat([decrypted, decipher.final()]);

      return JSON.parse(decrypted.toString());
    }
  },

  isUrl: str => { 
    try { 
      new URL(str); 
      return true; 
    } catch (_) { 
      return false; 
    } 
  },

  youtube: url => {
    const patterns = [
      /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
      /youtu\.be\/([a-zA-Z0-9_-]{11})/
    ];
    for (let regex of patterns) {
      if (regex.test(url)) return url.match(regex)[1];
    }
    return null;
  },

  request: async (endpoint, data = {}, method = 'post') => {
    try {
      const { data: response } = await axios({
        method,
        url: `${endpoint.startsWith('http') ? '' : savetube.api.base}${endpoint}`,
        data: method === 'post' ? data : undefined,
        params: method === 'get' ? data : undefined,
        headers: savetube.headers
      });
      return { status: true, code: 200, data: response };
    } catch (error) {
      return {
        status: false,
        code: error.response?.status || 500,
        error: error.message
      };
    }
  },

  getCDN: async () => {
    const response = await savetube.request(savetube.api.cdn, {}, 'get');
    if (!response.status) return response;
    return { status: true, code: 200, data: response.data.cdn };
  },

  download: async (link) => {
    if (!link) return { status: false, code: 400, error: "Falta el enlace de YouTube." };
    if (!savetube.isUrl(link)) return { status: false, code: 400, error: "URL inválida de YouTube." };

    const id = savetube.youtube(link);
    if (!id) return { status: false, code: 400, error: "*No se pudo extraer el ID del video.*" };

    try {
      const cdnRes = await savetube.getCDN();
      if (!cdnRes.status) return cdnRes;
      const cdn = cdnRes.data;

      const infoRes = await savetube.request(`https://${cdn}${savetube.api.info}`, {
        url: `https://www.youtube.com/watch?v=${id}`
      });
      if (!infoRes.status) return infoRes;

      const decrypted = await savetube.crypto.decrypt(infoRes.data.data);

      const dl = await savetube.request(`https://${cdn}${savetube.api.download}`, {
        id: id,
        downloadType: 'audio',
        quality: '128',
        key: decrypted.key
      });

      return {
        status: true,
        code: 200,
        result: {
          title: decrypted.title || "Desconocido",
          type: 'audio',
          format: 'mp3',
          thumbnail: decrypted.thumbnail || `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
          download: dl.data.data.downloadUrl,
          id: id,
          key: decrypted.key,
          duration: decrypted.duration,
          quality: '128'
        }
      };

    } catch (error) {
      return { status: false, code: 500, error: error.message };
    }
  }
};

const handler = async (m, { conn, args }) => {
  if (!args[0]) return m.reply(`*${xdownload} Ingresa una URL de un video o audio de YouTube*`);

  let url = args[0];
  if (!savetube.isUrl(url)) return m.reply("*⚠️ Ingresa un link válido de YouTube.*");

  try {
    await m.react('🕒');
    let res = await savetube.download(url);
    if (!res.status) {
      await m.react('✖️');
      return m.reply(`*❌ Error:*` ${res.error}`);
    }

    const { title, download } = res.result;

    await conn.sendMessage(m.chat, { 
      audio: { url: download }, 
      mimetype: 'audio/mpeg', 
      fileName: `${title}.mp3` 
    }, { quoted: m });

    await m.react('✅');
  } catch (e) {
    await m.react('✖️');
    m.reply(`*⚠️ La descarga ah fallando, es posible que el archivo sea muy pesado.*`);
  }
};

handler.help = ['ytmp3 *<url>*'];
handler.command = ['ytmp3'];
handler.tags = ['descargas'];

export default handler;*/

import axios from 'axios';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchDownloadUrl = async (videoUrl) => {
  const apis = [
    'https://api.vreden.my.id/api/ytmp3?url=',
    'https://mahiru-shiina.vercel.app/download/ytmp3?url=',
    'https://api.siputzx.my.id/api/d/ytmp3?url='
  ];

  for (let api of apis) {
    try {
      const fullUrl = `${api}${encodeURIComponent(videoUrl)}`;
      const { data } = await axios.get(fullUrl, { timeout: 10000 });

      let result = data?.result || data?.data;

      const audioUrl = result?.download?.url || result?.dl_url || result?.download || result?.dl;
      const title = result?.metadata?.title || result?.title || "audio";

      if (audioUrl) {
        return {
          url: audioUrl.trim(),
          title
        };
      }
    } catch (error) {
      console.error(`Error con API: ${api}`, error.message);
      await wait(5000);
    }
  }

  return null;
};

const sendAudioWithRetry = async (conn, chat, audioUrl, videoTitle, maxRetries = 2) => {
  let attempt = 0;
  let thumbnailBuffer;
  try {
    const response = await axios.get('https://files.catbox.moe/l81ahk.jpg', { responseType: 'arraybuffer' });
    thumbnailBuffer = Buffer.from(response.data, 'binary');
  } catch (error) {
    console.error("Error al obtener thumbnail:", error.message);
  }

  while (attempt < maxRetries) {
    try {
      await conn.sendMessage(
        chat,
        {
          audio: { url: audioUrl },
          mimetype: 'audio/mpeg',
          contextInfo: {
            externalAdReply: {
              title: videoTitle,
              body: "Barboza",
              previewType: 'PHOTO',
              thumbnail: thumbnailBuffer,
              mediaType: 1,
              renderLargerThumbnail: false,
              showAdAttribution: true,
              sourceUrl: 'https://Ella.Nunca.Te-Amo.Pe'
            }
          }
        }
      );
      return;
    } catch (error) {
      console.error(`Error al enviar audio, intento ${attempt + 1}:`, error.message);
      if (attempt < maxRetries - 1) await wait(12000);
    }
    attempt++;
  }
};

let handler = async (m, { conn, text }) => {
  if (!text?.trim() || (!text.includes('youtube.com') && !text.includes('youtu.be'))) {
    await conn.sendMessage(m.chat, { react: { text: '❗', key: m.key } });
    return;
  }

  await conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } });

  try {
    const downloadData = await fetchDownloadUrl(text);
    if (!downloadData || !downloadData.url) throw new Error("No Se Pudo Obtener La Descarga.");

    await conn.sendMessage(m.chat, { react: { text: '🎶', key: m.key } });
    await sendAudioWithRetry(conn, m.chat, downloadData.url, downloadData.title);
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
  } catch (error) {
    console.error("❌ Error:", error);
    await conn.sendMessage(m.chat, { react: { text: '⚠️', key: m.key } });
  }
};

handler.help = ['ytmp3 <url de youtube>'];
handler.tags = ['descargas'];
handler.command = /^ytmp3$/i;

export default handler;
