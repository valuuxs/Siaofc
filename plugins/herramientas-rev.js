import fetch from 'node-fetch'
import { sendMini } from '../plugins/_test5.js'

let handler = async (m, { conn }) => {
  let img = await (await fetch('https://i.imgur.com/RP6QwCS.jpeg')).buffer()
  await sendMini(conn, m.chat, 'Ver Proyecto', '¡Este es un mensaje de prueba con sendMini!', 'Shadow Bot', img, 'https://github.com/CrxstianEscobar/ShadowUltra-MD', m)
}

handler.command = /^testmini$/i
export default handler