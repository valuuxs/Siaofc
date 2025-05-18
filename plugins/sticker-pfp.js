/*
let handler = async (m, { conn }) => {
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let name = conn.getName(who);
    let pp = await conn.profilePictureUrl(who, 'image').catch(() => 'https://qu.ax/QGAVS.jpg');
    await conn.sendFile(m.chat, pp, 'profile.jpg', `*🍪 Foto de perfil de \`${name}\`*`, m);
}

handler.help = ['pfp @user'];
handler.tags = ['sticker'];
handler.command = ['pfp'];

export default handler;*/

let handler = async (m, { conn }) => {
    let who = m.quoted ? m.quoted.sender : m.mentionedJid?.[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let name = await conn.getName(who);

    try {
        let pp = await conn.profilePictureUrl(who, 'image');
        await conn.sendFile(m.chat, pp, 'profile.jpg', `*${xsticker} Foto de perfil de \`${name}\`*`, m);
    } catch (e) {
        await m.reply(`*⚠️ El usuario \`${name}\` no tiene foto de perfil.*`);
    }
};

handler.help = ['pfp @user'];
handler.tags = ['sticker'];
handler.command = ['pfp'];

export default handler;