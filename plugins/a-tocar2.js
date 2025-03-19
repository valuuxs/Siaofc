//By Criss Escobar
import axios from 'axios';

const handler = async (m, { command, conn }) => {
    try {

        if (!db.data.chats[m.chat]?.nsfw && m.isGroup) 
            throw '🚩 *¡Estos comandos están desactivados en este chat!*';

        await conn.sendMessage(m.chat, { react: { text: '🙈', key: m.key } });

        const url = `https://raw.githubusercontent.com/CheirZ/HuTao-Proyect/master/src/JSON/${command}.json`;
        const { data: res } = await axios.get(url);

        if (!Array.isArray(res) || res.length === 0) 
            throw '🚩 *No se encontró contenido para este comando.*';

        const randomImage = res[Math.floor(Math.random() * res.length)];

        await conn.sendMessage(m.chat, {
            image: { url: randomImage },
            caption: `💋 *${command}*`,
            footer: dev,
            buttons: [
                {
                    buttonId: `.${command}`,
                    buttonText: { displayText: 'Siguiente' }
                }
            ],
            viewOnce: true,
            headerType: 4
        }, { quoted: m });

    } catch (err) {
        console.error(err);
        m.reply(`*[ ❌ ] Error archivo no encontrado:*\n>${err.message || err}`);
    }
};

handler.help = handler.command = [
    'nsfwloli', 'nsfwfoot', 'nsfwass', 'nsfwbdsm', 'nsfwcum', 'nsfwero', 
    'nsfwfemdom', 'nsfwglass', 'nsfworgy', 'yuri', 'yuri2', 'yaoi', 'yaoi2', 
    'panties', 'tetas', 'booty', 'ecchi', 'furro', 'hentai', 'trapito', 
    'imagenlesbians', 'pene', 'porno', 'randomxxx', 'pechos'
];

handler.tags = ['nsfw'];

export default handler;