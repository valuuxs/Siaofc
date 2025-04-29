import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw m.reply(`🧇 Por favor, ingresa el enlace o nombre de una canción de Spotify.`);
await m.react('🕒');
let ouh = await fetch(`https://api.nekorinn.my.id/downloader/spotifyplay?q=${text}`)
let gyh = await ouh.json()
let { downloadUrl, metadata } = gyh.result
let { title, artist, duration, imageUrl } = metadata
m.reply(" 🌟 Enviando, _*"+title+" "+artist+"... ("+duration+")*_")
            await conn.sendMessage(m.chat, {
                audio: {
                    url: downloadUrl
                },
                mimetype: 'audio/mpeg',
                ptt: false,
                contextInfo: {
                    externalAdReply: {
                        title: title,
                        body: artist,
                        thumbnailUrl: imageUrl,
                        sourceUrl: downloadUrl,
                        mediaType: 1,
                        showAdAttribution: true,
                        renderLargerThumbnail: true
                    }
                }
            }, {
                quoted: fkontak
            });

//await conn.sendMessage(m.chat, { audio: { url: gyh.result.downloadUrl }, mimetype: 'audio/mpeg' }, { quoted: m });
await m.react('✅');
}
handler.help = ['spv2 *<texto/link>*']
handler.tags = ['descargas']
handler.command = ['spv2']

export default handler