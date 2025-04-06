import axios from "axios";
import * as cheerio from "cheerio";

const pindl = {
    video: async (url) => {
        try {
            const { data: html } = await axios.get(url);
            const $ = cheerio.load(html);
            const script = $('script[data-test-id="video-snippet"]').html();

            if (!script) return null;
            const media = JSON.parse(script);

            if (
                media["@type"] === "VideoObject" &&
                media.contentUrl?.endsWith(".mp4")
            ) {
                const stats = media.interactionStatistic || [];
                return {
                    type: "video",
                    name: media.name,
                    description: media.description,
                    contentUrl: media.contentUrl,
                    thumbnailUrl: media.thumbnailUrl,
                    uploadDate: media.uploadDate,
                    duration: media.duration,
                    commentCount: media.commentCount,
                    likeCount: stats.find((s) =>
                        s.interactionType?.["@type"] === "https://schema.org/LikeAction"
                    )?.userInteractionCount,
                    watchCount: stats.find((s) =>
                        s.interactionType?.["@type"] === "https://schema.org/WatchAction"
                    )?.userInteractionCount,
                    creator: media.creator?.name,
                    creatorUrl: media.creator?.url,
                    keywords: media.keywords,
                };
            }
            return null;
        } catch {
            return { error: "Error al obtener datos del video." };
        }
    },

    image: async (url) => {
        try {
            const { data: html } = await axios.get(url);
            const $ = cheerio.load(html);
            const script = $('script[data-test-id="leaf-snippet"]').html();

            if (!script) return null;
            const media = JSON.parse(script);

            if (
                media["@type"] === "SocialMediaPosting" &&
                /\.(jpg|jpeg|png|webp)$/i.test(media.image || "")
            ) {
                return {
                    type: "image",
                    author: media.author?.name,
                    authorUrl: media.author?.url,
                    headline: media.headline,
                    articleBody: media.articleBody,
                    image: media.image,
                    datePublished: media.datePublished,
                    sharedContentUrl: media.sharedContent?.url,
                    isRelatedTo: media.isRelatedTo,
                    mainEntityOfPage: media.mainEntityOfPage?.["@id"],
                };
            }
            return null;
        } catch {
            return { error: "Error al obtener datos de la imagen." };
        }
    },

    gif: async (url) => {
        try {
            const { data: html } = await axios.get(url);
            const $ = cheerio.load(html);
            const script = $('script[data-test-id="leaf-snippet"]').html();

            if (!script) return null;
            const media = JSON.parse(script);

            if (
                media["@type"] === "SocialMediaPosting" &&
                media.image?.endsWith(".gif")
            ) {
                return {
                    type: "gif",
                    author: media.author?.name,
                    authorUrl: media.author?.url,
                    headline: media.headline,
                    articleBody: media.articleBody,
                    gif: media.image,
                    datePublished: media.datePublished,
                    sharedContentUrl: media.sharedContent?.url,
                    isRelatedTo: media.isRelatedTo,
                    mainEntityOfPage: media.mainEntityOfPage?.["@id"],
                };
            }
            return null;
        } catch {
            return { error: "Error al obtener datos del gif." };
        }
    },

    download: async (url) => {
        const video = await pindl.video(url);
        if (video) return video;

        const image = await pindl.image(url);
        if (image) return image;

        const gif = await pindl.gif(url);
        return gif || { error: "No se encontró ningún medio en el enlace." };
    }
};

const handler = async (m, { conn, text }) => {
    if (!text) throw "Falta el enlace de Pinterest.";

    if (!/^https?:\/\/(www\.)?pinterest\.[a-z.]+\/pin\//i.test(text)) {
        throw "El enlace proporcionado no es válido. Asegúrate de que sea un pin de Pinterest.";
    }

    await m.react('🟣');

    try {
        const result = await pindl.download(text);
        if (result.error) throw result.error;

        let caption = "";

        if (result.type === "video") {
            caption = `「✦」 *Video de Pinterest*\n\n✐ *Título:* ${result.name || "N/A"}\n🜸 *Link:* ${result.contentUrl}`;
            await conn.sendMessage(m.chat, {
                video: { url: result.contentUrl },
                caption
            }, { quoted: m });
        } else if (result.type === "image") {
            caption = `「✦」 *Imagen de Pinterest*\n\n✐ *Título:* ${result.headline || "N/A"}\n🜸 *Link:* ${result.image}`;
            await conn.sendMessage(m.chat, {
                image: { url: result.image },
                caption
            }, { quoted: m });
        } else if (result.type === "gif") {
            caption = `「✦」 *GIF de Pinterest*\n\n✐ *Título:* ${result.headline || "N/A"}\n🜸 *Link:* ${result.gif}`;
            await conn.sendMessage(m.chat, {
                video: { url: result.gif },
                caption
            }, { quoted: m });
        }

        await m.react('✅');
    } catch (err) {
        await m.react('❌');
        await conn.sendMessage(m.chat, {
            text: `Error al procesar el enlace: ${err}`
        }, { quoted: m });
    }
};

handler.help = ["pinterestdl <url>"];
handler.tags = ["descargas"];
handler.command = /^(pindl|pinterestdl)$/i;

export default handler;