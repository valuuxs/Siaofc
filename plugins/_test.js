const handler = async (m, { conn, args, groupMetadata, participants, usedPrefix, command, isBotAdmin, isSuperAdmin }) => {
  const validarPrefijo = (input) => {
    if (!input || isNaN(input)) {
      return `*📍Ingrese un prefijo de país válido. Ejemplo: ${usedPrefix + command} 52*`;
    }
    return null;
  };

  const errorPrefijo = validarPrefijo(args[0]);
  if (errorPrefijo) return m.reply(errorPrefijo);

  const lol = args[0].replace(/[+]/g, '');
  const bot = global.db.data.settings[conn.user.jid] || {};
  const ownerGroup = m.chat.split`-`[0] + '@s.whatsapp.net';

  // Obtener la lista de administradores
  const admins = participants.filter((p) => p.admin).map((p) => p.id);

  // Filtrar solo los números con el prefijo y que NO sean administradores
  const ps = participants
    .map((u) => u.id)
    .filter((v) => v !== conn.user.jid && v.startsWith(lol) && !admins.includes(v));

  if (ps.length === 0) return m.reply(`*📍 No hay números con el prefijo +${lol} en este grupo o todos son administradores.*`);

  const numeros = ps.map((v, i) => `${i + 1}. ⭔ @${v.replace(/@.+/, '')}`);
  const delay = (time) => new Promise((res) => setTimeout(res, time));

  switch (command) {
    case 'listanum':
    case 'listnum':
      conn.reply(
        m.chat,
        `📋 *Lista de números con el prefijo +${lol} en este grupo (excluyendo admins):*\n\n${numeros.join('\n')}`,
        m,
        { mentions: ps }
      );
      break;

    case 'kicknum':
      if (!bot.restrict) return m.reply('*❌ Este comando está deshabilitado por el propietario del bot.*');
      if (!isBotAdmin) return m.reply('*❌ El bot no es administrador.*');

      conn.reply(m.chat, `*⏳ Iniciando la eliminación de usuarios...*`, m);

      for (const user of ps) {
        try {
          await delay(2000);
          const response = await conn.groupParticipantsUpdate(m.chat, [user], 'remove');

          if (response[0].status === '404') {
            m.reply(`⚠️ @${user.split('@')[0]} ya ha sido eliminado o abandonó el grupo.`, m.chat, { mentions: [user] });
          }
        } catch (err) {
          m.reply(`❌ No se pudo eliminar a @${user.split('@')[0]}.`, m.chat, { mentions: [user] });
        }
      }
      break;
  }
};

handler.command = /^(listanum2|kicknum2|listnum2)$/i;
handler.group = handler.botAdmin = handler.admin = true;
handler.fail = null;

export default handler;