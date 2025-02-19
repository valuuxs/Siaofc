const handler2 = async (m, { conn }) => {
    return conn.reply(m.chat, '👋 Bye!', m);
};
handler2.command = ['tocar2'];
export default handler2;