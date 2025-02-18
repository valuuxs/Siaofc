let handler = async (m, { conn, participants }) => {
    const gAdmins = participants.filter(p => p.admin);
    const botId = conn.user.jid;
    const gOwner = gAdmins.find(p => p.isAdmin)?.id;
    const gNoAdmins = participants.filter(p => p.id !== botId && p.id !== gOwner && !p.admin);

    if (participants.length === gAdmins.length) { 
        return m.reply('*[ ⚠️ ] Solo hay administradores en este grupo.*');
    }

    if (gNoAdmins.length === 0) {
        return m.reply('*[ ⚠️ ] No hay usuarios disponibles para eliminar.*');
    }

    let msg = await conn.reply(m.chat, '*[ 🎰] La ruleta está girando...*', m);

    // Cuenta regresiva con edición del mensaje (cada 3 segundos)
    await new Promise(resolve => setTimeout(resolve, 1500));
    await conn.sendMessage(m.chat, { text: '\`\`\`🔄 10%\`\`\`', edit: msg.key });

    await new Promise(resolve => setTimeout(resolve, 1500));
    await conn.sendMessage(m.chat, { text: '\`\`\`🔄 50%\`\`\`', edit: msg.key });

    await new Promise(resolve => setTimeout(resolve, 1500));
    await conn.sendMessage(m.chat, { text: '\`\`\`🔄 99%\`\`\`', edit: msg.key });

    // Elegir usuario aleatorio
    const randomUser = gNoAdmins[Math.floor(Math.random() * gNoAdmins.length)];
    const tag = await conn.getName(randomUser.id);

    // Anunciar al perdedor editando el mensaje
    await new Promise(resolve => setTimeout(resolve, 3000));
    await conn.sendMessage(m.chat, { text: `🎯 *¡La ruleta ha elegido a... ${tag}!*\n\n😈 *¡Adiós!*`, edit: msg.key });

    // Esperar antes de eliminar para dramatismo
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Eliminar usuario
    await conn.groupParticipantsUpdate(m.chat, [randomUser.id], 'remove');

    // Mensaje de confirmación final
    await new Promise(resolve => setTimeout(resolve, 3000));
    await conn.sendMessage(m.chat, { text: `*${tag}* fue eliminado con éxito. 🎩`, edit: msg.key });

    m.react('✅');
};

handler.help = ['ruletaban']
handler.tags = ['grupo']
handler.command = /^(ruletaban2|rban2)$/i;
handler.group = true;
handler.botAdmin = true;

export default handler;