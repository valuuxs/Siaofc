let handler = async (m, { conn, command }) => {
  let message = '';
  let imageUrl = '';
  let emoji = '';

  switch (command) {
    case 'kalahari':
    case 'mapakalahari':
      message = "Mapa Kalahari - Free Fire";
      imageUrl = 'https://files.catbox.moe/qs0h5r.jpg';
      emoji = '🏜️';
      break;
    case 'purgatorio':
    case 'mapapurgatorio':
      message = "Mapa Purgatorio - Free Fire";
      imageUrl = 'https://files.catbox.moe/qs0h5r.jpg';
      emoji = '🏞️';
      break;
    default:
      return;
  }

  if (m.isGroup) {
    m.react(emoji);
    await conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: message }, { mimetype: 'image/jpeg' });
  }
};

handler.help = ['kalahari', 'purgatorio'];
handler.tags = ['ff'];
handler.command = ['kalahari', 'mapakalahari', 'purgatorio', 'mapapurgatorio'];
handler.admin = true;
handler.botAdmin = false;
handler.group = true;

export default handler;