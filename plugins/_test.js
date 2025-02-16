import { execSync } from 'child_process'

let handler = async (m, { conn, text }) => {
  await m.react('🕓') // Reacción inicial
  
  try {
    let stdout = execSync('git pull' + (m.fromMe && text ? ' ' + text : '')).toString().trim() // Ejecuta git pull y limpia espacios
    let mensaje = stdout.includes('Already up to date') 
      ? '*[ ℹ️ ] El repositorio del bot ya estaba actualizado.*' 
      : '*[ ℹ️ ] Se actualizó con éxito el repositorio del bot.*\n\n' + stdout

    await conn.reply(m.chat, mensaje, m) // Envía el mensaje con el resultado
    await m.react('✅') // Reacción de éxito
  } catch (err) {
    await conn.reply(m.chat, `❌ Error al actualizar:\n${err.message}`, m) // Manejo de error
  }
}

handler.help = ['update2']
handler.tags = ['owner']
handler.command = ['update2', 'actualizar2', 'fix2', 'fixed2'] 
handler.rowner = true // Solo el dueño puede ejecutar este comando

export default handler