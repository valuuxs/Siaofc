/*import { toAudio } from '../lib/converter.js'
let handler = async (m, { conn, usedPrefix, command }) => {
    try {
    let q = m.quoted ? m.quoted : m
   let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
   // if (!/video|audio/.test(mime)) throw `🍭 Responda al video o nota de voz que desea convertir a mp3 con el comando :\n\n*${usedPrefix + command}*`
    let media = await q.download?.()
    if (!media) throw '💠 Error al descargar medios'
    let audio = await toAudio(media, 'mp4')
    if (!audio.data) throw '❎ Error al convertir'
    conn.sendFile(m.chat, audio.data, 'audio.mp3', '', m, null, { mimetype: 'audio/mp4' })
    } catch (e) {
        m.reply(`✨ Ha Ocurrido Un Error Use De Nuevo:\n\n*${usedPrefix + command}*`)
   }
}
handler.help = ['tomp3']
handler.tags = ['descargas']
handler.command = ['tomp3', 'mp3', 'toudio'] 

export default handler*/

import { toAudio } from '../lib/converter.js'

let handler = async (m, { conn, usedPrefix, command }) => {
    try {
        let q = m.quoted ? m.quoted : m
        let mime = q.mimetype || ''

        // Verificar que el archivo es de tipo video o audio
        if (!/video|audio/.test(mime)) {
            throw `🍭 Responde a un video o nota de voz para convertirlo a MP3 con el comando: *${usedPrefix + command}*`
        }

        // Descargar el archivo (video/audio)
        let media = await q.download?.()
        if (!media) {
            throw '💠 Error al descargar el archivo. Asegúrate de que el archivo esté disponible.'
        }

        // Convertir el archivo descargado a MP3
        let audio = await toAudio(media, 'mp4')
        if (!audio.data) {
            throw '❎ Error al convertir el archivo. Puede que el formato no sea compatible.'
        }

        // Enviar el archivo convertido como audio.mp3
        conn.sendFile(m.chat, audio.data, 'audio.mp3', '', m, null, { mimetype: 'audio/mp4' })

    } catch (e) {
        console.error(e)  // Esto es para depuración
        m.reply(`✨ Ocurrió un error. Intenta nuevamente con el comando:\n\n*${usedPrefix + command}*`)
    }
}

handler.help = ['tomp3']
handler.tags = ['descargas']
handler.command = ['tomp3', 'mp3', 'toudio']

export default handler