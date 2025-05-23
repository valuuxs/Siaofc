/*import fetch from 'node-fetch';

const handler = async (m, { conn, command, text, isAdmin, participants }) => {
    const userId = m.mentionedJid && m.mentionedJid[0] 
                    ? m.mentionedJid[0] 
                    : m.quoted 
                        ? m.quoted.sender 
                        : text;

    if (!isAdmin) throw '🍬 *Solo un administrador puede ejecutar este comando*';
    if (!userId) throw '🍬 *Menciona a la persona que deseas mutear o desmutear*';

    const user = global.db.data.users[userId] || {};
    user.mute = user.mute || false;

    if (command === 'mute') {
        if (user.mute) throw '🍭 *Este usuario ya ha sido muteado*';
        user.mute = true;
        await conn.reply(m.chat, '🍭 *Este usuario ha sido muteado y sus mensajes serán eliminados*', m);
    }

    if (command === 'unmute') {
        if (!user.mute) throw '🍭 *Este usuario no está muteado*';
        user.mute = false;
        await conn.reply(m.chat, '🍬 *Este usuario ha sido desmuteado*', m);
    }

    // Guardar el estado en la base de datos
    global.db.data.users[userId] = user;
};

// Escuchar y eliminar los mensajes de usuarios muteados en el mismo handler
handler.before = async (m, { conn }) => {
    const sender = m.sender;
    const isMuted = global.db.data.users[sender]?.mute;

    if (isMuted && !m.key.fromMe) {
        try {
            await conn.sendMessage(m.chat, { delete: m.key });
        } catch (e) {
            console.error('Error al eliminar mensaje:', e);
        }
    }
};

handler.command = ['mute', 'unmute'];
handler.admin = true;
handler.botAdmin = true;
handler.rowner = true;

export default handler;*/


import fs from 'fs';

let mutedUsers = new Set();

try {
const data = fs.readFileSync('./muted-users.json', 'utf-8');
mutedUsers = new Set(JSON.parse(data));
} catch (e) {
mutedUsers = new Set();
}

let handler = async (m, { conn, usedPrefix, command }) => {

let user;
if (m.quoted) {
  user = m.quoted.sender;
} else if (m.mentionedJid && m.mentionedJid.length) {
  user = m.mentionedJid[0];
} else {
  return conn.reply(m.chat, `*${xgc} Por favor, menciona al usuario que desea mutar / desmutar.*`, m);
}

const ownerBot = global.owner.map(owner => owner[0] + '@s.whatsapp.net');

if (ownerBot.includes(user)) {
  return conn.reply(m.chat, `*☁️ No puedo mutar a mi propietario.*`, m);
}

if (command === "mute") {
mutedUsers.add(user);
guardarMuteos();
conn.reply(m.chat, `*🔇 El usuario* *@${user.split('@')[0]}* *fue mutado*\n> *Sus mensajes serán eliminados.*`, fkontak, { mentions: [user] });
} else if (command === "unmute") {
mutedUsers.delete(user);
guardarMuteos();
conn.reply(m.chat, `*🔊 El usuario* *@${user.split('@')[0]}* *fue desmutado*\n> *Sus mensajes no serán eliminados.*`, fkontak, { mentions: [user] });
}
};

// Función para guardar los usuarios muteados en archivo
function guardarMuteos() {
fs.writeFileSync('./muted-users.json', JSON.stringify([...mutedUsers]));
}

handler.before = async (m, { conn }) => {
if (mutedUsers.has(m.sender)) {
try {
await conn.sendMessage(m.chat, { delete: m.key });
} catch (e) {
console.error('Error eliminando mensaje de usuario muteado:', e);
}
}
};

handler.help = ['mute', 'unmute'];
handler.tags = ['grupo'];
handler.command = /^(mute|unmute)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;