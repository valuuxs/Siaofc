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


import yts from 'yt-search';
import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

var handler = async (m, { text, conn, args, command, usedPrefix }) => {
    if (!text) return conn.reply(m.chat, `*[ 🔎 ] Por favor, ingresa una búsqueda de YouTube.*`, m);

    try {
        conn.reply(m.chat, '⏳ Buscando, espera un momento...', m);

        let results = await yts(text);
        let tes = results.all.filter(v => v.type === 'video').slice(0, 10);

        if (!tes.length) {
            return conn.reply(m.chat, `No se encontraron resultados para *${text}*`, m);
        }

        // Enviar el primer resultado como destacado
        const first = tes[0];
        const firstText = `*「🌷」Resultado Principal:*\n\n☕ *Título:* ${first.title}\n📡 *Canal:* ${first.author.name}\n🕝 *Duración:* ${first.timestamp}\n📆 *Subido:* ${first.ago}\n👀 *Vistas:* ${first.views}\n🔗 *Enlace:* ${first.url}`;
        await conn.sendFile(m.chat, first.thumbnail, 'yts.jpeg', firstText, m);

        // Crear lista interactiva estilo segundo código (por video)
        const sections = tes.map(video => ({
            title: video.title,
            rows: [
                {
                    header: video.title,
                    title: video.author.name,
                    description: 'Descargar MP3',
                    id: `${usedPrefix}ytmp3 ${video.url}`
                },
                {
                    header: video.title,
                    title: video.author.name,
                    description: 'Descargar MP4',
                    id: `${usedPrefix}ytmp4 ${video.url}`
                }
            ]
        }));

        const listMessage = {
            interactiveMessage: {
                body: { text: 'Selecciona una opción para descargar:' },
                footer: { text: 'Shadow Bot' },
                nativeFlowMessage: {
                    buttons: [
                        {
                            name: "single_select",
                            buttonParamsJson: JSON.stringify({
                                title: "OPCIONES DISPONIBLES",
                                sections: sections,
                            }),
                        }
                    ],
                    messageParamsJson: "{}",
                    messageVersion: 1
                }
            }
        };

        const message = generateWAMessageFromContent(m.chat, listMessage, { userJid: conn.user.id });
        await conn.relayMessage(m.chat, message.message, { messageId: message.key.id });

    } catch (error) {
        console.error(error);
        conn.reply(m.chat, 'Ocurrió un error al realizar la búsqueda. Intenta de nuevo más tarde.', m);
    }
};

handler.help = ['ytsearch']
handler.tags = ['buscador']
handler.command = ['ytss']
handler.register = true

export default handler;

