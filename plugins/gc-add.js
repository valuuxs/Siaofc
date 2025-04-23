let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  try {
    if (!text) {
      return conn.reply(m.chat, `🚩 Ingrese el número al que quiere agregar al grupo.\n\n*Ejemplo:*\n*${usedPrefix + command}* 51965911060`, m)
    }

    if (text.includes('+')) {
      return conn.reply(m.chat, `🚩 Ingrese el número todo junto sin el *+*`, m)
    }

    if (isNaN(text)) {
      return conn.reply(m.chat, `🚩 Ingrese solo números, incluyendo el código de país, sin espacios`, m)
    }

    let number = text.replace(/\D/g, '')
    let user = number + '@s.whatsapp.net'
    let group = m.chat

    // Verificamos si el número existe en WhatsApp
    const exists = await conn.onWhatsApp(number + '@s.whatsapp.net')
    if (!exists || !exists.length || !exists[0]?.exists) {
      return m.reply(`❌ El número *${number}* no está registrado en WhatsApp.`)
    }

    // Intentar agregar al grupo
    try {
      await conn.groupParticipantsUpdate(group, [user], 'add')
      return m.reply(`✅ Se intentó agregar al número *${text}* al grupo.`)
    } catch (addError) {
      console.error('Error al agregar:', addError)
      m.reply(`⚠️ No se pudo agregar directamente. Se enviará una invitación por privado.`)

      try {
        let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group)
        await conn.sendMessage(user, {
          text: `🚩 *INVITACIÓN A GRUPO*\n\nUn usuario te invitó a unirte a este grupo:\n${link}`,
          mentions: [m.sender]
        })
        return m.reply(`✉️ Se envió un enlace de invitación por privado a *${text}*.`)
      } catch (sendError) {
        console.error('Error al enviar invitación:', sendError)
        return m.reply(`❌ No se pudo enviar el enlace de invitación. Es posible que el número tenga restricciones de privacidad o no use WhatsApp.`)
      }
    }
  } catch (err) {
    console.error('Error general:', err)
    return m.reply(`❌ Ocurrió un error inesperado al procesar la solicitud.`)
  }
}

handler.help = ['add *<numero>*']
handler.tags = ['group']
handler.command = ['add', 'invite', 'invitar']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler