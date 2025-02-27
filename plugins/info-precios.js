/*

let handler = async (m, { conn }) => {
    let imageUrl = 'https://files.catbox.moe/ilr818.jpg';

    conn.sendMessage(m.chat, { 
        image: { url: imageUrl }, 
        caption: '🍒 ¡Bienvenido! @⁨Shadow V2⁩\n\n¿Quieres dominar WhatsApp con el bot más poderoso? ¡Shadow está aquí!\nPersonaliza tu experiencia de WhatsApp como nunca antes.', 
        footer: dev, 
        buttons: [
            {
                buttonId: `.owner`,
                buttonText: { displayText: 'owner' }
            }
        ],
        viewOnce: true,
        headerType: 4
    }, { quoted: m });
}

handler.tag = ['info'];
handler.help = ['p'];
handler.command = ['p'];

export default handler;


let handler = async (m, { conn }) => {

    conn.sendMessage(m.chat, { 
        text: '🍒 ¡Bienvenido! @⁨Shadow V2⁩\n\n¿Quieres dominar WhatsApp con el bot más poderoso? ¡Shadow está aquí!\nPersonaliza tu experiencia de WhatsApp como nunca antes.\n\n*`PRECIOS DEL BOT`*\n\n\`\`\`PERMAMENTE\`\`\`\n> *ᴜɴ ɢʀᴜᴘᴏ:*\n𝟦 🇵🇪/𝟣𝟥𝟢𝟢 🇦🇷\n> *ᴛʀᴇs ɢʀᴜᴘᴏs:*\n𝟪 🇵🇪/𝟤𝟨𝟢𝟢 🇦🇷\n> *sᴇɪs ɢʀᴜᴘᴏs:*\n𝟣𝟧 🇵🇪/𝟧𝟢𝟢𝟢 🇦🇷\n\n\`\`\`MENSUAL\`\`\`\n𝟤 🇵🇪/𝟫𝟢𝟢 🇦🇷\n\n\`\`\`PERSONALIZADO\`\`\`\n𝟥𝟢 🇵🇪/𝟫𝟧𝟢𝟢 🇦🇷\n\n\`\`\`PRUEBA & COMPRA\`\`\`\nhttps://chat.whatsapp.com/CwpXWm25KZX6HxUxcSmwvN', 
        footer: dev, 
        buttons: [
            {
                buttonId: `.owner`,
                buttonText: { displayText: 'Owner' },
                type: 1
            }
        ],
        viewOnce: true
    }, { quoted: m });
}

handler.tag = ['info'];
handler.help = ['p'];
handler.command = ['p'];

export default handler;
*/

let handler = async (m, { conn }) => {
    let imageUrl = 'https://files.catbox.moe/ilr818.jpg';

    conn.sendMessage(m.chat, {
        interactiveMessage: {
            body: {
                text: '🍒 ¡Bienvenido! @⁨Shadow V2⁩\n\n¿Quieres dominar WhatsApp con el bot más poderoso? ¡Shadow está aquí!\nPersonaliza tu experiencia de WhatsApp como nunca antes.'
            },
            header: {
                title: 'Shadow V2',
                subtitle: 'Bot de WhatsApp',
                media: { url: imageUrl, mimetype: 'image/jpeg' }
            },
            nativeFlowMessage: {
                buttons: [
                    {
                        name: 'cta_url',
                        buttonParamsJson: JSON.stringify({
                            display_text: 'owner',
                            url: 'https://wa.me/51927238856'
                        })
                    }
                ]
            }
        }
    }, { quoted: m });
}

handler.tag = ['info'];
handler.help = ['p'];
handler.command = ['p'];

export default handler;