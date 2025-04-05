import fetch from "node-fetch"

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!db.data.chats[m.chat].nsfw && m.isGroup) {
        return m.reply('*ℹ️ El contenido* ```nsfw``` *está desactivado para este chat.*\n> Use *enable nsfw* para activarlo.');
    }

    if (!text) throw m.reply(`*🍁 Por favor, ingresa el texto de lo que deseas buscar en xnxx*\n> *\`Ejemplo:\`* ${usedPrefix + command} Con mi Prima.`)

await m.react('⌛');

let res;
try {
    let response = await fetch(`https://api.agatz.xyz/api/xnxx?message=${encodeURIComponent(text)}`);
    res = await response.json();
} catch (e) {
    return m.reply('```❌ Error al conectar con la API.```');
}

    if (res.status !== 200) throw m.reply(`API Error: ${res.creator}`)

    let resultText = `\`\`\`乂 XNXX - SEARCH\`\`\``;
    res.data.result.slice(0, 10).forEach((item, index) => {
        resultText += `\n\n*\`${index + 1}\`*`
        resultText += `\n≡ 🌴 *\`Title:\`* ${item.title}`
        resultText += `\n≡ 🌿 *\`Info:\`* ${item.info}`
        resultText += `\n≡ 🌵 *\`Url:\`* ${item.link}`
    })

  await conn.sendMessage(m.chat, { text: resultText }, { quoted: fkontak });
await m.react('✅');
}

handler.command = ['xnxxsearch', 'xnxxs']
handler.help = ['xnxxsearch']
handler.tags = ['buscador']
handler.register = true

export default handler