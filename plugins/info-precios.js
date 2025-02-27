// Para los pajeros xd
let handler = async (m, { conn }) => {
    conn.sendMessage(m.chat, { 
        image: { url: 'https://files.catbox.moe/ilr818.jpg' }, 
        caption: `*🍒 ¡Bienvenido! Shadow V2⁩*\n\n¿Quieres dominar WhatsApp con el bot más poderoso? *¡Shadow está aquí!*\nPersonaliza tu experiencia de WhatsApp como nunca antes.`,
        footer: dev, 
        buttons: [
            {
                buttonId: `.videoxxx2`,
                buttonText: { displayText: 'sigᥙіᥱᥒ𝗍ᥱ ᥎іძᥱ᥆' }
            }
        ],
        headerType: 4
    }, { quoted: m });
}

handler.tag = ['nsfw'];
handler.help = ['videoxxx2'];
handler.command = ['videoxxx2'];

export default handler;