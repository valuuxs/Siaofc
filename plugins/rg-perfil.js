/*import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'
import fs from 'fs';
var handler = async (m, { conn }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://tinyurl.com/2c2udbox')

let { premium, level, description, diamantes, exp, lastclaim, registered, regTime, age, role } = global.db.data.users[m.sender];

age = age || 'Sin especificar';
description = description || 'Sin descripción';

let username = conn.getName(who)
let noprem = `
ˏˋ───･ ｡ﾟ☆: *.☽.* :☆ﾟ｡ ･───ˊˎ
ㅤㅤ *\`𝐏𝐄𝐑𝐅𝐈𝐋 𝐃𝐄𝐋 𝐔𝐒𝐔𝐀𝐑𝐈𝐎\`*

👤 *Nombre:* ${username}
🏷️ *Tag:* @${who.replace(/@.+/, '')}
🍒 *Edad:* ${age}
💌 *Registrado:* ${registered ? '✅': '❌'}
🪪 *Premium:* ${premium ? '✅': '❌'}
📝 *Descripción:* ${description}


╭─• *\`𝐑𝐄𝐂𝐔𝐑𝐒𝐎𝐒\`*
│ *💎 Diamantes* ${diamantes || 0}
│ *🆙 Nivel:* ${level || 0}
│ *💫 Exᴘ* ${exp || 0}
│ *🤍 Rango:* ${role}
╰─────────────•

> By Shadow Bot MD
`.trim()
let prem = `╭─⪩ 𓆩 𝐔𝐒𝐔𝐀𝐑𝐈𝐎 𝐏𝐑𝐄𝐌𝐈𝐔𝐌 𓆪
│⧼👤⧽ *Usᴜᴀʀɪᴏ:* ${username}
│⧼💌⧽ *Rᴇɢɪsᴛʀᴀᴅᴏ:* ${registered ? '✅': '❌'}
│⧼🔱⧽ *Rᴏʟ:* Vip 👑
╰─────────────⪩

╭─⪩ 𓆩 𝐑𝐄𝐂𝐔𝐑𝐒𝐎𝐒 𓆪
│⧼💎⧽ *:* ${diamantes}
│⧼🆙⧽ *Nɪᴠᴇʟ:* ${level}
│⧼💫⧽ *Exᴘ* ${exp}
│⧼⚜️⧽ *Rᴀɴɢᴏ:* ${role}
╰─────────────⪩`.trim()
conn.sendFile(m.chat, pp, 'perfil.jpg', `${premium ? prem.trim() : noprem.trim()}`, m, rcanal, { mentions: [who] })
}
handler.help = ['profile']
handler.register = true
handler.tags = ['rg']
handler.command = ['profile', 'perfil']
export default handler*/

import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'
import fs from 'fs'

const loadMarriages = () => {
    if (fs.existsSync('./src/database/marry.json')) {
        const data = JSON.parse(fs.readFileSync('./src/database/marry.json', 'utf-8'))
        global.db.data.marriages = data
    } else {
        global.db.data.marriages = {}
    }
}

var handler = async (m, { conn }) => {
    loadMarriages()

    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://files.catbox.moe/li11ar.jpg')

    let user = global.db.data.users[who] || {}
    let { premium, level, description, diamantes, exp, lastclaim, registered, regTime, age, role } = user

    age = age || 'Sin especificar'
    description = description || 'Sin descripción'
    let username = conn.getName(who)

    // Datos del matrimonio
    let isMarried = who in global.db.data.marriages
    let partner = isMarried ? global.db.data.marriages[who] : null
    let partnerName = partner ? await conn.getName(partner) : 'Nadie'

    let noprem = `
ˏˋ───･ ｡ﾟ☆: *.☽.* :☆ﾟ｡ ･───ˊˎ
ㅤㅤ *\`𝐏𝐄𝐑𝐅𝐈𝐋 𝐃𝐄𝐋 𝐔𝐒𝐔𝐀𝐑𝐈𝐎\`*

👤 *Nombre:* ${username}
🏷️ *Tag:* @${who.replace(/@.+/, '')}
🍒 *Edad:* ${age}
💌 *Registrado:* ${registered ? '✅': '❌'}
💍 *Casado con:* ${isMarried ? partnerName : 'Nadie'}
🪪 *Premium:* ${premium ? '✅': '❌'}
📝 *Descripción:* ${description}

╭─• *\`𝐑𝐄𝐂𝐔𝐑𝐒𝐎𝐒\`*
│ *💎 Diamantes:* ${diamantes || 0}
│ *🆙 Nivel:* ${level || 0}
│ *💫 Exp:* ${exp || 0}
│ *🤍 Rango:* ${role || 'Sin rango'}
╰─────────────•

> By Shadow Bot MD
`.trim()

    let prem = `╭─⪩ 𓆩 𝐔𝐒𝐔𝐀𝐑𝐈𝐎 𝐏𝐑𝐄𝐌𝐈𝐔𝐌 𓆪
│⧼👤⧽ *Usuario:* ${username}
│⧼💌⧽ *Registrado:* ${registered ? '✅': '❌'}
│⧼💍⧽ *Casado con:* ${isMarried ? partnerName : 'Nadie'}
│⧼🔱⧽ *Rol:* Vip 👑
╰─────────────⪩

╭─⪩ 𓆩 𝐑𝐄𝐂𝐔𝐑𝐒𝐎𝐒 𓆪
│⧼💎⧽ *Diamantes:* ${diamantes || 0}
│⧼🆙⧽ *Nivel:* ${level || 0}
│⧼💫⧽ *Exp:* ${exp || 0}
│⧼⚜️⧽ *Rango:* ${role || 'Sin rango'}
╰─────────────⪩`.trim()

    conn.sendFile(m.chat, pp, 'perfil.jpg', `${premium ? prem : noprem}`, m, { mentions: [who] })
}

handler.help = ['profile']
handler.register = true
handler.tags = ['rg']
handler.command = ['profile', 'perfil']
export default handler