let handler = async (m, { conn, participants, usedPrefix, command, isROwner }) => {

    let kickte = `*[ ℹ️ ] Menciona al usuario que deseas eliminar.*`;

    if (!m.mentionedJid[0] && !m.quoted) 
        return m.reply(kickte, m.chat, { mentions: conn.parseMention(kickte) });

    let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
    let groupMetadata = await conn.groupMetadata(m.chat);
    let owner = groupMetadata.owner;

    if (user === owner) {
        return m.reply(`*[ ℹ️ ] No puedes eliminar al creador del grupo.*`);
    }

    await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
    m.reply(`*[ ℹ️ ] El participante fue eliminado.*`);
};

handler.help = ['kick *<@tag>*'];
handler.tags = ['gc'];
handler.command = ['kick2', 'expulsar2', 'ban2', 'rip2', 'sacar2'];
handler.admin = true;
handler.group = true;
handler.botAdmin = true;

handler.help = ['Aviso *<txt>*'];
handler.tags = ['gc'];
handler.command = /^(ick|an|acar|xpulsar|ip)$/i;
handler.customPrefix = /k|K|b|B|s|S|e|E|r|R/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;