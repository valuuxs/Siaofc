/*
//Mejorado por Criss 

let { downloadContentFromMessage } = (await import('@whiskeysockets/baileys'));

let handler = async (m, { conn }) => {
if (!m.quoted) return conn.reply(m.chat, `*${xtools} Por favor, responde a una imagen ViewOnce (ver una sola vez)*.`, m)
if (!m?.quoted || !m?.quoted?.viewOnce) return conn.reply(m.chat, `*${xtools} Responde a una imagen ViewOnce (ver una sola vez)*`, m)
let buffer = await m.quoted.download(false);
if (/videoMessage/.test(m.quoted.mtype)) {
return conn.sendFile(m.chat, buffer, 'media.mp4', m.quoted.caption || '', m)
} else if (/imageMessage/.test(m.quoted.mtype)) {
return conn.sendFile(m.chat, buffer, 'media.jpg', m.quoted?.caption || '', m)
} else if (/audioMessage/.test(m.quoted.mtype)) {
return conn.sendFile(m.chat, buffer, 'audio.mp3', '', m, { mimetype: 'audio/mp3' })
}}
handler.help = ['read']
handler.tags = ['herramientas']
handler.command = ['readviewonce', 'read', 'readvo', 'ver'] 
//handler.register = true 

export default handler;
*/

// Mejorado por Criss

let { downloadContentFromMessage } = (await import('@whiskeysockets/baileys'));

let handler = async (m, { conn }) => {
  if (!m.quoted) return conn.reply(m.chat, `*${xtools} Por favor, responde a una imagen ViewOnce (ver una sola vez)*.`, m)
  if (!m?.quoted || !m?.quoted?.viewOnce) return conn.reply(m.chat, `*${xtools} Responde a una imagen ViewOnce (ver una sola vez)*`, m)

  // Reacción de espera
  await m.react('⏳')

  try {
    let buffer = await m.quoted.download(false)

    if (/videoMessage/.test(m.quoted.mtype)) {
      await conn.sendFile(m.chat, buffer, 'media.mp4', m.quoted.caption || '', m)
    } else if (/imageMessage/.test(m.quoted.mtype)) {
      await conn.sendFile(m.chat, buffer, 'media.jpg', m.quoted?.caption || '', m)
    } else if (/audioMessage/.test(m.quoted.mtype)) {
      await conn.sendFile(m.chat, buffer, 'audio.mp3', '', m, { mimetype: 'audio/mp3' })
    }

    // Reacción de éxito
    await m.react('✅')

  } catch (e) {
    console.error(e)
    await m.react('❌')
    conn.reply(m.chat, `*${xtools} Ocurrió un error al procesar el mensaje.*`, m)
  }
}

handler.help = ['read']
handler.tags = ['herramientas']
handler.command = ['readviewonce', 'read', 'readvo', 'ver'] 

export default handler;