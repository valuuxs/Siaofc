import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*
global.owner = [
   ['51927238856', 'Criss Escobar', true],
   ['51965911060', 'Shadow', true],
   ['+56933562672', 'Supervisor', false]
]

global.creadorbot = [
   ['51927238856', 'Criss Escobar', true]
]


global.mods = ['50368471855', '51920227615', '5219831715910', '573007796996', '50488198573', '51991055096', '5212731590195']

global.prems = ['573215751237']


global.packname = 'ShadowBot'
global.botname = '(✦◠‿◠)ShadowBot-MD'
global.wm = '⏤͟͟͞͞⋆⬪࣪ꥈ☕★ ׄ ꒱ Shadow ୭'
global.author = 'By Criss'
global.dev = '© Powered by Moon Force Team'
global.errorm = 'Error: ${error.message}'
global.errorm2 = '𝐀 𝐎𝐜𝐮𝐫𝐫𝐢𝐝𝐨 𝐔𝐧 𝐄𝐫𝐫𝐨𝐫, 𝐕𝐮𝐞𝐥𝐯𝐞 𝐌𝐚𝐬 𝐓𝐚𝐫𝐝𝐞 (৹˃̵﹏˂̵৹)'
global.resp = 'Aqui Tienes 〜(^∇^〜)'
global.espera = 'Aguarde un segundo (✿◠‿◠)'
global.nombrebot = 'Shadow Bot - MD'
global.textbot = `「 SHADOW BOT MD 」`
global.vs = '3.0.0'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.imagen1 = fs.readFileSync('./media/menus/Menu.jpg')
global.imagen2 = fs.readFileSync('./media/menus/Menu2.jpg')
global.imagen3 = fs.readFileSync('./media/menus/Menu3.jpg')
global.welcome = fs.readFileSync('./media/welcome.jpg')
global.adios = fs.readFileSync('./media/adios.jpg')
global.catalogo = fs.readFileSync('./media/catalogo.jpg')
global.shadowurl = fs.readFileSync('./media/shadowurl.jpg')

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*
global.repobot = 'https://github.com/CrxstianEscobar/ShadowBot-MD'
global.grupo = 'https://chat.whatsapp.com/FCS6htvAmlT7nq006lxU4I'
global.comu = 'https://chat.whatsapp.com/Kn1pPVAO08pFRo7qJnKuh6'
global.channel = 'https://whatsapp.com/channel/0029VauTE8AHltY1muYir31n'
global.insta = 'https://www.instagram.com/shadowbot.md'
//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "543876577197-120363317332020195@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: 'MOONFORCE 乂 TEAM', orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment        

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.multiplier = 69 
global.maxwarn = '2' // máxima advertencias

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})