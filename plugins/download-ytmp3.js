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

await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key }})
  let url = args[0];
try {
const mp3Result = await youtubeScraper.youtubeMp3(url);

  console.log("Title:", mp3Result.data.title);
  console.log("Download URL:", mp3Result.data.downloadUrl);
await conn.sendMessage(m.chat, {
      audio: { url: mp3Result.data.downloadUrl },
      mimetype: "audio/mp4",
      fileName: mp3Result.data.title,
      mentions: [m.sender]
    }, { quoted: m });
await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
} catch (e) {
  console.log(e);
  await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key }})
}
};

handler.help = ['ytmp3 *<url>*'];
handler.command = ['ytmp3'];
handler.tags = ['descargas'];

export default handler;

class Success {
  constructor(data) {
    this.success = true;
    this.data = data;
  }
}

class ErrorResponse {
  constructor(error) {
    this.success = false;
    this.error = error;
  }
}

const youtubeScraper = {
  youtubeMp3: async (url) => {
    try {
      if (!url || !url.includes('youtube.com') && !url.includes('youtu.be')) {
        return new ErrorResponse({
          message: "¡URL de YouTube no válida!"
        });
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
        return new ErrorResponse({
          message: "No se pudo obtener el enlace de descarga"
        });
      }
      
      return new Success({
        title: data.filename || "Título desconocido",
        downloadUrl: data.link,
        type: "mp3"
      });
      
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        return new ErrorResponse({
          message: "Tiempo de espera de la solicitud agotado, inténtelo de nuevo más tarde"
        });
      }
      
      return new ErrorResponse({
        message: error.response?.data?.message || error.message || "Gagal convert YouTube ke MP3"
      });
    }
  },

  ytdl: async (url, quality = "720") => {
    try {
      if (!url || !url.includes('youtube.com') && !url.includes('youtu.be')) {
        return new ErrorResponse({
          message: "¡URL de YouTube no válida!"
        });
      }

      const validQuality = {
        "480": 480,
        "1080": 1080,
        "720": 720,
        "360": 360,
        "audio": "mp3",
      };
      
      if (!Object.keys(validQuality).includes(quality)) {
        return new ErrorResponse({
          message: "¡Calidad no válida!",
          availableQuality: Object.keys(validQuality)
        });
      }
      
      const qualitys = validQuality[quality];
      
      const { data: firstRequest } = await axios.get(
        `https://p.oceansaver.in/ajax/download.php?button=1&start=1&end=1&format=${qualitys}&iframe_source=https://allinonetools.com/&url=${encodeURIComponent(url)}`,
        { 
          timeout: 30000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        }
      );
      
      if (!firstRequest || !firstRequest.progress_url) {
        return new ErrorResponse({
          message: "No se pudo iniciar el proceso de descarga"
        });
      }
      
      const { progress_url } = firstRequest;
      let metadata = {
        image: firstRequest.info?.image || "",
        title: firstRequest.info?.title || "Título desconocido",
        downloadUrl: "",
        quality: quality,
        type: quality === "audio" ? "mp3" : "mp4"
      };
      
      let datas;
      let attempts = 0;
      const maxAttempts = 40;
      
      console.log("Procesando descarga, por favor espere...");
      
      do {
        if (attempts >= maxAttempts) {
          return new ErrorResponse({
            message: "Timeout: El proceso de descarga tarda demasiado, inténtalo de nuevo."
          });
        }
        
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        try {
          const { data } = await axios.get(progress_url, { 
            timeout: 15000,
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
          });
          datas = data;
          
          if (datas.progress && datas.progress < 100) {
            console.log(`Progeso: ${datas.progress}%`);
          }
          
        } catch (pollError) {
          console.log(`El intento de sondeo ${attempts + 1} falló, se está reintentando...`);
        }
        
        attempts++;
      } while (!datas?.download_url);
      
      if (!datas.download_url) {
        return new ErrorResponse({
          message: "No se pudo obtener la URL de descarga"
        });
      }
      
      metadata.downloadUrl = datas.download_url;
      console.log("¡Ya está listo para descargar!");
      
      return new Success(metadata);
      
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        return new ErrorResponse({
          message: "Tiempo de espera de la solicitud agotado, inténtelo de nuevo más tarde"
        });
      }
      
      return new ErrorResponse({
        message: error.response?.data?.message || error.message || "No se pudo descargar el vídeo"
      });
    }
  },

  // Función de utilidad para la validación de URL de YouTube
  isValidYouTubeUrl: (url) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    return youtubeRegex.test(url);
  },

  // Función de utilidad para extraer el ID del vídeo
  extractVideoId: (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }
};