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
      return m.reply(`\`\`\`❌ Error:\`\`\` ${res.error}`);
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
import FormData from 'form-data';
import crypto from 'crypto';

const handler = async (m, { conn, args }) => {
  if (!args[0]) return m.reply(`*Ingresa una URL de un video o audio de YouTube*`);

  const url = args[0];

  if (!youtubeScraper.isValidYouTubeUrl(url)) {
    return m.reply(`*URL inválida, asegúrate de ingresar un enlace de YouTube válido.*`);
  }

  await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

  try {
    const mp3Result = await youtubeScraper.youtubeMp3(url);

    if (!mp3Result.success) {
      await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
      return m.reply(`❌ Error: ${mp3Result.error.message}`);
    }

    console.log("Título:", mp3Result.data.title);
    console.log("Enlace de descarga:", mp3Result.data.downloadUrl);

    await conn.sendMessage(m.chat, {
      audio: { url: mp3Result.data.downloadUrl },
      mimetype: "audio/mp4",
      fileName: mp3Result.data.title,
      mentions: [m.sender]
    }, { quoted: m });

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

  } catch (e) {
    console.error(e);
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    m.reply(`❌ Ocurrió un error inesperado al procesar tu solicitud.`);
  }
};

handler.help = ['ytmp3 *<url>*'];
handler.command = ['ytmp3'];
handler.tags = ['descargas'];

export default handler;

// === Clases de respuesta ===

class Success {
  constructor(data) {
    this.success = true;
    this.data = data;
  }
}

class ErrorResponse {
  constructor(error) {
    this.success = false;
    this.error = typeof error === 'string' ? { message: error } : error;
  }
}

// === Funciones del scraper ===

const youtubeScraper = {
  youtubeMp3: async (url) => {
    try {
      if (!url || (!url.includes('youtube.com') && !url.includes('youtu.be'))) {
        return new ErrorResponse("¡URL de YouTube no válida!");
      }

      const ds = new FormData();
      ds.append("url", url);

      const { data } = await axios.post(
        "https://www.youtubemp3.ltd/convert",
        ds,
        {
          headers: {
            ...ds.getHeaders(),
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          },
          timeout: 45000
        }
      );

      if (!data || !data.link) {
        return new ErrorResponse("No se pudo obtener el enlace de descarga");
      }

      return new Success({
        title: data.filename || "Título desconocido",
        downloadUrl: data.link,
        type: "mp3"
      });

    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        return new ErrorResponse("Tiempo de espera agotado, inténtelo de nuevo más tarde");
      }

      return new ErrorResponse(error.response?.data?.message || error.message || "Fallo al convertir el video");
    }
  },

  isValidYouTubeUrl: (url) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    return youtubeRegex.test(url);
  },

  extractVideoId: (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }
};