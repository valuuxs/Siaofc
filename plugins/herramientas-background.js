import axios from 'axios';

let handler = async (m, { usedPrefix, command, conn, text }) => {
  if (!text) return m.reply(`🔎 Por favor, ingresa un usuario de Instagram para stalkear.\n> *Ejemplo:* ${usedPrefix + command} dev.criss_vx`);

  try {
    await m.react('⏳');

    let { data: res } = await axios.get(`https://api.vreden.my.id/api/igstalk?query=${encodeURIComponent(text)}`, { timeout: 15000 });

    if (res.status !== 200 || !res.data) throw 'No se encontró el usuario.';

    let user = res.data;
    let profilePic = user.profile_pic_url_hd || 'https://files.catbox.moe/xr2m6u.jpg';

    let teks = `乂 *STALKER - INSTAGRAM*\n\n` +
      `*◦ Usuario:* ${user.username}\n` +
      `*◦ Nombre completo:* ${user.full_name || 'No disponible'}\n` +
      `*◦ ID:* ${user.id}\n` +
      `*◦ Seguidores:* ${user.followers_count}\n` +
      `*◦ Siguiendo:* ${user.following_count}\n` +
      `*◦ Publicaciones:* ${user.media_count}\n` +
      `*◦ Descripción:* ${user.biography || 'Sin descripción'}\n` +
      `*◦ Web:* ${user.external_url || 'No disponible'}\n` +
      `*◦ Verificada:* ${user.is_verified ? '✅ Sí' : '❌ No'}\n` +
      `*◦ Tipo de cuenta:* ${user.is_business_account ? '🏢 Comercial' : '👤 Personal'}\n` +
      `*◦ Lenguaje:* ${user.language || 'Desconocido'}`;

    await conn.sendMessage(m.chat, { image: { url: profilePic }, caption: teks.trim() }, { quoted: m });
    await m.react('✅');
    
  } catch (err) {
    console.error(err);
    m.reply('*❌ Error: No se encontró el usuario o la API falló. Intenta nuevamente.*');
  }
};

handler.help = ['instastalk *<usuario>*'];
handler.tags = ['stalk'];
handler.command = /^(instastalk|stalkinsta|igstalk)$/i;

export default handler;