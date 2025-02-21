let handler = async (m, { command, text }) => m.reply(`
*⁉️ \`PREGUNTAS\` ⁉️*
  
*Pregunta:* ${text}
*Respuesta:* ${['Si','Tal vez sí','Posiblemente','Probablemente no','No','Imposible'].getRandom()}
`.trim(), null, m.mentionedJid ? {
mentions: m.mentionedJid
} : {})
handler.help = ['pregunta']
handler.tags = ['fun']
handler.command = /^pregunta|preguntas|apakah$/i
handler.register = true
export default handler

// Mejoramiento - code