import { WAMessageStubType } from '@whiskeysockets/baileys'
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
    let bienvenida = `┌─★ 𝐒𝐡𝐚𝐝𝐨𝐰 𝐔𝐥𝐭𝐫𝐚\n│「 Bienvenido 」\n└┬★ 「 @${m.messageStubParameters[0].split`@`[0]} 」\n   │✑ ${welcomeMessage}\n   │✑  ${groupMetadata.subject}\n   └───────────────┈ ⳹\n> ${dev}`
      await conn.sendMessage(m.chat, { image: img, caption: bienvenida, mentions: [who] }, { quoted: estilo })
    } else if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE || m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {

const despMessage = global.db.data.chats[m.chat]?.despMessage || 'Se Fue😹';

     let bye = `┌─★ 𝐒𝐡𝐚𝐝𝐨𝐰 𝐔𝐥𝐭𝐫𝐚\n│「 ADIOS 👋 」\n└┬★ 「 @${m.messageStubParameters[0].split`@`[0]} 」\n   │✑ ${despMessage}\n   │✑ Ojalá lo violen xD\n   └───────────────┈ ⳹\n> ${dev}`
      await conn.sendMessage(m.chat, { image: img, caption: bye, mentions: [who] }, { quoted: estilo })
    }
  }

  return true
}