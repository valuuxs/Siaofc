import axios from 'axios'

let handler = async (m, { usedPrefix, command, conn, text }) => {
  if (!text) return m.reply(`🔎 Por favor, ingresa un usuario de Instagram para Stalkear.\n> *\`Ejemplo:\`* ${usedPrefix + command} dev.criss_vx`);

  try {
    await m.react('⏳');

    let ress = await axios.get(`https://api.koboo.my.id/api/stalk/tiktok?username=${text}`)
    let res = ress.data

    if (res.status !== 200) throw 'Error! No se encontró el usuario. Asegúrate de escribirlo correctamente.'

    let user = res.result.user
    let stats = res.result.stats
    let profileTab = user.profileTab

    let teks = `\`\`\`乂 STALKER - TIKTOK\`\`\`\n
*◦ TEST :* ${user.title}`

    await conn.sendMessage(m.chat, { image: { url: 'https://files.catbox.moe/xr2m6u.jpg' }, caption: teks }, { quoted: m })
    await m.react('✅')

  } catch (err) {
    m.reply('*❌ Error: No se encontró el usuario o la API falló. Intenta nuevamente.*')
  }
}

handler.help = ['tiktokstalk *<usuario>*']
handler.tags = ['stalk']
handler.command = /^(igstalk)$/i

export default handler