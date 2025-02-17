const handler = async (m, { conn, args, groupMetadata, participants, isBotAdmin }) => {
  if (!args[0]) return m.reply('*📍 Ingrese un prefijo de país. Ejemplo: !kicknum 52*');
  if (isNaN(args[0])) return m.reply('*📍 Ingrese un prefijo válido. Ejemplo: !kicknum 52*');

  const prefix = args[0].replace(/[+]/g, '');
  const bot = global.db.data.settings[conn.user.jid] || {};

  if (!bot.restrict) return m.reply('*🚫 Este comando está deshabilitado por el propietario del bot*');
  if (!isBotAdmin) return m.reply('*📍 El bot no es administrador, no puede eliminar usuarios*');

  // Lista de administradores
  const adminList = participants.filter(p => p.admin).map(p => p.id);

  // Creador del grupo
  const ownerGroup = groupMetadata.owner || '';

  // Creador del bot (toma el número de global.owner y lo convierte al formato de WhatsApp)
  const ownerBot = global.owner.map(num => num.replace(/[^\d]/g, '') + '@s.whatsapp.net');

  // Filtrar usuarios con el prefijo, excluyendo administradores, el creador del grupo y el dueño del bot
  const usersToKick = participants
    .filter(p => p.id.startsWith(prefix) && p.id !== conn.user.jid && p.id !== ownerGroup && !ownerBot.includes(p.id) && !adminList.includes(p.id))
    .map(p => p.id);

  if (usersToKick.length === 0) return m.reply(`*📍 No hay usuarios con el prefijo +${prefix} que puedan ser eliminados*`);

  m.reply('*⏳ Iniciando la eliminación...*', m);
  
  const delay = time => new Promise(res => setTimeout(res, time));

  for (const user of usersToKick) {
    await delay(2000);
    try {
      await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
    } catch (error) {
      console.error(`Error al eliminar ${user}:`, error);
    }
    await delay(10000);
  }

  m.reply('*✅ Eliminación completada.*');
};

handler.command = /^(bannum)$/i;
handler.group = true;
handler.botAdmin = true;
handler.admin = true;
handler.fail = null;

export default handler;
