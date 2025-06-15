/*const handler = async (m, { conn, text }) => {
  if (!text) throw '*[❗] Ingresa el mensaje a enviar con la ubicación*';

  const mensaje = '[❗𝐋𝐈𝐕𝐄 𝐓𝐄𝐒𝐓❗]\n\n' + text + '\n\nEste es un test de liveLocationMessage';

  await conn.relayMessage(m.chat, {
    liveLocationMessage: {
      degreesLatitude: 35.685506276233525,
      degreesLongitude: 139.75270667105852,
      accuracyInMeters: 0,
      degreesClockwiseFromMagneticNorth: 2,
      caption: mensaje,
      sequenceNumber: 2,
      timeOffset: 3,
    },
  }, {}).catch(e => m.reply('*[⚠️] Error al enviar liveLocationMessage:* ' + e));

  m.reply('*[✅] Mensaje de ubicación en vivo enviado exitosamente.*');
};

handler.help = ['testlive <mensaje>'];
handler.tags = ['test'];
handler.command = /^testlive$/i;
handler.owner = true;

export default handler;

import moment from 'moment-timezone';
import PhoneNumber from 'awesome-phonenumber';
import fetch from 'node-fetch';

let handler = async (m, { conn, args }) => {
    let userId;
    if (m.quoted && m.quoted.sender) {
        userId = m.quoted.sender;
    } else {
        userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
    }

    let user = global.db.data.users[userId];

    let name = conn.getName(userId);
    let cumpleanos = user.birth || 'No especificado';
    let genero = user.genre || 'No especificado';
    let pareja = user.marry || 'Nadie';
    let description = user.description || 'Sin Descripción';
    let exp = user.exp || 0;
    let nivel = user.level || 0;
    let role = user.role || 'Sin Rango';
    let diamond = user.diamantes || 0;
    let bankDiamond = user.bank || 0;

    let perfil = await conn.profilePictureUrl(userId, 'image').catch(_ => 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg');

    let profileText = `

=͟͟͞͞ ✿  *𝖯𝖾𝗋𝖿𝗂𝗅 𝖽𝖾𝗅 𝖴𝗌𝗎𝖺𝗋𝗂𝗈  ←╮*
╰ ࣪ ˖ ∿ @${userId.split('@')[0]}

> ${description}

∘🌿.• *Edad:* ${user.age || 'Desconocida'}
∘🌺.• *Cumpleaños:* ${cumpleanos}
∘🌾.• *Casado/a con:* ${pareja}

❀ *Experiencia:* ${exp.toLocaleString()}
🜲 *Nivel:* ${nivel}
Ꮺ *Rango:* ${role}

⛁ *Coins Cartera* » ${diamond.toLocaleString()} ${moneda}
⛃ *Coins Banco* » ${bankDiamond.toLocaleString()} ${moneda}
❁ *Premium* » ${user.premium ? '✅' : '❌'}
  `.trim();

    await conn.sendMessage(m.chat, { 
        text: profileText,
        contextInfo: {
            mentionedJid: [userId],
            externalAdReply: {
                title: '✧ Perfil de Usuario ✧',
                body: club,
                thumbnailUrl: perfil,
                mediaType: 1,
                showAdAttribution: true,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: fkontak });
};

handler.help = ['profile'];
handler.tags = ['rg'];
handler.command = ['profile2', 'perfil2'];

export default handler;*/

import fs from 'fs';
import moment from 'moment-timezone';
import PhoneNumber from 'awesome-phonenumber';
import fetch from 'node-fetch';

const moneda = '💎'; // Define tu símbolo de moneda aquí
const club = 'Shadow Club'; // Personaliza el nombre de tu club
const fkontak = { key: { participant: '0@s.whatsapp.net' }, message: { contactMessage: { displayName: 'Shadow Bot', vcard: '' } } };

const loadMarriages = () => {
    if (fs.existsSync('./src/database/marry.json')) {
        const data = JSON.parse(fs.readFileSync('./src/database/marry.json', 'utf-8'));
        global.db.data.marriages = data;
    } else {
        global.db.data.marriages = {};
    }
};

const handler = async (m, { conn, args }) => {
    loadMarriages();

    let userId;
    if (m.quoted?.sender) {
        userId = m.quoted.sender;
    } else {
        userId = m.mentionedJid?.[0] || m.sender;
    }

    const user = global.db.data.users[userId] || {};
    const name = await conn.getName(userId);
    const cumpleanos = user.birth || 'No especificado';
    const genero = user.genre || 'No especificado';
    const pareja = user.marry || 'Nadie';
    const description = user.description || 'Sin Descripción';
    const exp = user.exp || 0;
    const nivel = user.level || 0;
    const role = user.role || 'Sin Rango';
    const diamond = user.diamantes || 0;
    const bankDiamond = user.bank || 0;

    const perfil = await conn.profilePictureUrl(userId, 'image')
        .catch(_ => 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg');

    const profileText = `
=͟͟͞͞ ✿  *𝖯𝖾𝗋𝖿𝗂𝗅 𝖽𝖾𝗅 𝖴𝗌𝗎𝖺𝗋𝗂𝗈  ←╮*
╰ ࣪ ˖ ∿ @${userId.split('@')[0]}

> ${description}

∘🌿.• *Edad:* ${user.age || 'Desconocida'}
∘🌺.• *Cumpleaños:* ${cumpleanos}
∘🌾.• *Casado/a con:* ${pareja}

❀ *Experiencia:* ${exp.toLocaleString()}
🜲 *Nivel:* ${nivel}
Ꮺ *Rango:* ${role}

⛁ *Coins Cartera* » ${diamond.toLocaleString()} ${moneda}
⛃ *Coins Banco* » ${bankDiamond.toLocaleString()} ${moneda}
❁ *Premium* » ${user.premium ? '✅' : '❌'}
`.trim();

    await conn.sendMessage(m.chat, {
        text: profileText,
        contextInfo: {
            mentionedJid: [userId],
            externalAdReply: {
                title: '✧ Perfil de Usuario ✧',
                body: club,
                thumbnailUrl: perfil,
                mediaType: 1,
                showAdAttribution: true,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: fkontak });
};

handler.help = ['profile'];
handler.tags = ['rg'];
handler.command = ['profile2', 'perfil2'];

export default handler;
