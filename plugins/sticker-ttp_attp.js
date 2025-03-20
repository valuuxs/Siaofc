
import { sticker } from '../lib/sticker.js'
import fetch from 'node-fetch'
import axios from 'axios'

let handler = async (m, { conn, text, command }) => {
    if (!text) return m.reply(`*[ ℹ️ ] Ingresa un texto para realizar tu Sticker.*`)

    let texto1 = global.packsticker
    let texto2 = global.authsticker

    if (command === 'attp') {
        let stiker = await sticker(null, `https://api.fgmods.xyz/api/maker/attp?text=${encodeURIComponent(text)}&apikey=elrebelde21`, texto1, texto2)
        conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, true)
    }

    if (command === 'ttp') {
        let stiker = await sticker(null, `https://api.fgmods.xyz/api/maker/ttp?text=${encodeURIComponent(text)}&apikey=elrebelde21`, texto1, texto2)
        conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, true)
    }
}

handler.tags = ['sticker']
handler.help = ['ttp', 'attp']
handler.command = ['ttp', 'attp']

export default handler