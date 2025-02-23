import fs from 'fs'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
import { promises } from 'fs'
import { join } from 'path'

let handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text, command }) => {
    try {
    let { exp, estrellas, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    exp = exp || 'Desconocida';
    role = role || 'Aldeano';

        await m.react('🍃')
        let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
        let perfil = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://files.catbox.moe/pk3xxk.jpg')

        const videoUrl = 'https://files.catbox.moe/7ha109.mp4' // URL fija del video

        let menu = `
🌷 ¡Hᴏʟᴀ! ${taguser}
${saludo}

*˚₊·˚₊· ͟͟͞͞➳❥  Sʜʌᴅᴏ͟ᴡ Ɓᴏᴛ ᭃ*
*╭╌┈╼◈ ╰ 3.0.0 ╯◈╾┈╌★*
*│*
*╰ ˚₊·˚₊· ͟͟͞͞➳❥  Hᴇʌᴠ፝֟ᴇлʟʏ Ƭᴇᴀᴍ 彡*

*☕ Creador:* Cristian Escobar
*✳️ Exp:* ${exp}
*🪙 Coins:* ${estrellas}
*🔆 Nivel:* ${level}
*💫 Rango:* ${role}

*⏰ Tiempo:* muptime
*👥 Usuarios:* totalreg
*🆙 Versión:* 3.0.0

ㅤ ㅤ   乂 *ʟɪsᴛᴀ ᴅᴇ ᴄᴏᴍᴀɴᴅᴏs* 乂

𓂂𓏸  𐅹੭੭   *\`mᥱᥒᥙs\`*   🍃ᩚ꤬ᰨᰍ
ര ׄ 🍃˚ ${usedPrefix}menunsfw
ര ׄ 🍃˚ ${usedPrefix}menuaudios
ര ׄ 🍃˚ ${usedPrefix}menuff
ര ׄ 🍃˚ ${usedPrefix}menuowner
ര ׄ 🍃˚ ${usedPrefix}menulogos

𓂂𓏸  𐅹੭੭   *\`іᥒ𝖿᥆\`*   🍃ᩚ꤬ᰨᰍ
ര ׄ 🍃˚ ${usedPrefix}grupos
ര ׄ 🍃˚ ${usedPrefix}owner
ര ׄ 🍃˚ ${usedPrefix}ping
ര ׄ 🍃˚ ${usedPrefix}uptime
ര ׄ 🍃˚ ${usedPrefix}horario
ര ׄ 🍃˚ ${usedPrefix}precios

𓂂𓏸  𐅹੭੭   *\`ძᥱsᥴᥲrgᥲs\`*   🍃ᩚ꤬ᰨᰍ
ര ׄ 🍃˚ ${usedPrefix}play *texto*
ര ׄ 🍃˚ ${usedPrefix}aplay *texto*
ര ׄ 🍃˚ ${usedPrefix}aplay2 *texto*
ര ׄ 🍃˚ ${usedPrefix}yta *texto*
ര ׄ 🍃˚ ${usedPrefix}ytv *texto*
ര ׄ 🍃˚ ${usedPrefix}apk *texto*
ര ׄ 🍃˚ ${usedPrefix}pinterest *texto*
ര ׄ 🍃˚ ${usedPrefix}tiktok *url*
ര ׄ 🍃˚ ${usedPrefix}tiktok2 *url*
ര ׄ 🍃˚ ${usedPrefix}instagram *url*
ര ׄ 🍃˚ ${usedPrefix}facebook *url*
ര ׄ 🍃˚ ${usedPrefix}mediafire *url*
ര ׄ 🍃˚ ${usedPrefix}mega *url*
ര ׄ 🍃˚ ${usedPrefix}playstore *url*
ര ׄ 🍃˚ ${usedPrefix}xnxxdl *url*
ര ׄ 🍃˚ ${usedPrefix}xvideosdl *url*
ര ׄ 🍃˚ ${usedPrefix}pornhubdl *url*

𓂂𓏸  𐅹੭੭   *\`ᑲᥙsᥴᥲძ᥆rᥱs\`*   🍃ᩚ꤬ᰨᰍ
ര ׄ 🍃˚ ${usedPrefix}scsearch *texto*
ര ׄ 🍃˚ ${usedPrefix}tiktoksearch *texto*
ര ׄ 🍃˚ ${usedPrefix}ytsearch*
ര ׄ 🍃˚ ${usedPrefix}githubsearch *texto*
ര ׄ 🍃˚ ${usedPrefix}pssearch *texto*
ര ׄ 🍃˚ ${usedPrefix}xnxxsearch *texto*
ര ׄ 🍃˚ ${usedPrefix}xvsearch *texto*
ര ׄ 🍃˚ ${usedPrefix}phsearch *texto*

𓂂𓏸  𐅹੭੭   *\`ᥣіs𝗍ᥲs\`*   🍃ᩚ꤬ᰨᰍ
ര ׄ 🍃˚ ${usedPrefix}infem4 *hr + p*
ര ׄ 🍃˚ ${usedPrefix}inmasc4 *hr + p *
ര ׄ 🍃˚ ${usedPrefix}inmixto4 *hr + p*
ര ׄ 🍃˚ ${usedPrefix}infem6 *hr + p*
ര ׄ 🍃˚ ${usedPrefix}inmasc6 *hr + p*
ര ׄ 🍃˚ ${usedPrefix}inmixto6 *hr + p*

𓂂𓏸  𐅹੭੭   *\`ᥴ᥆ᥒ᥎ᥱr𝗍іძ᥆rᥱs\`*   🍃ᩚ꤬ᰨᰍ
ര ׄ 🍃˚ ${usedPrefix}tourl *img*
ര ׄ 🍃˚ ${usedPrefix}tourl *aud*
ര ׄ 🍃˚ ${usedPrefix}tourl *vid*
ര ׄ 🍃˚ ${usedPrefix}tomp3 *vid*
ര ׄ 🍃˚ ${usedPrefix}toimg *sticker*

𓂂𓏸  𐅹੭੭   *\`һᥱrrᥲmіᥱᥒ𝗍ᥲs\`*   🍃ᩚ꤬ᰨᰍ
ര ׄ 🍃˚ ${usedPrefix}inspect *link*
ര ׄ 🍃˚ ${usedPrefix}clima *texto*
ര ׄ 🍃˚ ${usedPrefix}readmore *texto*
ര ׄ 🍃˚ ${usedPrefix}imgg2 *texto*
ര ׄ 🍃˚ ${usedPrefix}hd *img*
ര ׄ 🍃˚ ${usedPrefix}whatmusic *aud*
ര ׄ 🍃˚ ${usedPrefix}whatmusic *vid*

𓂂𓏸  𐅹੭੭   *\`grᥙ⍴᥆s\`*   🍃ᩚ꤬ᰨᰍ
ര ׄ 🍃˚ ${usedPrefix}add *número*
ര ׄ 🍃˚ ${usedPrefix}grupo *abrir / cerrar*
ര ׄ 🍃˚ ${usedPrefix}grouptime *tiempo*
ര ׄ 🍃˚ ${usedPrefix}notify *texto*
ര ׄ 🍃˚ Aviso *texto*
ര ׄ 🍃˚ ${usedPrefix}todos *texto*
ര ׄ 🍃˚ ${usedPrefix}setwelcome *texto*
ര ׄ 🍃˚ ${usedPrefix}setbye *texto*
ര ׄ 🍃˚ ${usedPrefix}promote *@tag*
ര ׄ 🍃˚ ${usedPrefix}demote *@tag*
ര ׄ 🍃˚ ${usedPrefix}kick *@tag*
ര ׄ 🍃˚ ${usedPrefix}inactivos *opción*
ര ׄ 🍃˚ ${usedPrefix}link
ര ׄ 🍃˚ ${usedPrefix}sorteo
ര ׄ 🍃˚ ${usedPrefix}fantasmas

𓂂𓏸  𐅹੭੭   *\`ᥱ𝖿ᥱᥴ𝗍᥆s\`*   🍃ᩚ꤬ᰨᰍ
ര ׄ 🍃˚ ${usedPrefix}bass
ര ׄ 🍃˚ ${usedPrefix}blown
ര ׄ 🍃˚ ${usedPrefix}deep
ര ׄ 🍃˚ ${usedPrefix}earrape
ര ׄ 🍃˚ ${usedPrefix}fast
ര ׄ 🍃˚ ${usedPrefix}smooth
ര ׄ 🍃˚ ${usedPrefix}tupai
ര ׄ 🍃˚ ${usedPrefix}nightcore

𓂂𓏸  𐅹੭੭   *\`ძі᥎ᥱrsі᥆ᥒ\`*   🍃ᩚ꤬ᰨᰍ
ര ׄ 🍃˚ ${usedPrefix}gay *@tag*
ര ׄ 🍃˚ ${usedPrefix}lesbiana *@tag*
ര ׄ 🍃˚ ${usedPrefix}pajero *@tag*
ര ׄ 🍃˚ ${usedPrefix}pajera *@tag*
ര ׄ 🍃˚ ${usedPrefix}puto *@tag*
ര ׄ 🍃˚ ${usedPrefix}puta *@tag*
ര ׄ 🍃˚ ${usedPrefix}manco *@tag*
ര ׄ 🍃˚ ${usedPrefix}manca *@tag*
ര ׄ 🍃˚ ${usedPrefix}rata *@tag*
ര ׄ 🍃˚ ${usedPrefix}prostituto *@tag*
ര ׄ 🍃˚ ${usedPrefix}prostituta *@tag*
ര ׄ 🍃˚ ${usedPrefix}doxear *@tag*
ര ׄ 🍃˚ ${usedPrefix}jalamela *@tag*
ര ׄ 🍃˚ ${usedPrefix}simi *texto*
ര ׄ 🍃˚ ${usedPrefix}piropo
ര ׄ 🍃˚ ${usedPrefix}chiste
ര ׄ 🍃˚ ${usedPrefix}facto

𓂂𓏸  𐅹੭੭   *\`ȷᥙᥱg᥆s\`*   🍃ᩚ꤬ᰨᰍ
ര ׄ 🍃˚ ${usedPrefix}pregunta *texto*
ര ׄ 🍃˚ ${usedPrefix}ttt *texto*
ര ׄ 🍃˚ ${usedPrefix}ptt *opción*
ര ׄ 🍃˚ ${usedPrefix}delttt
ര ׄ 🍃˚ ${usedPrefix}acertijo

𓂂𓏸  𐅹੭੭   *\`gі𝖿s ᥒs𝖿ա\`*   🍃ᩚ꤬ᰨᰍ
ര ׄ 🍃˚ ${usedPrefix}violar
ര ׄ 🍃˚ ${usedPrefix}follar

𓂂𓏸  𐅹੭੭   *\`s𝗍іᥴkᥱrs\`*   🍃ᩚ꤬ᰨᰍ
ര ׄ 🍃˚ ${usedPrefix}sticker *img*
ര ׄ 🍃˚ ${usedPrefix}qc *texto*
ര ׄ 🍃˚ ${usedPrefix}dado

𓂂𓏸  𐅹੭੭   *\`r⍴g\`*   🍃ᩚ꤬ᰨᰍ
ര ׄ 🍃˚ ${usedPrefix}minar
ര ׄ 🍃˚ ${usedPrefix}cofre
ര ׄ 🍃˚ ${usedPrefix}slut
ര ׄ 🍃˚ ${usedPrefix}nivel

𓂂𓏸  𐅹੭੭   *\`rᥱgіs𝗍r᥆\`*   🍃ᩚ꤬ᰨᰍ
ര ׄ 🍃˚ ${usedPrefix}perfil
ര ׄ 🍃˚ ${usedPrefix}reg
ര ׄ 🍃˚ ${usedPrefix}unreg

𓂂𓏸  𐅹੭੭   *\`᥆աᥒᥱr\`*   🍃ᩚ꤬ᰨᰍ
ര ׄ 🍃˚ ${usedPrefix}salir
ര ׄ 🍃˚ ${usedPrefix}update
`.trim()

        await conn.sendMessage(m.chat, {
            video: { url: videoUrl }, // Video fijo
            caption: menu,
            contextInfo: {
                mentionedJid: [m.sender],
                isForwarded: true,
                forwardingScore: 999,
                externalAdReply: {
                    title: '⏤͟͞ू⃪ ፝͜⁞Sʜᴀᴅᴏᴡ✰⃔࿐\nNᴜᴇᴠᴀ Vᴇʀsɪᴏɴ Uʟᴛʀᴀ 💫',
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

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}