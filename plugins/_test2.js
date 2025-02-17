const handler = async (m, { conn, args, groupMetadata, participants, isBotAdmin }) => {
  if (!args[0]) return m.reply('*📍 Ingrese un prefijo de país, 𝙴𝙹𝙴𝙼𝙿𝙻𝙾: !kicknum 52*');
  if (isNaN(args[0])) return m.reply('*📍 Ingrese un prefijo válido, 𝙴𝙹𝙴𝙼𝙿𝙻𝙾: !kicknum 52*');

  const prefix = args[0].replace(/[+]/g, '');
  const bot = global.db.data.settings[conn.user.jid] || {};

  if (!bot.restrict) return m.reply('*¡Este comando está deshabilitado por el propietario del bot!*');
  if (!isBotAdmin) return m.reply('*📍 El bot no es administrador*');

  // Lista de administradores
  const adminList = participants.filter(p => p.admin).map(p => p.id);

  // Creador del grupo
  const ownerGroup = groupMetadata.owner || '';

  // Filtrar usuarios con el prefijo que no sean administradores ni el creador
  const usersToKick = participants
    .filter(p => p.id.startsWith(prefix) && p.id !== conn.user.jid && p.id !== ownerGroup && !adminList.includes(p.id))
    .map(p => p.id);

  if (usersToKick.length === 0) return m.reply(`*📍 No hay usuarios con el prefijo +${prefix} que puedan ser eliminados*`);

  m.reply('*⏰ Iniciando la eliminación...*', m);
  
  const delay = time => new Promise(res => setTimeout(res, time));

  for (const user of usersToKick) {
    await delay(2000);
    try {
      const response = await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
      if (response[0]?.status === '404') {
        m.reply(`@${user.split('@')[0]} ya ha sido eliminado o ha abandonado el grupo`, m.chat, { mentions: [user] });
      }
    } catch (error) {
      console.error(`Error al eliminar ${user}:`, error);
    }
    await delay(10000);
  }
};

handler.command = /^kicknum$/i;
handler.group = true;
handler.botAdmin = true;
handler.admin = true;
handler.fail = null;

export default handler;