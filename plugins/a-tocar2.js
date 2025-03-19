/*import axios from 'axios';

const handler = async (m, { command, conn }) => {
    try {
        // Verifica si el chat permite NSFW
        if (!db.data.chats[m.chat]?.nsfw && m.isGroup) 
            throw '🚩 *¡Estos comandos están desactivados en este chat!*';

        // Agregar reacción
        await conn.sendMessage(m.chat, { react: { text: '🙈', key: m.key } });

        // Obtener contenido desde GitHub
        const url = `https://raw.githubusercontent.com/CheirZ/HuTao-Proyect/master/src/JSON/${command}.json`;
        const { data: res } = await axios.get(url);

        // Seleccionar un elemento aleatorio
        if (!Array.isArray(res) || res.length === 0) 
            throw '🚩 *No se encontró contenido para este comando.*';

        const randomImage = res[Math.floor(Math.random() * res.length)];

        // Enviar archivo
        await conn.sendFile(m.chat, randomImage, 'nsfw.jpg', `🔥 *${command}*`, m, null, rcanal || {});

    } catch (err) {
        console.error(err);
        m.reply(`❌ *_Error al obtener contenido:_* ${err.message || err}`);
    }
};

// Configuración del handler
handler.help = handler.command = [
    'nsfwloli', 'nsfwfoot', 'nsfwass', 'nsfwbdsm', 'nsfwcum', 'nsfwero', 
    'nsfwfemdom', 'nsfwglass', 'nsfworgy', 'yuri', 'yuri2', 'yaoi', 'yaoi2', 
    'panties', 'tetas', 'booty', 'ecchi', 'furro', 'hentai', 'trapito', 
    'imagenlesbians', 'pene', 'porno', 'randomxxx', 'pechos'
];

handler.tags = ['nsfw'];

export default handler;*/


import axios from 'axios';

const handler = async (m, { command, conn }) => {
    try {
        // Verifica si el chat permite NSFW
        if (!db.data.chats[m.chat]?.nsfw && m.isGroup) 
            throw '🚩 *¡Estos comandos están desactivados en este chat!*';

        // Agregar reacción
        await conn.sendMessage(m.chat, { react: { text: '🙈', key: m.key } });

        // Obtener contenido desde GitHub
        const url = `https://raw.githubusercontent.com/CheirZ/HuTao-Proyect/master/src/JSON/${command}.json`;
        const { data: res } = await axios.get(url);

        // Seleccionar un elemento aleatorio
        if (!Array.isArray(res) || res.length === 0) 
            throw '🚩 *No se encontró contenido para este comando.*';

        const randomImage = res[Math.floor(Math.random() * res.length)];

        // Crear botones para los otros comandos disponibles
        const buttons = handler.command.map(cmd => ({
            buttonId: `.${cmd}`,
            buttonText: { displayText: `📌 ${cmd}` }
        }));

        // Enviar imagen con botones
        await conn.sendMessage(m.chat, { 
            image: { url: randomImage },
            caption: `🔥 *${command}*`,
            footer: 'Shadow Bot',
            buttons,
            headerType: 4
        }, { quoted: m });

    } catch (err) {
        console.error(err);
        m.reply(`❌ *_Error al obtener contenido:_* ${err.message || err}`);
    }
};

// Configuración del handler
handler.help = handler.command = [
    'nsfwloli', 'nsfwfoot', 'nsfwass', 'nsfwbdsm', 'nsfwcum', 'nsfwero', 
    'nsfwfemdom', 'nsfwglass', 'nsfworgy', 'yuri', 'yuri2', 'yaoi', 'yaoi2', 
    'panties', 'tetas', 'booty', 'ecchi', 'furro', 'hentai', 'trapito', 
    'imagenlesbians', 'pene', 'porno', 'randomxxx', 'pechos'
];

handler.tags = ['nsfw'];

export default handler;