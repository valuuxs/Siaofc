/*const { prepareWAMessageMedia, generateWAMessageFromContent, getDevice } = (await import('@whiskeysockets/baileys')).default;
import yts from 'yt-search';

const handler = async (m, { conn, text, usedPrefix, command }) => {
    const device = await getDevice(m.key.id);
    
    if (!text) throw "⚠️ *Por favor, ingrese el texto para buscar en YouTube.*";
    
    const results = await yts(text);
    if (!results || !results?.videos) return m.reply('> *[❗] Error: No se encontraron videos.*');

    if (device !== 'desktop' || device !== 'web') {
        const videos = results.videos.slice(0, 20);
        const randomIndex = Math.floor(Math.random() * videos.length);
        const randomVideo = videos[randomIndex];

        const media = await prepareWAMessageMedia({ image: { url: randomVideo.thumbnail } }, { upload: conn.waUploadToServer });

        const interactiveMessage = {
            body: { 
                text: `*—◉ Resultados obtenidos:* ${results.videos.length}\n*—◉ Video aleatorio:*\n*-› Título:* ${randomVideo.title}\n*-› Autor:* ${randomVideo.author.name}\n*-› Vistas:* ${randomVideo.views}\n*-› Enlace:* ${randomVideo.url}` 
            },
            footer: { text: "Shadow Bot" },
            header: {
                title: "*< YouTube Search />*",
                hasMediaAttachment: true,
                imageMessage: media.imageMessage,
            },
            nativeFlowMessage: {
                buttons: [
                    {
                        name: 'single_select',
                        buttonParamsJson: JSON.stringify({
                            title: 'OPCIONES DISPONIBLES',
                            sections: videos.map((video) => ({
                                title: video.title,
                                rows: [
                                    {
                                        header: video.title,
                                        title: video.author.name,
                                        description: 'Descargar MP3',
                                        id: `.ping`
                                    },
                                    {
                                        header: video.title,
                                        title: video.author.name,
                                        description: 'Descargar MP4',
                                        id: `.s`
                                    }
                                ]
                            }))
                        })
                    }
                ],
                messageParamsJson: ''
            }
        };

        const msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    interactiveMessage,
                },
            },
        }, { userJid: conn.user.jid, quoted: m });

        conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

    } else {
        const tes = results.all;
        const teks = tes.map((v) => {
            if (v.type === 'video') {
                return `
° *_${v.title}_*
↳ 🔗 *Enlace:* ${v.url}
↳ 🕒 *Duración:* ${v.timestamp}
↳ 📅 *Publicado:* ${v.ago}
↳ 👁 *Vistas:* ${v.views}`;
            }
        }).filter((v) => v).join('\n\n━━━━━━━━━━━━━━\n\n');

        conn.sendFile(m.chat, tes[0].thumbnail, 'resultado.jpg', teks.trim(), m);      
    }    
};

handler.help = ['ytsearch <texto>'];
handler.tags = ['search'];
handler.command = /^(tesyt)$/i;
export default handler;*/

import fetch from 'node-fetch';

