import ws from 'ws';

let handler = async (m, { conn, usedPrefix, args }) => {
  if (!args[0] && !m.quoted) {
    return m.reply(`*☘️ Menciona el número de un bot o responde al mensaje de un bot.*`);
  }

  const users = [...new Set(global.conns.filter(c => c.user && c.ws?.socket && c.ws.socket.readyState !== ws.CLOSED))];

  let botJid;
  let selectedBot;

  if (m.mentionedJid?.length > 0) {
    botJid = m.mentionedJid[0];
  } else if (m.quoted) {
    botJid = m.quoted.sender;
  } else {
    const raw = args[0]?.replace(/[^0-9]/g, '');
    if (!raw) return m.reply('*⚠️ Número no válido.*');
    botJid = raw + '@s.whatsapp.net';
  }

  if (botJid === conn.user.jid || botJid === global.conn?.user?.jid) {
    selectedBot = conn;
  } else {
    selectedBot = users.find(c => c.user?.jid === botJid);
  }

  if (!selectedBot) {
    return conn.reply(m.chat, `*⚠️ @${botJid.split('@')[0]} no es un bot de esta sesión. Verifica los bots conectados usando* \`#bots\`.`, m, { mentions: [botJid] });
  }

  let chat = global.db.data.chats[m.chat] || (global.db.data.chats[m.chat] = {});

  if (chat.primaryBot === botJid) {
    return conn.reply(m.chat, `*⚠️ @${botJid.split('@')[0]} ya es el bot primario.*`, m, { mentions: [botJid] });
  }

  chat.primaryBot = botJid;
  conn.sendMessage(m.chat, {
    text: `*✅ El bot @${botJid.split('@')[0]} ha sido establecido como primario en este grupo. Los demás bots no responderán aquí.*`,
    mentions: [botJid]
  }, { quoted: fkontak });
};

handler.help = ['setprimary <@tag>'];
handler.tags = ['jadibot'];
handler.command = ['setprimary'];
handler.group = true;
handler.admin = true;

export default handler;