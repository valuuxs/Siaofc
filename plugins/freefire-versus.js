/*const handler = async (m, { text, conn, args, usedPrefix, command }) => {

    if (args.length < 2) {  
        conn.reply(m.chat, `*${xff} Proporciona una hora seguido el país y una modalidad para crear una lista de VS.*
*Usa AR para Argentina y PE para Perú.*
> *\`Ejemplo:\`* ${usedPrefix + command} 14 pe infinito`, m);
        return;
    }

    // Nueva validación para formato de 24 horas
    const horaRegex = /^([01]?[0-9]|2[0-3])(:[0-5][0-9])?$/;  
    if (!horaRegex.test(args[0])) {  
        conn.reply(m.chat, '*⏰ El formato horario es incorrecto.*', m);  
        return;  
    }  

    let [hora, minutos] = args[0].includes(':') ? args[0].split(':').map(Number) : [Number(args[0]), 0];

    const pais = args[1].toUpperCase();  

    const diferenciasHorarias = {  
        CL: 2,  // UTC-4  
        AR: 2,  // UTC-3  
        PE: 0,  // UTC-5  
    };  

    if (!(pais in diferenciasHorarias)) {  
        conn.reply(m.chat, '*⚠️ El país ingresado no válido. Usa AR para Argentina, PE para Perú.*', m);  
        return;  
    }  

    const diferenciaHoraria = diferenciasHorarias[pais];  
    const formatTime = (date) => date.toLocaleTimeString('es', { hour12: false, hour: '2-digit', minute: '2-digit' });  

    const horasEnPais = { CL: '', AR: '', PE: '' };  

    for (const key in diferenciasHorarias) {  
        const horaActual = new Date();  
        horaActual.setHours(hora, minutos, 0, 0);

        const horaEnPais = new Date(horaActual.getTime() + (3600000 * (diferenciasHorarias[key] - diferenciaHoraria)));  
        horasEnPais[key] = formatTime(horaEnPais);  
    }  

    const modalidad = args.slice(2).join(' ');  
    m.react('🎮');  

    // Configuración de la modalidad según el comando usado
    let titulo = '';
    let players = [];
    let iconos = [];
    let iconos2 = [];

    switch (command) {
        case 'v4fem':
        case 'vsfem4':
            titulo = '4VS4 FEM';
            players = ['𝖩𝗎𝗀𝖺𝖽𝗈𝗋𝖺𝗌'];
            iconos = ['🌸', '🌸', '🌸', '🌸'];
            iconos2 = ['🌸', '🌸'];
            break;
        case 'v4masc':
        case 'vsmasc4':
            titulo = '4VS4 MASC';
            players = ['𝖩𝗎𝗀𝖺𝖽𝗈𝗋𝖾𝗌::'];
            iconos = ['🥥', '🥥', '🥥', '🥥'];
            iconos2 = ['🥥', '🥥'];
            break;
        case 'v4mixto':
        case 'vsmixto4':
            titulo = '4VS4 MIXTO';
            players = ['𝖩𝗎𝗀𝖺𝖽𝗈𝗋𝖾𝗌'];
            iconos = ['🍁', '🍁', '🍁', '🍁'];
            iconos2 = ['🍁', '🍁'];
            break;
        case 'v6fem':
        case 'vsfem6':
            titulo = '6VS6 FEM';
            players = ['𝖩𝗎𝗀𝖺𝖽𝗈𝗋𝖺𝗌'];
            iconos = ['🦋', '🦋', '🦋', '🦋', '🦋', '🦋'];
            iconos2 = ['🦋', '🦋'];
            break;
        case 'v6masc':
        case 'vsmasc6':
            titulo = '6VS6 MASC';
            players = ['𝖩𝗎𝗀𝖺𝖽𝗈𝗋𝖾𝗌'];
            iconos = ['🥞', '🥞', '🥞', '🥞', '🥞', '🥞'];
            iconos2 = ['🥞', '🥞'];
            break;
        case 'v6mixto':
        case 'vsmixto6':
            titulo = '6VS6 MIXTO';
            players = ['𝖩𝗎𝗀𝖺𝖽𝗈𝗋𝖾𝗌'];
            iconos = ['🥯', '🥯', '🥯', '🥯', '🥯', '🥯'];
            iconos2 = ['🥯', '🥯'];
            break;
        default:
            conn.reply(m.chat, '*❌ Comando no válido.*', m);
            return;
    }

    const message = `ꆬꆬ       ݂    *${titulo}*    🌹֟፝  

  ത *𝖬𝗈𝖽𝖺𝗅𝗂𝖽𝖺𝖽:* ${modalidad}
  ത *𝖧𝗈𝗋𝖺:* ${horasEnPais.PE} 🇵🇪 ${horasEnPais.AR} 🇦🇷

ㅤㅤㅤ࿙࿚ㅤׅㅤ࿙࿚࿙࿚ㅤׅㅤ࿙࿚

 ׄ߳𑁍̵ ֕︵۪۪۪۪᷼ ּ \`${players}::\` ׅ ׄ░ׅ

${iconos.map(icono => `${icono}˚ `).join('\n')}

      ꛁ⵿ֹ𐑼᪲ ۪ \`𝖲𝗎𝗉𝗅𝖾𝗇𝗍𝖾𝗌\` ֹ̼ ׅ ❜𝆬 ᨩ̼

${iconos2.map(icono => `${icono}˚ `).join('\n')}

> © Տһᥲძᨣᥕ Ɓᨣƚ Uᥣ𝗍rᥲ `.trim();

    conn.sendMessage(m.chat, { text: message }, { quoted: fkontak });
};

handler.help = ['inmixto4', 'inmixto6', 'inmasc4', 'inmasc6', 'infem4', 'infem6'];
handler.tags = ['ff'];
handler.command = /^(v4fem|vsfem4|v4masc|vsmasc4|v4mixto|vsmixto4|v6fem|vsfem6|v6masc|vsmasc6|v6mixto|vsmixto6)$/i;

export default handler;*/

