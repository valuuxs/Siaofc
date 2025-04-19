import fetch from 'node-fetch'
import { sendMini } from '../plugins/_test5.js'

let handler = async (m, { conn }) => {
  let img = await (await fetch('https://i.imgur.com/RP6QwCS.jpeg')).buffer()
  await sendMini(conn, m.chat, 'Ir al Proyecto', 'Este es un test de *sendMini* adaptado.', 'Shadow Bot', img, 'https://github.com/CristianOff/ShadowBot-MDv3', m)
}

handler.command = /^testmini$/i
export default handler