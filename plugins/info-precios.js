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
*/

let handler = async (m, { conn }) => {

    conn.sendMessage(m.chat, { 
        text: '🍒 ¡Bienvenido! @⁨Shadow V2⁩\n\n¿Quieres dominar WhatsApp con el bot más poderoso? ¡Shadow está aquí!\nPersonaliza tu experiencia de WhatsApp como nunca antes.', 
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