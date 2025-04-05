/*import fetch from "node-fetch"

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!db.data.chats[m.chat].nsfw && m.isGroup) {
    return m.reply('*ℹ️ El contenido* \`\`\`nsfw\`\`\` *está desactivado para este chat.*\n> Use *enable nsfw* para activarlo.');
    }

  if (!text) throw m.reply(`*🍁 Por favor, ingresa el texto de lo que deseas buscar en xnxx*\n> *\`Ejemplo:\`* ${usedPrefix + command} Con mi Prima.`)
  let response = await fetch(`https://api.agatz.xyz/api/xnxx?message=${text}`)
  let res = await response.json()

  if (res.status !== 200) throw m.reply(`API Error: ${res.creator}`)

  let resultText = ''
  for (let i = 0; i < res.data.result.length; i++) {
    let result = res.data.result[i]
    let hasil = `• *Titulo:* ${result.title}\n• *Info:* ${result.info}\n• *Link:* ${result.link}\n`
    resultText += hasil + '\n'
  }

  await conn.reply(m.chat, '*⏳ Espere un momento...*', m)

  conn.sendMessage(m.chat, {
    text: resultText,
    contextInfo: {
      externalAdReply: {
        title: `Xnxx Videos`,
        body: `Shadow Ultra`,
        thumbnailUrl: "https://pomf2.lain.la/f/kro5qrjk.jpg",
        sourceUrl: "https://xxnx.com",
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  })
}

handler.command = ['xnxxsearch', 'xnxxs']
handler.help = ['xnxxsearch']
handler.tags = ['buscador']
handler.register = true

export default handler*/
import fetch from "node-fetch"

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!db.data.chats[m.chat].nsfw && m.isGroup) {
        return m.reply('*ℹ️ El contenido* ```nsfw``` *está desactivado para este chat.*\n> Use *enable nsfw* para activarlo.');
    }

    if (!text) throw m.reply(`*🍁 Por favor, ingresa el texto de lo que deseas buscar en xnxx*\n> *\`Ejemplo:\`* ${usedPrefix + command} Con mi Prima.`)

    let response = await fetch(`https://api.agatz.xyz/api/xnxx?message=${text}`)
    let res = await response.json()

    if (res.status !== 200) throw m.reply(`API Error: ${res.creator}`)

    let resultText = `\`\`\`乂 XNXX - SEARCH\`\`\``;
    res.data.result.forEach((item, index) => {
        resultText += `\n\n*\`${index + 1}\`*`
        resultText += `\n≡ 🔞 *\`Titulo:\`* ${item.title}`
        resultText += `\n≡ 📄 *\`Info:\`* ${item.info}`
        resultText += `\n≡ 🔗 *\`Link:\`* ${item.link}`
    })

    await m.react('⌛');

    conn.sendMessage(m.chat, {
        text: resultText,
        contextInfo: {
            externalAdReply: {
                title: `XNXX Videos`,
                body: `Shadow Ultra`,
                thumbnailUrl: "https://pomf2.lain.la/f/kro5qrjk.jpg",
                sourceUrl: "https://xxnx.com",
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    })
}

handler.command = ['xnxxsearch', 'xnxxs']
handler.help = ['xnxxsearch']
handler.tags = ['buscador']
handler.register = true

export default handler