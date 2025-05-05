let handler = async (m, { conn, args }) => {
  if (args.length < 2) return m.reply('Ejemplo : balogo txt1 txt2');
  await conn.sendMessage(m.chat, {
    image: {
      url: 'https://api.nekorinn.my.id/maker/ba-logo?textL=' + encodeURIComponent(args[0]) + '&textR=' + encodeURIComponent(args.slice(1).join(' '))
    }
  }, { quoted: m });
};

handler.help = ['balogo <txt1> <txt2>'];
handler.command = ['balogo'];
handler.tags = ['tools']

export default handler;