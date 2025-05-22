/*import yts from 'yt-search'


let handler = async(m, { conn, text, usedPrefix, command }) => {

  if (!text) return conn.reply(m.chat, `*${xsearch} Por favor, ingresa un texto para buscar en Youtube.*\n> *\`Ejemplo:\`* .${command} Bing Bang`, m);

  let results = await yts(text)
  let tes = results.videos

  if (!tes.length) throw '```⚠️ No se encontraron resultados.```'

  let ms = tes.map(v => `
° ${v.title}

≡ 🌵 *\`Duración:\`* ${v.timestamp}
≡ 🌴 *\`Publicado:\`* ${v.ago}
≡ 🍁 *\`Vistas:\`* ${v.views.toLocaleString()}
≡ 🌿 *\`Enlace:\`* ${v.url}
`.trim()).join('\n________________________\n\n')

  let teks = `\`\`\`乂 YOUTUBE - SEARCH\`\`\`\n\n${ms}`
  teks += `\n\n> sʜᴀᴅᴏᴡ ᴜʟᴛʀᴀ ᴍᴅ`

  conn.sendFile(m.chat, tes[0].image, 'yts.jpeg', teks, m)
}

handler.help = ['ytsearch'] 
handler.tags = ['buscador']
handler.command = ['ytsearch', 'yts']

export default handler*/

import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';
import yts from 'yt-search';

const handler = async (m, { conn, text }) => {
  if (!text) throw '⚠️ *Debes ingresar el nombre de un video para buscar.*';

  const results = await yts(text);
  const videos = results.videos.slice(0, 10);

  if (!videos.length) throw '⚠️ *No se encontraron resultados para tu búsqueda.*';

  const randomVideo = videos[Math.floor(Math.random() * videos.length)];

  const media = await prepareWAMessageMedia(
    { image: { url: randomVideo.thumbnail } },
    { upload: conn.waUploadToServer }
  );

  const interactiveMessage = {
    body: {
      text: `> *Resultados:* \`${videos.length}\`\n\n*${randomVideo.title}*\n\n≡ 🌵 *\`Autor:\`* ${randomVideo.author.name}\n≡ 🍁 *\`Vistas:\`* ${randomVideo.views.toLocaleString()}\n≡ 🌿 *\`Enlace:\`* ${randomVideo.url}`
    },
    footer: { text: 'sʜᴀᴅᴏᴡ ᴜʟᴛʀᴀ ᴍᴅ' },
    header: {
      title: '```乂 YOUTUBE - SEARCH```',
      hasMediaAttachment: true,
      imageMessage: media.imageMessage
    },
    nativeFlowMessage: {
      buttons: [
        {
          name: 'single_select',
          buttonParamsJson: JSON.stringify({
            title: 'Opciones de descarga',
            sections: videos.map(video => ({
              title: `${video.title}`,
              rows: [
                {
                  header: video.title,
                  title: video.author.name,
                  description: `Duración: ${video.timestamp} | Vistas: ${video.views.toLocaleString()}`,
                  id: `.ytmp3 ${video.url}`
                },
                {
                  header: video.title,
                  title: video.author.name,
                  description: `Duración: ${video.timestamp} | Publicado: ${video.ago}`,
                  id: `.ytmp4doc ${video.url}`
                }
              ]
            }))
          })
        }
      ],
      messageParamsJson: ''
    }
  };

  const userJid = conn?.user?.jid || m.key.participant || m.chat;
  const msg = generateWAMessageFromContent(m.chat, { interactiveMessage }, { userJid, quoted: m });
  conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
};

handler.help = ['ytx <texto>'];
handler.tags = ['search'];
handler.command = /^(ytm)$/i;

export default handler;