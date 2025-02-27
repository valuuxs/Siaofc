let handler = async (m, { conn }) => {
    let texto = `*🍒 ¡Bienvenido! Bebesita⁩*\n\n` +
                `¿Quieres dominar WhatsApp con el bot más poderoso? *¡Shadow está aquí!*\n` +
                `Personaliza tu experiencia de WhatsApp como nunca antes.\n\n` +
                `*PRECIOS DEL BOT*\n\n` +
                `\`\`\`PERMANENTE\`\`\`\n` +
                `> *ᴜɴ ɢʀᴜᴘᴏ:* 𝟦 🇵🇪 / 𝟣𝟥𝟢𝟢 🇦🇷\n` +
                `> *ᴛʀᴇs ɢʀᴜᴘᴏs:* 𝟪 🇵🇪 / 𝟤𝟨𝟢𝟢 🇦🇷\n` +
                `> *sᴇɪs ɢʀᴜᴘᴏs:* 𝟣𝟧 🇵🇪 / 𝟧𝟢𝟢𝟢 🇦🇷\n\n` +
                `\`\`\`MENSUAL\`\`\`\n` +
                `𝟤 🇵🇪 / 𝟫𝟢𝟢 🇦🇷\n\n` +
                `\`\`\`PERSONALIZADO\`\`\`\n` +
                `𝟥𝟢 🇵🇪 / 𝟫𝟧𝟢𝟢 🇦🇷\n\n` +
                `\`\`\`PRUEBA & COMPRA\`\`\`\n` +
                `https://chat.whatsapp.com/CwpXWm25KZX6HxUxcSmwvN\n\n` +
                `¡ᥒ᥆ 𝗍ᥱ ⍴іᥱrძᥲs ᥣᥲ ᥆⍴᥆r𝗍ᥙᥒіძᥲძ ძᥱ ᥣᥣᥱ᥎ᥲr 𝗍ᥙ ᥱ᥊⍴ᥱrіᥱᥒᥴіᥲ ძᥱ ᥕһᥲ𝗍sᥲ⍴⍴ ᥲᥣ sіgᥙіᥱᥒ𝗍ᥱ ᥒі᥎ᥱᥣ ᥴ᥆ᥒ ᥒᥙᥱs𝗍r᥆ ᑲ᥆𝗍!`;

    conn.sendMessage(m.chat, { 
        text: texto, 
        footer: 'Shadow Bot',
        buttons: [
            {
                buttonId: `.owner`,
                buttonText: { displayText: 'Owner' }
            }
        ],
        headerType: 1
    }, { quoted: m });
}

handler.tag = ['info'];
handler.help = ['tes'];
handler.command = ['tes'];

export default handler;