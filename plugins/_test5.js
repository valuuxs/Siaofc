// sendMini.js

/**
 * send Mini Message with image, title, body, and button
 * @param {String} jid - The chat ID where the message will be sent
 * @param {String} title - The title for the message
 * @param {String} body - The body text for the message
 * @param {String} [text=''] - Additional text (optional)
 * @param {String} thumbnailUrl - URL for the thumbnail image
 * @param {Buffer|String} thumbnail - Thumbnail image in buffer or URL format
 * @param {String} sourceUrl - URL linked to the external content
 * @param {Object} [quoted=null] - The quoted message (optional)
 * @param {Boolean} [LargerThumbnail=true] - Flag for using larger thumbnail (optional)
 */
async function sendMini(jid, title, body, text = '', thumbnailUrl, thumbnail, sourceUrl, quoted = null, LargerThumbnail = true) {
    try {
        const messageOptions = {
            contextInfo: {
                mentionedJid: await conn.parseMention(text),
                externalAdReply: {
                    title: title,
                    body: body,
                    mediaType: 1,
                    previewType: 0,
                    renderLargerThumbnail: LargerThumbnail,
                    thumbnailUrl: thumbnailUrl,
                    thumbnail: thumbnailUrl,
                    sourceUrl: sourceUrl
                }
            },
            text
        };

        await conn.sendMessage(jid, messageOptions, { quoted });
    } catch (error) {
        console.error('Error sending mini message:', error);
    }
}

module.exports = sendMini;