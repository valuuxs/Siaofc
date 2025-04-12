import fetch from 'node-fetch'

var handler = async (m, { conn, args }) => {
    if (!args[0]) return m.reply(`*🥞 Por favor, ingresa un link de TikTok.*`);
    if (!args[0].match(/(https?:\/\/)?(www\.)?(vm\.|vt\.)?tiktok\.com\//))
        return m.reply(`*⚠️ El link ingresado no es válido.*`);

    try {
        await m.react('⌛'); // Esperando

        const tiktokData = await tiktokdl(args[0]);
        if (!tiktokData) {
            await m.react('❌');
            return m.reply("*❌ Error al obtener datos.*");
        }

        const videoURL = tiktokData.data.play;
        const info = `*📖 Descripción:*\n> ${tiktokData.data.title}`;

        if (videoURL) {
            await conn.sendFile(m.chat, videoURL, "tiktok.mp4", "```◜TikTok - Download◞```\n\n" + info, m);
            await m.react('✅');
        } else {
            await m.react('❌');
            return m.reply("*❌ No se pudo descargar el video.*");
        }
    } catch (e) {
        await m.react('❌');
        return m.reply(`*❌ Ocurrió un error:*\n${e}`);
    }
};

handler.help = ['tiktok']
handler.tags = ['descargas']
handler.command = /^(tt|tiktok)$/i;

export default handler

async function tiktokdl(url) {
    const api = `https://www.tikwm.com/api/?url=${url}?hd=1`
    const res = await fetch(api)
    const json = await res.json()
    return json
}