const handler = async (m, { conn, isPrems }) => {
  try {
    await m.react('🧡');

    let img = 'https://files.catbox.moe/rh2b7r.jpg';
    let insta = 'https://instagram.com/usxr.crxxs';

    const _uptime = process.uptime() * 1000;
    const uptime = clockString(_uptime);

    const user = global.db.data.users[m.sender];
    const { money, joincount, exp, limit, level, role } = user;

    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];

    const text = `︵᷼     ⿻ *Morchi* ࣪   ࣭  ࣪ *WA* ࣭  🐈  ࣪   ࣭ 
✧ *Hola ${taguser}*\n${saludo}

*꒰꛱ ͜Desarrollado por Cristian Escobar +51927238856*

*𓈒𓏸🌴 \`Bot Name:\`* Morchi Bot - MD
*𓈒𓏸🌵 \`Activo:\`* ${uptime}
*𓈒𓏸🍃 \`Usuarios:\`* 
*𓈒𓏸🌿 \`Version:\`* 1.0.0

*✪ \`Platform:\`* Linux
*✪ \`Baileys:\`* Multi-Device
*✪ \`Prefix\`* [ . ]

> 😸 Si encuentra un comando con errores no dudes en reportarlo con el *Creador*

↷✦; \`MENÚS\` ❞ 🌷︵᷼  
⠞🌷੭‎ ${usedPrefix}menunsfw
⠞🌷੭‎ ${usedPrefix}menuowner
⠞🌷੭‎ ${usedPrefix}menulogos

↷✦; \`INFO BOT\` ❞ 🍄︵᷼  
⠞🍄੭‎ ${usedPrefix}totalf
⠞🍄੭‎ ${usedPrefix}grupos
⠞🍄੭‎ ${usedPrefix}sugerir
⠞🍄੭‎ ${usedPrefix}report
⠞🍄੭‎ ${usedPrefix}owner
⠞🍄੭‎ ${usedPrefix}ping
⠞🍄੭‎ ${usedPrefix}uptime
⠞🍄੭‎ ${usedPrefix}horario
⠞🍄੭‎ ${usedPrefix}precios

↷✦; \`CONFIG\` ❞ 🪻︵᷼ 
⠞🪻੭‎ ${usedPrefix}enable *opción*
⠞🪻੭‎ ${usedPrefix}disable *opción*
⠞🪻੭‎ ${usedPrefix}on *opción*
⠞🪻੭‎ ${usedPrefix}off *opción*
⠞🪻੭‎ ${usedPrefix}manual

↷✦; \`DOWNLOAD\` ❞ 🪷︵᷼ 
⠞🪷੭‎ ${usedPrefix}play *texto*
⠞🪷੭‎ ${usedPrefix}ytmp4doc *texto*
⠞🪷੭‎ ${usedPrefix}ytmp3doc *texto*
⠞🪷੭‎ ${usedPrefix}apk *texto*
⠞🪷੭‎ ${usedPrefix}pinterest *texto*
⠞🪷੭‎ ${usedPrefix}pinvid *url*
⠞🪷੭‎ ${usedPrefix}ytmp4 *url*
⠞🪷੭‎ ${usedPrefix}ytmp3 *url*
⠞🪷੭‎ ${usedPrefix}tiktok *url*
⠞🪷੭‎ ${usedPrefix}instagram *url*
⠞🪷੭‎ ${usedPrefix}facebook *url*
⠞🪷੭‎ ${usedPrefix}mediafire *url*
⠞🪷੭‎ ${usedPrefix}mega *url*
⠞🪷੭‎ ${usedPrefix}playstore *url*
⠞🪷੭‎ ${usedPrefix}xnxxdl *url*
⠞🪷੭‎ ${usedPrefix}xvideosdl *url*

↷✦; \`SEARCH\` ❞ 🍮︵᷼ 
⠞🍮੭‎ ${usedPrefix}aplaysearch *texto*
⠞🍮੭‎ ${usedPrefix}ttsearch *texto*
⠞🍮੭‎ ${usedPrefix}ttsearch2 *texto*
⠞🍮੭‎ ${usedPrefix}ytsearch *texto*
⠞🍮੭‎ ${usedPrefix}spotifysearch *texto*
⠞🍮੭‎ ${usedPrefix}playstoresearch *texto*
⠞🍮੭‎ ${usedPrefix}xnxxsearch *texto*
⠞🍮੭‎ ${usedPrefix}xvsearch *texto*
⠞🍮੭‎ ${usedPrefix}gnula *texto*
⠞🍮੭‎ ${usedPrefix}mercadolibre *texto*

↷✦; \`LISTAS\` ❞ 📜︵᷼ 
⠞📜੭‎ ${usedPrefix}v4fem *hr + p*
⠞📜੭‎ ${usedPrefix}v4masc *hr + p*
⠞📜੭‎ ${usedPrefix}v4mixto *hr + p*
⠞📜੭‎ ${usedPrefix}v6fem *hr + p*
⠞📜੭‎ ${usedPrefix}v6masc *hr + p*
⠞📜੭‎ ${usedPrefix}v6mixto *hr + p*

↷✦; \`FRASES\` ❞ 🌻︵᷼ 
⠞🌻੭‎ ${usedPrefix}piropo
⠞🌻੭‎ ${usedPrefix}consejo
⠞🌻੭‎ ${usedPrefix}fraseromantica

↷✦; \`CONVERTERS\` ❞ 🧸︵᷼ 
⠞🧸੭‎ ${usedPrefix}tourl *img*
⠞🧸੭‎ ${usedPrefix}tourl *aud*
⠞🧸੭‎ ${usedPrefix}toptt *aud*
⠞🧸੭‎ ${usedPrefix}toptt *vid*
⠞🧸੭‎ ${usedPrefix}tourl *vid*
⠞🧸੭‎ ${usedPrefix}tomp3 *vid*
⠞🧸੭‎ ${usedPrefix}toimg *sticker*

↷✦; \`TOOLS\` ❞ 🛠️︵᷼ 
⠞🛠️੭‎ ${usedPrefix}clima *texto*
⠞🛠️੭‎ ${usedPrefix}readmore *texto*
⠞🛠️੭‎ ${usedPrefix}read *texto*
⠞🛠️੭‎ ${usedPrefix}fake *texto + user + texto*
⠞🛠️੭‎ ${usedPrefix}traducir *idioma + texto*
⠞🛠️੭‎ ${usedPrefix}hd *img*
⠞🛠️੭‎ ${usedPrefix}whatmusic *aud*
⠞🛠️੭‎ ${usedPrefix}whatmusic *vid*
⠞🛠️੭‎ ${usedPrefix}flag *país*
⠞🛠️੭‎ ${usedPrefix}inspect *link*
⠞🛠️੭‎ ${usedPrefix}inspeccionar *link*
⠞🛠️੭‎ ${usedPrefix}nuevafotochannel
⠞🛠️੭‎ ${usedPrefix}nosilenciarcanal
⠞🛠️੭‎ ${usedPrefix}silenciarcanal
⠞🛠️੭‎ ${usedPrefix}seguircanal
⠞🛠️੭‎ ${usedPrefix}avisoschannel
⠞🛠️੭‎ ${usedPrefix}resiviravisos
⠞🛠️੭‎ ${usedPrefix}eliminarfotochannel
⠞🛠️੭‎ ${usedPrefix}reactioneschannel
⠞🛠️੭‎ ${usedPrefix}reaccioneschannel
⠞🛠️੭‎ ${usedPrefix}nuevonombrecanal
⠞🛠️੭‎ ${usedPrefix}nuevadescchannel

↷✦; \`GROUPS\` ❞ 🌿︵᷼ 
⠞🌿੭‎ ${usedPrefix}add *número*
⠞🌿੭‎ ${usedPrefix}grupo *abrir / cerrar*
⠞🌿੭‎ ${usedPrefix}grouptime *tiempo*
⠞🌿੭‎ ${usedPrefix}notify *texto*
⠞🌿੭‎ Aviso *texto*
⠞🌿੭‎ Admins *texto*
⠞🌿੭‎ ${usedPrefix}todos *texto*
⠞🌿੭‎ ${usedPrefix}setwelcome *texto*
⠞🌿੭‎ ${usedPrefix}groupdesc *texto*
⠞🌿੭‎ ${usedPrefix}setbye *texto*
⠞🌿੭‎ ${usedPrefix}promote *@tag*
⠞🌿੭‎ ${usedPrefix}demote *@tag*
⠞🌿੭‎ ${usedPrefix}kick *@tag*
⠞🌿੭‎ ${usedPrefix}mute *@tag*
⠞🌿੭‎ ${usedPrefix}inactivos *opción*
⠞🌿੭‎ ${usedPrefix}tagnum *prefix*
⠞🌿੭‎ ${usedPrefix}link
⠞🌿੭‎ ${usedPrefix}fantasmas

↷✦; \`EFFECTS\` ❞ 🍃︵᷼ 
⠞🍃੭‎ ${usedPrefix}bass *vid*
⠞🍃੭‎ ${usedPrefix}blown *vid*
⠞🍃੭‎ ${usedPrefix}deep *vid*
⠞🍃੭‎ ${usedPrefix}earrape *vid*
⠞🍃੭‎ ${usedPrefix}fast *vid*
⠞🍃੭‎ ${usedPrefix}smooth *vid*
⠞🍃੭‎ ${usedPrefix}tupai *vid*
⠞🍃੭‎ ${usedPrefix}nightcore *vid*
⠞🍃੭‎ ${usedPrefix}reverse *vid*
⠞🍃੭‎ ${usedPrefix}robot *vid*
⠞🍃੭‎ ${usedPrefix}slow *vid*
⠞🍃੭‎ ${usedPrefix}squirrel *vid*
⠞🍃੭‎ ${usedPrefix}chipmunk *vid*
⠞🍃੭‎ ${usedPrefix}reverb *vid*
⠞🍃੭‎ ${usedPrefix}chorus *vid*
⠞🍃੭‎ ${usedPrefix}flanger *vid*
⠞🍃੭‎ ${usedPrefix}distortion *vid*
⠞🍃੭‎ ${usedPrefix}pitch *vid*
⠞🍃੭‎ ${usedPrefix}highpass *vid*
⠞🍃੭‎ ${usedPrefix}lowpass *vid*
⠞🍃੭‎ ${usedPrefix}underwater *vid*

↷✦; \`FUN\` ❞ 🥥︵᷼ 
⠞🥥੭‎ ${usedPrefix}gay *@tag*
⠞🥥੭‎ ${usedPrefix}lesbiana *@tag*
⠞🥥੭‎ ${usedPrefix}pajero *@tag*
⠞🥥੭‎ ${usedPrefix}pajera *@tag*
⠞🥥੭‎ ${usedPrefix}puto *@tag*
⠞🥥੭‎ ${usedPrefix}puta *@tag*
⠞🥥੭‎ ${usedPrefix}manco *@tag*
⠞🥥੭‎ ${usedPrefix}manca *@tag*
⠞🥥੭‎ ${usedPrefix}rata *@tag*
⠞🥥੭‎ ${usedPrefix}prostituto *@tag*
⠞🥥੭‎ ${usedPrefix}prostituta *@tag*
⠞🥥੭‎ ${usedPrefix}doxear *@tag*
⠞🥥੭‎ ${usedPrefix}jalamela *@tag*
⠞🥥੭‎ ${usedPrefix}simi *texto*
⠞🥥੭‎ ${usedPrefix}pregunta *texto*
⠞🥥੭‎ ${usedPrefix}genio *texto*
⠞🥥੭‎ ${usedPrefix}top
⠞🥥੭‎ ${usedPrefix}sorteo
⠞🥥੭‎ ${usedPrefix}piropo
⠞🥥੭‎ ${usedPrefix}chiste
⠞🥥੭‎ ${usedPrefix}facto
⠞🥥੭‎ ${usedPrefix}verdad
⠞🥥੭‎ ${usedPrefix}pareja
⠞🥥੭‎ ${usedPrefix}parejas
⠞🥥੭‎ ${usedPrefix}love
⠞🥥੭‎ ${usedPrefix}personalidad

↷✦; \`GAME\` ❞ 🎋︵᷼ 
⠞🎋੭‎ ${usedPrefix}pregunta *texto*
⠞🎋੭‎ ${usedPrefix}ttt *texto*
⠞🎋੭‎ ${usedPrefix}ptt *opción*
⠞🎋੭‎ ${usedPrefix}delttt
⠞🎋੭‎ ${usedPrefix}acertijo
⠞🎋੭‎ ${usedPrefix}trivia

↷✦; \`ANIME\` ❞ 🌾︵᷼ 
⠞🌾੭‎ ${usedPrefix}messi
⠞🌾੭‎ ${usedPrefix}cr7

↷✦; \`GIFS NSFW\` ❞ 🔥︵᷼ 
⠞🔥੭‎ ${usedPrefix}violar *@tag*
⠞🔥੭‎ ${usedPrefix}follar *@tag*
⠞🔥੭‎ ${usedPrefix}anal *@tag*
⠞🔥੭‎ ${usedPrefix}coger *@tag*
⠞🔥੭‎ ${usedPrefix}coger2 *@tag*
⠞🔥੭‎ ${usedPrefix}penetrar *@tag*
⠞🔥੭‎ ${usedPrefix}sexo *@tag*
⠞🔥੭‎ ${usedPrefix}rusa *@tag*
⠞🔥੭‎ ${usedPrefix}sixnine *@tag*
⠞🔥੭‎ ${usedPrefix}pies *@tag*
⠞🔥੭‎ ${usedPrefix}mamada *@tag*
⠞🔥੭‎ ${usedPrefix}lickpussy *@tag*
⠞🔥੭‎ ${usedPrefix}grabboobs *@tag*
⠞🔥੭‎ ${usedPrefix}suckboobs *@tag*
⠞🔥੭‎ ${usedPrefix}cum *@tag*
⠞🔥੭‎ ${usedPrefix}fap *@tag*
⠞🔥੭‎ ${usedPrefix}manosear *@tag*
⠞🔥੭‎ ${usedPrefix}lesbianas *@tag*

↷✦; \`STICKERS\` ❞ 🦋︵᷼ 
⠞🦋੭‎ ${usedPrefix}sticker *img*
⠞🦋੭‎ ${usedPrefix}sticker *vid*
⠞🦋੭‎ ${usedPrefix}brat *texto*
⠞🦋੭‎ ${usedPrefix}qc *texto*
⠞🦋੭‎ ${usedPrefix}dado

↷✦; \`RPG\` ❞ 💸︵᷼ 
⠞💸੭‎ ${usedPrefix}minar
⠞💸੭‎ ${usedPrefix}cofre
⠞💸੭ ${usedPrefix}slut
⠞💸੭ ${usedPrefix}nivel
⠞💸੭ ${usedPrefix}ruleta

↷✦; \`REGISTRO\` ❞ ☁️︵᷼ 
⠞☁️੭ ${usedPrefix}perfil
⠞☁️੭ ${usedPrefix}reg
⠞☁️੭ ${usedPrefix}unreg

↷✦; \`OWNER\` ❞ 👑︵᷼ 
⠞👑੭ ${usedPrefix}salir
⠞👑੭ ${usedPrefix}update
⠞👑੭ ${usedPrefix}blocklist
⠞👑੭ ${usedPrefix}grouplist
⠞👑੭ ${usedPrefix}restart
⠞👑੭ ${usedPrefix}join
⠞👑੭ ${usedPrefix}chetar
⠞👑੭ ${usedPrefix}unbanuser`.trim();

    conn.sendMessage(m.chat, {
      text: text,
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
    }, { quoted: m });

  } catch (e) {
    conn.reply(m.chat, '❎ Error en el comando. Inténtalo más tarde.', m);
  }
};

//handler.command = /^(menu|menú|memu|memú|help|info|comandos|2help|menu1.2|ayuda|commands|commandos|cmd)$/i;
handler.command = /^(men)$/i;
handler.fail = null;

export default handler;

function clockString(ms) {
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(':');
}