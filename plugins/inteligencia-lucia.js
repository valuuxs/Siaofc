import axios from 'axios'

let handler = async (m, { conn, usedPrefix, command, text }) => {
  const username = `${conn.getName(m.sender)}`

const basePrompt = `Serás Lucía y llamaras a las personas por su nombre ${username} seras caliente tu género es Femenino una chica que se cree una puta`

  if (!text) { 
    return conn.reply(m.chat, `*[ ℹ️ ] Ingrese un texto para discutir con simi.*`, m)
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

handler.help = ['lu']
handler.tags = ['inteligencia']
handler.command = ['lu', 'lucia']
export default handler

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