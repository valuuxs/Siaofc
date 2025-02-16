const handler = async (m, {conn, args, groupMetadata, participants, usedPrefix, command, isBotAdmin, isSuperAdmin}) => {
  if (!args[0] || isNaN(args[0])) return m.reply(`*🍭 Ingrese Algún Prefijo De Un País: ${usedPrefix + command} 52*`);

  const lol = args[0].replace(/[+]/g, '');
  const pesan = args.slice(1).join(' ') || '📢 ¡Atención!';
  const colombia = `🎩 *Mensaje:* ${pesan}`;
  const ps = participants.map((u) => u.id).filter((v) => v !== conn.user.jid && v.startsWith(lol));

  if (ps.length === 0) return m.reply(`*🍭 No Hay Ningún Número Con El Prefijo +${lol} En Este Grupo.*`);

  const numeros = ps.map((v) => '┋💙 @' + v.replace(/@.+/, ''));
  const delay = (time) => new Promise((res) => setTimeout(res, time));

  switch (command) {
    case 'hidnum':
    case 'tagnum':
      conn.reply(m.chat, `*☄️ MENSAJE ESPECIAL PARA +${lol} QUE ESTÁN EN ESTE GRUPO:*\n` + `${colombia}\n\n` + numeros.join`\n`, m, { mentions: ps });
      break;

    case 'removenum':
      if (!isBotAdmin) return m.reply('*⚠️ El bot necesita permisos de administrador para eliminar usuarios.*');

      const ownerGroup = m.chat.split`-`[0] + '@s.whatsapp.net';

      for (const user of ps) {
        if ([ownerGroup, conn.user.jid, global.owner + '@s.whatsapp.net'].includes(user) || isSuperAdmin) continue;

        try {
          await delay(2000);
          const response = await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
          if (response[0].status === '404') {
            m.reply(`@${user.split('@')[0]} ya ha sido eliminado o ha abandonado el grupo.`, m.chat, { mentions: [user] });
          }
        } catch (e) {
          m.reply(`*🚨 Error eliminando a @${user.split('@')[0]}*`, m.chat, { mentions: [user] });
        }

        await delay(10000);
      }
      break;
  }
};

handler.help = ['notifynum2 *<prefix>*', 'removenum *<prefix>*'];
handler.command = /^(notifynum2|hidnum2|hidetagnum2|removenum2)$/i;
handler.group = true;
handler.botAdmin = true;
handler.admin = true;
handler.fail = null;

export default handler;