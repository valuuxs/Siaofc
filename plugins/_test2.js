/* RuletaBan By WillZek - Ruleta con edición de mensaje */

let handler = async (m, { conn, participants }) => {
    const gAdmins = participants.filter(p => p.admin);
    const botId = conn.user.jid;
    const gOwner = gAdmins.find(p => p.isAdmin)?.id;
    const gNoAdmins = participants.filter(p => p.id !== botId && p.id !== gOwner && !p.admin);

    if (participants.length === gAdmins.length) { 
        return m.reply('*⚠️ Solo hay administradores en este grupo.*');
    }

    if (gNoAdmins.length === 0) {
        return m.reply('*⚠️ No hay usuarios disponibles para eliminar.*');
    }

    // Mensaje inicial
    let msg = await conn.reply(m.chat, '🎰 *La ruleta está girando...*', m);
    
    // Cuenta regresiva con edición del mensaje
    const countdown = ['🔄 *3...*', '🔄 *2...*', '🔄 *1...*'];
    for (let i = 0; i < countdown.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await conn.sendMessage(m.chat, { text: countdown[i], edit: msg.key });
    }

    // Elegir usuario aleatorio
    const randomUser = gNoAdmins[Math.floor(Math.random() * gNoAdmins.length)];
    const tag = await conn.getName(randomUser.id);

    // Anunciar al perdedor editando el mensaje
    await new Promise(resolve => setTimeout(resolve, 1000));
    await conn.sendMessage(m.chat, { text: `🎯 *¡La ruleta ha elegido a... ${tag}!*\n\n😈 *¡Adiós!*`, edit: msg.key });

    // Eliminar usuario
    await conn.groupParticipantsUpdate(m.chat, [randomUser.id], 'remove');

    // Mensaje de confirmación final
    await conn.sendMessage(m.chat, { text: `*${tag}* fue eliminado con éxito.`, edit: msg.key });
    m.react('✅');
};

handler.help = ['ruletaban']
handler.tags = ['grupo']
handler.command = /^(ruletaban3|rban3)$/i;
handler.group = true;
handler.botAdmin = true;

export default handler;