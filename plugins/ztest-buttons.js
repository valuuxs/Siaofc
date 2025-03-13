
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



import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';
import { randomBytes } from 'crypto';

const handler = async (m, { conn }) => {
    try {
        // Preparar la imagen para el encabezado del mensaje
        const { imageMessage } = await prepareWAMessageMedia({
            image: { url: "https://i.pinimg.com/736x/1c/b9/dc/1cb9dce731c1544b0bd018b02567fd1f.jpg" }
        }, { upload: conn.waUploadToServer });

        // Secciones para las opciones interactivas
        const sections = [
            {
                title: "Opciones de Descarga",
                rows: [
                    {
                        title: 'Descargar en Audio',
                        description: "Descarga el audio del video",
                        id: ".ytmp3 https://youtube.com/xxxx"
                    },
                    {
                        title: 'Descargar en Video',
                        description: "Descarga el video en formato MP4",
                        id: ".ytmp4 https://youtube.com/xxxx"
                    },
                ],
            },
        ];

        // Contenido del mensaje interactivo
        const messageContent = {
            interactiveMessage: {
                body: { text: 'Selecciona una opción para descargar:' },
                footer: { text: 'Shadow Bot' },
                header: {
                    title: 'Descargas de YouTube',
                    subtitle: 'Selecciona el formato que deseas',
                    hasMediaAttachment: true,
                    documentMessage: {
                        ...imageMessage,
                        pageCount: 1,
                        fileLength: 99999999999,
                        fileName: 'descarga',
                        jpegThumbnail: imageMessage.jpegThumbnail
                    },
                },
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
    }
};

// Manejador para capturar respuestas de botones
const handleButtonResponse = async (m, conn) => {
    try {
        if (m.message?.interactiveResponseMessage) {
            const selectedId = m.message.interactiveResponseMessage.singleSelectReply.selectedRowId;

            if (selectedId.startsWith('.ytmp3') || selectedId.startsWith('.ytmp4')) {
                // Confirmación de selección
                await conn.reply(m.chat, `Procesando tu solicitud: ${selectedId}`, m);

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
                await conn.reply(m.chat, 'Opción no reconocida.', m);
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

handler.command = ["tes"];

export { handler, setupButtonHandler };
export default handler;