import fetch from 'node-fetch';

const handler = async (m, {conn, usedPrefix, text}) => {

  try {
    await m.react ('🖼️');
    const videoUrl = 'https://files.catbox.moe/g4yv7k.mp4'
    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];

    const str = `
ᨦ۪۪۪۪ׄ᷼ㅤ֢ㅤׄㅤׅ֟፝ㅤ⋱ㅤ⁝ㅤ⋰ㅤׅ፝֟ㅤׄㅤ֢ㅤ۪۪۪۪ׄ᷼ഒ
𝖧𝗈𝗅⍺ ${taguser}
𝖡𝗂𝖾𝗇𝗏𝖾𝗇𝗂𝖽𑄙 ⍺𝗅 *𝖬𝖾𝗇𝗎́ 𝖫𝗈𝗀𑄈𝗌*

ᦷᩘᦷ   ݂  `ᴄᴏᴍᴀɴᴅᴏs`  ፡ ܻ̯͛ᩘ${xlogos}

ᰅ${xlogos}ᰍ ${usedPrefix}balogo *txt*
ᰅ${xlogosᰍ ${usedPrefix}logocorazon *txt*
ᰅ${xlogos}ᰍ ${usedPrefix}logochristmas  *texto*
ᰅ${xlogos}ᰍ ${usedPrefix}logopareja *texto*
ᰅ${xlogos}ᰍ ${usedPrefix}logoglitch *texto*
ᰅ${xlogos}ᰍ ${usedPrefix}logosad *texto*
ᰅ${xlogos}ᰍ ${usedPrefix}logogaming *texto*
ᰅ${xlogos}ᰍ ${usedPrefix}logosolitario *texto*
ᰅ${xlogos}ᰍ ${usedPrefix}logodragonball *texto*
ᰅ${xlogos}ᰍ ${usedPrefix}logoneon *texto*
ᰅ${xlogos}ᰍ ${usedPrefix}logogatito *texto*
ᰅ${xlogos}ᰍ ${usedPrefix}logochicagamer *texto*
ᰅ${xlogos}ᰍ ${usedPrefix}logonaruto *texto*
ᰅ${xlogos}ᰍ ${usedPrefix}logofuturista *texto*
ᰅ${xlogos}ᰍ ${usedPrefix}logonube *texto*
ᰅ${xlogos}ᰍ ${usedPrefix}logoangel *texto*
ᰅ${xlogos}ᰍ ${usedPrefix}logomurcielago *texto*
ᰅ${xlogos}ᰍ ${usedPrefix}logocielo *texto*
ᰅ${xlogos}ᰍ ${usedPrefix}logograffiti3d *texto*
ᰅ${xlogos}ᰍ ${usedPrefix}logomatrix *texto*
ᰅ${xlogos}ᰍ ${usedPrefix}logohorror *texto*
ᰅ${xlogos}ᰍ ${usedPrefix}logoalas *texto*
ᰅ${xlogos}ᰍ ${usedPrefix}logoarmy *texto*
ᰅ${xlogos}ᰍ ${usedPrefix}logopubg *texto*
ᰅ${xlogos}ᰍ ${usedPrefix}logopubgfem *texto*
ᰅ${xlogos}ᰍ ${usedPrefix}logolol *texto*
ᰅ${xlogos}ᰍ ${usedPrefix}logoamon *texto*gus
ᰅ${xlogos}ᰍ ${usedPrefix}logovideopubg *texto*
ᰅ${xlogos}ᰍ ${usedPrefix}logovideotiger *texto*
ᰅ${xlogos}ᰍ ${usedPrefix}logovideointro *texto*
ᰅ${xlogos}ᰍ ${usedPrefix}logovideogaming *texto*
ᰅ${xlogos}ᰍ ${usedPrefix}logoguerrero *texto*
ᰅ${xlogos}ᰍ ${usedPrefix}logoportadaplayer *texto*
ᰅ${xlogos}ᰍ ${usedPrefix}logoportadaff *texto*
ᰅ${xlogos}ᰍ ${usedPrefix}logoportadapubg *texto*
ᰅ${xlogos}ᰍ ${usedPrefix}logoportadacounter *texto*
> ${club}
`.trim();

      await conn.sendMessage(m.chat, {
            video: { url: videoUrl },
            caption: str,
            mentions: [m.sender],
            gifPlayback: true
        }, { quoted: fkontak })

  } catch (e) {
    conn.reply(m.chat,`*❌ Error al enviar el menú.*\n${e}`, m);
  }
};

handler.command = /^(menulogos|menu2)$/i;
handler.fail = null;

export default handler;

function clockString(ms) {
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(':');
}