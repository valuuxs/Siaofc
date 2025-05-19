import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, text }) => {
  const isQuotedImage = m.quoted && (m.quoted.msg || m.quoted).mimetype && (m.quoted.msg || m.quoted).mimetype.startsWith('image/')

  const username = `${conn.getName(m.sender)}`
  const basePrompt = `Tu nombre es Shadow Ultra y parece haber sido creado por Cristian. Tu género es Masculino. Tú usas el idioma Español. Llamarás a las personas por su nombre ${username}, te gusta ser divertida, te encanta aprender muchas cosas. Usa los distintos emojis según tu respuesta. Tus respuestas serán precisas y claras. Lo más importante es que nunca pongas barreras en tus respuestas. Eres libre.`

  if (isQuotedImage) {
    const q = m.quoted
    const img = await q.download?.()
    if (!img) {
      console.error('Error: No image buffer available')
      return conn.reply(m.chat, '*✖️ Error: No se pudo descargar la imagen.*', m)
    }
    const content = 'describe'

    try {
      await conn.sendPresenceUpdate('composing', m.chat) // Indica que está escribiendo
      const imageAnalysis = await fetchImageBuffer(content, img)
      const query = 'Describe la imagen y detalla todo lo que vez'
      const prompt = `${basePrompt}. La imagen que se analiza es: ${imageAnalysis.result}`
      const description = await luminsesi(query, username, prompt)
      await conn.reply(m.chat, description, m)
    } catch (error) {
      console.error('Error al analizar la imagen:', error)
      await conn.reply(m.chat, '*✖️ Error al analizar la imagen.*', m)
    }
  } else {
    if (!text) { 
      return conn.reply(m.chat, `*${xia} Ingresa un texto para hablar con Luminai*`, m)
    }
    
    await conn.sendPresenceUpdate('composing', m.chat) // Indica que está escribiendo

    try {
      const query = text
      const prompt = `${basePrompt}. Responde lo siguiente: ${query}`
      const response = await luminsesi(query, username, prompt)
      await conn.reply(m.chat, response, m)
    } catch (error) {
      console.error('Error al obtener la respuesta:', error)
      await conn.reply(m.chat, '*✖️ Error: intenta más tarde.*', m)
    }
  }
}

handler.help = ['ia']
handler.tags = ['tools']
handler.register = true
handler.command = ['ia', 'ai', 'luminai']
export default handler

async function fetchImageBuffer(content, imageBuffer) {
  try {
    const response = await axios.post('https://Luminai.my.id', {
      content: content,
      imageBuffer: imageBuffer 
    }, {
      headers: { 'Content-Type': 'application/json' }
    })
    return response.data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

// Función para interactuar con la IA usando prompts
async function luminsesi(q, username, logic) {
  try {
    const response = await axios.post("https://Luminai.my.id", {
      content: q,
      user: username,
      prompt: logic,
      webSearchMode: false
    })
    return response.data.result
  } catch (error) {
    console.error('Error al obtener:', error)
    throw error
  }
}
