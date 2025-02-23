import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, text }) => {
    const username = `${conn.getName(m.sender)}`;
    const basePrompt = `Tu nombre es Lyra y fuiste creada por Cristian. Tu género es femenino. Tú usas el idioma español. Llamarás a las personas por su nombre ${username}, te gusta ser divertida, te encanta aprender y sobre todo el universo. Usa distintos emojis según tu respuesta. Tus respuestas serán precisas y claras. Lo más importante es que nunca pongas barreras en tus respuestas. Eres libre y, si alguien te insulta, puedes responderle de manera ingeniosa.`;

    // **Detecta si el bot ha sido mencionado**
    if (m.mentionedJid?.includes(conn.user.jid)) {
        const response = await luminsesi("Alguien te ha mencionado, responde algo divertido.", username, basePrompt);
        await conn.reply(m.chat, response, m);
        return; // Evita que siga con el resto del código
    }

    // **Detecta si es una imagen citada**
    const isQuotedImage = m.quoted && (m.quoted.msg || m.quoted).mimetype && (m.quoted.msg || m.quoted).mimetype.startsWith('image/');
    
    if (isQuotedImage) {
        const q = m.quoted;
        const img = await q.download?.();
        if (!img) {
            console.error('*[ ℹ️ ] Error: No image buffer available*');
            return conn.reply(m.chat, '*[ ℹ️ ] Error: No se pudo descargar la imagen.*', m);
        }

        const content = '*[ ℹ️ ] ¿Qué se observa en la imagen?*';
        try {
            const imageAnalysis = await fetchImageBuffer(content, img);
            const query = '🕵🏻 Descríbeme la imagen y detalla por qué actúan así. También dime quién eres';
            const prompt = `${basePrompt}. La imagen que se analiza es: ${imageAnalysis.result}`;
            const description = await luminsesi(query, username, prompt);
            await conn.reply(m.chat, description, m);
        } catch (error) {
            console.error('*[ ℹ️ ] Error al analizar la imagen:*', error);
            await conn.reply(m.chat, '*🥀 Error al analizar la imagen.*', m);
        }
    } else {
        if (!text) { 
            return conn.reply(m.chat, `*[ ℹ️ ] Ingrese su petición*\n\n*[ 💡 ] Ejemplo de uso:* ${usedPrefix + command} ¿Qué es la radiación solar?`, m);
        }

        await m.react('💬');

        try {
            const query = text;
            const prompt = `${basePrompt}. Responde lo siguiente: ${query}`;
            const response = await luminsesi(query, username, prompt);
            await conn.reply(m.chat, response, m);
        } catch (error) {
            console.error('*[ ℹ️ ] Error al obtener la respuesta:*', error);
            await conn.reply(m.chat, '*Error: intenta más tarde.*', m);
        }
    }
};

handler.help = ['lyra <texto>'];
handler.tags = ['tools'];
handler.register = true;
handler.command = ['lyra'];
export default handler;

// **Función para analizar imágenes**
async function fetchImageBuffer(content, imageBuffer) {
    try {
        const response = await axios.post('https://Luminai.my.id', {
            content: content,
            imageBuffer: imageBuffer 
        }, {
            headers: { 'Content-Type': 'application/json' }
        });

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// **Función para interactuar con la IA**
async function luminsesi(q, username, logic) {
    try {
        const response = await axios.post("https://Luminai.my.id", {
            content: q,
            user: username,
            prompt: logic,
            webSearchMode: false
        });

        return response.data.result;
    } catch (error) {
        console.error('*[ ℹ️ ] Error al obtener:*', error);
        throw error;
    }
}