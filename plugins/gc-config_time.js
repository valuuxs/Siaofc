const handler = async (m, {conn, isAdmin, isOwner, args, usedPrefix, command}) => {
  if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
    throw false;
  }
  const isClose = {
          'open': 'not_announcement',
          'buka': 'not_announcement',
    'on': 'not_announcement',
          '1': 'not_announcement',
          'close': 'announcement',
          'tutup': 'announcement',
    'off': 'announcement',
    '0': 'announcement',
  }[(args[0] || '')];
  if (isClose === undefined) {
          const caption = `
*🍃 Ingresa una opción válida seguido del número de horas.*

> *\`Ejemplo:\`* 
${usedPrefix + command} *open 1*
${usedPrefix + command} *close 1*

> ⍴ᥲrᥲ 𝗊ᥙᥱ ᥱᥣ grᥙ⍴᥆ ᥱs𝗍ᥱ *abierto/cerrado* ⍴᥆r ᥙᥒᥲ һ᥆rᥲ.
`;
    m.reply(caption);
          throw false;
  }
  const timeoutset = 86400000 * args[1] / 24;
  await conn.groupSettingUpdate(m.chat, isClose).then(async (_)=> {
          m.reply(`*🌵 Grupo ${isClose == 'announcement' ? 'cerrado' : 'abierto'} ${args[1] ? `durante* \`\`\`${clockString(timeoutset)}\`\`\` *hora(s)*` : ''}`);
  });
  if (args[1]) {
         setTimeout(async () => {
      await conn.groupSettingUpdate(m.chat, `${isClose == 'announcement' ? 'not_announcement' : 'announcement'}`).then(async (_)=>{
                    conn.reply(m.chat, `${isClose == 'not_announcement' ? '*🍃 Función activada con éxito*' : '*🍃 Función finalizada el grupo se abrió con éxito*'}!`);
            });
    }, timeoutset);
  }
};
handler.help = ['grouptime *<open/close>* *<num>*'];
handler.tags = ['gc'];
handler.command = /^(grouptime|gctime)$/i;
handler.botAdmin = true;
handler.admin = true;
handler.group = true;

export default handler;

function clockString(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor(ms / 60000) % 60;
  const s = Math.floor(ms / 1000) % 60;
  console.log({ms, h, m, s});
  return [h, m, s].map((v) => v.toString().padStart(2, 0) ).join(':');
}