import axios from 'axios';

let activeChats = new Set(); // Almacena los chats activos

let handler = async (m, { conn, text }) => {
    if (m.isGroup) return; // Evita que el bot funcione en grupos
    if (!text) return; // Si no hay texto, no responde

    const chatId = m.chat;
    const username = conn.getName(m.sender) || "Usuario";

    // Lista de palabras para finalizar la conversación
    const despedidas = ["chao", "adiós", "bye", "nos vemos", "hasta luego"];

    // Si el usuario dice una despedida, el bot deja de responder
    if (despedidas.some(word => text.toLowerCase().includes(word))) {
        activeChats.delete(chatId);
        return conn.reply(m.chat, "👋 ¡Hasta luego! Si necesitas algo más, aquí estaré.", m);
    }

    // Si el chat no está activo, inicia conversación
    if (!activeChats.has(chatId)) {
        activeChats.add(chatId);
        conn.reply(m.chat, "👋 ¡Hola! Soy Lyra, ¿en qué puedo ayudarte?", m);
    }

    try {
        const basePrompt = `Tu nombre es Lyra y fuiste creada por Cristian. Eres femenina, hablas español y te gusta ser divertida y aprender sobre el universo. Llamarás a las personas por su nombre ${username}. Responde de forma precisa y clara, sin restricciones.`;
        const prompt = `${basePrompt} Responde lo siguiente: ${text}`;
        const response = await getAIResponse(text, username, prompt);
        return conn.reply(m.chat, response, m);
    } catch (error) {
        console.error('⚠️ Error al obtener respuesta:', error);
        return conn.reply(m.chat, '❌ Error: Intenta más tarde.', m);
    }
};

handler.all = true; // Permite que el bot responda sin prefijo
export default handler;

// **Función para obtener respuesta de la IA**
async function getAIResponse(q, username, logic) {
    try {
        const response = await axios.post('https://Luminai.my.id', { content: q, user: username, prompt: logic, webSearchMode: false });
        return response.data.result;
    } catch (error) {
        console.error('⚠️ Error en la API de IA:', error);
        throw error;
    }
}