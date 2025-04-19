/*
import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true

  let who = m.messageStubParameters[0]
  let taguser = `@${who.split('@')[0]}`
  let chat = global.db.data.chats[m.chat]
  let defaultImage = 'https://files.catbox.moe/xr2m6u.jpg'

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
    ︱·˚🌿 Disfruta del grupo.
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
    ︱·˚🤍 Ojalá y lo violen los ngros.
    └╾ׅ╴ׂꨪ╌╼᪶╾᪶ ۪〫┄ׅ⃯፝֟╌╼᪶֘╾᪶╌ׅꨪ╶۪╼┘

> ${dev}`

      await conn.sendMessage(m.chat, { image: img, caption: text, mentions: [who] }, { quoted: fkontak })
    }
  }

  return true
}
*/

import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true;
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://files.catbox.moe/xr2m6u.jpg')
  let img = await (await fetch(`${pp}`)).buffer()
  let chat = global.db.data.chats[m.chat]
  let txt = 'ゲ◜៹ New Member ៹◞ゲ'
  let txt1 = 'ゲ◜៹ Bye Member ៹◞ゲ'
  let groupSize = participants.length
  if (m.messageStubType == 27) {
    groupSize++;
  } else if (m.messageStubType == 28 || m.messageStubType == 32) {
    groupSize--;
  }

  if (chat.welcome && m.messageStubType == 27) {
    let bienvenida = `❀ *Bienvenido* a ${groupMetadata.subject}\n✰ @${m.messageStubParameters[0].split`@`[0]}\n✦ Ahora somos ${groupSize} Miembros.\n•(=^●ω●^=)• Disfruta tu estadía en el grupo!\n> ✐ Puedes usar *#help* para ver la lista de comandos.`    
    await conn.sendMini(m.chat, txt, dev, bienvenida, img, img, redes, fkontak)
  }

  if (chat.welcome && (m.messageStubType == 28 || m.messageStubType == 32)) {
    let bye = `❀ *Adiós* de ${groupMetadata.subject}\n✰ @${m.messageStubParameters[0].split`@`[0]}\n✦ Ahora somos ${groupSize} Miembros.\n•(=^●ω●^=)• Te esperamos pronto!\n> ✐ Puedes usar *#help* para ver la lista de comandos.`
    await conn.sendMini(m.chat, txt1, dev, bye, img, img, redes, fkontak)
  }}