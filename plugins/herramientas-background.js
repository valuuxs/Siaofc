/*import axios from 'axios';

let handler = async (m, { usedPrefix, command, conn, text }) => {
  if (!text) {
    return m.reply(`🔎 Por favor, ingresa un usuario de Instagram para stalkear.\n> *Ejemplo:* ${usedPrefix + command} dev.criss_vx`);
  }

  try {
    await m.react('⏳');

    const { data: res } = await axios.get(`https://api.vreden.my.id/api/igstalk?query=${encodeURIComponent(text)}`, { timeout: 15000 });

    if (!res || res.status !== 200 || !res.data || !res.data.username) {
      throw 'Usuario no encontrado o datos incompletos.';
    }

    const user = res.data;
    const profilePic = user.profile_pic_url_hd || 'https://files.catbox.moe/xr2m6u.jpg';

    const teks = `乂 *STALKER - INSTAGRAM*\n\n` +
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
    console.error('Error en IGStalk:', err);

    // Detectamos tipo de error
    let errorMsg = '*❌ Error: No se encontró el usuario o la API falló. Intenta nuevamente.*';

    if (axios.isAxiosError(err)) {
      if (err.code === 'ECONNABORTED') {
        errorMsg = '*❌ Error: La API tardó demasiado en responder (timeout).*';
      } else if (err.response) {
        errorMsg = `*❌ Error: Fallo del servidor (${err.response.status}).*`;
      }
    } else if (typeof err === 'string') {
      errorMsg = `*❌ ${err}*`;
    }

    m.reply(errorMsg);
  }
};

handler.help = ['instastalk *<usuario>*'];
handler.tags = ['stalk'];
handler.command = /^(instastalk|stalkinsta|igstalk)$/i;

export default handler;*/

import axios from 'axios';

let handler = async (m, { usedPrefix, command, conn, text }) => {
  if (!text) return m.reply(`🔎 Por favor, ingresa un usuario de Instagram para stalkear.\n> *Ejemplo:* ${usedPrefix + command} dev.criss_vx`);

  try {
    await m.react('⏳');

    let { data: res } = await axios.get(`https://api.vreden.my.id/api/igstalk?query=${encodeURIComponent(text)}`, { timeout: 15000 });

    // Mostrar la respuesta cruda de la API en el chat para depurar
    console.log('Respuesta API:', JSON.stringify(res, null, 2));  // Verifica en consola
    await m.reply(`Respuesta cruda de la API:\n\`\`\`${JSON.stringify(res, null, 2)}\`\`\``);  // Muestra la respuesta cruda en el chat

    if (res.status !== 200 || !res.data || !res.data.username) {
      throw 'Usuario no encontrado o datos incompletos.';
    }

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