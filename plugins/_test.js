/* RuletaBan By WillZek - Modificado para parecer una ruleta */

let handler = async (m, { conn, text, participants }) => {

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
await conn.reply(m.chat, `🎰 *La ruleta está girando...*`, m);
await new Promise(resolve => setTimeout(resolve, 2000));

// Cuenta regresiva con suspenso
await conn.reply(m.chat, `🔄 *3...*`, m);
await new Promise(resolve => setTimeout(resolve, 1000));

await conn.reply(m.chat, `🔄 *2...*`, m);
await new Promise(resolve => setTimeout(resolve, 1000));

await conn.reply(m.chat, `🔄 *1...*`, m);
await new Promise(resolve => setTimeout(resolve, 1000));

// Elegir usuario aleatorio
const randomUser = gNoAdmins[Math.floor(Math.random() * gNoAdmins.length)];
const tag = await conn.getName(randomUser.id);

// Anunciar al perdedor
await conn.reply(m.chat, `🎯 *¡La ruleta ha elegido a... ${tag}!*\n\n😈 *¡Adiós!*`, m);

// Eliminar usuario
await conn.groupParticipantsUpdate(m.chat, [randomUser.id], 'remove');

// Mensaje de confirmación
await conn.reply(m.chat, `*${tag}* fue eliminado con éxito. 🎩`, m);
m.react('✅');
}

handler.help = ['ruletaban']
handler.tags = ['grupo']
handler.command = /^(ruletaban2|rban2)$/i;
handler.group = true;
handler.botAdmin = true;

export default handler;