let handler = async (m, { conn, usedPrefix, command }) => {

let grupos = `*¡Hola!, te invito a unirte a los grupos oficiales del Bot para convivir con la comunidad oficial* 🌹

✑ 𝖦𝗋𝗎𝗉𝗈 𝖮𝖿𝗂𝖼𝗂𝖺𝗅 𝖲𝗁𝖺𝖽𝗈𝗐


✑ 𝖢𝗅𝗎𝖻/𝖢𝗈𝗆𝗆𝗎𝗇𝗂𝗍𝗒 
   𝖲𝗁𝖺𝖽𝗈𝗐𝗌 𝖢𝗅𝗎𝖻


✑ 𝖢𝖺𝗇𝖺𝗅𝖾𝗌 𝖮𝖿𝗂𝖼𝗂𝖺𝗅𝖾𝗌


> ${dev}`

let img = 'https://cdnmega.vercel.app/media/0koXFaLT@i7K8L3tXymGVsjK7a1cLTaxk5th9cUTCpRU4FSchn-4';

conn.sendMessage(m.chat, { image: { url: img }, caption: grupos }, { quoted: fkontak });
}

handler.help = ['grupos']
handler.tags = ['info']
handler.command = ['grupos', 'shadowgrupos', 'club']

export default handler