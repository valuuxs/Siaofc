import fs from 'fs'
import fetch from 'node-fetch'

const handler = async (m, {conn, usedPrefix, text, isPrems}) => {
try {
await m.react('🧡');

let img = 'https://files.catbox.moe/rh2b7r.jpg';  
let insta = 'https://instagram.com/usxr.crxxs';  

const _uptime = process.uptime() * 1000;  
const uptime = clockString(_uptime);  

let totalreg = Object.keys(global.db.data.users).length  
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length  

const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];  

const text = `︵᷼     ⿻ Morchi ࣪   ࣭  ࣪ WA ࣭  🐈  ࣪   ࣭
✧ Hola ${taguser}\n${saludo}

꒰꛱ ͜Desarrollado por Cristian Escobar +51927238856

𓈒𓏸🌴 \`Bot Name:\`
𓈒𓏸🌵 \`Activo:\` 
𓈒𓏸🍃 \`Usuarios:\` 
𓈒𓏸🌿 \`Version:\` 1.0.0

✪ \`Platform:\` Linux
✪ \`Baileys:\` Multi-Device
✪ \`Prefix\` [ . ]

> 😸 Si encuentra un comando con errores no dudes en reportarlo con el Creador

↷✦; \`MENÚS\` ❞ 🌷︵᷼ 
⠞🌷੭‎ .menunsfw
⠞🌷੭‎ .menuowner
⠞🌷੭‎ .menulogos

↷✦; \`INFO BOT\` ❞ 🍄︵᷼ 
⠞🍄੭‎ .totalf
⠞🍄੭‎ .grupos
⠞🍄੭‎ .sugerir
⠞🍄੭‎ .report
⠞🍄੭‎ .owner
⠞🍄੭‎ .ping
⠞🍄੭‎ .uptime
⠞🍄੭‎ .horario
⠞🍄੭‎ .precios

↷✦; \`CONFIG\` ❞ 🪻︵᷼ 
⠞🪻੭‎ .enable opción
⠞🪻੭‎ .disable opción
⠞🪻੭‎ .on opción
⠞🪻੭‎ .off opción
⠞🪻੭‎ .manual

↷✦; \`DOWNLOAD\` ❞ 🪷︵᷼ 
⠞🪷੭‎ .play texto
⠞🪷੭‎ .ytmp4doc texto
⠞🪷੭‎ .ytmp3doc texto
⠞🪷੭‎ .apk texto
⠞🪷੭‎ .pinterest texto
⠞🪷੭‎ .pinvid url
⠞🪷੭‎ .ytmp4 url
⠞🪷੭‎ .ytmp3 url
⠞🪷੭‎ .tiktok url
⠞🪷੭‎ .instagram url
⠞🪷੭‎ .facebook url
⠞🪷੭‎ .mediafire url
⠞🪷੭‎ .mega url
⠞🪷੭‎ .playstore url
⠞🪷੭‎ .xnxxdl url
⠞🪷੭‎ .xvideosdl url

↷✦; \`SEARCH\` ❞ 🍮︵᷼ 
⠞🍮੭‎ .aplaysearch texto
⠞🍮੭‎ .ttsearch texto
⠞🍮੭‎ .ttsearch2 texto
⠞🍮੭‎ .ytsearch texto
⠞🍮੭‎ .spotifysearch texto
⠞🍮੭‎ .playstoresearch texto
⠞🍮੭‎ .xnxxsearch texto
⠞🍮੭‎ .xvsearch texto
⠞🍮੭‎ .gnula texto
⠞🍮੭‎ .mercadolibre texto

↷✦; \`LISTAS\` ❞ 📜︵᷼ 
⠞📜੭‎ .v4fem hr + p
⠞📜੭‎ .v4masc hr + p
⠞📜੭‎ .v4mixto hr + p
⠞📜੭‎ .v6fem hr + p
⠞📜੭‎ .v6masc hr + p
⠞📜੭‎ .v6mixto hr + p

↷✦; \`FRASES\` ❞ 🌻︵᷼ 
⠞🌻੭‎ .piropo
⠞🌻੭‎ .consejo
⠞🌻੭‎ .fraseromantica

↷✦; \`CONVERTERS\` ❞ 🧸︵᷼ 
⠞🧸੭‎ .tourl img
⠞🧸੭‎ .tourl aud
⠞🧸੭‎ .toptt aud
⠞🧸੭‎ .toptt vid
⠞🧸੭‎ .tourl vid
⠞🧸੭‎ .tomp3 vid
⠞🧸੭‎ .toimg sticker

↷✦; \`TOOLS\` ❞ 🛠️︵᷼ 
⠞🛠️੭‎ .clima texto
⠞🛠️੭‎ .readmore texto
⠞🛠️੭‎ .read texto
⠞🛠️੭‎ .fake texto + user + texto
⠞🛠️੭‎ .traducir idioma + texto
⠞🛠️੭‎ .hd img
⠞🛠️੭‎ .whatmusic aud
⠞🛠️੭‎ .whatmusic vid
⠞🛠️੭‎ .flag país
⠞🛠️੭‎ .inspect link
⠞🛠️੭‎ .inspeccionar link
⠞🛠️੭‎ .nuevafotochannel
⠞🛠️੭‎ .nosilenciarcanal
⠞🛠️੭‎ .silenciarcanal
⠞🛠️੭‎ .seguircanal
⠞🛠️੭‎ .avisoschannel
⠞🛠️੭‎ .resiviravisos
⠞🛠️੭‎ .eliminarfotochannel
⠞🛠️੭‎ .reactioneschannel
⠞🛠️੭‎ .reaccioneschannel
⠞🛠️੭‎ .nuevonombrecanal
⠞🛠️੭‎ .nuevadescchannel

↷✦; \`GROUPS\` ❞ 🌿︵᷼ 
⠞🌿੭‎ .add número
⠞🌿੭‎ .grupo abrir / cerrar
⠞🌿੭‎ .grouptime tiempo
⠞🌿੭‎ .notify texto
⠞🌿੭‎ Aviso texto
⠞🌿੭‎ Admins texto
⠞🌿੭‎ .todos texto
⠞🌿੭‎ .setwelcome texto
⠞🌿੭‎ .groupdesc texto
⠞🌿੭‎ .setbye texto
⠞🌿੭‎ .promote @tag
⠞🌿੭‎ .demote @tag
⠞🌿੭‎ .kick @tag
⠞🌿੭‎ .mute @tag
⠞🌿੭‎ .inactivos opción
⠞🌿੭‎ .tagnum prefix
⠞🌿੭‎ .link
⠞🌿੭‎ .fantasmas

↷✦; \`EFFECTS\` ❞ 🍃︵᷼ 
⠞🍃੭‎ .bass vid
⠞🍃੭‎ .blown vid
⠞🍃੭‎ .deep vid
⠞🍃੭‎ .earrape vid
⠞🍃੭‎ .fast vid
⠞🍃੭‎ .smooth vid
⠞🍃੭‎ .tupai vid
⠞🍃੭‎ .nightcore vid
⠞🍃੭‎ .reverse vid
⠞🍃੭‎ .robot vid
⠞🍃੭‎ .slow vid
⠞🍃੭‎ .squirrel vid
⠞🍃੭‎ .chipmunk vid
⠞🍃੭‎ .reverb vid
⠞🍃੭‎ .chorus vid
⠞🍃੭‎ .flanger vid
⠞🍃੭‎ .distortion vid
⠞🍃੭‎ .pitch vid
⠞🍃੭‎ .highpass vid
⠞🍃੭‎ .lowpass vid
⠞🍃੭‎ .underwater vid

↷✦; \`FUN\` ❞ 🥥︵᷼ 
⠞🥥੭‎ .gay @tag
⠞🥥੭‎ .lesbiana @tag
⠞🥥੭‎ .pajero @tag
⠞🥥੭‎ .pajera @tag
⠞🥥੭‎ .puto @tag
⠞🥥੭‎ .puta @tag
⠞🥥੭‎ .manco @tag
⠞🥥੭‎ .manca @tag
⠞🥥੭‎ .rata @tag
⠞🥥੭‎ .prostituto @tag
⠞🥥੭‎ .prostituta @tag
⠞🥥੭‎ .doxear @tag
⠞🥥੭‎ .jalamela @tag
⠞🥥੭‎ .simi texto
⠞🥥੭‎ .pregunta texto
⠞🥥੭‎ .genio texto
⠞🥥੭‎ .top
⠞🥥੭‎ .sorteo
⠞🥥੭‎ .piropo
⠞🥥੭‎ .chiste
⠞🥥੭‎ .facto
⠞🥥੭‎ .verdad
⠞🥥੭‎ .pareja
⠞🥥੭‎ .parejas
⠞🥥੭‎ .love
⠞🥥੭‎ .personalidad

↷✦; \`GAME\` ❞ 🎋︵᷼ 
⠞🎋੭‎ .pregunta texto
⠞🎋੭‎ .ttt texto
⠞🎋੭‎ .ptt opción
⠞🎋੭‎ .delttt
⠞🎋੭‎ .acertijo
⠞🎋੭‎ .trivia

↷✦; \`ANIME\` ❞ 🌾︵᷼ 
⠞🌾੭‎ .messi
⠞🌾੭‎ .cr7

↷✦; `GIFS NSFW` ❞ 🔥︵᷼ 
⠞🔥੭‎ .violar @tag
⠞🔥੭‎ .follar @tag
⠞🔥੭‎ .anal @tag
⠞🔥੭‎ .coger @tag
⠞🔥੭‎ .coger2 @tag
⠞🔥੭‎ .penetrar @tag
⠞🔥੭‎ .sexo @tag
⠞🔥੭‎ .rusa @tag
⠞🔥੭‎ .sixnine @tag
⠞🔥੭‎ .pies @tag
⠞🔥੭‎ .mamada @tag
⠞🔥੭‎ .lickpussy @tag
⠞🔥੭‎ .grabboobs @tag
⠞🔥੭‎ .suckboobs @tag
⠞🔥੭‎ .cum @tag
⠞🔥੭‎ .fap @tag
⠞🔥੭‎ .manosear @tag
⠞🔥੭‎ .lesbianas @tag

↷✦; \`STICKERS\` ❞ 🦋︵᷼ 
⠞🦋੭‎ .sticker img
⠞🦋੭‎ .sticker vid
⠞🦋੭‎ .brat texto
⠞🦋੭‎ .qc texto
⠞🦋੭‎ .dado

↷✦; \`RPG\` ❞ 💸︵᷼ 
⠞💸੭‎ .minar
⠞💸੭‎ .cofre
⠞💸੭ .slut
⠞💸੭ .nivel
⠞💸੭ .ruleta

↷✦; \`REGISTRO\` ❞ ☁️︵᷼ 
⠞☁️੭ .perfil
⠞☁️੭ .reg
⠞☁️੭ .unreg

↷✦; \`OWNER\` ❞ 👑︵᷼ 
⠞👑੭ .salir
⠞👑੭ .update
⠞👑੭ .blocklist
⠞👑੭ .grouplist
⠞👑੭ .restart
⠞👑੭ .join
⠞👑੭ .chetar
⠞👑੭ .unbanuser`.trim();

conn.sendMessage(m.chat, {  
  text: menu,  
  contextInfo: {  
    mentionedJid: conn.parseMention(text),  
    isForwarded: true,  
    forwardingScore: 999,  
    externalAdReply: {  
      title: `${await conn.getName(m.sender)}, Thank for using Morchiyara, you can follow me on Instagram by clicking here`,  
      body: 'Im Dev Criss',  
      thumbnail: await (await fetch(img)).buffer(),  
      sourceUrl: insta,  
      mediaType: 1,  
      renderLargerThumbnail: true  
    }  
  }  
}, { quoted: fkontak });

} catch (e) {
conn.reply(m.chat, '❎ Error en el comando. Inténtalo más tarde.', m);
}
};

//handler.command = /^(menu|menú|memu|memú|help|info|comandos|2help|menu1.2|ayuda|commands|commandos|cmd)$/i;
handler.command = /^(mexxx)$/i;
handler.fail = null;

export default handler;

function clockString(ms) {
const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(':');
}

