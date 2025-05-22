/*import { sticker } from '../lib/sticker.js'

const estilos = [
  { nombre: 'Fluffy Logo', id: 'fluffy-logo' },
  { nombre: 'Runner Logo', id: 'runner-logo' },
  { nombre: 'Smurfs Logo', id: 'smurfs-logo' },
  { nombre: 'Sketch Name', id: 'sketch-name' }
]

let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    const index = parseInt(args[0]) - 1
    const texto = args.slice(1).join(' ')

    if (isNaN(index) || index < 0 || index >= estilos.length || !texto) {
      let listado = estilos
        .map((e, i) => `${i + 1}. *${e.nombre}*`)
        .join('\n')
      throw `*${xsticker} Por favor, ingresa el comando más la opcion y el texto.*\n> *\`Ejemplo:\`* ${usedPrefix + command} 2 Hello Word\n\n\`Estilos Disponibles:\`\n${listado}`
    }

    if (texto.length > 30) throw '*⚠️ El texto es demasiado largo. Usa 30 caracteres o menos.*'

    const estilo = estilos[index].id
    const url = `https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=${estilo}&text=${encodeURIComponent(texto)}`
    const stiker = await sticker(null, url, estilos[index].nombre, 'Shadow Ultra - MD')

    if (!stiker) throw '*✖️ No se pudo generar el sticker. Intenta con otro texto.*'

    await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
  } catch (e) {
    console.error(e) // Mostrar detalles en consola para debug
    m.reply(typeof e === 'string' ? e : 'Ocurrió un error al procesar tu solicitud. Intenta nuevamente.')
  }
}

handler.help = ['flamestick <número_estilo> <texto>']
handler.tags = ['sticker']
handler.command = /^(flamestick|flame)$/i

export default handler*/

/*

import { prepareWAMessageMedia, generateWAMessageFromContent, getDevice } from '@whiskeysockets/baileys'
import yts from 'yt-search';
import fs from 'fs';

const handler = async (m, { conn, text, usedPrefix: prefijo }) => {
  const device = await getDevice(m.key.id);

  if (!text) throw '⚠️ *Debes ingresar el nombre de un video para buscar.*';

  const results = await yts(text);
  const videos = results.videos.slice(0, 10);

  if (!videos.length) throw '⚠️ *No se encontraron resultados para tu búsqueda.*';

  // Si es móvil
  if (device === 'android' || device === 'ios') {
    const randomIndex = Math.floor(Math.random() * videos.length);
    const randomVideo = videos[randomIndex];

    const messa = await prepareWAMessageMedia({ image: { url: randomVideo.thumbnail } }, { upload: conn.waUploadToServer });

    const interactiveMessage = {
      body: {
        text: `*Resultados obtenidos:* ${results.videos.length}\n*◉ Video aleatorio:*\n*-› Título:* ${randomVideo.title}\n*-› Autor:* ${randomVideo.author.name}\n*-› Vistas:* ${randomVideo.views}\n*-› Enlace:* ${randomVideo.url}`.trim()
      },
      footer: { text: dev },
      header: {
        title: '*< YouTube Search />*',
        hasMediaAttachment: true,
        imageMessage: messa.imageMessage,
      },
      nativeFlowMessage: {
        buttons: [
          {
            name: 'single_select',
            buttonParamsJson: JSON.stringify({
              title: 'OPCIONES DISPONIBLES',
              sections: videos.map(video => ({
                title: video.title,
                rows: [
                  {
                    header: video.title,
                    title: video.author.name,
                    description: 'Descargar MP3',
                    id: `.ytmp3 ${video.url}`
                  },
                  {
                    header: video.title,
                    title: video.author.name,
                    description: 'Descargar MP4',
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

    const msg = generateWAMessageFromContent(m.chat, { interactiveMessage }, { userJid: conn.user.jid, quoted: m });
    conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
  
  } else {
    // Si es web o desktop
    const teks = results.all.map((v) => {
      if (v.type === 'video') {
        return `° *_${v.title}_*
↳ 🫐 *Enlace:* ${v.url}
↳ 🕒 *Duración:* ${v.timestamp}
↳ 📥 *Subido hace:* ${v.ago}
↳ 👁 *Vistas:* ${v.views}`;
      }
    }).filter(Boolean).join('\n\n◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦\n\n');

    conn.sendFile(m.chat, results.all[0].thumbnail, 'resultado.jpg', teks.trim(), m);
  }
};

handler.help = ['ytsearch <texto>'];
handler.tags = ['search'];
handler.command = /^(ytx)$/i;
export default handler;*/


import { generateWAMessageFromContent } from '@whiskeysockets/baileys';
import yts from 'yt-search';

const handler = async (m, { conn, text }) => {

  if (!text) throw '⚠️ *Debes ingresar el nombre de un video para buscar.*';

  const results = await yts(text);
  const videos = results.videos.slice(0, 10);

  if (!videos.length) throw '⚠️ *No se encontraron resultados para tu búsqueda.*';

  const randomIndex = Math.floor(Math.random() * videos.length);
  const randomVideo = videos[randomIndex];

  // Envía la imagen con info
  await conn.sendFile(
    m.chat,
    randomVideo.thumbnail,
    'video.jpg',
    `*Resultados obtenidos:* ${results.videos.length}\n*◉ Video aleatorio:*\n*-› Título:* ${randomVideo.title}\n*-› Autor:* ${randomVideo.author.name}\n*-› Vistas:* ${randomVideo.views}\n*-› Enlace:* ${randomVideo.url}`,
    m
  );

  const interactiveMessage = {
    body: {
      text: 'Selecciona una opción para descargar:'
    },
    footer: { text: dev },
    header: {
      title: '```乂 YOUTUBE - SEARCH```',
      hasMediaAttachment: false
    },
    nativeFlowMessage: {
      buttons: [
        {
          name: 'single_select',
          buttonParamsJson: JSON.stringify({
            title: 'Opciones de Descarga',
            sections: videos.map(video => ({
              title: video.title,
              rows: [
                {
                  header: video.title,
                  title: video.author.name,
                  description: 'Descargar MP3',
                  id: `.ytmp3 ${video.url}`
                },
                {
                  header: video.title,
                  title: video.author.name,
                  description: 'Descargar MP4',
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

handler.help = ['ytsearch <texto>'];
handler.tags = ['search'];
handler.command = /^(ytx)$/i;
export default handler;