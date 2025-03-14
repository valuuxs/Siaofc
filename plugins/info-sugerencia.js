let handler = async (m, { conn, text }) => {
    const suittag = '51927238856'; // Reemplaza con el número del propietario sin el + ni espacios
    const nombre = m.pushName || 'Usuario'; // Nombre del usuario o por defecto "Usuario"

    if (!text) {
        return conn.reply(m.chat, '¿Qué comando quieres sugerir?', m);
    }
    if (text.length < 10) {
        return conn.reply(m.chat, 'La sugerencia debe tener al menos 10 caracteres.', m);
    }
    if (text.length > 1000) {
        return conn.reply(m.chat, 'El máximo permitido para la sugerencia es de 1000 caracteres.', m);
    }

    const teks = `Sugerencia de nuevo comando de ${nombre}:

Comando sugerido:
> ${text}`;

    // Enviar sugerencia al propietario
    await conn.reply(`${suittag}@s.whatsapp.net`, m.quoted ? teks + m.quoted.text : teks, m, {
        mentions: conn.parseMention(teks),
    });

    // Confirmación al usuario
    m.reply('Tu sugerencia ha sido enviada al propietario.');
};

handler.help = ['newcommand <texto>'];
handler.tags = ['info'];
handler.command = ['newcommand', 'sug', 'sugerir', 'sugerencia'];

export default handler;