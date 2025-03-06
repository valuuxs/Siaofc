import axios from 'axios';
const {
  generateWAMessageContent,
  generateWAMessageFromContent,
  proto
} = (await import("@whiskeysockets/baileys"))["default"];

let handler = async (m, { conn, text }) => {
  if (!text) {
    return m.reply("☁️ Ingresa el texto de lo que quieres buscar en Pinterest.");
  }

  const author = "Bot de WhatsApp";

  async function createImageMessage(url) {
    const { imageMessage } = await generateWAMessageContent(
      { image: { url } },
      { upload: conn.waUploadToServer }
    );
    return imageMessage;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  try {
    let { data } = await axios.get(
      `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(text)}`
    );

    let imageUrls = (data?.resource_response?.data?.results || [])
      .map((item) => item.images?.orig?.url)
      .filter((url) => url);

    if (imageUrls.length === 0) {
      return m.reply("⚠️ No se encontraron imágenes para '" + text + "'.");
    }

    shuffleArray(imageUrls);
    let selectedImages = imageUrls.slice(0, 10);

    let imagesWithAttachments = await Promise.all(
      selectedImages.map(async (url, index) => ({
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: "Imagen - " + (index + 1),
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: author,
        }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: '',
          hasMediaAttachment: true,
          imageMessage: await createImageMessage(url),
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: [
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "Ver en Pinterest 📫",
                Url: `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(text)}`,
                merchant_url: `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(text)}`,
              }),
            },
          ],
        }),
      }))
    );

    const messageContent = generateWAMessageFromContent(
      m.chat,
      {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2,
            },
            interactiveMessage: proto.Message.InteractiveMessage.fromObject({
              body: proto.Message.InteractiveMessage.Body.create({
                text: "☁️ Resultado de: " + text,
              }),
              footer: proto.Message.InteractiveMessage.Footer.create({
                text: "Pinterest | Search",
              }),
              header: proto.Message.InteractiveMessage.Header.create({
                hasMediaAttachment: false,
              }),
              carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                cards: imagesWithAttachments,
              }),
            }),
          },
        },
      },
      { quoted: m }
    );

    await conn.relayMessage(m.chat, messageContent.message, {
      messageId: messageContent.key.id,
    });
  } catch (error) {
    console.error(error);
    m.reply("❌ Ocurrió un error al buscar en Pinterest.");
  }
};

handler.help = ["pinterest *<texto>*"];
handler.tags = ["search"];
handler.command = /^(pinterest)$/i;

export default handler;