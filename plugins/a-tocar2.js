import fs from 'fs'
import fetch from 'node-fetch'
import moment from 'moment-timezone'
import { promises } from 'fs'
import { join } from 'path'

let handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text, command }) => {
    try {
        await m.react('🎮')
        let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
        let perfil = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg')

        let taguser = '@' + m.sender.split("@s.whatsapp.net")[0]
        const videoUrl = 'https://files.catbox.moe/7ha109.mp4' // URL fija del video

        let menu = `
🌷 ¡Hᴏʟᴀ! ${taguser}
${ucapan()}

*˚₊·˚₊· ͟͟͞͞➳❥  Sʜʌᴅᴏ͟ᴡ Ɓᴏᴛ ᭃ*
*╭╌┈╼◈ ╰ 1.4.0 ╯◈╾┈╌★*
*│*
*╰ ˚₊·˚₊· ͟͟͞͞➳❥  Hᴇʌᴠ፝֟ᴇлʟʏ Ƭᴇᴀᴍ 彡*

╭─·˚₊· ͟͟͞͞꒰➳ *「 \`MENÚ FF\` 」*
┊⪩ .v4fem
┊⪩ .v4masc
┊⪩ .v4mixto
┊⪩ .v6fem
┊⪩ .v6masc
┊⪩ .v6mixto
┊⪩ .feminterna4
┊⪩ .mascinterna4
┊⪩ .mixtointerna4
┊⪩ .feminterna6
┊⪩ .mascinterna6
┊⪩ .mixtointerna6
┊⪩ .donarsala
┊⪩ .bermuda
┊⪩ .kalahari
┊⪩ .purgatorio
┊⪩ .nexterra
╰──────────── ·`.trim()

        await conn.sendMessage(m.chat, {
            video: { url: videoUrl }, // Video fijo
            caption: menu,
            contextInfo: {
                mentionedJid: [m.sender],
                isForwarded: true,
                forwardingScore: 999,
                externalAdReply: {
                    title: '⏤͟͞ू⃪ ፝͜⁞Sʜᴀᴅᴏᴡ✰⃔࿐\nSɪᴍᴘʟᴇ Bᴏᴛ Wʜᴀᴛsᴀᴘᴘ 💫',
                    thumbnailUrl: perfil,
                    mediaType: 1,
                    renderLargerThumbnail: false,
                },
            },
            gifPlayback: true,
            gifAttribution: 0
        }, { quoted: null })
    } catch (e) {
        await m.reply(`*[ ℹ️ ] Ocurrió un error al enviar el menú.*\n\n${e}`)
    }
}

handler.help = ['menuff']
handler.tags = ['main']
handler.command = ['menuff2', 'ff2'] 
handler.register = false
export default handler