
//Buttons - Message Im Interactive
/*
let handler = async (m, { conn }) => {
    let imageUrl = 'https://files.catbox.moe/ilr818.jpg';

    conn.sendMessage(m.chat, { 
        image: { url: imageUrl }, 
        caption: 'Hola usuario de WhatsApp esto solo es un test de botones que no tiene nada que ver con lo demás.', 
        footer: '© Տһᥲძᨣᥕ Ɓᨣƚ Uᥣ𝗍rᥲ', 
        buttons: [
            {
                buttonId: `.ping`,
                buttonText: { displayText: 'ᯓᡣ𐭩 ⍴іᥒg' }
            }
        ],
        viewOnce: true,
        headerType: 4
    }, { quoted: m });
}

handler.tag = ['test'];
handler.help = ['p'];
handler.command = ['buttontest'];

export default handler;
/*
// Buttons Ix

let handler = async (m, { conn }) => {

    conn.sendMessage(m.chat, { 
        text: 'TITLE', 
        footer: dev, 
        buttons: [
            {
                buttonId: `.owner`,
                buttonText: { displayText: 'Owner' },
                type: 1
            }
        ],
        viewOnce: true
    }, { quoted: m });
}

handler.tag = ['info'];
handler.help = ['p'];
handler.command = ['p'];
*/


import yts from 'yt-search';
import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';
import { randomBytes } from 'crypto';

// Comando principal para búsqueda y opciones interactivas
const handler = async (m, { conn, text }) => {
    if (!text) {
        return conn.reply(m.chat, `*[🔎] Por favor, ingresa una búsqueda de YouTube.*`, m);
    }

    try {
        // Respuesta inicial de espera
        await conn.reply(m.chat, '🔍 Buscando en YouTube...', m);

        // Realizar la búsqueda en YouTube
        const results = await yts(text);
        const videos = results.all;

        if (!videos || videos.length === 0) {
            return conn.reply(m.chat, `❌ No se encontraron resultados para *${text}*`, m);
        }

        const first = videos[0]; // Primer resultado para mostrar
        const firstText = `*「🌷」Resultado Principal:*\n\n` +
            `☕ *Título:* ${first.title}\n` +
            `📡 *Canal:* ${first.author.name}\n` +
            `🕝 *Duración:* ${first.timestamp}\n` +
            `📆 *Subido:* ${first.ago}\n` +
            `👀 *Vistas:* ${first.views}\n` +
            `🔗 *Enlace:* ${first.url}`;

        // Enviar el primer resultado con su miniatura
        await conn.sendFile(m.chat, first.thumbnail, 'yts.jpeg', firstText, m);

        // Generar secciones dinámicas con las URLs de los resultados
        const sections = [
            {
                title: "Descargar en Audio",
                rows: videos.map(video => ({
                    title: video.title,
                    description: `Duración: ${video.timestamp} | Vistas: ${video.views}`,
                    id: `.ytmp3 ${video.url}`
                }))
            },
            {
                title: "Descargar en Video",
                rows: videos.map(video => ({
                    title: video.title,
                    description: `Duración: ${video.timestamp} | Vistas: ${video.views}`,
                    id: `.ytmp4 ${video.url}`
                }))
            }
        ];

        // Contenido del mensaje interactivo
        const messageContent = {
            interactiveMessage: {
                body: { text: '🎵 Selecciona una opción para descargar:' },
                footer: { text: 'Shadow Bot' },
                nativeFlowMessage: {
                    buttons: [
                        {
                            name: "single_select",
                            buttonParamsJson: JSON.stringify({
                                title: "Opciones de Descarga",
                                sections: sections,
                            }),
                        }
                    ],
                    messageParamsJson: "{}",
                    messageVersion: 1
                }
            },
            messageContextInfo: {
                messageSecret: randomBytes(32)
            }
        };

        // Enviar el mensaje interactivo
        const message = generateWAMessageFromContent(m.chat, messageContent, { userJid: conn.user.id });
        await conn.relayMessage(m.chat, message.message, { messageId: message.key.id });

    } catch (error) {
        console.error("Error al enviar el mensaje interactivo:", error);
        conn.reply(m.chat, '❌ Ocurrió un error al realizar la búsqueda. Intenta de nuevo más tarde.', m);
    }
};

// Manejador para procesar respuestas de botones
const handleButtonResponse = async (m, conn) => {
    try {
        if (m.message?.interactiveResponseMessage) {
            const selectedId = m.message.interactiveResponseMessage.singleSelectReply.selectedRowId;

            if (selectedId.startsWith('.ytmp3') || selectedId.startsWith('.ytmp4')) {
                // Confirmación de selección
                await conn.reply(m.chat, `🎶 Procesando tu solicitud: ${selectedId}`, m);

                // Simular que el usuario escribió el comando para que el bot lo procese
                m.text = selectedId;
                await conn.executeCommand(m, {
                    conn,
                    text: selectedId.split(' ')[1],
                    args: [selectedId.split(' ')[1]],
                    command: selectedId.split(' ')[0],
                    usedPrefix: '.'
                });
            } else {
                await conn.reply(m.chat, '❌ Opción no reconocida.', m);
            }
        }
    } catch (error) {
        console.error('Error al procesar la respuesta del botón:', error);
    }
};

// Escuchar interacciones de botones
const setupButtonHandler = (conn) => {
    conn.ev.on('messages.upsert', async (chatUpdate) => {
        const m = chatUpdate.messages[0];
        if (!m || !m.message || m.key.fromMe) return;
        await handleButtonResponse(m, conn);
    });
};

handler.command = ["ytxx"];
export { handler, setupButtonHandler };
export default handler;