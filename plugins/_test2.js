
// Para los pajeros xd
let handler = async(m, { conn }) => {

let rvid = global.vidxxx[Math.floor(Math.random() * global.vidxxx.length)];

conn.sendMessage(m.chat, { 
        video: { url: rvid }, 
        caption: '🍒 Disfruta del Video', 
        footer: dev, 
        buttons: [
            {
                buttonId: `.videoxxx2`,
                buttonText: { displayText: 'sigᥙіᥱᥒ𝗍ᥱ ᥎іძᥱ᥆' }
            }
        ],
        viewOnce: true,
        headerType: 4
    }, { quoted: m });
}

handler.tag = ['nsfw'];
handler.help = ['videoxxx2'];
handler.command = ['videoxxx2'];

export default handler;

global.vidxxx = [
''
];