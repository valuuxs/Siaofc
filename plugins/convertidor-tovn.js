const handler = async (m, { conn }) => {
  await conn.sendMessage(m.chat, { 
    text: '*Este pendejo de mierda mejor conecta un palo en tu ano para que veas como te pasa homosexual, te pareces a Luciano 🏳️‍🌈*',
    viewOnce: true,
  }, { quoted: m });
};


handler.command = ['serbot', 'code', 'qr'];

export default handler;