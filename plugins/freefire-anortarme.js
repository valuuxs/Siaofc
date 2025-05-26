./*const handler = async (m, { args, conn, usedPrefix }) => {
    const tipo = (args[0] || '').toLowerCase();
    const salaId = args[1];

    if (!tipo || !salaId || !global.vsData || !(salaId in global.vsData)) {
        return conn.reply(m.chat, '*❌ Sala no encontrada o expirada.*', m);
    }

    const sala = global.vsData[salaId];

    // Filtra al usuario de ambas listas
    sala.jugadores = sala.jugadores.filter(u => u !== m.sender);
    sala.suplentes = sala.suplentes.filter(u => u !== m.sender);

    const esJugador = tipo === 'jugador';

    // Límite según el tipo de VS
    const maxJugadores = sala.titulo.includes('6VS6') ? 6 : 4;
    const maxSuplentes = 2;

    if (esJugador && sala.jugadores.length >= maxJugadores)
        return conn.reply(m.chat, '*⚠️ Lista de jugadores llena.*', m);
    if (!esJugador && sala.suplentes.length >= maxSuplentes)
        return conn.reply(m.chat, '*⚠️ Lista de suplentes llena.*', m);

    // Agrega el usuario a la lista correspondiente
    if (esJugador) {
        sala.jugadores.push(m.sender);
    } else {
        sala.suplentes.push(m.sender);
    }

    const jugadoresText = sala.jugadores.map((u, i) => `${i + 1}. @${u.split('@')[0]}`).join('\n') || '_Vacío_';
    const suplentesText = sala.suplentes.map((u, i) => `${i + 1}. @${u.split('@')[0]}`).join('\n') || '_Vacío_';


const jugadoresText = sala.jugadores.length
    ? sala.jugadores.map((u, i) => `${sala.iconos[i]} @${u.split('@')[0]}`).join('\n')
    : sala.iconos.map(icono => `${icono}`).join('  ');

const suplentesText = sala.suplentes.length
    ? sala.suplentes.map((u, i) => `${sala.iconos2[i]} @${u.split('@')[0]}`).join('\n')
    : sala.iconos2.map(icono => `${icono}`).join('  ');

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
export default handler;*/


const handler = async (m, { args, conn, usedPrefix }) => {
    const tipo = (args[0] || '').toLowerCase();
    const salaId = args[1];

    if (!tipo) return conn.reply(m.chat, '*☁️ Especifica si eres "jugador" o "suplente".*', m);
    if (!['jugador', 'suplente'].includes(tipo)) {
        return conn.reply(m.chat, '*☁️ Tipo inválido. Usa "jugador" o "suplente".*', m);
    }
    if (!salaId) return conn.reply(m.chat, '*☁️ Debes proporcionar el ID de la sala.*', m);
    if (!global.vsData || !(salaId in global.vsData)) {
        return conn.reply(m.chat, '*✖️ Sala no encontrada o expirada.*', m);
    }

    const sala = global.vsData[salaId];

    // Asegura que el usuario no esté en ambas listas antes de registrarlo
    sala.jugadores = sala.jugadores.filter(u => u !== m.sender);
    sala.suplentes = sala.suplentes.filter(u => u !== m.sender);

    const esJugador = tipo === 'jugador';
    const maxJugadores = sala.titulo.includes('6VS6') ? 6 : 4;
    const maxSuplentes = 2;

    if (esJugador && sala.jugadores.length >= maxJugadores)
        return conn.reply(m.chat, '*⚠️ Lista de jugadores llena.*', m);
    if (!esJugador && sala.suplentes.length >= maxSuplentes)
        return conn.reply(m.chat, '*⚠️ Lista de suplentes llena.*', m);

    if (esJugador) {
        sala.jugadores.push(m.sender);
    } else {
        sala.suplentes.push(m.sender);
    }
/*
    const jugadoresText = sala.jugadores.map((u, i) => `${i + 1}. @${u.split('@')[0]}`).join('\n') || '_Vacío_';
    const suplentesText = sala.suplentes.map((u, i) => `${i + 1}. @${u.split('@')[0]}`).join('\n') || '_Vacío_';*/
const jugadoresText = sala.jugadores.length
    ? sala.jugadores.map((u, i) => `${sala.iconos[i]} @${u.split('@')[0]}`).join('\n')
    : sala.iconos.map(icono => `${icono}`).join('\n');

const suplentesText = sala.suplentes.length
    ? sala.suplentes.map((u, i) => `${sala.iconos2[i]} @${u.split('@')[0]}`).join('\n')
    : sala.iconos2.map(icono => `${icono}`).join('\n');

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