/*let handler = async (m, { conn }) => {
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

export default handler;*/

let handler = async (m, { conn, args }) => {
    let who;

    if (args[0] && /^\+?\d{5,20}$/.test(args[0])) {
        let number = args[0].replace(/\D/g, '');
        let exists = await conn.onWhatsApp(number + '@s.whatsapp.net');

        if (!exists || !exists[0]?.exists) {
            return m.reply(`*✖️ El número *${args[0]}* no está registrado en WhatsApp.*`);
        }

        who = exists[0].jid; // más seguro
    } else if (m.quoted) {
        who = m.quoted.sender;
    } else if (m.mentionedJid?.[0]) {
        who = m.mentionedJid[0];
    } else {
        // Si no pasó nada válido: ni número, ni mención, ni cita
        return m.reply('*⚠️ Debes responder a un mensaje, etiquetar a un usuario o ingresar un número válido.*');
    }

    let name;
    try {
        name = await conn.getName(who);
    } catch {
        name = who.split('@')[0];
    }

    try {
        let pp = await conn.profilePictureUrl(who, 'image');
        await conn.sendFile(m.chat, pp, 'profile.jpg', `🖼️ *Foto de perfil de \`${name}\`*`, fkontak);
    } catch (e) {
        await m.reply(`⚠️ *El usuario \`${name}\` no tiene foto de perfil o no se pudo obtener porque esta oculta.*`);
    }
};

handler.help = ['pfp @user', 'pfp +numero'];
handler.tags = ['sticker', 'tools'];
handler.command = ['pfp'];

export default handler;