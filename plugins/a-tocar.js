const handler = async (m, { text, conn, args, usedPrefix, command }) => {

    if (args.length < 3) {
        conn.reply(m.chat, `*[ ☕ ] Proporciona una hora, seguido el formato AM o PM, el país y una modalidad.*
*Usa ar para Argentina y pe para Perú.*

*[ 💡 ] Ejemplo:* .${command} 10:00 am pe Vivido`, m);
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

    // Obtener modalidad
    const modalidad = args.slice(3).join(' ');

    m.react('🎮');

    let tipoInterna, equipoA, equipoB;

    if (command.includes("mixto")) {
        tipoInterna = "INTERNA MIXTO";
        equipoA = "🍁";
        equipoB = "🍃";
    } else if (command.includes("masc")) {
        tipoInterna = "INTERNA MASC";
        equipoA = "🥷🏻";
        equipoB = "🤺";
    } else if (command.includes("fem")) {
        tipoInterna = "INTERNA FEM";
        equipoA = "🪷";
        equipoB = "🦋";
    }

    const message = `ㅤㅤㅤ *\`${tipoInterna}\`*
╭── ︿︿︿︿︿ *⭒   ⭒   ⭒   ⭒   ⭒*
» *☕꒱ Mᴏᴅᴀʟɪᴅᴀᴅ:* ${modalidad}
» *⏰꒱ Hᴏʀᴀʀɪᴏs:*
│• *\`ᴘᴇʀ:\`* ${horasEnPais.PE}
│• *\`ᴀʀɢ:\`* ${horasEnPais.AR}
╰─── ︶︶︶︶ ✰⃕  ⌇ *⭒⭒*   ˚̩̥̩̥*̩̩͙✩
ㅤ _ʚ Equipo A:_ ᭡
${equipoA} • 
${equipoA} • 
${equipoA} • 
${equipoA} • 
ㅤ _ʚ Equipo B:_ ᭡
${equipoB} • 
${equipoB} • 
${equipoB} • 
${equipoB} • 

> *Organiza:* ${conn.getName(m.sender)}`.trim();

    conn.sendMessage(m.chat, { text: message }, { quoted: m });
};

handler.help = ['mixtointerna4', 'mascinterna4', 'feminterna4'];
handler.tags = ['ff'];
handler.command = /^(mixtoint4|mixtointerna4|mascint4|mascinterna4|femint4|feminterna4)$/i;

export default handler;