let handler = async(m, { conn, usedPrefix, command }) => {
    const stickerUrl = 'https://files.catbox.moe/0sewha.webp'; 
    m.react('😎');

    await conn.sendFile(m.chat, stickerUrl, 'sticker.webp', '', m, null);

    const groupMetadata = await conn.groupMetadata(m.chat);
    const participants = groupMetadata.participants;
    let mentions = participants.map(p => p.id).join(' ');

    await conn.sendMessage(m.chat, { text: `¡A levantarse bola de negros feos! Ya amaneció y el día es nuestro 🙂‍↕️`, mentions: participants.map(p => p.id) });
};

handler.tag = ['sticker'];
handler.help = ['reloj'];
handler.command = ['levantar', 'reloj'];
handler.admin = true;

export default handler;