const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command, usedPrefix }) => {

  if (usedPrefix == 'a' || usedPrefix == 'A') return;

  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }
  const pesan = args.join` `;
  const oi = `── 𝑬𝑻𝑰𝑸𝑼𝑬𝑻𝑨 ${pesan}`;
  let teks = `𝑨𝑪𝑻𝑰𝑽𝑬𝑵𝑺𝑬 𝑶 𝑪𝑼𝑷𝑶 👋🏻\n\n *${oi}\n\n\n`;
  for (const mem of participants) {
    teks += `▌@${mem.id.split('@')[0]}\n`;
  }
  teks += `◥ 𝑺𝒊𝒂 𝑩𝒐𝒕 ◤`;
  conn.sendMessage(m.chat, { text: teks, mentions: participants.map((a) => a.id) });
};
handler.help = ['todos *<txt>*'];
handler.tags = ['gc'];
handler.command = /^(tagall1|t1|invocar1|marcar1|todos1|invocación1)$/i;
handler.admin = true;
handler.group = true;
export default handler;