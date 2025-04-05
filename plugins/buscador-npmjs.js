import fetch from 'node-fetch'

let handler = async (m, { text, usedPrefix, command, conn }) => {

  if (!text) return conn.reply(m.chat, `*🔎 Escribe el nombre del scraper.*\n> *\`Ejemplo:\`* ${usedPrefix + command} yt-search`, m)

  try {
    await m.react('⏳')

    let res = await fetch(`http://registry.npmjs.com/-/v1/search?text=${text}`)
    let { objects } = await res.json()

    if (!objects.length) return conn.reply(m.chat, `\`\`\`⚠️ No se encontraron resultados\`\`\``, m)

    let txt = `\`\`\`乂 SCRAPER - SEARCH\`\`\``

    objects.forEach(({ package: pkg }, index) => {
      txt += `\n\n*\`${index + 1}\`*`
      txt += `\n≡ 🌴 *\`Nombre:\`* ${pkg.name}`
      txt += `\n≡ 🌵 *\`Versión:\`* V${pkg.version}`
      txt += `\n≡ 🍃 *\`Descripción:\`* ${pkg.description}`
      txt += `\n≡ 🌿 *\`Link:\`* ${pkg.links.npm}`
    })

    await conn.reply(m.chat, txt, m)
    await m.react('✅')

  } catch {
    await conn.reply(m.chat, '```⚠️ Ocurrió un error```', m)
    await m.react('❌')
  }
}

handler.help = ['npmjs']
handler.tags = ['buscador']
handler.command = ['npmjs']

export default handler