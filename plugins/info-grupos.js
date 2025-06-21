let handler = async (m, { conn, usedPrefix, command }) => {

let grupos = `*¡Hola!, te invito a unirte a los grupos oficiales del Bot para convivir con la comunidad oficial* 🌹

✑ 𝖦𝗋𝗎𝗉𝗈 𝖮𝖿𝗂𝖼𝗂𝖺𝗅 𝖲𝗁𝖺𝖽𝗈𝗐
✎${grupo}

✑ 𝖢𝗅𝗎𝖻/𝖢𝗈𝗆𝗆𝗎𝗇𝗂𝗍𝗒 
   𝖲𝗁𝖺𝖽𝗈𝗐𝗌 𝖢𝗅𝗎𝖻
✎${comu}

✑ 𝖢𝖺𝗇𝖺𝗅𝖾𝗌 𝖮𝖿𝗂𝖼𝗂𝖺𝗅𝖾𝗌
✎ ${channel}

✑ 𝖨𝗇𝗌𝗍𝖺𝗀𝗋𝖺𝗆
✎ ${ig}

> ${dev}`

let img = 'https://files.catbox.moe/un3h2c.jpg';

conn.sendMessage(m.chat, { image: { url: img }, caption: grupos }, { quoted: fkontak });
}

handler.help = ['grupos']
handler.tags = ['info']
handler.command = ['grupos', 'shadowgrupos', 'club']

export default handler