const handler = async (m, { text, conn, args, usedPrefix, command }) => {
    if (args.length < 2) {
        conn.reply(m.chat, `*Proporciona una hora seguido el país y una modalidad para crear una lista de VS.*
*Usa AR para Argentina y PE para Perú.*
> *\`Ejemplo:\`* ${usedPrefix + command} 14 pe infinito`, m);
        return;
    }

    const horaRegex = /^([01]?[0-9]|2[0-3])(:[0-5][0-9])?$/;
    if (!horaRegex.test(args[0])) {
        conn.reply(m.chat, '*⏰ El formato horario es incorrecto.*', m);
        return;
    }

    let [hora, minutos] = args[0].includes(':') ? args[0].split(':').map(Number) : [Number(args[0]), 0];
    const pais = args[1].toUpperCase();

    const diferenciasHorarias = {
        CL: 2,
        AR: 2,
        PE: 0,
    };

    if (!(pais in diferenciasHorarias)) {
        conn.reply(m.chat, '*⚠️ El país ingresado no válido. Usa AR para Argentina, PE para Perú.*', m);
        return;
    }

    const diferenciaHoraria = diferenciasHorarias[pais];
    const formatTime = (date) => date.toLocaleTimeString('es', { hour12: false, hour: '2-digit', minute: '2-digit' });

    const horasEnPais = { CL: '', AR: '', PE: '' };
    for (const key in diferenciasHorarias) {
        const horaActual = new Date();
        horaActual.setHours(hora, minutos, 0, 0);
        const horaEnPais = new Date(horaActual.getTime() + (3600000 * (diferenciasHorarias[key] - diferenciaHoraria)));
        horasEnPais[key] = formatTime(horaEnPais);
    }

    const modalidad = args.slice(2).join(' ');
    m.react('🎮');

    let titulo = '';
    let iconos = [];
    let iconos2 = [];

    switch (command) {
        case 'v4fem':
        case 'vsfem4':
            titulo = '4VS4 FEM';
            iconos = ['🌸', '🌸', '🌸', '🌸'];
            iconos2 = ['🌸', '🌸'];
            break;
        case 'v4masc':
        case 'vsmasc4':
            titulo = '4VS4 MASC';
            iconos = ['🥥', '🥥', '🥥', '🥥'];
            iconos2 = ['🥥', '🥥'];
            break;
        case 'v4mixto':
        case 'vsmixto4':
            titulo = '4VS4 MIXTO';
            iconos = ['🍁', '🍁', '🍁', '🍁'];
            iconos2 = ['🍁', '🍁'];
            break;
        case 'v6fem':
        case 'vsfem6':
            titulo = '6VS6 FEM';
            iconos = ['🦋', '🦋', '🦋', '🦋', '🦋', '🦋'];
            iconos2 = ['🦋', '🦋'];
            break;
        case 'v6masc':
        case 'vsmasc6':
            titulo = '6VS6 MASC';
            iconos = ['🥞', '🥞', '🥞', '🥞', '🥞', '🥞'];
            iconos2 = ['🥞', '🥞'];
            break;
        case 'v6mixto':
        case 'vsmixto6':
            titulo = '6VS6 MIXTO';
            iconos = ['🥯', '🥯', '🥯', '🥯', '🥯', '🥯'];
            iconos2 = ['🥯', '🥯'];
            break;
        default:
            conn.reply(m.chat, '*❌ Comando no válido.*', m);
            return;
    }

    const salaId = `vs_${m.chat}_${Date.now()}`;
    global.vsData = global.vsData || {};
    global.vsData[salaId] = {
        jugadores: [],
        suplentes: [],
        titulo,
        modalidad,
        horasEnPais,
    };

    const mensaje = `ꆬꆬ       ݂    *${titulo}*    🌹֟፝  

  ത *𝖬𝗈𝖽𝖺𝗅𝗂𝖽𝖺𝖽:* ${modalidad}
  ത *𝖧𝗈𝗋𝖺:* ${horasEnPais.PE} 🇵🇪 ${horasEnPais.AR} 🇦🇷

ㅤㅤㅤ࿙࿚ㅤׅㅤ࿙࿚࿙࿚ㅤׅㅤ࿙࿚

 ׄ߳𑁍̵ ֕︵۪۪۪۪᷼ ּ \`𝖩𝗎𝗀𝖺𝖽𝗈𝗋𝖾𝗌::\` ׅ ׄ░ׅ

${iconos.map(icono => `${icono}˚ `).join('\n')}

      ꛁ⵿ֹ𐑼᪲ ۪ \`𝖲𝗎𝗉𝗅𝖾𝗇𝗍𝖾𝗌\` ֹ̼ ׅ ❜𝆬 ᨩ̼

${iconos2.map(icono => `${icono}˚ `).join('\n')}

> © Տһᥲძᨣᥕ Ɓᨣƚ Uᥣ𝗍rᥲ `;

conn.sendMessage(m.chat, { 
    text: mensaje, 
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

handler.help = ['inmixto4', 'inmixto6', 'inmasc4', 'inmasc6', 'infem4', 'infem6'];
handler.tags = ['ff'];
handler.command = /^(v4fem|vsfem4|v4masc|vsmasc4|v4mixto|vsmixto4|v6fem|vsfem6|v6masc|vsmasc6|v6mixto|vsmixto6)$/i;

export default handler;