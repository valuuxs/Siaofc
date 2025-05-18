import { performance } from 'perf_hooks';

const handler = async (m, { conn, text }) => {
  if (!text) return m.reply('Debes proporcionar un nombre o texto para doxxear.');

  const sleep = (ms) => new Promise(res => setTimeout(res, ms));
  const pickRandom = (list) => list[Math.floor(Math.random() * list.length)];
  const randomIP = () => `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
  const randomIPv6 = () => Array(8).fill().map(() => Math.floor(Math.random() * 65536).toString(16)).join(':');
  const randomMAC = () => Array(6).fill().map(() => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join(':');
  const randomSSN = () => `${Math.floor(100 + Math.random() * 900)}-${Math.floor(10 + Math.random() * 90)}-${Math.floor(1000 + Math.random() * 9000)}`;

  const boosts = [
    '*☠ ¡¡𝙸𝙽𝙸𝙲𝙸𝙰𝙽𝙳𝙾 𝙳𝙾𝚇𝚇𝙴𝙾!! ☠*',
    '*25% completado...*',
    '*62% completado...*',
    '*97% completado...*'
  ];

  let sent = await conn.sendMessage(m.chat, { text: boosts[0] }, { quoted: m });
  for (let i = 1; i < boosts.length; i++) {
    await sleep(800);
    await conn.sendMessage(m.chat, { text: boosts[i], edit: sent.key });
  }

  const start = performance.now();
  await sleep(500 + Math.floor(Math.random() * 500));
  const end = performance.now();
  const speed = ((end - start) / 1000).toFixed(4);

  const doxeo = `*[ ✔ ] 𝙿𝙴𝚁𝚂𝙾𝙽𝙰 𝙳𝙾𝚇𝚇𝙴𝙰𝙳𝙰 𝙲𝙾𝙽 𝙴𝚇𝙸𝚃𝙾*
*⏳ 𝙳𝙾𝚇𝚇𝙴𝙰𝙳𝙾 𝙴𝙽: ${speed} segundos*

*𝚁𝙴𝚂𝚄𝙻𝚃𝙰𝙳𝙾𝚂 𝙾𝙱𝚃𝙴𝙽𝙸𝙳𝙾𝚂:*

*Nombre:* ${text}
*IP Pública:* ${randomIP()}
*IP Privada:* 192.168.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}
*IPv6:* ${randomIPv6()}
*MAC:* ${randomMAC()}
*SSN:* ${randomSSN()}
*ISP:* MoviNet Corp
*DNS:* 8.8.8.8
*ALT DNS:* 1.1.1.1
*GATEWAY:* 192.168.0.1
*TCP PUERTOS ABIERTOS:* 80, 443, 22
*UDP PUERTOS ABIERTOS:* 53, 67
*Vendedor del router:* TP-Link Technologies Co., Ltd.
*Dispositivo:* Android 12 - SMA-G998B
*Conexión:* Fibra óptica
*HOSTNAME:* host-${Math.floor(Math.random() * 255)}-${Math.floor(Math.random() * 255)}.net.local

*Nota: Esta información es generada automáticamente con fines de entretenimiento. No representa datos reales ni viola la privacidad de nadie.*`;

  await sleep(1000);
  await conn.sendMessage(m.chat, { text: doxeo, edit: sent.key, mentions: conn.parseMention(doxeo) });
};

handler.help = ['doxear'];
handler.tags = ['fun'];
handler.command = /^doxxeo|doxxear|doxeo|doxear|doxxing|doxing|dox$/i;
handler.group = true;

export default handler;