const handler = async (m, { conn, command, participants, text }) => {
    let users = participants.map(u => u.id).filter(v => v !== conn.user.jid)
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender

    if (!text) throw `*${xowner} Por favor, ingresa un texto para enviarlo luego de 2 horas.*`;
    m.reply(`*☁️ El texto será enviado después del tiempo estipulado.*`);

    function espera() {
        conn.reply(m.chat, text, null, { forward: text.fakeObj, mentions: users } )
    }
    setTimeout(espera, 720000);

  };
handler.command = ['let'];
handler.rowner = true;

export default handler;


const handler = async (m, { conn, command, participants, text }) => {
    let users = participants?.map(u => u.id).filter(v => v !== conn.user.jid);
    let who = m.quoted ? m.quoted.sender : m.mentionedJid?.[0] || (m.fromMe ? conn.user.jid : m.sender);

    if (!text) throw `*${xowner} Por favor, ingresa un texto para enviarlo luego de 2 horas.*`;

    m.reply(`*☁️ El texto será enviado después del tiempo estipulado.*`);

    function espera() {
        conn.reply(m.chat, text, null, {
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                mentionedJid: users
            }
        });
    }

    setTimeout(espera, 2 * 60 * 60 * 1000); // 2 horas
};

handler.command = ['let'];
handler.rowner = true;
handler.group = true

export default handler;