let handler = async (m, { conn, text, args, usedPrefix, command }) => {

    if (!args[0]) {
        conn.reply(m.chat, `⚠️️ *_Ingrese un texto para iniciar la encuesta._*\n\n📌 Ejemplo : \n*${usedPrefix + command}* texto|texto2...`, m);
        return;
    }

    if (!text.includes('|')) {
        conn.reply(m.chat, `⚠️️ Separe las opciones de la encuesta con *|* \n\n📌 Ejemplo : \n*${usedPrefix + command}* texto|texto2...`, m);
        return;
    }

    let opciones = text.split('|').map(opcion => [opcion]); 

    return conn.sendPoll(m.chat, `📊 Encuesta:`, opciones, m);
};

handler.help = ['encuesta *<texto|texto2>*'];
handler.tags = ['gc'];
handler.command = ['poll', 'encuesta'];
handler.group = true;

export default handler;