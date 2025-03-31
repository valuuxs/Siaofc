import db from '../lib/database.js'

let handler = async (m, { args }) => {
let user = global.db.data.users[m.sender]
if (!args[0]) return m.reply('ℹ️ Ingresa la cantidad de *Diamantes* que deseas Depositar.')
if ((args[0]) < 1) return m.reply('ℹ️ Ingresa una cantidad válida de 💎')
if (args[0] == 'all') {
let count = parseInt(user.diamantes)
user.diamantes -= count * 1
user.bank += count * 1
await m.reply(`Depositaste *${count} Diamantes* al Banco.`)
return !0
}
if (!Number(args[0])) return m.reply('🚩 La cantidad deve ser un Numero.')
let count = parseInt(args[0])
if (!user.diamantes) return m.reply('No tienes *Diamantes* en la Cartera.')
if (user.diamantes < count) return m.reply(`Solo tienes *${user.diamantes} Diamantes* en la Cartera.`)
user.diamantes -= count * 1
user.bank += count * 1
await m.reply(`Depositaste *${count} 💎* al Banco.`)}

handler.help = ['depositar']
handler.tags = ['rpg']
handler.command = ['d', 'depositar', 'dep', 'aguardar']
handler.register = true 
export default handler 