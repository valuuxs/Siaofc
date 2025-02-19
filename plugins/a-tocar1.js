const handler1 = async (m, { conn }) => {
    return conn.reply(m.chat, '👋 ¡Hola!', m);
};
handler1.command = ['tocar1'];
export default handler1;