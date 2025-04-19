import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  let imgUrl = 'https://files.catbox.moe/xr2m6u.jpg'
  let img = await (await fetch(imgUrl)).buffer()

  let titulo = 'Test de sendMini'
  let contenido = 'Este es un mensaje de prueba usando *sendMini*.\n\n¿Se visualiza correctamente?'
  let footer = 'Shadow Ultra'
  
  await conn.sendMini(m.chat, titulo, contenido, footer, img, img, 'https://github.com/CrxstianEscobar/ShadowUltra-MD', m)
}

handler.command = /^testmini$/i
export default handler