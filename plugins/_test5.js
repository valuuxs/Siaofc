/*import { sticker } from '../lib/sticker.js'

const estilos = [
  { nombre: 'Fluffy Logo', id: 'fluffy-logo' },
  { nombre: 'Runner Logo', id: 'runner-logo' },
  { nombre: 'Smurfs Logo', id: 'smurfs-logo' },
  { nombre: 'Sketch Name', id: 'sketch-name' }
]

let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    const index = parseInt(args[0]) - 1
    const texto = args.slice(1).join(' ')

    if (isNaN(index) || index < 0 || index >= estilos.length || !texto) {
      let listado = estilos
        .map((e, i) => `${i + 1}. *${e.nombre}*`)
        .join('\n')
      throw `*${xsticker} Por favor, ingresa el comando más la opcion y el texto.*\n> *\`Ejemplo:\`* ${usedPrefix + command} 2 Hello Word\n\n\`Estilos Disponibles:\`\n${listado}`
    }

    if (texto.length > 30) throw '*⚠️ El texto es demasiado largo. Usa 30 caracteres o menos.*'

    const estilo = estilos[index].id
    const url = `https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=${estilo}&text=${encodeURIComponent(texto)}`
    const stiker = await sticker(null, url, estilos[index].nombre, 'Shadow Ultra - MD')

    if (!stiker) throw '*✖️ No se pudo generar el sticker. Intenta con otro texto.*'

    await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
  } catch (e) {
    console.error(e) // Mostrar detalles en consola para debug
    m.reply(typeof e === 'string' ? e : 'Ocurrió un error al procesar tu solicitud. Intenta nuevamente.')
  }
}

handler.help = ['flamestick <número_estilo> <texto>']
handler.tags = ['sticker']
handler.command = /^(flamestick|flame)$/i

export default handler*/


import MessageType from '@whiskeysockets/baileys'
import { generateWAMessageFromContent } from '@whiskeysockets/baileys'

let handler = async (m, { conn, text, participants }) => {
  let users = participants.map(u => conn.decodeJid(u.id))
  let q = m.quoted ? m.quoted : m
  let c = m.quoted ? m.quoted : m.msg

  const msg = conn.cMod(m.chat,
    generateWAMessageFromContent(m.chat, {
      [c.toJSON ? q.mtype : 'extendedTextMessage']: c.toJSON ? c.toJSON() : {
        text: c || ''
      }
    }, {
      userJid: conn.user.id
    }),
    text || q.text, conn.user.jid, { mentions: users }
  )

  await conn.fakeReply(
    m.chat,
    msg.message[q.mtype]?.text || text || '',
    '0@s.whatsapp.net',
    'Mención general',
    'status@broadcast',
    { mentions: users }
  )
}
handler.help = ['notify <txt>']
handler.tags = ['gc']
handler.command = /^(nk)$/i
handler.group = true
handler.admin = true

export default handler