import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;

  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://files.catbox.moe/xr2m6u.jpg')
  let img = await (await fetch(`${pp}`)).buffer()
  let groupSize = participants.length
  if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) groupSize++
  if (
    m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE ||
    m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE
  ) groupSize--

  //let insta = 'https://instagram.com/dev.criss_vx'
  let who = m.messageStubParameters[0]
  let taguser = `@${who.split('@')[0]}`
  let username = await conn.getName(who)
  let chat = global.db.data.chats[m.chat]
  let txt = `¡Bienvenidx! ${username}\nAhora somos ${groupSize} miembros en el grupo`
  let txt1 = `¡Adiós! ${username}\nAhora somos ${groupSize} miembros en el grupo`
  //let txt2 = `¡Adiós! ${username}\nAhora somos ${groupSize} miembros en el grupo`
  let member = 'ゲ◜៹ New Member ៹◞ゲ'
  let member1 = 'ゲ◜៹ Bye Member ៹◞ゲ'
  let member2 = 'ゲ◜៹ Kicked Member ៹◞ゲ'

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
      : `*¡Bienvenido(a)!*\n෫ࣲׄ֟፝͡${taguser} 🫶🏻꒱\n\nᦷᩘᦷ   ݂ 𝖣𝗂𝗌𝖿𝗋𝗎𝗍𝖺 𝖽𝖾 𝗍𝗎 𝖾𝗌𝗍𝖺𝖽𝗂𝖺.\n✎ 𝖴𝗌𝖺 *#help* 𝗉𝖺𝗋𝖺 𝗏𝖾𝗋 𝗅𝖺 𝗅𝗂𝗌𝗍𝖺 𝖽𝖾 𝖼𝗈𝗆𝖺𝗇𝖽𝗈𝗌.\n\n> ${dev}`
    await conn.sendLuffy(m.chat, txt, member, img, img, redes, fkontak)
  }

  // Salida
  if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
    let text = chat.sBye
      ? chat.sBye
          .replace(/@user/g, taguser)
          .replace(/@group/g, groupName)
          .replace(/@desc/g, groupDesc)
          .replace(/@count/g, groupSize)
      : `*¡Hasta Luego!*\n෫ࣲׄ֟፝͡${taguser} 👋🏻꒱\n\nᏊ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ 𝖦𝗋𝖺𝖼𝗂𝖺𝗌 𝗉𝗈𝗋 𝖾𝗌𝗍𝖺𝗋 𝖺𝗊𝗎𝗂.\n\n> ${dev}`
    await conn.sendLuffy(m.chat, txt1, member1, img, img, redes, fkontak)
  } 
/*
  // Expulsión
  if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE) {
    let text = chat.sRemove
      ? chat.sRemove
          .replace(/@user/g, taguser)
          .replace(/@group/g, groupName)
          .replace(/@desc/g, groupDesc)
          .replace(/@count/g, groupSize)
      : */

    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
      let text = `*¡Expulsado!*\n෫ࣲׄ֟፝͡${taguser} 👊🏻꒱\n\n𝖲𝖾 𝗁𝖺 𝗂𝗋 𝗎𝗇 𝗆𝗂𝖾𝗆𝖻𝗋𝗈. 𝖤𝗌𝗉𝖾𝗋𝖺𝗆𝗈𝗌 𝗊𝗎𝖾 𝗋𝖾𝗀𝗋𝖾𝗌𝖾 𝗋𝖾𝖿𝗈𝗋𝗆𝖺𝖽𝗈.\n\n> ${dev}`
    await conn.sendLuffy(m.chat, txt1, member2, img, img, redes, fkontak)
  }
}

/*

import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://files.catbox.moe/xr2m6u.jpg')
  let img = await (await fetch(`${pp}`)).buffer()
  let who = m.messageStubParameters[0]
  let taguser = `@${who.split('@')[0]}`
  let username = await conn.getName(who)
  let chat = global.db.data.chats[m.chat]
  let txt = 'ゲ◜៹ New Member ៹◞ゲ'
  let txt1 = 'ゲ◜៹ Bye Member ៹◞ゲ'
  let txt2 = 'ゲ◜៹ Kicked Member ៹◞ゲ'
  let groupSize = participants.length
  if (m.messageStubType == 27) {
    groupSize++;
  } if (m.messageStubType == 28) {
    groupSize--;
} if (m.messageStubType == 32) {
    groupSize--;
  }

  if (chat.welcome && m.messageStubType == 27) {
    let bienvenida = `*¡Bienvenido(a)!*\n෫ࣲׄ֟፝͡${taguser} 🫶🏻꒱\n\nᦷᩘᦷ   ݂ 𝖣𝗂𝗌𝖿𝗋𝗎𝗍𝖺 𝖽𝖾 𝗍𝗎 𝖾𝗌𝗍𝖺𝖽𝗂𝖺.\n✎ 𝖴𝗌𝖺 *#help* 𝗉𝖺𝗋𝖺 𝗏𝖾𝗋 𝗅𝖺 𝗅𝗂𝗌𝗍𝖺 𝖽𝖾 𝖼𝗈𝗆𝖺𝗇𝖽𝗈𝗌.\n\n> ${dev}`    
    await conn.sendLuffy(m.chat, txt, dev, bienvenida, img, img, redes, fkontak)
  }

  if (chat.welcome && m.messageStubType == 28) {
    let bye = `*¡Hasta Luego!*\n෫ࣲׄ֟፝͡${taguser} 👋🏻꒱\n\nᏊ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ 𝖦𝗋𝖺𝖼𝗂𝖺𝗌 𝗉𝗈𝗋 𝖾𝗌𝗍𝖺𝗋 𝖺𝗊𝗎𝗂.\n\n> ${dev}`
    await conn.sendLuffy(m.chat, txt1, dev, bye, img, img, redes, fkontak)
  }

  if (chat.welcome && m.messageStubType == 32) {
    let ban = `*¡Expulsado!*\n෫ࣲׄ֟፝͡${taguser} 👊🏻꒱\n\n𝖲𝖾 𝗁𝖺 𝗂𝗋 𝗎𝗇 𝗆𝗂𝖾𝗆𝖻𝗋𝗈. 𝖤𝗌𝗉𝖾𝗋𝖺𝗆𝗈𝗌 𝗊𝗎𝖾 𝗋𝖾𝗀𝗋𝖾𝗌𝖾 𝗋𝖾𝖿𝗈𝗋𝗆𝖺𝖽𝗈.\n\n> ${dev}`
    await conn.sendLuffy(m.chat, txt2, dev, ban, img, img, redes, fkontak)

  }}

*/