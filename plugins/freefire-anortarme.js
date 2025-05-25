const handler = async (m, { args, conn, usedPrefix }) => {
    const tipo = args[0];
    const salaId = args[1];

    if (!tipo || !salaId || !global.vsData || !(salaId in global.vsData)) {
        return conn.reply(m.chat, '*❌ Sala no encontrada o expirada.*', m);
    }

    const sala = global.vsData[salaId];
    const lista = tipo === 'jugador' ? sala.jugadores : sala.suplentes;

    if (!lista.includes(m.sender)) lista.push(m.sender);

    const jugadoresText = sala.jugadores.map((u, i) => `${i + 1}. @${u.split('@')[0]}`).join('\n') || '_Vacío_';
    const suplentesText = sala.suplentes.map((u, i) => `${i + 1}. @${u.split('@')[0]}`).join('\n') || '_Vacío_';

    const mensajeActualizado = `ꆬꆬ       ݂    *${sala.titulo}*    🌹֟፝  

  ത *𝖬𝗈𝖽𝖺𝗅𝗂𝖽𝖺𝖽:* ${sala.modalidad}
  ത *𝖧𝗈𝗋𝖺:* ${sala.horasEnPais.PE} 🇵🇪 ${sala.horasEnPais.AR} 🇦🇷

ㅤㅤㅤ࿙࿚ㅤׅㅤ࿙࿚࿙࿚ㅤׅㅤ࿙࿚

 ׄ߳𑁍̵ ֕︵۪۪۪۪᷼ ּ \`𝖩𝗎𝗀𝖺𝖽𝗈𝗋𝖾𝗌::\` ׅ ׄ░ׅ

${jugadoresText}

      ꛁ⵿ֹ𐑼᪲ ۪ \`𝖲𝗎𝗉𝗅𝖾𝗇𝗍𝖾𝗌\` ֹ̼ ׅ ❜𝆬 ᨩ̼

${suplentesText}`;


conn.sendMessage(m.chat, { 
    text: mensajeActualizado, 
    mentions: [...sala.jugadores, ...sala.suplentes],
    footer: 'Toca el botón para anotarte', 
    buttons: [
        {
            buttonId: `${usedPrefix}anotarme jugador ${salaId}`,
            buttonText: { displayText: 'Jugador' },
            type: 1
        },
        {
            buttonId: `${usedPrefix}anotarme suplente ${salaId}`,
            buttonText: { displayText: 'Suplente' },
            type: 1
        }
    ],
    viewOnce: true
}, { quoted: m });
};

handler.command = /^anotarme$/i;
export default handler;