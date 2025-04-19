import fetch from 'node-fetch'
import { sendMini } from '../plugins/_test5.js'

let handler = async (m, { conn }) => {
  let img = await (await fetch('https://files.catbox.moe/xr2m6u.jpg')).buffer()
  await sendMini(conn, m.chat, 'Ir al Proyecto', 'Este es un test de *sendMini* adaptado.', 'Shadow Bot', img, 'https://github.com/CrxstianEscobar/ShadowUltra-MD', m)
}

handler.command = /^(testmini)$/i
export default handler