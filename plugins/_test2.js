let cooldowns = {}
let handler = async (m, { conn, isPrems }) => {
    let users = global.db.data.users
    let senderId = m.sender
    let senderName = await conn.getName(senderId)

    let tiempo = 5 * 60
    if (cooldowns[senderId] && Date.now() - cooldowns[senderId] < tiempo * 1000) {
        let tiempo2 = segundosAHMS(Math.ceil((cooldowns[senderId] + tiempo * 1000 - Date.now()) / 1000))
        conn.reply(m.chat, `*[ ⏳ ] Espera \`${tiempo2}\` Para seguir prostituyéndote.*`, m)
        return
    }

    // Seleccionar un usuario aleatorio
    let userIds = Object.keys(users).filter(id => id !== senderId) 
    if (userIds.length === 0) {
        conn.reply(m.chat, "No hay suficientes usuarios para seleccionar a alguien al azar.", m)
        return
    }

    let randomUserId = userIds[Math.floor(Math.random() * userIds.length)]
    let randomUserName = await conn.getName(randomUserId)

    let rsl = Math.floor(Math.random() * 5000)
    cooldowns[senderId] = Date.now()

    // Seleccionar un trabajo y reemplazar {usuario} con el usuario aleatorio
    let trabajoTexto = pickRandom(trabajo).replace("{usuario}", `@${randomUserId.split('@')[0]}`)

    await conn.sendMessage(m.chat, {
        text: `🌠 @${senderId.split('@')[0]}, ${trabajoTexto} *${toNum(rsl)}* ( *${rsl}* ) XP 🔮.`,
        contextInfo: { mentionedJid: [senderId, randomUserId] } // Menciona a ambos usuarios
    }, { quoted: m })

    users[senderId].exp += rsl
}
handler.help = ['slut']
handler.tags = ['rpg']
handler.command = ['prostituirse', 'slu', 'prostituir']
handler.register = true
export default handler

function toNum(number) {
    if (number >= 1000 && number < 1000000) {
        return (number / 1000).toFixed(1) + 'k'
    } else if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M'
    } else {
        return number.toString()
    }
}

function segundosAHMS(segundos) {
    let minutos = Math.floor((segundos % 3600) / 60)
    let segundosRestantes = segundos % 60
    return `${minutos} minutos y ${segundosRestantes} segundos`
}

function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())];
}

// Lista de trabajos con la variable {usuario} para reemplazar con un usuario aleatorio
const trabajo = [
    "Tuviste sexo con tu vecino y por tu excelente servicio te dio",
    "Te dejaste romper el culø y recibiste",
    "Te dedicas a ser un/a seductor/a, Te Prostituyes y ganas",
    "Eres un experto en prostitución y recibes",
    "Trabajas en la industria del romance y te Prostituyes con los trabajadores y ganas",
    "Se la chupaste a {usuario} por 20 monedas y lo dejaste bien seco, obtienes",
    "Te dedicas a hacer felices a los demás y ganas",
    "Eres un/a experto/a moviendo esas nalgas y recibes",
    "Le Diste Unos Sentones a mi creador y ganas",
    "Te Acostaste Con Tu Jefe Y Obtuviste",
]