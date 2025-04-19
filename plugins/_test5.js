export default {
  async before(m, { conn }) {
    if (!conn.sendMini) {
      conn.sendMini = async function (
        jid,
        title,
        body = '',
        text = '',
        thumbnailUrl = '',
        thumbnail = '',
        sourceUrl = '',
        quoted = null,
        LargerThumbnail = true
      ) {
        return conn.sendMessage(jid, {
          text,
          contextInfo: {
            mentionedJid: await conn.parseMention(text),
            externalAdReply: {
              title: title,
              body: body,
              mediaType: 1,
              previewType: 0,
              renderLargerThumbnail: LargerThumbnail,
              thumbnailUrl: typeof thumbnailUrl === 'string' ? thumbnailUrl : undefined,
              thumbnail: thumbnail instanceof Buffer ? thumbnail : undefined,
              sourceUrl: sourceUrl
            }
          }
        }, { quoted });
      };
    }
  }
};