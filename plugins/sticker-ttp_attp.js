import { sticker } from '../lib/sticker.js'  
import fetch from 'node-fetch'  
import axios from 'axios'  
  
let handler = async (m, { conn, text, command, fkontak }) => {  
    if (!text) return m.reply(`*[ 🌿 ] Ingresa un texto para realizar tu Sticker.*`)  
  
    let texto1 = global.packsticker  
    let texto2 = global.authsticker  
  
    let url = ''  
    if (command === 'attp') {  
        url = `https://api.fgmods.xyz/api/maker/attp?text=${encodeURIComponent(text)}&apikey=elrebelde21`  
    } else if (command === 'ttp') {  
        url = `https://api.fgmods.xyz/api/maker/ttp?text=${encodeURIComponent(text)}&apikey=elrebelde21`  
    }  
  
    if (url) {  
        let stiker = await sticker(null, url, texto1, texto2)  
        await conn.sendFile(m.chat, stiker, 'sticker.webp', '', fkontak, true) // Enviar con fkontak  
    }  
}  
  
handler.tags = ['sticker']  
handler.help = ['ttp', 'attp']  
handler.command = ['ttp', 'attp']  
  
export default handler