const handler = async (m, { conn, args, participants, usedPrefix, command, isBotAdmin }) => {
  if (!args[0] || isNaN(args[0])) {
    return m.reply(`*📍 Ingrese un prefijo de país válido. Ejemplo: ${usedPrefix + command} 52*`);
  }

  const prefix = args[0].replace(/[+]/g, ''); // Elimina el "+" si lo incluyen
  const groupOwner = m.chat.split`-`[0] + '@s.whatsapp.net'; // Dueño del grupo
  const botNumber = conn.user.jid; // Número del bot
  const botConfig = global.db.data.settings[botNumber] || {}; // Configuración del bot

  // Filtrar administradores
  const admins = participants
    .filter((u) => u.admin) // Solo los administradores
    .map((u) => u.id); // Extrae sus números

  // Filtrar usuarios a expulsar (excluyendo bot, dueño del grupo y admins)
  const usersToRemove = participants
    .filter((u) => 
      u.id.startsWith(prefix) && 
      u.id !== botNumber && 
      u.id !== groupOwner && 
      !admins.includes(u.id) // Excluye admins
    )
    .map((u) => u.id);

  if (usersToRemove.length === 0) {
    return m.reply(`*📍 No hay números con el prefijo +${prefix} en este grupo, o todos son administradores.*`);
  }

  if (!isBotAdmin) {
    return m.reply('*❌ El bot no es administrador, no puede expulsar usuarios.*');
  }

  if (!botConfig.restrict) {
    return m.reply('*⚠️ El propietario del bot ha deshabilitado la función de expulsión.*');
  }

  m.reply(`*⏳ Iniciando eliminación de usuarios con el prefijo +${prefix}...*`);

  for (const user of usersToRemove) {
    try {
      await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
      await new Promise((res) => setTimeout(res, 5000)); // Espera 5 segundos entre expulsiones
    } catch (err) {
      m.reply(`⚠️ No se pudo expulsar a @${user.split('@')[0]}`, m.chat, { mentions: [user] });
    }
  }
};

handler.command = /^kicknum2$/i;
handler.group = handler.botAdmin = handler.admin = true;
export default handler;