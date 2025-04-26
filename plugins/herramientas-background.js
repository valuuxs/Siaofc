import axios from 'axios';

let handler = async (m, { usedPrefix, command, conn, text }) => {
  if (!text) {
    return m.reply(`🔎 Por favor, ingresa un usuario de Instagram para stalkear.\n> *Ejemplo:* ${usedPrefix + command} dev.criss_vxx`);
  }

  try {
    await m.react('⏳');

    // Solicitar datos a la API
    const { data: res } = await axios.get(`https://api.vreden.my.id/api/igstalk?query=${text}`);

    // Depuración: Ver respuesta completa de la API
    console.log(res);

    // Verificar que la respuesta sea válida y tenga los datos necesarios
    if (!res || res.status !== 200 || !res.data || !res.data.username) {
      throw 'Usuario no encontrado o datos incompletos.';
    }

    const user = res.data;

    // Validar que los campos existen antes de usarlos
    const profilePic = user.profile_pic_url_hd || 'https://files.catbox.moe/xr2m6u.jpg';
    const fullName = user.full_name || 'No disponible';
    const biography = user.biography || 'Sin descripción';
    const externalUrl = user.external_url || 'No disponible';
    const language = user.language || 'Desconocido';

    // Crear el texto con la información del usuario
    const teks = `乂 *STALKER - INSTAGRAM*\n\n` +
      `*◦ Usuario:* ${user.username}\n` +
      `*◦ Nombre completo:* ${fullName}\n` +
      `*◦ ID:* ${user.id}\n` +
      `*◦ Seguidores:* ${user.followers_count}\n` +
      `*◦ Siguiendo:* ${user.following_count}\n` +
      `*◦ Publicaciones:* ${user.media_count}\n` +
      `*◦ Descripción:* ${biography}\n` +
      `*◦ Web:* ${externalUrl}\n` +
      `*◦ Verificada:* ${user.is_verified ? '✅ Sí' : '❌ No'}\n` +
      `*◦ Tipo de cuenta:* ${user.is_business_account ? '🏢 Comercial' : '👤 Personal'}\n` +
      `*◦ Lenguaje:* ${language}`;

    // Enviar mensaje con la foto de perfil y la información
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