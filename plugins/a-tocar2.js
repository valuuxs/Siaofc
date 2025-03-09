// Videoxxx2
let handler = async(m, { conn }) => {

let chat = global.db.data.chats[m.chat];
if (!chat.nsfw) return m.reply('🧬');

let vid = 'https://dark-core-api.vercel.app/api/random/anime-random-hot?key=dk-vip';

conn.sendMessage(m.chat, { 
        video: { url: vid }, 
        caption: '🍒 ¡Disfruta Del Video!', 
        footer: dev, 
        buttons: [
            {
                buttonId: `.vxxx3`,
                buttonText: { displayText: 'Siguiente Vídeo' }
            }
        ],
        viewOnce: true,
        headerType: 4
    }, { quoted: m });
}

handler.tag = ['emox'];
handler.help = ['videoxxx'];
handler.command = ['videoxxx3', 'vxxx3'];

export default handler;