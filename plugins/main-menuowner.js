import fetch from 'node-fetch';

// Aquí asumimos que tienes una forma de obtener estos valores dinámicamente
// Si no tienes estos valores, debes definirlos o hacer una función para obtenerlos.
const uptime = process.uptime(); // Esto devuelve el tiempo en segundos que lleva activo el bot
const rtotalreg = 1000; // Ejemplo, total de usuarios registrados, cámbialo por lo que tengas
const totalreg = 1500; // Otro ejemplo de total de usuarios registrados
const readMore = '\n\nPara más información visita el grupo de soporte'; // Ejemplo de texto adicional
const xowner = '🔹'; // Prefijo que usas para los comandos del owner, cámbialo si es necesario
const club = '⚡ *Unete a nuestro club* ⚡'; // Ejemplo, puedes cambiarlo por tu club o dejarlo vacío

const handler = async (m, { conn, usedPrefix, text }) => {

  try {
    await m.react('👑'); // Reacción al mensaje
    const imageUrl = 'https://files.catbox.moe/qmhhxy.png'; // Cambié la URL al enlace de la imagen
    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0]; // Usuario que ejecuta el comando

    const str = `
🌐 *\`Menú Owner\`*
────────────────────────────
*🌴 Nombre:* MvrcoSexo
*☕ Creador:* MvrcoSex
*📚 Librería:* Baileys
*⏰ Uptime:* ${uptime} segundos
*🚀 Type:* NodeJs
*🧇 Usuarios regs:* ${rtotalreg}
*🥞 Usuarios totales:* ${totalreg}
${readMore}
\`Lista de Comandos\`
𑂯 ׁ${xowner} ${usedPrefix}update
𑂯 ׁ${xowner} ${usedPrefix}leavegc
𑂯 ׁ${xowner} ${usedPrefix}blocklist
𑂯 ׁ${xowner} ${usedPrefix}grouplist
𑂯 ׁ${xowner} ${usedPrefix}restart
𑂯 ׁ${xowner} ${usedPrefix}join
𑂯 ׁ${xowner} ${usedPrefix}chetar
𑂯 ׁ${xowner} ${usedPrefix}banchat 
𑂯 ׁ${xowner} ${usedPrefix}unbanchat
𑂯 ׁ${xowner} ${usedPrefix}banuser
𑂯 ׁ${xowner} ${usedPrefix}unbanuser
𑂯 ׁ${xowner} ${usedPrefix}dsowner
𑂯 ׁ${xowner} ${usedPrefix}autoadmin 
> ${club}
`.trim();

    // Enviamos la imagen con el mensaje
    await conn.sendMessage(m.chat, {
      image: { url: imageUrl },  // Usamos la imagen como contenido
      caption: str,
      mentions: [m.sender], // Etiquetamos al usuario que ejecutó el comando
    }, { quoted: fkontak }); // Añadimos la variable fkontak si se usa

  } catch (e) {
    // Capturamos cualquier error que ocurra y enviamos una respuesta
    conn.reply(m.chat, `*❌ Error al enviar el menú.*\n${e}`, m);
  }
};

// Establecemos el comando que activa el menú
handler.command = /^(menuowner)$/i;
handler.fail = null;

export default handler;
