import axios from 'axios';
import cheerio from 'cheerio';
import baileys from '@whiskeysockets/baileys';

async function sendAlbumMessage(jid, medias, options = {}) {
  if (typeof jid !== "string") {
    throw new TypeError(`jid must be string, received: ${jid} (${jid?.constructor?.name})`);
  }

  for (const media of medias) {
    if (!media.type || (media.type !== "image" && media.type !== "video")) {
      throw new TypeError(`media.type must be "image" or "video", received: ${media.type} (${media.type?.constructor?.name})`);
    }
    if (!media.data || (!media.data.url && !Buffer.isBuffer(media.data))) {
      throw new TypeError(`media.data must be object with url or buffer, received: ${media.data} (${media.data?.constructor?.name})`);
    }
  }

  if (medias.length < 2) {
    throw new RangeError("Minimum 2 media");
  }

  const caption = options.text || options.caption || "";
  const delay = !isNaN(options.delay) ? options.delay : 500;
  delete options.text;
  delete options.caption;
  delete options.delay;

  const album = baileys.generateWAMessageFromContent(
    jid,
    {
      messageContextInfo: {},
      albumMessage: {
        expectedImageCount: medias.filter(media => media.type === "image").length,
        expectedVideoCount: medias.filter(media => media.type === "video").length,
        ...(options.quoted
          ? {
              contextInfo: {
                remoteJid: options.quoted.key.remoteJid,
                fromMe: options.quoted.key.fromMe,
                stanzaId: options.quoted.key.id,
                participant: options.quoted.key.participant || options.quoted.key.remoteJid,
                quotedMessage: options.quoted.message,
              },
            }
          : {}),
      },
    },
    {}
  );

  await conn.relayMessage(album.key.remoteJid, album.message, { messageId: album.key.id });

  for (let i = 0; i < medias.length; i++) {
    const { type, data } = medias[i];
    const img = await baileys.generateWAMessage(
      album.key.remoteJid,
      { [type]: data, ...(i === 0 ? { caption } : {}) },
      { upload: conn.waUploadToServer }
    );
    img.message.messageContextInfo = {
      messageAssociation: { associationType: 1, parentMessageKey: album.key },
    };
    await conn.relayMessage(img.key.remoteJid, img.message, { messageId: img.key.id });
    await baileys.delay(delay);
  }

  return album;
}

const pins = async (query) => {
  try {
    const url = `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(query)}`;
    const res = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    });

    const $ = cheerio.load(res.data);
    const matches = [];

    $('img[srcset]').each((i, el) => {
      const src = $(el).attr('src');
      if (src && !src.includes('data:image')) {
        matches.push({
          image_large_url: src
        });
      }
    });

    return matches.slice(0, 10); // Solo 10 imágenes
  } catch (error) {
    console.error('Error scraping Pinterest:', error.message);
    return [];
  }
};

let handler = async (m, { conn, text, args }) => {
  if (!text) return m.reply(`*🔎 Por favor, ingresa un texto para buscar en Pinterest.*\n> *Ejemplo:* \`.pinterest Gatos Hermosos\``);

  try {
    if (text.includes("https://")) {
      m.react("⌛");

      let i = await dl(args[0]);
      let isVideo = i.download.includes(".mp4");

      await conn.sendMessage(m.chat, {
        [isVideo ? "video" : "image"]: { url: i.download },
        caption: i.title
      }, { quoted: m });

      m.react("☑️");
      return;
    }

    m.react('🕒');
    const results = await pins(text);

    if (!results || results.length === 0) {
      return conn.reply(m.chat, `⚠️ No se encontraron resultados para esa búsqueda.`, m);
    }

    const medias = results.map(img => ({
      type: 'image',
      data: { url: img.image_large_url }
    }));

    await sendAlbumMessage(m.chat, medias, {
      caption: `\`\`\`乂 PINTEREST - SEARCH\`\`\`\n\n≡ 🌳 *Búsqueda:* ${text}\n≡ 🌿 *Resultados:* ${medias.length}`,
      quoted: m
    });

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

  } catch (error) {
    console.error(error);
    conn.reply(m.chat, '⚠️ Error al obtener imágenes de Pinterest.', m);
  }
};

handler.help = ['pinterest'];
handler.command = ['pinterest', 'pin'];
handler.tags = ['buscador'];

export default handler;

// Función para descargar imagen o video de un link de Pinterest
async function dl(url) {
  try {
    const res = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    const $ = cheerio.load(res.data);
    const tag = $('script[data-test-id="video-snippet"]');

    if (tag.length) {
      const result = JSON.parse(tag.text());
      return {
        title: result.name,
        download: result.contentUrl
      };
    } else {
      const json = JSON.parse($("script[data-relay-response='true']").eq(0).text());
      const result = json.response.data["v3GetPinQuery"].data;
      return {
        title: result.title,
        download: result.imageLargeUrl
      };
    }
  } catch {
    return { msg: "Error, inténtalo de nuevo más tarde" };
  }
}