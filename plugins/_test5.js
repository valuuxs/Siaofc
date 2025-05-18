/*import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text) throw `*Ejemplo de uso:*\n${usedPrefix + command} Shadow Bot`

    // Puedes cambiar 'fluffy-logo' por otro estilo (mira abajo)
    const estilo = 'fluffy-logo'
    const url = `https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=${estilo}&text=${encodeURIComponent(text)}`

    const stiker = await sticker(null, url, 'FlamingText', 'ShadowBot')

    if (!stiker) throw 'Error al generar el sticker.'

    await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
  } catch (err) {
    console.error(err)
    m.reply(typeof err === 'string' ? err : 'Ocurrió un error al generar el sticker.')
  }
}

handler.help = ['flamestick <texto>']
handler.tags = ['sticker']
handler.command = /^flamestick$/i
handler.group = false
// handler.limit = true

export default handler*/

import { sticker } from '../lib/sticker.js'

const estilos = [
  { nombre: 'Fluffy Logo', id: 'fluffy-logo' },
  { nombre: 'Runner Logo', id: 'runner-logo' },
  { nombre: 'Smurfs Logo', id: 'smurfs-logo' },
  { nombre: 'Graffiti Burn', id: 'graffiti-burn' },
  { nombre: 'Sketch Name', id: 'sketch-name' },
  { nombre: 'Graffiti', id: 'graffiti' },
  { nombre: 'Chrome', id: 'chrome' },
  { nombre: 'Alien Glow', id: 'alien-glow' }
]

let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    const index = parseInt(args[0]) - 1
    const texto = args.slice(1).join(' ')

    if (isNaN(index) || index < 0 || index >= estilos.length || !texto) {
      let listado = estilos
        .map((e, i) => `${i + 1}. *${e.nombre}*`)
        .join('\n')
      throw `*Uso correcto:*\n${usedPrefix + command} <número_estilo> <texto>\n\n*Estilos disponibles:*\n${listado}`
    }

    const estilo = estilos[index].id
    const url = `https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=${estilo}&text=${encodeURIComponent(texto)}`
    const stiker = await sticker(null, url, estilos[index].nombre, 'ShadowBot')

    if (!stiker) throw 'No se pudo generar el sticker. Intenta con otro texto.'

    await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
  } catch (e) {
    m.reply(typeof e === 'string' ? e : 'Ocurrió un error al procesar tu solicitud.')
  }
}

handler.help = ['flamestick <número_estilo> <texto>']
handler.tags = ['sticker']
handler.command = /^flamestick$/i
handler.group = false

export default handler