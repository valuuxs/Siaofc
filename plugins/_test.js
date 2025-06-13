/*import { googleImage } from '@bochilteam/scraper';
import baileys from '@whiskeysockets/baileys';

async function sendAlbumMessage(jid, medias, options = {}) {
    if (typeof jid !== "string") throw new TypeError(`jid must be string, received: ${jid}`);
    if (medias.length < 2) throw new RangeError("Se necesitan al menos 2 imágenes para un álbum");

    const caption = options.text || options.caption || "";
    const delay = !isNaN(options.delay) ? options.delay : 500;
    delete options.text;
    delete options.caption;
    delete options.delay;

    const album = baileys.generateWAMessageFromContent(
        jid,
        { messageContextInfo: {}, albumMessage: { expectedImageCount: medias.length } },
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

const handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `*❀ Por favor, ingrese un texto para buscar una Imagen.`, m);

    await m.react('🕒');
    conn.reply(m.chat, '✧ *Descargando su imagen...*', m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, showAdAttribution: true,
title: packname,
body: dev,
previewType: 0, thumbnail: icono,
sourceUrl: redes }}})

    try {
        const res = await googleImage(text);
        const images = [];

        for (let i = 0; i < 10; i++) {
            const image = await res.getRandom();
            if (image) images.push({ type: "image", data: { url: image } });
        }

        if (images.length < 2) return conn.reply(m.chat, '✧ No se encontraron suficientes imágenes para un álbum.', m);

        const caption = `❀ *Resultados de búsqueda para:* ${text}`;
        await sendAlbumMessage(m.chat, images, { caption, quoted: m });

        await m.react('✅');
    } catch (error) {
        await m.react('❌');
        conn.reply(m.chat, '⚠︎ Hubo un error al obtener las imágenes.', m);
    }
};

handler.help = ['imagen <query>'];
handler.tags = ['buscador', 'tools', 'descargas'];
handler.command = ['gimagen', 'gimage', 'gimg'];

export default handler;*/


/*

- Plugins/Play.js - Created By KenisawaDev 

*/

import yts from 'yt-search';
import fetch from 'node-fetch';

const handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw m.reply(`✧ Ejemplo de uso: ${usedPrefix+command} Joji - Ew`);

  const search = await yts(text);
  const vid = search.videos[0];
  if (!vid) throw m.reply('Data no encontrada, intenta con otro titulo');
console.log(vid)
  const { title, thumbnail, timestamp, views, ago, url, author, description } = vid;

await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
let captext = `💮 *PLAY YOUTUBE* 💮

   ✧ : \`titulo;\` ${title || 'no encontrado'}
   ✧ : \`duración;\` ${timestamp || 'no encontrado'}
   ✧ : \`artista;\` ${author.name || 'no encontrado'}
   ✧ : \`descripción;\`
   
   ${description || 'no encontrado'}

> ${wm}
`
await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: captext }, { quoted: m });
try {
const headers = {
    "accept": "*/*",
    "accept-language": "es-AR,id;q=0.9,en-US;q=0.8,en;q=0.7",
    "sec-ch-ua": "\"Not A(Brand\";v=\"8\", \"Chromium\";v=\"132\"",
    "sec-ch-ua-mobile": "?1",
    "sec-ch-ua-platform": "\"Android\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "Referer": "https://id.ytmp3.mobi/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  }
const initial = await fetch(`https://d.ymcdn.org/api/v1/init?p=y&23=1llum1n471&_=${Math.random()}`, {headers});
let format = 'mp4';
const init = await initial.json();
const id = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/))([^&?/]+)/)?.[1];
let convertURL = init.convertURL + `&v=${id}&f=${format}&_=${Math.random()}`;
const converts = await fetch(convertURL, {headers});
const convert = await converts.json();
let info = {};
for (let i = 0; i < 3; i++ ){
    let j = await fetch(convert.progressURL, {headers});
    info = await j.json();
    console.log(info);
    if (info.progress == 3) break;
}
const result = {
    url: convert.downloadURL,
    title: info.title
}
await conn.sendMessage(m.chat, {
            audio: { url: result.url },
            mimetype: 'audio/mp4'
        }, { quoted: m });
} catch {
  m.reply('Oh Dios, esto es un error.')
}
};

handler.help = ['play'].map((v) => v + ' *<consulta>*');
handler.tags = ['downloader'];
handler.command = /^(playc|song|musica)$/i;

handler.register = false
handler.disable = false

export default handler