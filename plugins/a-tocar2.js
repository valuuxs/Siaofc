import { generateWAMessageContent, generateWAMessageFromContent, proto } from '@whiskeysockets/baileys';

let handler = async (m, { conn }) => {
  const message = "👋 ¡Hola! ¿Qué opción eliges?";

  let push = [];

  let opciones = [
    { title: "Opción 1", desc: "Esto es la opción 1", command: ".opcion1" },
    { title: "Opción 2", desc: "Esto es la opción 2", command: ".opcion2" },
    { title: "Opción 3", desc: "Esto es la opción 3", command: ".opcion3" },
  ];

  for (let op of opciones) {
    push.push({
      body: proto.Message.InteractiveMessage.Body.fromObject({
        text: `◦ *${op.title}*\n${op.desc}`
      }),
      footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: '' }),
      header: proto.Message.InteractiveMessage.Header.fromObject({
        title: '',
        hasMediaAttachment: false
      }),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
        buttons: [
          {
            "name": "cta_copy",
            "buttonParamsJson": `{\"display_text\":\"Seleccionar\",\"id\":\"123\",\"copy_code\":\"${op.command}\"}`
          }
        ]
      })
    });
  }

  const msg = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
          body: proto.Message.InteractiveMessage.Body.create({ text: message }),
          footer: proto.Message.InteractiveMessage.Footer.create({ text: 'Selecciona una opción:' }),
          header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
          carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards: [...push] })
        })
      }
    }
  }, { quoted: m });

  await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
};

handler.command = ['menuprueba'];
export default handler;