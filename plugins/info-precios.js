let handler = async (m, { conn }) => {
    let mensaje = `*🍒 ¡Bienvenido! Bebesita⁩*\n\n¿Quieres dominar WhatsApp con el bot más poderoso? *¡Shadow está aquí!*\nPersonaliza tu experiencia de WhatsApp como nunca antes.`;

    conn.sendMessage(m.chat, { 
        text: mensaje,
        footer: dev, 
        buttons: [
            {
                buttonId: `.videoxxx2`,
                buttonText: { displayText: 'sigᥙіᥱᥒ𝗍ᥱ ᥎іძᥱ᥆' }
            }
        ],
        headerType: 1
    }, { quoted: m });
};

handler.tag = ['nsfw'];
handler.help = ['v2'];
handler.command = ['v2'];

export default handler;