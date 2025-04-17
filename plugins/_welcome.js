/*import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true

  let who = m.messageStubParameters[0]
  let taguser = `@${who.split('@')[0]}`
  let chat = global.db.data.chats[m.chat]
  let defaultImage = 'https://files.catbox.moe/dgvj76.jpg';

  if (chat.welcome) {
    let img;
    try {
      let pp = await conn.profilePictureUrl(who, 'image');
      img = await (await fetch(pp)).buffer();
    } catch {
      img = await (await fetch(defaultImage)).buffer();
    }

  const welcomeMessage = global.db.data.chats[m.chat]?.welcomeMessage || 'Bienvenido/a :';

    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
    let bienvenida = `𓆩°»｡˚ ∾･⁙･ ღ ➵ ⁘ ➵ ღ ･⁙･∾ ˚ ｡«°𓆪\n❍⌇─➭ *Wᴇʟᴄᴏᴍᴇ ᴛᴏ Gʀᴏᴜᴘ ::*\n๑ ˚ ͙۪۪̥@${m.messageStubParameters[0].split`@`[0]} 👋🏻꒱\n\n┌ *\`ɢʀᴏᴜᴘ::\`*\n  ☕ ᩙᩞ✑ ${groupMetadata.subject}\n└┬ *ɴᴇᴡ ᴍᴇᴍʙᴇʀ*\n    ︱·˚🤍 Disfruta del grupo.\n    └╾ׅ╴ׂꨪ╌╼᪶╾᪶ ۪〫┄ׅ⃯፝֟╌╼᪶֘╾᪶╌ׅꨪ╶۪╼┘\n\n> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴏᴏɴ ғᴏʀᴄᴇ ᴛᴇᴀᴍ`
      await conn.sendMessage(m.chat, { image: img, caption: bienvenida, mentions: [who] }, { quoted: fkontak })
    } else if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE || m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {

const despMessage = global.db.data.chats[m.chat]?.despMessage || 'Se Fue😹';

     let bye = `𓆩°»｡˚ ∾･⁙･ ღ ➵ ⁘ ➵ ღ ･⁙･∾ ˚ ｡«°𓆪\n❍⌇─➭ *Sᴇᴇ ʏᴏᴜ Lᴀᴛᴇʀ ::*\n๑ ˚ ͙۪۪̥@${m.messageStubParameters[0].split`@`[0]} 🖕🏻꒱\n\n┌ *\`ᴘᴜᴛᴀ ᴇʟɪᴍɪɴᴀᴅᴀ\`*\n└┬ *ᴇx ᴍᴇᴍʙᴇʀ*\n    ︱·˚👻 Ojalá y lo violen los ngros.\n    └╾ׅ╴ׂꨪ╌╼᪶╾᪶ ۪〫┄ׅ⃯፝֟╌╼᪶֘╾᪶╌ׅꨪ╶۪╼┘\n\n> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴏᴏɴ ғᴏʀᴄᴇ ᴛᴇᴀᴍ`
      await conn.sendMessage(m.chat, { image: img, caption: bye, mentions: [who] }, { quoted: fkontak })
    }
  }

  return true
}*/
import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true

  let who = m.messageStubParameters[0]
  let taguser = `@${who.split('@')[0]}`
  let chat = global.db.data.chats[m.chat]
  let defaultImage = 'https://files.catbox.moe/dgvj76.jpg'

  if (chat.welcome) {
    let img
    try {
      let pp = await conn.profilePictureUrl(who, 'image')
      img = await (await fetch(pp)).buffer()
    } catch {
      img = await (await fetch(defaultImage)).buffer()
    }

    const groupName = groupMetadata.subject
    const groupDesc = groupMetadata.desc || 'sin descripción'

    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
      let text = chat.sWelcome
        ? chat.sWelcome
            .replace(/@user/g, taguser)
            .replace(/@group/g, groupName)
            .replace(/@desc/g, groupDesc)
        : `𓆩°»｡˚ ∾･⁙･ ღ ➵ ⁘ ➵ ღ ･⁙･∾ ˚ ｡«°𓆪
❍⌇─➭ *Wᴇʟᴄᴏᴍᴇ ᴛᴏ Gʀᴏᴜᴘ ::*
๑ ˚ ͙۪۪̥${taguser} 👋🏻꒱

┌ *\`ɢʀᴏᴜᴘ::\`*
  ☕ ᩙᩞ✑ ${groupName}
└┬ *ɴᴇᴡ ᴍᴇᴍʙᴇʀ*
    ︱·˚🤍 Disfruta del grupo.
    └╾ׅ╴ׂꨪ╌╼᪶╾᪶ ۪〫┄ׅ⃯፝֟╌╼᪶֘╾᪶╌ׅꨪ╶۪╼┘

> ${dev}`

      await conn.sendMessage(m.chat, { image: img, caption: text, mentions: [who] }, { quoted: fkontak })
    } else if (
      m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE ||
      m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE
    ) {
      let text = chat.sBye
        ? chat.sBye
            .replace(/@user/g, taguser)
            .replace(/@group/g, groupName)
            .replace(/@desc/g, groupDesc)
        : `𓆩°»｡˚ ∾･⁙･ ღ ➵ ⁘ ➵ ღ ･⁙･∾ ˚ ｡«°𓆪
❍⌇─➭ *Sᴇᴇ ʏᴏᴜ Lᴀᴛᴇʀ ::*
๑ ˚ ͙۪۪̥${taguser} 🖕🏻꒱

┌ *\`ᴘᴜᴛᴀ ᴇʟɪᴍɪɴᴀᴅᴀ\`*
└┬ *ᴇx ᴍᴇᴍʙᴇʀ*
    ︱·˚👻 Ojalá y lo violen los ngros.
    └╾ׅ╴ׂꨪ╌╼᪶╾᪶ ۪〫┄ׅ⃯፝֟╌╼᪶֘╾᪶╌ׅꨪ╶۪╼┘

> ${dev}`

      await conn.sendMessage(m.chat, { image: img, caption: text, mentions: [who] }, { quoted: fkontak })
    }
  }

  return true
}