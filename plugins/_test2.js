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
*[ 🏰 ] Gremio de Aventureros*
*¡Bienvenido, ${usertag}!*

- *Nivel actual:* ${user.level}
- *Rango actual:* ${user.role}
- *Puntos de Exp:* ${user.exp - min}/${xp}

> ⍴ᥲrᥲ ᥲsᥴᥱᥒძᥱr ძᥱ ᥒі᥎ᥱᥣ ᥒᥱᥴᥱsі𝗍ᥲs ᥆ᑲ𝗍ᥱᥒᥱs \`${max - user.exp}\` ⍴ᥙᥒ𝗍᥆s ძᥱ ᥱ᥊⍴ᥱrіᥱᥒᥴіᥲ mᥲ́s. sіgᥙᥱ іᥒ𝗍ᥱrᥲᥴ𝗍ᥙᥲᥒძ᥆ ᥴ᥆ᥒ ᥱᥣ ᑲ᥆𝗍.`.trim();
    return conn.sendMessage(m.chat, {text: message, mentions: [m.sender]}, {quoted: m});
  }
  const before = user.level * 1;
  while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++;
  if (before !== user.level) {
    const levelUpMessage = `🎉 ¡Felicidades, ${name}! Has subido de nivel a ${user.level}`;
    const levelUpDetails = `*[ 🚀 ] Nuevo Nivel Alcanzado*

- *Nivel anterior:* ${before}
- *Nuevo nivel:* ${user.level}
- *Rango actual:* ${user.role}

> ᥴ᥆ᥒ𝗍іᥒᥙ́ᥲ ᥱ᥊⍴ᥣ᥆rᥲᥒძ᥆ ᥡ rᥱᥲᥣіzᥲᥒძ᥆ mіsі᥆ᥒᥱs ⍴ᥲrᥲ ᥲᥣᥴᥲᥒzᥲr ᥒᥙᥱ᥎ᥲs ᥲᥣ𝗍ᥙrᥲs ᥱᥒ ᥱᥣ grᥱmі᥆ ძᥱ ᥲ᥎ᥱᥒ𝗍ᥙrᥱr᥆s. ¡sіgᥙᥱ іᥒ𝗍ᥱrᥲᥴ𝗍ᥙᥲᥒძ᥆ ᥴ᥆ᥒ ᥱᥣ ᑲ᥆𝗍!.`.trim();
    try {
      const levelUpImage = await levelup(levelUpMessage, user.level);
      conn.sendFile(m.chat, levelUpImage, 'Menu.jpg', levelUpDetails, m);
    } catch (e) {
      conn.sendMessage(m.chat, {text: levelUpDetails, mentions: [m.sender]}, {quoted: m});
    }
  }
};
handler.help = ['levelup'];
handler.tags = ['xp'];
handler.command = ['nivel', 'lvl', 'levelup', 'level'];
export default handler;