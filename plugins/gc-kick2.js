let handler = async (m, { conn, participants, usedPrefix, command, isROwner }) => {
    let chatSettings = global.db.data.settings[m.chat] || {};
    
    if (!chatSettings.restrict) throw `*Modo restrict está desactivado. Usa #enable restrict*`;

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

handler.help = ['Kick'];
handler.tags = ['gc'];
handler.command = /^(ick|an|acar|ip|xpulsar)$/i;
handler.customPrefix = /k|K|b|B|s|S|r|R|e|E/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;