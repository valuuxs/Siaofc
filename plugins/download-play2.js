


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
handler.command = /^(play|song|musica)$/i;

handler.register = false
handler.disable = false

export default handler
