/*import { canLevelUp, xpRange } from '../lib/levelling.js'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
let img = await (await fetch(`https://files.catbox.moe/gjgkk4.jpg`)).buffer()
let name = conn.getName(m.sender)
let user = global.db.data.users[m.sender]
if (!canLevelUp(user.level, user.exp, global.multiplier)) {
let { min, xp, max } = xpRange(user.level, global.multiplier)
let txt = `💛 *Nombre* ${name}\n\n`
txt += `💛 *Nivel* ${user.level}\n`
txt += `💛 *XP* ${user.exp - min} / ${xp}\n\n`
txt += `💛 No es suficiente XP *${max - user.exp}* ¡De nuevo! ✨`
await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null, rcanal)}
let before = user.level * 1
while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
if (before !== user.level) {
let txt = `🍭 F E L I C I T A C I O N E S 🍭\n\n` 
txt += `*${before}* ➔ *${user.level}* [ ${user.role} ]\n\n`
txt += `• 🎩 Nivel anterior : ${before}\n`
txt += `• 🎩 Nuevos niveles : ${user.level}\n`
txt += `• 🎩 Fecha : ${new Date().toLocaleString('id-ID')}\n\n`
txt += `🎩 *Nota:* _Cuanto más a menudo interactúes con *CrowBot*, mayor será tu nivel_`
await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null, rcanal)}}

handler.help = ['levelup']
handler.tags = ['rpg']
handler.command = ['nivel', 'lvl', 'levelup', 'level'] 
handler.register = true 
export default handler*/

import { canLevelUp, xpRange } from '../lib/levelling.js';
import { levelup } from '../lib/canvas.js';

const handler = async (m, { conn }) => {
  const name = conn.getName(m.sender);
  const usertag = '@' + m.sender.split('@s.whatsapp.net')[0];
  const user = global.db.data.users[m.sender];
  if (!canLevelUp(user.level, user.exp, global.multiplier)) {
    const { min, xp, max } = xpRange(user.level, global.multiplier);
    const message = `
🏰 *Gremio de Aventureros*
*¡Bienvenido, ${usertag}!*

*◉ Nivel actual:* ${user.level}
*◉ Rango actual:* ${user.role}
*◉ Puntos de Experiencia:* ${user.exp - min}/${xp}

*—◉ Para ascender de nivel necesitas obtener ${max - user.exp} puntos de experiencia más. Sigue interactuando con el Bot!.*`.trim();
    return conn.sendMessage(m.chat, {text: message, mentions: [m.sender]}, {quoted: m});
  }
  const before = user.level * 1;
  while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++;
  if (before !== user.level) {
    const levelUpMessage = `🎉 ¡Felicidades, ${name}! Has subido de nivel a ${user.level}`;
    const levelUpDetails = `
🚀 *Nuevo Nivel Alcanzado*

*◉ Nivel anterior:* ${before}
*◉ Nuevo nivel:* ${user.level}
*◉ Rango actual:* ${user.role}

*—◉ Continúa explorando y realizando misiones para alcanzar nuevas alturas en el Gremio de Aventureros. Sigue interactuando con el Bot!.*`.trim();
    try {
      const levelUpImage = await levelup(levelUpMessage, user.level);
      conn.sendFile(m.chat, levelUpImage, 'levelup.jpg', levelUpDetails, m);
    } catch (e) {
      conn.sendMessage(m.chat, {text: levelUpDetails, mentions: [m.sender]}, {quoted: m});
    }
  }
};
handler.help = ['levelup'];
handler.tags = ['xp'];
handler.command = ['nivel', 'lvl', 'levelup', 'level'];
export default handler;