const handler = async (m, { conn, text, command }) => {
    if (!text) {
        return conn.reply(m.chat, '⚠️ Agrega un texto después del comando.', m);
    }

    const body = `✅ *SELECCIONA UNA OPCIÓN*`;

    await conn.sendMessage(m.chat, {
        text: body,
        footer: "Prueba de botones",
        buttons: [
            { buttonId: `.tocar1`, buttonText: { displayText: '🎵 Tocar1' }, type: 1 },
            { buttonId: `.tocar2`, buttonText: { displayText: '🎶 Tocar2' }, type: 1 },
        ],
        headerType: 1
    }, { quoted: m });
};

handler.command = ['tocar'];
export default handler;