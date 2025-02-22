const handler = async (m, { text, conn, args, usedPrefix, command }) => {
    if (args.length < 3) {
        conn.reply(m.chat, '*[ ☕ ] Proporciona una hora, seguido del formato AM o PM, el país y una modalidad.*\n*Usa ar para Argentina y pe para Perú.*\n\n*[ 💡 ] Ejemplo:* .mixtointerna4 10:00 am pe Vivido', m);
        return;
    }

    const horaRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]$/;
    if (!horaRegex.test(args[0])) {
        conn.reply(m.chat, '*[ ⏰ ] Formato de hora incorrecto.*', m);
        return;
    }

    const horaUsuario = args[0];
    const ampm = args[1].toUpperCase();
    const pais = args[2].toUpperCase();

    if (!['AM', 'PM'].includes(ampm)) {
        conn.reply(m.chat, '*[ ⏳ ] Utilice correctamente el formato de AM/PM*.', m);
        return;
    }

    let [hora, minutos] = horaUsuario.split(':').map(Number);
    if (ampm === 'PM' && hora !== 12) hora += 12;
    if (ampm === 'AM' && hora === 12) hora = 0;

    const diferenciasHorarias = {
        CL: 2,  // UTC-4
        AR: 2,  // UTC-3
        PE: 0,  // UTC-5
    };

    if (!(pais in diferenciasHorarias)) {
        conn.reply(m.chat, '*[ ℹ️ ] País no válido. Usa AR para Argentina, PE para Perú.*', m);
        return;
    }

    const diferenciaHoraria = diferenciasHorarias[pais];
    const formatTime = (date) => date.toLocaleTimeString('es', { hour12: true, hour: '2-digit', minute: '2-digit' });

    const horasEnPais = {
        CL: '',
        AR: '',
        PE: ''
    };

    for (const key in diferenciasHorarias) {
        const horaActual = new Date();
        horaActual.setHours(hora);
        horaActual.setMinutes(minutos);
        horaActual.setSeconds(0);
        horaActual.setMilliseconds(0);

        const horaEnPais = new Date(horaActual.getTime() + (3600000 * (diferenciasHorarias[key] - diferenciaHoraria)));
        horasEnPais[key] = formatTime(horaEnPais);
    }

    const modalidad = args.slice(3).join(' ');
    m.react('🎮');

    // Configuración de la modalidad según el comando usado
    let titulo = '';
    let iconosA = [];
    let iconosB = [];

    switch (command) {
        case 'mixtoint4':
        case 'mixtointerna4':
            titulo = 'INTERNA MIXTO';
            iconosA = ['🍁', '🍁', '🍁', '🍁'];
            iconosB = ['🍃', '🍃', '🍃', '🍃'];
            break;
        case 'mascint4':
        case 'mascinterna4':
            titulo = 'INTERNA MASC';
            iconosA = ['🥷🏻', '🥷🏻', '🥷🏻', '🥷🏻'];
            iconosB = ['🤺', '🤺', '🤺', '🤺'];
            break;
        case 'femint4':
        case 'feminterna4':
            titulo = 'INTERNA FEM';
            iconosA = ['🪷', '🪷', '🪷', '🪷'];
            iconosB = ['🦋', '🦋', '🦋', '🦋'];
            break;
        case 'mascint6':
        case 'mascinterna6':
            titulo = 'INTERNA MASC 6vs6';
            iconosA = ['🪸', '🪸', '🪸', '🪸', '🪸', '🪸'];
            iconosB = ['🦪', '🦪', '🦪', '🦪', '🦪', '🦪'];
            break;
        default:
            conn.reply(m.chat, '*[ ❌ ] Comando no válido.*', m);
            return;
    }

    const message = `ㅤㅤㅤ *\`${titulo}\`*
╭── ︿︿︿︿︿ *⭒   ⭒   ⭒   ⭒   ⭒*
» *☕꒱ Mᴏᴅᴀʟɪᴅᴀᴅ:* ${modalidad}
» *⏰꒱ Hᴏʀᴀʀɪᴏs:*
│• *\`ᴘᴇʀ:\`* ${horasEnPais.PE}
│• *\`ᴀʀɢ:\`* ${horasEnPais.AR}
╰─── ︶︶︶︶ ✰⃕  ⌇ *⭒⭒*   ˚̩̥̩̥*̩̩͙✩
ㅤ _ʚ Equipo A:_ ᭡
${iconosA.map(icono => `${icono} •`).join('\n')}
ㅤ _ʚ Equipo B:_ ᭡
${iconosB.map(icono => `${icono} •`).join('\n')}

> *Organiza:* ${conn.getName(m.sender)}`.trim();

    conn.sendMessage(m.chat, { text: message }, { quoted: m });
};

handler.help = ['mixtointerna4', 'mascinterna4', 'feminterna4', 'mascinterna6'];
handler.tags = ['ff'];
handler.command = /^(mixtoint4|mixtointerna4|mascint4|mascinterna4|femint4|feminterna4|mascint6|mascinterna6)$/i;

export default handler;