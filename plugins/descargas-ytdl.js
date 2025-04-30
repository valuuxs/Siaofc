import axios from 'axios';

const handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    if (!args[0]) {
        return conn.reply(m.chat,
            `✧ YT Downloader ✧\n` +
            `Ejemplo: ${usedPrefix + command} *link*`,
            m);
    }
    try {
        const api = `https://ytdlpyton.nvlgroup.my.id/download/?url=${encodeURIComponent(args[0])}&mode=url`;

        await conn.reply(m.chat, '✧ Espere...', m);

        const res = await axios.get(api, {
            headers: {
                'accept': 'application/json'
            }
        });

        if (!res.data.download_url) throw m.reply('Error link');
        await conn.sendMessage(m.chat, {
            video: {
                url: res.data.download_url
            },
            caption: `Listo: ${res.data.title}`
        }, {
            quoted: m
        });

    } catch (er) {
        conn.reply(m.chat, `${er.message || 'Error en la api'}`, m);
    }
};
handler.help = ['yt link'];
handler.tags = ['downloader'];
handler.command = /^(yt|ytdl)$/i;
handler.limit = true;
export default handler;