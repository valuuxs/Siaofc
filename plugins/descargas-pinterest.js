import axios from 'axios';
import cheerio from 'cheerio';
import baileys from '@whiskeysockets/baileys';

async function sendAlbumMessage(jid, medias, options = {}) {
  if (typeof jid !== "string") throw new TypeError(`jid must be string, received: ${jid}`);

  for (const media of medias) {
    if (!media.type || (media.type !== "image" && media.type !== "video")) {
      throw new TypeError(`media.type must be "image" or "video", received: ${media.type}`);
    }
    if (!media.data || (!media.data.url && !Buffer.isBuffer(media.data))) {
      throw new TypeError(`media.data must be object with url or buffer`);
    }
  }

  if (medias.length < 2) throw new RangeError("Minimum 2 media");

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
    const msg = await baileys.generateWAMessage(
      album.key.remoteJid,
      { [type]: data, ...(i === 0 ? { caption } : {}) },
      { upload: conn.waUploadToServer }
    );
    msg.message.messageContextInfo = {
      messageAssociation: { associationType: 1, parentMessageKey: album.key },
    };
    await conn.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });
    await baileys.delay(delay);
  }

  return album;
}

async function pins(judul) {
  const link = `https://id.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${encodeURIComponent(judul)}%26rs%3Dtyped&data=%7B%22options%22%3A%7B%22query%22%3A%22${encodeURIComponent(judul)}%22%2C%22rs%22%3A%22typed%22%2C%22scope%22%3A%22pins%22%7D%2C%22context%22%3A%7B%7D%7D`;

  const headers = {
    'accept': 'application/json, text/javascript, */*; q=0.01',
    'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
    'referer': 'https://id.pinterest.com/',
    'x-requested-with': 'XMLHttpRequest'
  };

  try {
    const res = await axios.get(link, { headers });
    const results = res.data?.resource_response?.data?.results || [];
    return results.map(item => {
      if (item.images) {
        return {
          image_large_url: item.images.orig?.url || null,
          image_medium_url: item.images['564x']?.url || null,
          image_small_url: item.images['236x']?.url || null
        };
      }
      return null;
    }).filter(Boolean);
  } catch {
    return [];
  }
}

async function dl(url) {
  try {
    const res = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
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
    return { error: 'No se pudo descargar el contenido.' };
  }
}

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply(`*🔎 Por favor, ingresa un texto o enlace de Pinterest.*\n> *\`Ejemplo:\`* .pinterest gatos tiernos`);

  try {
    if (text.includes("https://")) {
      m.react("⌛");
      const media = await dl(text);
      if (!media || media.error || !media.download) {
        return conn.reply(m.chat, '```❌ No se pudo obtener el contenido del enlace.```', m);
      }

      const isVideo = media.download.includes(".mp4");

      await conn.sendMessage(m.chat, {
        [isVideo ? "video" : "image"]: { url: media.download },
        caption: media.title || 'Contenido de Pinterest'
      }, { quoted: m });

      return await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    }

    m.react('🕒');
    const results = await pins(text);
    if (!results || results.length === 0)
      return conn.reply(m.chat, '```⚠️ No se encontraron resultados.```', m);

    const maxImages = Math.min(results.length, 10);
    const medias = results.slice(0, maxImages).map(item => ({
      type: 'image',
      data: { url: item.image_large_url || item.image_medium_url || item.image_small_url }
    }));

    await sendAlbumMessage(m.chat, medias, {
      caption: `\`\`\`乂 PINTEREST - SEARCH\`\`\`\n\n≡ 🌳 *\`Búsqueda:\`* ${text}\n≡ 🌿 \`Resultados:\` ${maxImages}`,
      quoted: m
    });

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

  } catch (error) {
    console.error(error);
    conn.reply(m.chat, '```⚠️ Error al obtener contenido de Pinterest.```', m);
  }
};

handler.help = ['pinterest'];
handler.command = ['pinterestdl', 'pindl'];
handler.tags = ['buscador'];

export default handler;