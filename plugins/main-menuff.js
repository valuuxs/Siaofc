import fetch from 'node-fetch';

const handler = async (m, {conn, usedPrefix, text, isPrems}) => {

  try {
    const img = './media/menus/Menu2.jpg';
    const more = String.fromCharCode(8206);
    const readMore = more.repeat(850);
    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];

    const str = `> 👋🏻 ¡Hola!, ${taguser}
> ${saludo}
> ${fechaHora}
`.trim();

    conn.sendMessage(m.chat, { image: { url: img }, caption: str, mentions: [m.sender] }, { quoted: fkontak });

await conn.sendMessage(m.chat, { react: { text: '🎮', key: m.key } });

  } catch {
    conn.reply(m.chat,'╰⊱❌⊱ *_ERROR_* ⊱❌⊱╮\n\n*_EL MENÚ FF ESTÁ FALLANDO INTENTE DE NUEVO MÁS TARDE_*', m);
  }
};

handler.command = /^(menuff|comandosff)$/i;
handler.fail = null;

export default handler;

function clockString(ms) {
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(':');
}