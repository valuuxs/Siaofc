import fetch from 'node-fetch';
import axios from 'axios';

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
if (!text) return conn.reply(m.chat, `*[ 🎧 ] Hace falta el título del audio de SoundCloud.*\n\n*[ 💡 ] Ejemplo:* ${usedPrefix + command} Tatto - La Única Tropical`, m, rcanal)

await m.react('🕒');
try {
let api = await fetch(`https://apis-starlights-team.koyeb.app/starlight/soundcloud-search?text=${encodeURIComponent(text)}`);
let json = await api.json();
let { url } = json[0];

let api2 = await fetch(`https://apis-starlights-team.koyeb.app/starlight/soundcloud?url=${url}`);
let json2 = await api2.json();

let { link: dl_url, quality, image } = json2;

let audio = await getBuffer(dl_url);

let txt = `*${json[0].title}*\n`;
    //txt += `  *⇄ㅤ     ◁   ㅤ  ❚❚ㅤ     ▷ㅤ     ↻*\n02:48 ━━━◉───── 06:10`
    //txt += `- *Calidad:* ${quality}\n`;
    txt += `${url}\n\n`;
    txt += `> *[ ℹ️ ]* sᥱ ᥱs𝗍ᥲ́ ᥱᥒ᥎іᥲᥒძ᥆ ᥱᥣ ᥲᥙძі᥆ ᥱs⍴ᥱrᥱ ᥙᥒ m᥆mᥱᥒ𝗍᥆...\n> sі ᥒ᥆ sᥱ ᥱᥒ᥎іᥲ ⍴rᥙᥱᑲᥱ ᥴ᥆ᥒ ᥱᥣ ᥴ᥆mᥲᥒძ᥆ *aplay* ⍴ᥲrᥲ ᥲsᥱgᥙrᥲr ᥣᥲ ძᥱsᥴᥲrgᥲ.`

//await conn.sendFile(m.chat, image, 'thumbnail.jpg', txt, m, null);
await conn.reply(m.chat, txt, fkontak, m);
await conn.sendMessage(m.chat, { audio: audio, fileName: `${json[0].title}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m })

//await m.react('⌛');
} catch {
await m.react('❌');
}}

handler.help = ['splay', 'soundcloud']
handler.tags = ['descargas']
handler.command = ['soundcloud', 'splay']
handler.register = true

export default handler

const getBuffer = async (url, options) => {
try {
const res = await axios({
method: 'get',
url,
headers: {
'DNT': 1,
'Upgrade-Insecure-Request': 1,
},
...options,
responseType: 'arraybuffer',
});
return res.data;
} catch (e) {
console.log(`Error : ${e}`);
}
};