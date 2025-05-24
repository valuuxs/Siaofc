import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

global.owner = [
   ['51927238856', 'Dev.Criss', true],
   ['51953857556', 'Shadow', true],
   ['5493865536185', 'Kenisawa (Colab)', false],
   ['56940074825', 'Undefined', false]
]

global.creadorbot = [
   ['51927238856', 'Cristian Escobar', true]
]

global.mods = ['51990841568', '51953587566']
global.prems = ['51965911060']


global.packname = '𝖲𝗁𝖺𝖽𝗈𝗐 𝖴𝗅𝗍𝗋𝖺 - 𝖬𝖣'
global.botname = '𝖲𝗁𝖺𝖽𝗈𝗐 𝖴𝗅𝗍𝗋𝖺 - 𝖬𝖣'
global.wm = '𝖲𝗁𝖺𝖽𝗈𝗐 𝖴𝗅𝗍𝗋𝖺 - 𝖬𝖣'
global.author = '𝖣𝖾𝗏.𝖢𝗋𝗂𝗌𝗌 ☕'
global.dev = '© 𝖯᥆𝗐ᥱ𝗋ᥱძ ᑲᥡ 𝖲ᥙᥒ𝖿ᥣᥲ𝗋ᥱ  ☂︎  𝖳ᥱᥲ𝗆'
global.errorm = 'Error: ${error.message}'
global.textbot = `⿻ ׄ ˚. Տ𝗁⍺𝖽ᦅա  ⚡︎  𝖴𝗅ł𝗋⍺ ׄㅤ🥞ᩧᰰ˚`
global.vs = '3.0.0'

global.catalogo = fs.readFileSync('./media/catalogo.jpg')

global.repobot = 'https://github.com/CrxstianEscobar/ShadowUltra-MD'
global.grupo = 'https://chat.whatsapp.com/Caj518FwPjHLVmGn48GvhW'
global.comu = 'https://chat.whatsapp.com/Kn1pPVAO08pFRo7qJnKuh6'
global.channel = 'https://whatsapp.com/channel/0029VauTE8AHltY1muYir31n'
global.insta = 'https://www.instagram.com/dev.criss_vx'


global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "543876577197-120363317332020195@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: 'Sunflare  乂  Team', orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}


global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment        


global.multiplier = 69 
global.maxwarn = '3'


let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
