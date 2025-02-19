let cooldowns = {}

let handler = async (m, { conn, isPrems }) => {
    let users = global.db.data.users
    let senderId = m.sender
    let senderName = await conn.getName(senderId)

    let tiempo = 5 * 60 // 5 minutos en segundos
    if (cooldowns[senderId] && Date.now() - cooldowns[senderId] < tiempo * 1000) {
        let tiempo2 = segundosAHMS(Math.ceil((cooldowns[senderId] + tiempo * 1000 - Date.now()) / 1000))
        conn.reply(m.chat, `*[ 💡 ] Espera \`${tiempo2}\` Para seguir prostituyéndote.*`, m)
        return
    }

    // 🎲 Seleccionar un usuario aleatorio (excluyendo al remitente)
    let userIds = Object.keys(users).filter(id => id !== senderId)
    if (userIds.length === 0) {
        conn.reply(m.chat, "No hay suficientes usuarios para seleccionar a alguien al azar.", m)
        return
    }

    let randomUserId = userIds[Math.floor(Math.random() * userIds.length)]
    let randomUserName = await conn.getName(randomUserId)

    // 💾 Asegurar que el usuario aleatorio existe en la base de datos
    if (!users[randomUserId]) users[randomUserId] = { exp: 0 }

    // 🎲 Generar cantidad de XP aleatoria (mínimo 1)
    let rsl = Math.floor(Math.random() * 5000) + 1
    cooldowns[senderId] = Date.now() // Guardar el cooldown del usuario

    // 🏆 Seleccionar un trabajo aleatorio y reemplazar {usuario} con el nombre del usuario aleatorio
    let trabajoTexto = pickRandom(trabajo).replace("{usuario}", `@${randomUserId.split('@')[0]}`)

    // 📩 Enviar mensaje con el resultado
    await conn.sendMessage(m.chat, {
        text: `🌠 @${senderId.split('@')[0]}, ${trabajoTexto} *${toNum(rsl)}* ( *${rsl}* ) XP 🔮.`,
        contextInfo: { mentionedJid: [senderId, randomUserId] } // Menciona a ambos usuarios
    }, { quoted: m })

    // 💾 Asegurar que el remitente existe en la base de datos antes de modificar su XP
    if (!users[senderId]) users[senderId] = { exp: 0 }
    users[senderId].exp += rsl
}

handler.help = ['slut']
handler.tags = ['rpg']
handler.command = ['prostituirse', 'slut']
handler.register = true
export default handler

// 📏 Funciones auxiliares

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
    return list[Math.floor(Math.random() * list.length)]
}

// 📜 Lista de trabajos con {usuario} para reemplazar con el usuario aleatorio
const trabajo = [
    "Trabajas en la industria del romance y te Prostituyes con los trabajadores y ganas",
    "Se la chupaste a {usuario} por 20 monedas y lo dejaste bien seco, obtienes",
    "Te Acostaste Con Tu Jefe Y Obtuviste"
]



// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

let cooldowns = {}
let handler = async (m, { conn, isPrems }) => {
let user = global.db.data.users[m.sender]
let tiempo = 5 * 60
if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempo * 1000) {
const tiempo2 = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempo * 1000 - Date.now()) / 1000))
conn.reply(m.chat, `*⏰ Espera 🌠* *${tiempo2}* *Para Seguir Prostituyendote.*`, m, rcanal)
return
}
let rsl = Math.floor(Math.random() * 5000)
cooldowns[m.sender] = Date.now()
await conn.reply(m.chat, `🌠 ${pickRandom(trabajo)} *${toNum(rsl)}* ( *${rsl}* ) XP 🔮.`, m, rcanal)
user.exp += rsl
}
handler.help = ['prostituirse']
handler.tags = ['rpg']
handler.command = ['prostituirse', 'prostituta', 'prostituir', 'sentones']
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
// Lista de trabajos
const trabajo = [
"Tuviste Sexo Con Tu Tu Vecino y ganastes",
"Cabalgaste Cómo Nunca Arriba De Un Artista y obtienes",
"Te dedicas a ser un/a seductor/a, Te Prostituyes y ganas",
"Eres un experto en prostitucion y recibes",
"Trabajas en la industria del romance y te Prostituyes con los trabajadores y ganas",
"Eres un/a conquistador/a y obtienes",
"Te dedicas a hacer felices a los demás y ganas",
"Eres un/a experto/a moviendo esas nalgas y recibes",
"Le Distes Unos Sentones a mi creador y ganas",
"Te Acostastes Con Tu JeFe Y Obtuvistes",
]