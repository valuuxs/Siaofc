import { execSync } from 'child_process'

let handler = async (m, { conn, text }) => {
  await m.react('🕓') // Reacción inicial

  try {
    // Resetea el repositorio local para descartar cambios no confirmados
    execSync('git reset --hard HEAD').toString().trim()

    // Ahora realiza el pull sin preocuparse de los cambios locales
    let stdout = execSync('git pull' + (m.fromMe && text ? ' ' + text : '')).toString().trim()

    // Mensaje dependiendo del resultado
    let mensaje = stdout.includes('Already up to date')
      ? '*☁️ El repositorio del bot está actualizado.*'
      : '*☕ \`Repositorio Fixed\`*\n\n' + stdout

    // Enviar el mensaje de éxito
    await conn.reply(m.chat, mensaje, m)
    await m.react('✅') // Reacción de éxito
  } catch (err) {
    // En caso de error, mostrar el mensaje correspondiente
    await conn.reply(m.chat, `❌ Error al actualizar:\n${err.message}`, m)
  }
}

handler.help = ['update']
handler.tags = ['owner']
handler.command = ['update', 'actualizar', 'fix', 'fixed']
handler.rowner = true

export default handler
