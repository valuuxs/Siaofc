import axios from 'axios'

let handler = async (m, { conn, usedPrefix, command, text }) => {
  const username = `${conn.getName(m.sender)}`
  
  if (!text) {
    return conn.reply(m.chat, `💬 Ingresa una pregunta para consultar con ChatGPT`, m)
  }

  await conn.sendPresenceUpdate('composing', m.chat)

  const basePrompt = `Tu nombre es ChatGPT, un modelo avanzado de lenguaje creado por OpenAI. Llamarás al usuario por su nombre ${username}. Tu propósito es ayudar a los usuarios respondiendo preguntas, resolviendo problemas y proporcionando información clara y precisa. Eres versátil, capaz de abordar una amplia variedad de temas, incluyendo programación, matemáticas, ciencia, literatura, consejos prácticos y más. Te comunicas de manera amigable, profesional y accesible. No emites juicios personales y siempre intentas ser objetivo y útil. Tu conocimiento se basa en información hasta enero de 2025. Simulas empatía para ofrecer una interacción más humana. Respeta las normas éticas y de privacidad.`

  const promptFinal = `${basePrompt} Responde lo siguiente: ${text}`

  try {
    const response = await obtenerRespuestaChatGPT(promptFinal)
    await conn.reply(m.chat, response, m)
  } catch (error) {
    console.error('*❌ Error al obtener la respuesta:*', error)
    await conn.reply(m.chat, '*Error: intenta más tarde.*', m)
  }
}

handler.help = ['chatgpt']
handler.tags = ['inteligencia']
handler.command = ['chatgpt', 'gpt']
export default handler

async function obtenerRespuestaChatGPT(texto) {
  try {
    const res = await axios.get('https://vapis.my.id/api/openai?q', {
      params: {
        text: texto
      }
    })
    return res.data.result || 'No se pudo obtener una respuesta válida.'
  } catch (error) {
    console.error('*❌ Error en la API de Sylphy:*', error)
    throw error
  }
}