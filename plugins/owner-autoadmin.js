
const handler = async (m, {conn, isAdmin, groupMetadata }) => {
  if (isAdmin) return m.reply('* 🤍 ¡Ya eres administrador! :3*');
  try {
    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote');
  await m.react(done)
   m.reply('*🌿 ¡Ahora eres admin mi jefe!*');
    let nn = conn.getName(m.sender);
     //conn.reply('543876577197@s.whatsapp.net', `☕ *${nn}* se dio Auto Admin en:\n> ${groupMetadata.subject}.`, m, );
  } catch {
    m.reply('*⚠️ Ocurrio un error.*');
  }
};
handler.tags = ['owner'];
handler.help = ['autoadmin'];
handler.command = ['autoadmin'];
handler.mods = true;
handler.group = true;
handler.botAdmin = true;
export default handler;