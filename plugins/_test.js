import axios from 'axios'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) {
        return m.reply(`🪐 Escribe un prompt para generar el video.\n\nEjemplo: *${usedPrefix + command}* Perrito kawaii corriendo bajo la lluvia`)
}


    try {
m.react('🕑')

        const apiUrl = `https://api.fasturl.link/aiimage/meta?prompt=${text}&mode=animated`
        const { data } = await axios.get(apiUrl)

        if (data.status !== 200 || !data.result?.animated_media?.length) {
            throw new Error('No hay video disponible para este prompt')
        }

        const videoUrl = data.result.animated_media[0].url.trim()

        let caption = `🎥 *Video generado con IA*\n🌤️ *Prompt:* ${text}`

        await conn.sendMessage(m.chat, {
            video: { url: videoUrl },
            caption
        }, { quoted: m })

        await conn.sendMessage(m.chat, { react: { text: "🪐", key: m.key } })

    } catch (e) {
        console.error('Error:', e.message)
m.reply(`${e.message}`);
    }
}

handler.command = /^(prompttovideo|ptovideo|videoprompt|iavid)$/i

export default handler