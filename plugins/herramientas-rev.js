import fetch from 'node-fetch'
import { sendMini } from '../lib/sendMini.js'

let handler = async (m, { conn }) => {
  let img = await (await fetch('https://i.imgur.com/RP6QwCS.jpeg')).buffer()
  await sendMini(conn, m.chat, 'Ir al Proyecto', 'Este es un test de *sendMini* adaptado.', 'Shadow Bot', img, 'https://github.com/CrxstianEscobar/ShadowUltra-MD', m)
}

handler.command = /^testmini$/i
export default handler