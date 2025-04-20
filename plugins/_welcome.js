/*
import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true

  let who = m.messageStubParameters[0]
  let taguser = `@${who.split('@')[0]}`
  let chat = global.db.data.chats[m.chat]
  let defaultImage = 'https://files.catbox.moe/xr2m6u.jpg'
  let insta = 'https://instagram.com/dev.criss_vx'
/*
  let groupSize = participants.length
  if (m.messageStubType === 27) groupSize++
  else if (m.messageStubType === 28 || m.messageStubType === 32) groupSize--
*/
let groupSize = participants.length
if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) groupSize++
if (
  m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE ||
  m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE
) groupSize--

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

    // 𝗕𝗜𝗘𝗡𝗩𝗘𝗡𝗜𝗗𝗔 𝗦𝗛𝗔𝗗𝗢𝗪 𝗨𝗟𝗧𝗥𝗔 🤍
    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
      let text = chat.sWelcome
        ? chat.sWelcome
            .replace(/@user/g, taguser)
            .replace(/@group/g, groupName)
            .replace(/@desc/g, groupDesc)
            .replace(/@count/g, groupSize)
        : `*¡Bienvenido(a)!*  
෫ࣲׄ֟፝͡${taguser} 🫶🏻꒱

ᦷᩘᦷ   ݂ 𝖣𝗂𝗌𝖿𝗋𝗎𝗍𝖺 𝖽𝖾 𝗍𝗎 𝖾𝗌𝗍𝖺𝖽𝗂𝖺.
✎ 𝖴𝗌𝖺 *#help* 𝗉𝖺𝗋𝖺 𝗏𝖾𝗋 𝗅𝖺 𝗅𝗂𝗌𝗍𝖺 𝖽𝖾 𝖼𝗈𝗆𝖺𝗇𝖽𝗈𝗌.

> ${dev}`

      await conn.sendMessage(m.chat, {
        text,
        contextInfo: {
          mentionedJid: [who],
          isForwarded: true,
          forwardingScore: 999,
          externalAdReply: {
            title: `¡Bienvenidx! ${await conn.getName(who)}\nAhora somos ${groupSize} miembros en el grupo`,
            body: 'ゲ◜៹ New Member ៹◞ゲ',
            thumbnail: img,
            sourceUrl: insta,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: fkontak })
    }

    // 𝗘𝗫𝗣𝗨𝗟𝗦𝗜𝗢́𝗡 𝗦𝗛𝗔𝗗𝗢𝗪 𝗨𝗟𝗧𝗥𝗔 🤍
    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE) {
      let text = chat.sBye
        ? chat.sBye
            .replace(/@user/g, taguser)
            .replace(/@group/g, groupName)
            .replace(/@desc/g, groupDesc)
            .replace(/@count/g, groupSize)
        : `*¡Expulsado!*  
෫ࣲׄ֟፝͡${taguser} 👊🏻꒱

Ꮚ⁠ 𝖴𝗇 𝗇𝖾𝗀𝗋𝗈 𝗆𝖾𝗇𝗈𝗌 𝖾𝗇 𝖾𝗅 𝗀𝗋𝗎𝗉𝗈, 𝗉𝗈𝗋 𝗇𝗈 𝗈𝖻𝖾𝖽𝖾𝖼𝖾𝗋 𝗅𝖺𝗌 𝗋𝖾𝗀𝗅𝖺𝗌.
 ׅ⿻ 𝖮𝗃𝖺𝗅𝖺 𝗒 𝗅𝖺 𝖾𝗅𝗂𝗆𝗂𝗇𝖺𝖼𝗂𝗈𝗇 𝗅𝖾 𝗁𝖺𝗀𝖺 𝗋𝖾𝖿𝗅𝖾𝗑𝗂𝗈𝗇𝖺𝗋 𝗑𝖣

> ${dev}`

      await conn.sendMessage(m.chat, {
        text,
        contextInfo: {
          mentionedJid: [who],
          isForwarded: true,
          forwardingScore: 999,
          externalAdReply: {
            title: `¡Adiós! ${await conn.getName(who)}\nAhora somos ${groupSize} miembros en el grupo`,
            body: 'ゲ◜៹ Kicked Member ៹◞ゲ',
            thumbnail: img,
            sourceUrl: insta,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: fkontak })
    }

    // 𝗦𝗔𝗟𝗜𝗗𝗔 𝗦𝗛𝗔𝗗𝗢𝗪 𝗨𝗟𝗧𝗥𝗔 🤍
    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
      let text = `*¡Hasta Luego!*  
෫ࣲׄ֟፝͡${taguser} 👋🏻꒱

Ꮚ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ 𝖦𝗋𝖺𝖼𝗂𝖺𝗌 𝗉𝗈𝗋 𝖾𝗌𝗍𝖺𝗋 𝖺𝗊𝗎𝗂. 𝖳𝗎 𝗉𝗋𝖾𝗌𝖾𝗇𝖼𝗂𝖺 𝖿𝗎𝖾 𝗎𝗇 𝖾𝗌𝗍𝗈𝗋𝖻𝗈.
 ׅ⿻ 𝖮𝗃𝖺𝗅𝖺 𝗒 𝗌𝖾 𝗅𝗈 𝗏𝗂𝗈𝗅𝖾𝗇 𝗅𝗈𝗌 𝗇𝖾𝗀𝗋𝗈𝗌 𝗉𝗈𝗋 𝖺𝗅𝗍𝖺 𝗉𝗎𝗍𝖺.

> ${dev}`

      await conn.sendMessage(m.chat, {
        text,
        contextInfo: {
          mentionedJid: [who],
          isForwarded: true,
          forwardingScore: 999,
          externalAdReply: {
            title: `¡Adiós! ${await conn.getName(who)}\nAhora somos ${groupSize} miembros en el grupo`,
            body: 'ゲ◜៹ Bye Member ៹◞ゲ',
            thumbnail: img,
            sourceUrl: insta,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: fkontak })
    }
  }

  return true
}
*/

import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true

  let who = m.messageStubParameters[0]
  let taguser = `@${who.split('@')[0]}`
  let chat = global.db.data.chats[m.chat]
  let defaultImage = 'https://files.catbox.moe/xr2m6u.jpg'
  let insta = 'https://instagram.com/dev.criss_vx'

  let groupSize = participants.length
  if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) groupSize++
  if (
    m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE ||
    m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE
  ) groupSize--

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
            .replace(/@count/g, groupSize)
        : `*¡Bienvenido(a)!*  
෫ࣲׄ֟፝͡${taguser} 🫶🏻꒱

ᦷᩘᦷ   ݂ 𝖣𝗂𝗌𝖿𝗋𝗎𝗍𝖺 𝖽𝖾 𝗍𝗎 𝖾𝗌𝗍𝖺𝖽𝗂𝖺.
✎ 𝖴𝗌𝖺 *#help* 𝗉𝖺𝗋𝖺 𝗏𝖾𝗋 𝗅𝖺 𝗅𝗂𝗌𝗍𝖺 𝖽𝖾 𝖼𝗈𝗆𝖺𝗇𝖽𝗈𝗌.

> ${dev}`

      await conn.SendLuffy(m.chat, text, img, {
        title: `¡Bienvenidx! ${await conn.getName(who)}\nAhora somos ${groupSize} miembros en el grupo`,
        body: 'ゲ◜៹ New Member ៹◞ゲ',
        sourceUrl: insta,
        quoted: fkontak,
        mentionedJid: [who]
      })
    }

    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE) {
      let text = chat.sBye
        ? chat.sBye
            .replace(/@user/g, taguser)
            .replace(/@group/g, groupName)
            .replace(/@desc/g, groupDesc)
            .replace(/@count/g, groupSize)
        : `*¡Expulsado!*  
෫ࣲׄ֟፝͡${taguser} 👊🏻꒱

Ꮚ⁠ 𝖴𝗇 𝗇𝖾𝗀𝗋𝗈 𝗆𝖾𝗇𝗈𝗌 𝖾𝗇 𝖾𝗅 𝗀𝗋𝗎𝗉𝗈, 𝗉𝗈𝗋 𝗇𝗈 𝗈𝖻𝖾𝖽𝖾𝖼𝖾𝗋 𝗅𝖺𝗌 𝗋𝖾𝗀𝗅𝖺𝗌.
 ׅ⿻ 𝖮𝗃𝖺𝗅𝖺 𝗒 𝗅𝖺 𝖾𝗅𝗂𝗆𝗂𝖺𝗍𝗂𝗈𝗇 𝗅𝖾 𝗁𝖺𝗀𝖺 𝗋𝖾𝖿𝗅𝖾𝗑𝗂𝖔𝗇𝖺𝗋 𝗑𝖣

> ${dev}`

      await conn.SendLuffy(m.chat, text, img, {
        title: `¡Adiós! ${await conn.getName(who)}\nAhora somos ${groupSize} miembros en el grupo`,
        body: 'ゲ◜៹ Kicked Member ៹◞ゲ',
        sourceUrl: insta,
        quoted: fkontak,
        mentionedJid: [who]
      })
    }

    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
      let text = `*¡Hasta Luego!*  
෫ࣲׄ֟፝͡${taguser} 👋🏻꒱

Ꮚ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ 𝖦𝗋𝖺𝖼𝗂𝖺𝗌 𝗉𝗈𝗋 𝖾𝗌𝗍𝖺𝗋 𝖺𝗊𝗎𝗂. 𝖳𝗎 𝗉𝗋𝖾𝗌𝖾𝗇𝖼𝗂𝖺 𝖿𝗎𝖾 𝗎𝗇 𝖾𝗌𝗍𝖔𝗋𝖻𝗈.
 ׅ⿻ 𝖮𝗃𝖺𝗅𝖺 𝗒 𝗌𝖾 𝗅𝗈 𝗏𝗂𝗈𝗅𝖾𝗇 𝗅𝗈𝗌 𝗇𝖾𝗀𝗋𝗈𝗌 𝗉𝗈𝗋 𝖺𝗅𝗍𝖺 𝗉𝗎𝗍𝖺.

> ${dev}`

      await conn.SendLuffy(m.chat, text, img, {
        title: `¡Adiós! ${await conn.getName(who)}\nAhora somos ${groupSize} miembros en el grupo`,
        body: 'ゲ◜៹ Bye Member ៹◞ゲ',
        sourceUrl: insta,
        quoted: fkontak,
        mentionedJid: [who]
      })
    }
  }

  return true
}
