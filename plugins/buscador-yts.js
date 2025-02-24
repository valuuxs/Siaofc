import fetch from 'node-fetch';
import yts from "yt-search";
import axios from 'axios';
import FormData from "form-data";
import Jimp from "jimp";
import { generateWAMessageContent, generateWAMessageFromContent, proto, getWAUploadToServer } from '@whiskeysockets/baileys';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`• *Ejemplo:* ${usedPrefix + command} elaina edit`);

    await m.reply('> _*`Cargando...`*_');

    const uploadToServer = getWAUploadToServer(conn);

    async function createImage(img) {
        const { imageMessage } = await generateWAMessageContent({ image: img }, { upload: uploadToServer });
        return imageMessage;
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    let push = [];
    let results = await yts(text);
    let videos = results.videos.slice(0, 6);
    shuffleArray(videos);

    let i = 1;
    for (let video of videos) {
        let imageUrl = video.thumbnail;
        let imageK = await fetch(imageUrl);
        let imageB = await imageK.buffer();
        let pr = await remini(imageB, "enhance");

        push.push({
            body: { text: `🎬 *Título:* ${video.title}\n⌛ *Duración:* ${video.timestamp}\n👀 *Vistas:* ${video.views}` },
            footer: { text: '乂 Y O U T U B E' },
            header: { title: `Video - ${i++}`, hasMediaAttachment: true, imageMessage: await createImage(pr) },
            nativeFlowMessage: {
                buttons: [
                    {
                        "name": "cta_url",
                        "buttonParamsJson": JSON.stringify({ "display_text": "Mirar en YouTube", "url": video.url })
                    },
                    {
                        "name": "cta_copy",
                        "buttonParamsJson": JSON.stringify({ "display_text": "Copiar Link", "copy_code": video.url })
                    }
                ]
            }
        });
    }

    const bot = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
                interactiveMessage: {
                    body: { text: "Resultados de la búsqueda completos..." },
                    footer: { text: wm },
                    header: { hasMediaAttachment: false },
                    carouselMessage: { cards: push }
                }
            }
        }
    }, {});

    await conn.relayMessage(m.chat, bot.message, { messageId: bot.key.id });
}

handler.help = ["ytslide *<consulta>*", "yts *<consulta>*"];
handler.tags = ["search"];
handler.command = ["ytslide", "yts"];

export default handler;

async function remini(imageData, operation) {
    return new Promise(async (resolve, reject) => {
        const availableOperations = ["enhance", "recolor", "dehaze"];
        operation = availableOperations.includes(operation) ? operation : "enhance";
        
        const baseUrl = `https://inferenceengine.vyro.ai/${operation}.vyro`;
        const formData = new FormData();
        formData.append("image", Buffer.from(imageData), { filename: "enhance_image_body.jpg", contentType: "image/jpeg" });
        formData.append("model_version", 1, { "Content-Transfer-Encoding": "binary", contentType: "multipart/form-data; charset=utf-8" });

        formData.submit({
            url: baseUrl, host: "inferenceengine.vyro.ai", path: `/${operation}`, protocol: "https:",
            headers: { "User-Agent": "okhttp/4.9.3", Connection: "Keep-Alive", "Accept-Encoding": "gzip" }
        }, (err, res) => {
            if (err) reject(err);
            const chunks = [];
            res.on("data", chunk => chunks.push(chunk));
            res.on("end", () => resolve(Buffer.concat(chunks)));
            res.on("error", err => reject(err));
        });
    });
}