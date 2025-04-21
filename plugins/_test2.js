import fetch from 'node-fetch';

let handler = async (m, { text, command }) => {
  const emoji = '🔍';
  const emoji2 = '🌐';
  const msm = '⚠️';

  if (!text) {
    return m.reply(`${emoji} Por favor, proporciona el término de búsqueda que deseas realizar en *Google*.`);
  }

  const apiUrl = `https://vapis.my.id/api/googlev1?q=${encodeURIComponent(text)}`;

  try {
    const response = await fetch(apiUrl);
    const result = await response.json();

    if (!Array.isArray(result) || result.length === 0) {
      return m.reply(`${msm} No se encontraron resultados para tu búsqueda.`);
    }

    let replyMessage = `${emoji2} *Resultados de la búsqueda:*\n\n`;
    result.slice(0, 5).forEach((item, index) => {
      replyMessage += `☁️ *${index + 1}. ${item.title}*\n`;
      replyMessage += `📰 ${item.desc}\n`;
      replyMessage += `🔗 ${item.link}\n\n`;
    });

    await m.react('✅');
    m.reply(replyMessage);
  } catch (error) {
    console.error(`${msm} Error al realizar la solicitud a la API:`, error);
    m.reply(`${msm} Ocurrió un error al obtener los resultados.`);
  }
};

handler.command = ['gtes'];
handler.help = ['google <consulta>'];
handler.tags = ['internet'];

export default handler;