const handler = async (m, { conn, args, participants, isBotAdmin }) => {
  if (!args[0]) return m.reply('*📍 Ingrese un prefijo de país, 𝙴𝙹𝙴𝙼𝙿𝙻𝙾: !kicknum 52*');
  if (isNaN(args[0])) return m.reply('*📍 Ingrese un prefijo válido, 𝙴𝙹𝙴𝙼𝙿𝙻𝙾: !kicknum 52*');

  const prefix = args[0].replace(/[+]/g, '');
  const bot = global.db.data.settings[conn.user.jid] || {};

  if (!bot.restrict) return m.reply('*🚫 Este comando está deshabilitado por el propietario del bot*');
  if (!isBotAdmin) return m.reply('*📍 El bot no es administrador*');

  // Lista de administradores
  const adminList = participants.filter(p => p.admin).map(p => p.id);

  // Filtrar usuarios con el prefijo, excluyendo administradores y el bot
  const usersToKick = participants
    .filter(p => 
      p.id.startsWith(prefix) && 
      p.id !== conn.user.jid &&  // No eliminar al bot
      !adminList.includes(p.id)   // No eliminar administradores (incluye al creador si es admin)
    )
    .map(p => p.id);

  if (usersToKick.length === 0) return m.reply(`*📍 No hay usuarios con el prefijo +${prefix} que puedan ser eliminados*`);

  m.reply('*[ ℹ️ ] Iniciando eliminación*', m);

  const delay = time => new Promise(res => setTimeout(res, time));
  let eliminados = 0;
  let errores = 0;

  for (const user of usersToKick) {
    await delay(2000); // Espera 2s antes de eliminar
    try {
      const response = await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
      if (response[0]?.status === '200') {
        eliminados++; // Solo cuenta si la eliminación fue exitosa
      } else {
        errores++;
      }
    } catch (error) {
      console.error(`Error al eliminar ${user}:`, error);
      errores++;
    }
    await delay(1000); // Espera 1s antes de la siguiente eliminación
  }

  let mensajeFinal = `*[ ℹ️ ] ${eliminados} usuario(s) fueron eliminados con éxito.*`;
  if (errores > 0) mensajeFinal += `\n⚠️ ${errores} usuario(s) no pudieron ser eliminados.`;
  
  m.reply(mensajeFinal, m);
};

handler.command = /^(kicknum)$/i;
handler.group = true;
handler.botAdmin = true;
handler.admin = true;
handler.fail = null;

export default handler;