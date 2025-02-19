const handler = async (m, { conn, text }) => {
    if (!text) {
        return conn.reply(m.chat, '⚠️ Agrega un texto después del comando.', m);
    }

    const message = {
        text: "✅ *SELECCIONA UNA OPCIÓN*",
        footer: "Prueba de botones",
        buttons: [
            { buttonId: "tocar1", buttonText: { displayText: "🎵 Tocar1" }, type: 1 },
            { buttonId: "tocar2", buttonText: { displayText: "🎶 Tocar2" }, type: 1 },
        ],
        headerType: 1
    };

    await conn.sendMessage(m.chat, message, { quoted: m });
};

handler.command = ["tocar"];
export default handler;