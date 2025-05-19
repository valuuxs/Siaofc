import db from '../lib/database.js'

let handler = async (m, { args }) => {
let user = global.db.data.users[m.sender]
if (!args[0]) return m.reply(`*${xrpg} Por favor, ingresa la cantidad de diamantes que deseas depositar en el banco.*`)
if ((args[0]) < 1) return m.reply('*⚠️ Ingresa una cantidad válida de los diamantes que tienes.*')
if (args[0] == 'all') {
let count = parseInt(user.diamantes)
user.diamantes -= count * 1
user.bank += count * 1
await m.reply(`*🏦 Depositaste \`${count} Diamantes\` al Banco.`)
return !0
}
if (!Number(args[0])) return m.reply('*⚠️ La cantidad deve ser un número.*')
let count = parseInt(args[0])
if (!user.diamantes) return m.reply('*💎 No tienes Diamantes en tu Cartera.*')
if (user.diamantes < count) return m.reply(`*💎 Solo tienes \`${user.diamantes} Diamantes\` en tu Cartera.*`)
user.diamantes -= count * 1
user.bank += count * 1
await m.reply(`*🏦 Depositaste \`${count} Diamantes\` al Banco.*`)}

handler.help = ['depositar']
handler.tags = ['rpg']
handler.command = ['d', 'depositar', 'dep', 'aguardar']
handler.register = true 
handler.group = true
export default handler 