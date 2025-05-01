let handler = async (m, { conn }) => {

m.react('👩🏿');

const message = "She is Mari and like the black penis 🌚";
if (m.isGroup) {

const imageUrl = 'https://files.catbox.moe/kzcctr.jpg';

await conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: message }, { mimetype: 'image/jpeg' });
}
}
handler.help = ['bermuda'];
handler.tags = ['ff'];
handler.command = ['negra', 'mari'];
handler.admin = true;
handler.botAdmin = false;
handler.group = true;

export default handler;