/*import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true

  let who = m.messageStubParameters[0]
  let taguser = `@${who.split('@')[0]}`
  let chat = global.db.data.chats[m.chat]
  let defaultImage = 'https://files.catbox.moe/xr2m6u.jpg'
  let insta = 'https://instagram.com/dev.criss_vx'

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
        : `*¡𝖡𝗂𝖾𝗇𝗏𝖾𝗇𝗂𝖽𝗈/𝖺!*
෫ࣲׄ֟፝͡${taguser} 🫶🏻꒱
ᦷᩘᦷ   ݂ 𝖣𝗂𝗌𝖿𝗋𝗎𝗍𝖺 𝖽𝖾 𝗍𝗎 𝖾𝗌𝗍𝖺𝖽𝗂́𝖺 𝖾𝗇 𝖾𝗅 𝗀𝗋𝗎𝗉𝗈.
✎ 𝖯𝗎𝖾𝖽𝖾𝗌 𝗎𝗌𝖺𝗋 *#𝗁𝖾𝗅𝗉* 𝗉𝖺𝗋𝖺 𝗏𝖾𝗋 𝗅𝖺 𝗅𝗂𝗌𝗍𝖺 𝖽𝖾 𝖼𝗈𝗆𝖺𝗇𝖽𝗈𝗌.

> ${dev}`

      await conn.sendMessage(m.chat, {
        text,
        contextInfo: {
          mentionedJid: [who],
          isForwarded: true,
          forwardingScore: 999,
          externalAdReply: {
            title: `¡Bienvenido/a! ${await conn.getName(who)}, al grupo ${groupName}`,
            body: 'ゲ◜៹ 𝖭𝖾𝗐 𝖬𝖾𝗆𝖻𝖾𝗋 ៹◞ゲ',
            thumbnail: img,
            sourceUrl: insta,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: fkontak })
    }

    if (
      m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE ||
      m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE
    ) {
      let text = chat.sBye
        ? chat.sBye
            .replace(/@user/g, taguser)
            .replace(/@group/g, groupName)
            .replace(/@desc/g, groupDesc)
        : `*¡𝖠𝖽𝗂𝗈́𝗌!* 𝖲𝖾 𝗌𝖺𝗅𝗂𝗈́ 𝖽𝖾𝗅 𝗀𝗋𝗎𝗉𝗈.
෫ࣲׄ֟፝͡${taguser} 👋🏻꒱

Ꮚ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ 𝖭𝗈𝗌 𝗏𝖾𝗆𝗈𝗌 𝗉𝗋𝗈𝗇𝗍𝗈, 𝗈𝗃𝖺𝗅𝖺́ 𝗒 𝗌𝖾 𝗅𝗈 𝗏𝗂𝗈𝗅𝖾𝗇 𝗅𝗈𝗌 𝗇𝖾𝗀𝗋𝗈𝗌. 🦥
 ׅ⿻ 𝖠𝗁𝗈𝗋𝖺 𝗌𝗈𝗆𝗈𝗌 \`10\` 𝗆𝗂𝖾𝗆𝖻𝗋𝗈𝗌.

> ${dev}`

      await conn.sendMessage(m.chat, {
        text,
        contextInfo: {
          mentionedJid: [who],
          isForwarded: true,
          forwardingScore: 999,
          externalAdReply: {
            title: `¡Hasta Luego! ${await conn.getName(who)}, del grupo ${groupName}`,
            body: 'ゲ◜៹ 𝖡𝗒𝖾 𝖬𝖾𝗆𝖻𝖾𝗋 ៹◞ゲ',
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
}*/

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

    // Bienvenida
    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
      let text = chat.sWelcome
        ? chat.sWelcome
            .replace(/@user/g, taguser)
            .replace(/@group/g, groupName)
            .replace(/@desc/g, groupDesc)
            .replace(/@count/g, groupSize)
        : `*¡𝖡𝗂𝖾𝗇𝗏𝖾𝗇𝗂𝖽𝗈/𝖺!*  
෫ࣲׄ֟፝͡${taguser} 🫶🏻꒱  
ᦷᩘᦷ   ݂ 𝖣𝗂𝗌𝖿𝗋𝗎𝗍𝖺 𝖽𝖾 𝗍𝗎 𝖾𝗌𝗍𝖺𝖽𝗂́𝖺 𝖾𝗇 𝖾𝗅 𝗀𝗋𝗎𝗉𝗈.  
✎ 𝖯𝗎𝖾𝖽𝖾𝗌 𝗎𝗌𝖺𝗋 *#𝗁𝖾𝗅𝗉* 𝗉𝖺𝗋𝖺 𝗏𝖾𝗋 𝗅𝖺 𝗅𝗂𝗌𝗍𝖺 𝖽𝖾 𝖼𝗈𝗆𝖺𝗇𝖽𝗈𝗌.  
   Ahora somos \`${groupSize}\` miembros.

${dev}`

      await conn.sendMessage(m.chat, {
        text,
        contextInfo: {
          mentionedJid: [who],
          isForwarded: true,
          forwardingScore: 999,
          externalAdReply: {
            title: `¡Bienvenido/a! ${await conn.getName(who)}, al grupo ${groupName}`,
            body: 'ゲ◜៹ 𝖭𝖾𝗐 𝖬𝖾𝗆𝖻𝖾𝗋 ៹◞ゲ',
            thumbnail: img,
            sourceUrl: insta,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: fkontak })
    }

    // Despedida voluntaria
    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE) {
      let text = chat.sBye
        ? chat.sBye
            .replace(/@user/g, taguser)
            .replace(/@group/g, groupName)
            .replace(/@desc/g, groupDesc)
            .replace(/@count/g, groupSize)
        : `*¡𝖠𝖽𝗂𝗈́𝗌!*  
෫ࣲׄ֟፝͡${taguser} 👋🏻꒱  
Ꮚ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ Nos vemos pronto.  
Ahora somos \`${groupSize}\` miembros.`

      await conn.sendMessage(m.chat, {
        text,
        contextInfo: {
          mentionedJid: [who],
          isForwarded: true,
          forwardingScore: 999,
          externalAdReply: {
            title: `¡Hasta luego! ${await conn.getName(who)}, del grupo ${groupName}`,
            body: 'ゲ◜៹ 𝖡𝗒𝖾 𝖬𝖾𝗆𝖻𝖾𝗋 ៹◞ゲ',
            thumbnail: img,
            sourceUrl: insta,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: fkontak })
    }

    // Expulsado
    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
      let text = `*¡El miembro fue expulsado!*  
෫ࣲׄ֟፝͡${taguser} 🤌🏻꒱  
Ꮚ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ Nos vemos.  
Alta puta que era.
Ahora somos \`${groupSize}\` miembros.`

      await conn.sendMessage(m.chat, {
        text,
        contextInfo: {
          mentionedJid: [who],
          isForwarded: true,
          forwardingScore: 999,
          externalAdReply: {
            title: `Miembro eliminado: ${await conn.getName(who)}`,
            body: 'ゲ◜៹ 𝖪𝗂𝖼𝗄𝖾𝖽 𝖬𝖾𝗆𝖻𝖾𝗋 ៹◞ゲ',
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