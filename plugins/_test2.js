import axios from 'axios';
import fetch from 'node-fetch';

const handler = async (m, { conn, command }) => {
  if (!db.data.chats[m.chat].nsfw && m.isGroup) {
    return m.reply('🚩 *¡Estos comandos están desactivados!*');
  }

  let url;
  try {
    switch (command) {
      case 'pack':
        url = pack[Math.floor(Math.random() * pack.length)];
        conn.sendMessage(m.chat, { image: { url: url }, caption: '*🥵 Pack 🥵*' }, { quoted: m });
        break;

      case 'pack2':
        url = packgirl[Math.floor(Math.random() * packgirl.length)];
        conn.sendMessage(m.chat, { image: { url: url }, caption: '*🥵 Pack 2 🥵*' }, { quoted: m });
        break;

      case 'pack3':
        url = packmen[Math.floor(Math.random() * packmen.length)];
        conn.sendMessage(m.chat, { image: { url: url }, caption: '*🥵 Pack 3 🥵*' }, { quoted: m });
        break;

      case 'videoxxx': case 'vídeoxxx':
        url = videosxxxc[Math.floor(Math.random() * videosxxxc.length)];
        await conn.sendMessage(m.chat, { video: { url: url }, caption: '*🔥 Disfruta del video 🥵*' }, { quoted: m });
        break;

      case 'videoxxxlesbi': case 'videolesbixxx': case 'pornolesbivid':
      case 'pornolesbianavid': case 'pornolesbiv': case 'pornolesbianav': case 'pornolesv':
        url = videosxxxc2[Math.floor(Math.random() * videosxxxc2.length)];
        await conn.sendMessage(m.chat, { video: { url: url }, caption: '*🔥 Disfruta del video 🥵*' }, { quoted: m });
        break;
    }
  } catch (e) {
    console.error(e);
    m.reply('❌ Error al obtener el contenido.');
  }
};

handler.command = ['pack', 'pack2', 'pack3', 'videoxxx', 'vídeoxxx', 'videoxxxlesbi', 'videolesbixxx', 'pornolesbivid', 'pornolesbianavid', 'pornolesbiv', 'pornolesbianav', 'pornolesv'];
handler.tags = ['nsfw'];

export default handler;

global.pack = [
  'https://telegra.ph/file/957fe4031132ef90b66ec.jpg',
  'https://telegra.ph/file/c4b85bd53030cb648382f.jpg',
  'https://telegra.ph/file/df56f8a76145df9c923ad.jpg'
];

global.packgirl = [
  'https://telegra.ph/file/c0da7289bee2d97048feb.jpg',
  'https://telegra.ph/file/b8564166f9cac4d843db3.jpg',
  'https://telegra.ph/file/fdefd621a17712be15e0e.jpg'
];

global.packmen = [
  'https://telegra.ph/file/bf303b19b9834f90e9617.jpg',
  'https://telegra.ph/file/36ef2b807251dfccd17c2.jpg',
  'https://telegra.ph/file/bcc34403d16de829ea5d2.jpg'
];

global.videosxxxc = [
  'https://telegra.ph/file/4a270d9945ac46f42d95c.mp4',
  'https://telegra.ph/file/958c11e84d271e783ea3f.mp4',
  'https://telegra.ph/file/f753759342337c4012b3f.mp4'
];

global.videosxxxc2 = [
  'https://telegra.ph/file/2dfb1ad0cab22951e30d1.mp4',
  'https://telegra.ph/file/c430651857023968d3a76.mp4',
  'https://telegra.ph/file/1ba17f6230dd1ea2de48c.mp4'
];