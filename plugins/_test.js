import yts from 'yt-search';
let handler = async (m, { conn, usedPrefix, text, args, command }) => {
if (!text) conn.reply(m.chat, `𝙀𝙎𝘾𝙍𝙄𝘽𝘼 𝙀𝙇 𝙉𝙊𝙈𝘽𝙍𝙀 𝘿𝙀 𝙐𝙉 𝙑𝙄𝘿𝙀𝙊 𝙊 𝘾𝘼𝙉𝘼𝙇 𝘿𝙀 𝙔𝙊𝙐𝙏𝙐𝘽𝙀\n\n𝙒𝙍𝙄𝙏𝙀 𝙏𝙃𝙀 𝙉𝘼𝙈𝙀 𝙊𝙁 𝘼 𝙔𝙊𝙐𝙏𝙐𝘽𝙀 𝙑𝙄𝘿𝙀𝙊 𝙊𝙍 𝘾𝙃𝘼𝙉𝙉𝙀𝙇`, fkontak,  m)
try {
    let result = await yts(text);
    let ytres = result.videos;
  let teskd = `𝘽𝙪𝙨𝙦𝙪𝙚𝙙𝙖 𝙙𝙚 *${text}*`

let listSections = [];
for (let index in ytres) {
        let v = ytres[index];
        listSections.push({
         title: `𝙍𝙀𝙎𝙐𝙇𝙏𝘼𝘿𝙊𝙎`,
            rows: [
                {
                    header: '𝗔 𝗨 𝗗 𝗜 𝗢',
                    title: "",
                    description: `${v.title} | ${v.timestamp}\n`, 
                    id: `${usedPrefix}yta ${v.url}`
                },
                {
                    header: "𝗩 𝗜 𝗗 𝗘 𝗢",
                    title: "" ,
                    description: `${v.title} | ${v.timestamp}\n`, 
                    id: `${usedPrefix}ytv ${v.url}`
                }, 
              {
                    header: "𝗔 𝗨 𝗗 𝗜 𝗢   𝗗 𝗢 𝗖",
                    title: "" ,
                    description: `${v.title} | ${v.timestamp}\n`, 
                    id: `${usedPrefix}play3 ${v.url}`
                }, 
                {
                    header: "𝗩 𝗜 𝗗 𝗘 𝗢   𝗗 𝗢 𝗖",
                    title: "" ,
                    description: `${v.title} | ${v.timestamp}\n`, 
                    id: `${usedPrefix}play4 ${v.url}`
                }
            ]
        });
    }
await conn.sendList(m.chat, `*𝙍𝙀𝙎𝙐𝙇𝙏𝘼𝘿𝙊𝙎*\n`, `\n𝘽𝙪𝙨𝙦𝙪𝙚𝙙𝙖 𝙙𝙚: ${text}`, `𝗕 𝗨 𝗦 𝗖 𝗔 𝗥`, listSections, fkontak);
} catch (e) {
await conn.sendButton(m.chat, `*❌ error*`, null, null, m)
console.log(e) 
}}
handler.help = ['playlist']
handler.tags = ['dl']
handler.command = /^playlist|ytbuscar|yts(earch)?$/i
export default handler