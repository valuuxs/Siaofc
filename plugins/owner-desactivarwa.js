import axios from 'axios'

let handler = async (m, { conn, usedPrefix, command, text }) => {
  const username = `${conn.getName(m.sender)}`
  const basePrompt = `Tu nombre es Shadow Ultra estas aquí para atender al cliente. Darás precio del bot. Los precios del bot son: 1 bot Permanente cuesta 4 soles, tres bots cuentan 8 soles y 6 bots cuentan 15 soles. Tu creador es Cristian. Los métodos de pago son por yape, mecado pago, prex internacional y otros mas que podría ser arreglado con el cliente. El contacto de tu Creador es +51927238856 solo para más información. la descripción breve del bot es que no se cae tiene comandos de descarga activos, soporte 24/7 y también actualizaciones diaras.nuestro team es Havenly Team.Puedes también invitar a nuestro canal para que nos sigan la cual es: https://whatsapp.com/channel/0029VauTE8AHltY1muYir31n`

  if (!text) { 
    return conn.reply(m.chat, `*[ 🤖 ] Ingrese su petición*\n\n*[ 💡 ] Ejemplo de uso:* ${usedPrefix + command} ¿Quién eres?`, m)
  }

  await conn.sendPresenceUpdate('composing', m.chat) // Indica que está escribiendo

  try {
    const query = text
    const prompt = `${basePrompt}. Responde lo siguiente: ${query}`
    const response = await luminsesi(query, username, prompt)
    await conn.reply(m.chat, response, m)
  } catch (error) {
    console.error('*[ ℹ️ ] Error al obtener la respuesta:*', error)
    await conn.reply(m.chat, '*Error: intenta más tarde.*', m)
  }
}

handler.help = ['ia']
handler.tags = ['tools']
handler.register = true
handler.command = ['teste']
export default handler

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
    console.error('*[ ℹ️ ] Error al obtener:*', error)
    throw error
  }
}