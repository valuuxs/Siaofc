const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command, usedPrefix }) => {

  if (usedPrefix == 'a' || usedPrefix == 'A') return;

  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }
  const pesan = args.join` `;
  const oi = `𝙀𝙏𝙄𝙌𝙐𝙀𝙏𝘼𝙎:* ${pesan}`;
  let teks = `> *Yᴏᴜʀ Pᴏᴛᴇɴᴛɪᴀʟ Is Iɴғɪɴɪᴛᴇ, Dᴀʀᴇ Tᴏ Exᴘʟᴏʀᴇ Iᴛ 💋*\n\n *${oi}\n\n➥ _*@ineffable.mvrco:*_\n`;
  for (const mem of participants) {
    teks += `*💗 ➸* @${mem.id.split('@')[0]}\n`;
  }
  teks += `*└KɪʟʟBᴏᴛ ⇝@ineffable.mvrco*`;
  conn.sendMessage(m.chat, { text: teks, mentions: participants.map((a) => a.id) });
};
handler.help = ['todos *<txt>*'];
handler.tags = ['gc'];
handler.command = /^(tagall1|t1|invocar1|marcar1|todos1|invocación1)$/i;
handler.admin = true;
handler.group = true;
export default handler;