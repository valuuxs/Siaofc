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
  } else if (m.messageStubType == 28 || m.messageStubType == 32) {
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