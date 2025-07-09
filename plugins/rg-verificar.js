import axios from 'axios'
import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import moment from 'moment-timezone'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, args, usedPrefix, command }) {
    let user = global.db.data.users[m.sender]
    let name2 = conn.getName(m.sender)
    let whe = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender

    let perfil = await conn.profilePictureUrl(whe, 'image').catch(_ => 'https://files.catbox.moe/jbecfc.jpg')

    if (user.registered === true) {
        return m.reply(`*🍚 Ya te encuentras registrado en mi base de datos.*\n*Si deseas eliminar tu registro use la función \`#unreg\`*`)
    }

    if (!Reg.test(text)) return m.reply(`*🍚 Por favor, ingresa tu nombre y edad para registrarte en mi base de datos.*\n> *\`Ejemplo:\`*\n> ${usedPrefix + command} ${name2}.20`)

    let [_, name, splitter, age] = text.match(Reg)
    if (!name) return m.reply('*⚠️ El nombre no puede estar vacío pendejo.*')
    if (!age) return m.reply('*⚠️ La edad no puede estar vacía.*')
    if (name.length >= 100) return m.reply('*⚠️ El nombre es demasiado largo.*')

    age = parseInt(age)
    if (age > 1000) return m.reply('*👴🏻 Qué haces acá, no deberías estar en el cementerio?*')
    if (age < 5) return m.reply('*👶🏻 Mirá el bebé quiere jugar al bot*')

    user.name = name.trim()
    user.age = age
    user.regTime = +new Date
    user.registered = true
    global.db.data.users[m.sender].money += 600
    global.db.data.users[m.sender].diamantes += 15
    global.db.data.users[m.sender].exp += 245
    global.db.data.users[m.sender].joincount += 5

    let who;
    if (m.quoted && m.quoted.sender) {
        who = m.quoted.sender;
    } else {
        who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    }

    let sn = createHash('md5').update(m.sender).digest('hex')
    let regbot = `𝔄ㅤ *Registro* ㅤ▯ㅤ *Confirmado* ㅤᗝ̵\nㅤ@𝖎𝖓𝖊𝖋𝖋𝖆𝖇𝖑𝖊.𝖒𝖛𝖗𝖈𝖔\n\n`
    regbot += `✧⃝ᓚ⩺ \`Nombre:\` ${name}\n`
    regbot += `✧⃝ᓚ⩺ \`Edad:\` ${age} años\n\n`
    regbot += `⧫⧫  *Premio ࣲ* 🌿🪶  \n\n`
    regbot += `🍀𐐯𐐮     𝓡   💎 ፡ \`\`\`25 Diamantes\`\`\`\n`
    regbot += `🍀𐐯𐐮     𝓡   🍸 ፡ \`\`\`350 Xp\`\`\`\n`
    regbot += `🍀𐐯𐐮     𝓡   🎫 ፡ \`\`\`20 Tokens\`\`\`\n\n`
    regbot += `> 𝖢𝗈𝗅𝗈𝖼𝖺 *#perfil* 𝗉𝖺𝗋𝖺 𝗏𝖾𝗋 𝗍𝗎 𝗉𝖾𝗋𝖿𝗂𝗅`

    await m.react('💌')
    await conn.sendMessage(m.chat, {
        text: regbot,
        contextInfo: {
            externalAdReply: {
                title: 'Pᴏʀɴʜᴜʙ: @𝖎𝖓𝖊𝖋𝖋𝖆𝖇𝖑𝖊.𝖒𝖛𝖗𝖈𝖔',
                body: club,
                thumbnailUrl: 'https://files.catbox.moe/nwqdwh.jpg',
                sourceUrl: 'https://whatsapp.com/channel/0029Vb4TKBCD38CNEkfHdj1z',
                mediaType: 1,
                showAdAttribution: true,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: fkontak });

    let chtxt = `👤 *𝚄𝚂𝙴𝚁:* ${m.pushName || 'Anónimo'}
☕ *𝚁𝙴𝙶𝙸𝚂𝚃𝚁𝙾:* ${user.name}
🤍 *𝙴𝙳𝙰𝙳:* ${user.age} años
📝 *𝙳𝙴𝚂𝙲:* ${user.descripcion}
🪪 *𝚂𝙴𝚁𝙸𝙴:*
⤷ ${sn}`;

    let channelID = '120363384854309225@newsletter';
    await conn.sendMessage(channelID, {
        text: chtxt,
        contextInfo: {
            externalAdReply: {
                title: "☕ 𝐍𝐎𝐓𝐈𝐅𝐈𝐂𝐀𝐂𝐈𝐎́𝐍 - 𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐎",
                body: '🥳 ¡ᥙᥒ ᥙsᥙᥲrі᥆ ᥒᥙᥱ᥎᥆ ᥱᥒ mі ᑲᥲsᥱ ძᥱ ძᥲ𝗍᥆s!',
                thumbnailUrl: perfil,
                sourceUrl: redes,
                mediaType: 1,
                showAdAttribution: false,
                renderLargerThumbnail: false
            }
        }
    }, { quoted: null });
};

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar']

export default handler