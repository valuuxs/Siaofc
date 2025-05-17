/*import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw m.reply(`*📀 Por favor, ingresa el enlace o nombre de una canción de Spotify.*\n> *\`Ejemplo:\`* ${usedPrefix + command} https://open.spotify.com/track/0tCl47vT1ac7uzy4gaY0p3`);
await m.react('⌛');
let ouh = await fetch(`https://api.nekorinn.my.id/downloader/spotifyplay?q=${text}`)
let gyh = await ouh.json()
let { downloadUrl, metadata } = gyh.result
let { title, artist, duration, imageUrl } = metadata
m.reply("*Enviando \`\`\`"+title+" "+artist+"... ("+duration+")\`\`\`")
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
handler.command = ['spotify2', 'spotifydl2', 'spdl2', 'sp2']

export default handler*/