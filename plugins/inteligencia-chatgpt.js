import axios from 'axios';

const handler = async (m, { text, conn }) => {
    if (!text) return conn.reply(m.chat, '*✍️ Escribe algo para preguntarle a la IA.*', m);

    const contexto = `Eres un bot llamado Shadow Bot, muy inteligente, amable y con sentido del humor. Responde lo siguiente: ${text}`;

    try {
        await conn.sendPresenceUpdate('composing', m.chat);
        await conn.sendMessage(m.chat, { react: { text: '💭', key: m.key } });

        const res = await axios.get('https://api.sylphy.xyz/ai/chatgpt', {
            params: {
                text: contexto,
                apikey: 'sylph'
            }
        });

        const reply = res.data?.result || '*❌ No se recibió respuesta de la IA.*';
        return conn.reply(m.chat, reply, m);

    } catch (err) {
        console.error(err);
        return conn.reply(m.chat, '*❌ Hubo un error al contactar con la IA.*', m);
    }
};

handler.command = ['gpt'];
handler.help = ['gpt <texto>'];
handler.tags = ['ai'];

export default handler;