/*
《✧》DERECHOS RESERVADOS POR EL AUTOR《✧》
- GabrielVz (@glytglobal)
*/

import fetch from 'node-fetch'

let handler = async (m, { text, usedPrefix, command }) => {

if (!text) return conn.reply(m.chat, `*🔎 Escribe el nombre del scraper.*\n> *\`Ejemplo:\`* ${usedPrefix + command} yt-search`, m)

try {

await m.react(rwait)
/*conn.reply(m.chat, '*🔎 Buscando el scraper...*', m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, showAdAttribution: true,
title: packname,
body: dev,
previewType: 0, thumbnail: icons, 
sourceUrl: channel }}})*/

let res = await fetch(`http://registry.npmjs.com/-/v1/search?text=${text}`)
let { objects } = await res.json()

if (!objects.length) return conn.reply(m.chat, `\`\`\`⚠️ No se enconraron resultados\`\`\``, m)


let txt = `\`\`\`乂 SCRAPER - SEARCH\`\`\``;
json.data.forEach((app, index) => {
      txt += `\n\n*\`${index + 1}\`*`
      txt += `\n≡ 🌴 *\`Nombre:\`* ${pkg.name}`
      txt += `\n≡ 🌵 *\`Versión:\`* V${pkg.version}`
      txt += `\n≡ 🍃 *\`Description:\`* ${pkg.description}`
      txt += `\n≡ 🌿 *\`Link:\`* ${pkg.links.npm}`
}) 

m.reply(txt)

/*
let txt = objects.map(({ package: pkg }) => {
return `\`\`\`乂 SCRAPER - SEARCH\`\`\`

≡ 🍄 *\`Nombre:\`* ${pkg.name}
≡ 🌹 *\`Versión:\`* V${pkg.version}
≡ 🍁 *\`Link:\`* ${pkg.links.npm}
≡ 🌷 *\`Descripción:\`* ${pkg.description}
\n\n`
}).join`\n\n`*/

await conn.reply(m.chat, txt, m)*/
await m.react('✅')
} catch {
await conn.reply(m.chat, '\`\`\`⚠️ Ocurrió un error\`\`\`', m)
await m.react('❌')
}}

handler.help = ['npmjs']
handler.tags = ['buscador']
handler.command = ['npmjs']

export default handler