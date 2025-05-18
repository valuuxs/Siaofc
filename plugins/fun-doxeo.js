/*import { performance } from 'perf_hooks';

const handler = async (m, { conn, text }) => {
  if (!text) return m.reply('Debes proporcionar un nombre o texto para doxxear.');
  
  const sleep = (ms) => new Promise(res => setTimeout(res, ms));
  const pickRandom = (list) => list[Math.floor(Math.random() * list.length)];
  
  const boosts = [
    '*☠ ¡¡𝙸𝙽𝙸𝙲𝙸𝙰𝙽𝙳𝙾 𝙳𝙾𝚇𝚇𝙴𝙾!! ☠*',
    `*${pickRandom([...Array(21).keys()])}%*`,
    `*${pickRandom([...Array(20).keys()].map(n => n + 41))}%*`,
    `*${pickRandom([...Array(20).keys()].map(n => n + 81))}%*`
  ];

  let sent = await conn.sendMessage(m.chat, { text: boosts[0] }, { quoted: m });
  for (let i = 1; i < boosts.length; i++) {
    await sleep(700);
    await conn.sendMessage(m.chat, { text: boosts[i], edit: sent.key });
  }

  const old = performance.now();
  const neww = performance.now();
  const speed = (neww - old).toFixed(4);

  const doxeo = `*[ ✔ ] 𝙿𝙴𝚁𝚂𝙾𝙽𝙰 𝙳𝙾𝚇𝚇𝙴𝙰𝙳𝙰 𝙲𝙾𝙽 𝙴𝚇𝙸𝚃𝙾*
*⏳ 𝙳𝙾𝚇𝚇𝙴𝙰𝙳𝙾 𝙴𝙽: ${speed} 𝚜𝚎𝚐𝚞𝚗𝚍𝚘𝚜!*

*𝚁𝙴𝚂𝚄𝙻𝚃𝙰𝙳𝙾𝚂 𝙾𝙱𝚃𝙴𝙽𝙸𝙳𝙾𝚂:*

*Nombre:* ${text}
*Ip:* 92.28.211.234
*N:* 43 7462
*W:* 12.4893
*SS NUMBER:* 6979191519182016
*IPV6:* fe80::5dcd::ef69::fb22::d9888%12
*UPNP:* Enabled
*DMZ:* 10.112.42.15
*MAC:* 5A:78:3E:7E:00
*ISP:* Ucom unversal
*DNS:* 8.8.8.8
*ALT DNS:* 1.1.1.8.1
*DNS SUFFIX:* Dlink
*WAN:* 100.23.10.15
*WAN TYPE:* private nat
*GATEWAY:* 192.168.0.1
*SUBNET MASK:* 255.255.0.255
*UDP OPEN PORTS:* 8080.80
*TCP OPEN PORTS:* 443
*ROUTER VENDEDOR:* ERICCSON
*DEVICE VENDEDOR:* WIN32-X
*CONNECTION TYPE:* TPLINK COMPANY
*ICMPHOPS:* 192.168.0.1 192.168.1.1 100.73.43.4
host-132.12.32.167.ucom.com
host-132.12.111.ucom.com
36.134.67.189 216.239.78.11
Sof02s32inf14.1e100.net
*HTTP:* 192.168.3.1:433-->92.28.211.234:80
*Http:* 192.168.625-->92.28.211.455:80
*Http:* 192.168.817-->92.28.211.8:971
*Upd:* 192.168452-->92.28.211:7265288
*Tcp:* 192.168.682-->92.28.211:62227.7
*Tcp:* 192.168.725-->92.28.211:67wu2
*Tcp:* 192.168.629-->92.28.211.167:8615
*EXTERNAL MAC:* 6U:77:89:ER:O4
*MODEM JUMPS:* 64`;

  await sleep(1000);
  await conn.sendMessage(m.chat, { text: doxeo, edit: sent.key, mentions: conn.parseMention(doxeo) });
};

handler.help = ['doxear'];
handler.tags = ['fun'];
handler.command = /^doxxeo|doxxear|doxeo|doxear|doxxing|doxing$/i;
handler.group = true;
handler.register = true;

export default handler;*/

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
handler.command = /^doxxeo|doxxear|doxeo|doxear|doxxing|doxing$/i;
handler.group = true;
handler.register = true;

export default handler;