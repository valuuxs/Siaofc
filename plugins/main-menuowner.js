import fetch from 'node-fetch';

// Variables necesarias
const xowner = '🔱'; // Prefijo que usas para los comandos del owner, cámbialo si es necesario

const handler = async (m, { conn, usedPrefix, text }) => {

  try {
    await m.react('👑'); // Reacción al mensaje
    const imageUrl = 'https://files.catbox.moe/qmhhxy.png'; // URL de la imagen
    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0]; // Usuario que ejecuta el comando

    const str = `
🌐 *\`Menú Owner\`*
────────────────────────────
*🌴 Nombre:* MvrcoSexo
*☕ Creador:* @𝖎𝖓𝖊𝖋𝖋𝖆𝖇𝖑𝖊.𝖒𝖛𝖗𝖈𝖔
*📞 Número Creador:* 56983073328
\`Lista de Comandos\`
╰➤ ׁ${xowner} ${usedPrefix}update
╰➤ ׁ${xowner} ${usedPrefix}leavegc
╰➤ ׁ${xowner} ${usedPrefix}blocklist
╰➤ ׁ${xowner} ${usedPrefix}grouplist
╰➤ ׁ${xowner} ${usedPrefix}restart
╰➤ ׁ${xowner} ${usedPrefix}join
╰➤ ׁ${xowner} ${usedPrefix}chetar
╰➤ ׁ${xowner} ${usedPrefix}banchat 
╰➤ ׁ${xowner} ${usedPrefix}unbanchat
╰➤ ׁ${xowner} ${usedPrefix}banuser
╰➤ ׁ${xowner} ${usedPrefix}unbanuser
╰➤ ׁ${xowner} ${usedPrefix}dsowner
╰➤ ׁ${xowner} ${usedPrefix}autoadmin 
> ${club}  <!-- Esta variable 'club' debe estar definida en otro lugar -->
`.trim();

    // Botón de enlace al grupo de ventas
    const button = [
      {
        buttonText: { displayText: 'ÚNETE A NUESTRO GRUPO DE VENTAS' },
        type: 1,
        urlButton: { displayText: 'Grupo de Ventas', url: 'https://chat.whatsapp.com/HqhAoXS8TCcJIn0KrbJZKz' },
      },
    ];

    // Enviamos la imagen con el mensaje y el botón
    await conn.sendMessage(m.chat, {
      image: { url: imageUrl },  // Usamos la imagen como contenido
      caption: str,
      mentions: [m.sender], // Etiquetamos al usuario que ejecutó el comando
      buttons: button, // Agregamos el botón de enlace
    });

  } catch (e) {
    // Capturamos cualquier error que ocurra y enviamos una respuesta
    conn.reply(m.chat, `*❌ Error al enviar el menú.*\n${e}`, m);
  }
};

// Establecemos el comando que activa el menú
handler.command = /^(menuowner)$/i;
handler.fail = null;

export default handler;
