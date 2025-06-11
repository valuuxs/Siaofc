/*
const {
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  jidNormalizedUser
} = await import('@whiskeysockets/baileys');
import moment from 'moment-timezone';
import NodeCache from 'node-cache';
import readline from 'readline';
import crypto from 'crypto';
import fs from 'fs';
import pino from 'pino';
import * as ws from 'ws';
import qrcode from 'qrcode';
import { Boom } from '@hapi/boom';
import { makeWASocket } from '../lib/simple.js';

if (!(global.conns instanceof Array)) global.conns = [];

const handler = async (m, { conn: _conn, args, usedPrefix, command }) => {
  const bot = global.db.data.settings[_conn.user.jid] || {};
  if (!bot.jadibotmd) return m.reply('*☕ Esta función se encuentra desactivada.*');

  const isMain = (args[0] === 'plz');
  const parent = isMain ? _conn : await global.conn;
  if (!isMain && (await global.conn).user.jid !== _conn.user.jid) {
    return m.reply(`*☁️ Esta función solo puede ser usada desde el bot principal o desde el grupo oficial. 👇🏻\nhttps://chat.whatsapp.com/Caj518FwPjHLVmGn48GvhW*`);
  }

  if (global.conns.length >= 15) {
    return m.reply('*⚠️ Límite máximo de 15 Sub Bots alcanzado.*');
  }

  const phoneNumber = m.sender.split('@')[0];
  const userFolderPath = `./JadiBots/${phoneNumber}`;
  if (!fs.existsSync(userFolderPath)) {
    fs.mkdirSync(userFolderPath, { recursive: true });
  }

  if (args[0]) {
    try {
      const data = Buffer.from(args[0], "base64").toString("utf-8");
      fs.writeFileSync(`${userFolderPath}/creds.json`, JSON.stringify(JSON.parse(data), null, '\t'));
    } catch (e) {
      return m.reply('*❌ Código inválido.*');
    }
  }

  const { state, saveCreds } = await useMultiFileAuthState(userFolderPath);
  const msgRetryCounterCache = new NodeCache();
  const { version } = await fetchLatestBaileysVersion();

  const connectionOptions = {
    logger: pino({ level: 'silent' }),
    printQRInTerminal: false,
    browser: ["Ubuntu", "Chrome", "20.0.04"],
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }))
    },
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: true,
    getMessage: async (key) => {
      const jid = jidNormalizedUser(key.remoteJid);
      const msg = await store.loadMessage(jid, key.id);
      return msg?.message || "";
    },
    msgRetryCounterCache,
    version
  };

  let conn = makeWASocket(connectionOptions);
  conn.isInit = false;

  async function connectionUpdate(update) {
    const { connection, lastDisconnect, isNewLogin } = update;

    if (isNewLogin) conn.isInit = true;
    const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;

    if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
      const i = global.conns.indexOf(conn);
      if (i >= 0) {
        delete global.conns[i];
        global.conns.splice(i, 1);
      }
      fs.rmdirSync(userFolderPath, { recursive: true });
      if (code !== DisconnectReason.connectionClosed) {
        parent.sendMessage(m.chat, { text: "*🪶 Conexión perdida..*" }, { quoted: m });
      }
    }

    if (connection === 'open') {
      conn.isInit = true;
      global.conns.push(conn);
      await parent.reply(m.chat, args[0] ? 'Conectado con éxito' : `❀ ᥴ᥆ᥒᥱᥴ𝗍ᥲძ᥆ ᥱ᥊і𝗍᥆sᥲmᥱᥒ𝗍ᥱ a WhatsApp\n> ${dev}`, m);
      if (!args[0]) {
        await parent.reply(conn.user.jid, `La siguiente vez que se conecte, use este mensaje para iniciar sin otro código:`, m);
        const base64Creds = Buffer.from(fs.readFileSync(`${userFolderPath}/creds.json`), "utf-8").toString("base64");
        await parent.sendMessage(conn.user.jid, { text: `${usedPrefix + command} ${base64Creds}` }, { quoted: m });
      }
    }
  }

conn.connectionUpdate = connectionUpdate;
conn.credsUpdate = saveCreds;
conn.ev.on('connection.update', conn.connectionUpdate);
conn.ev.on('creds.update', conn.credsUpdate);

const cleanupInterval = setInterval(() => {
  if (!conn.user || conn.connection === 'closed') {
    try { conn.ws?.close(); } catch {}
    conn.ev.removeAllListeners();
    const i = global.conns.indexOf(conn);
    if (i >= 0) global.conns.splice(i, 1);
    clearInterval(cleanupInterval); // Detiene el ciclo de limpieza
  }
}, 30000); // cada 30 segundos

if (!args[0] && !conn.authState.creds.registered) {
  if (!phoneNumber) process.exit(0);

  const cleanedNumber = phoneNumber.replace(/[^0-9]/g, '');

  try {
    const codeBot = await conn.requestPairingCode(cleanedNumber);
    const codeFormatted = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot;

    const txt = `
  ⋄  ㅤ̠ *𝖲𝗁𝖺𝖽𝗈𝗐 𝖴𝗅𝗍𝗋𝖺 - 𝖬𝖣* ㅤׄ͜✧ׅ͡ -
         ︶ּ⏝ׅ︶ ౨ৎ ︶ׁׅ⏝ּ︶ 
  𔓕  ☁️ㅤ𝖲𝗎𝖻ㅤ˚ㅤ𝖡𝗈𝗍ㅤׅㅤ୨ৎ

ㅤ۟   🍝 ִ  \`𝖢𝗈𝗇𝖾𝗑𝗂𝗈́𝗇 - 𝖢𝗈𝖽𝖾\`  ওㅤ۫   

𑂯   ׁ  𝖢𝗈𝗉𝗂𝖺 𝖾𝗅 𝖼𝗈́𝖽𝗂𝗀𝗈 𝖽𝖾
        𝗏𝗂𝗇𝖼𝗎𝗅𝖺𝖼𝗂𝗈́𝗇.
𑂯   ׁ  𝖧𝖺𝗀𝖺 𝖼𝗅𝗂𝖼𝗄 𝖾𝗇 𝗅𝗈𝗌 𝟥 
       𝗉𝗎𝗇𝗍𝗈𝗌 𝖽𝖾 𝗅𝖺 𝖾𝗌𝗊𝗎𝗂𝗇𝖺
       𝗌𝗎𝗉𝖾𝗋𝗂𝗈𝗋.
𑂯   ׁ  𝖳𝗈𝗊𝗎𝖾 𝖽𝗂𝗌𝗉𝗈𝗌𝗂𝗍𝗂𝗏𝗈𝗌
        𝗏𝗂𝗇𝖼𝗎𝗅𝖺𝖽𝗈𝗌.
𑂯   ׁ  𝖲𝖾𝗅𝖾𝖼𝖼𝗂𝗈𝗇𝖺 *𝗏𝗂𝗇𝖼𝗎𝗅𝖺𝗋*
        *𝖼𝗈𝗇 𝗇𝗎́𝗆𝖾𝗋𝗈 𝖽𝖾 𝗍𝖾𝗅𝖾́𝖿𝗈𝗇𝗈*
𑂯   ׁ  𝖯𝖾𝗀𝖺 𝖾𝗅 𝖼𝗈́𝖽𝗂𝗀𝗈 𝗒 𝗅𝗂𝗌𝗍𝗈.

> ${club}`;

    await parent.reply(m.chat, txt, m);
    await parent.reply(m.chat, codeFormatted, m);
  } catch (e) {
    console.error(e);
    await parent.reply(m.chat, '❌ Ocurrió un error al generar el código.', m);
  }
}

  let handlerModule = await import('../handler.js');
  conn.handler = handlerModule.handler.bind(conn);
  conn.ev.on('messages.upsert', conn.handler);
};

handler.help = ['code'];
handler.tags = ['serbot'];
handler.command = /^code|serbot$/i;
handler.rowner = false;

export default handler;*/

const {
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  jidNormalizedUser
} = await import('@whiskeysockets/baileys');
import moment from 'moment-timezone';
import NodeCache from 'node-cache';
import readline from 'readline';
import crypto from 'crypto';
import fs from 'fs';
import pino from 'pino';
import * as ws from 'ws';
import qrcode from 'qrcode';
import { Boom } from '@hapi/boom';
import { makeWASocket } from '../lib/simple.js';

if (!(global.conns instanceof Array)) global.conns = [];

const handler = async (m, { conn: _conn, args, usedPrefix, command }) => {
  const bot = global.db.data.settings[_conn.user.jid] || {};
  if (!bot.jadibotmd) return m.reply('*☕ Esta función se encuentra desactivada.*');

  const isMain = (args[0] === 'plz');
  const parent = isMain ? _conn : await global.conn;
  if (!isMain && (await global.conn).user.jid !== _conn.user.jid) {
    return m.reply(`*☁️ Esta función solo puede ser usada desde el bot principal o desde el grupo oficial. 👇🏻\nhttps://chat.whatsapp.com/Caj518FwPjHLVmGn48GvhW*`);
  }

  if (global.conns.length >= 15) {
    return m.reply('*⚠️ Límite máximo de 15 Sub Bots alcanzado.*\nElimina uno con *#delsesion* antes de crear otro.');
  }

  const phoneNumber = m.sender.split('@')[0];
  const userFolderPath = `./JadiBots/${phoneNumber}`;
  if (!fs.existsSync(userFolderPath)) {
    fs.mkdirSync(userFolderPath, { recursive: true });
  }

  if (args[0]) {
    try {
      const data = Buffer.from(args[0], "base64").toString("utf-8");
      fs.writeFileSync(`${userFolderPath}/creds.json`, JSON.stringify(JSON.parse(data), null, '\t'));
    } catch (e) {
      return m.reply('*❌ Código inválido.*');
    }
  }

  const { state, saveCreds } = await useMultiFileAuthState(userFolderPath);
  const msgRetryCounterCache = new NodeCache();
  const { version } = await fetchLatestBaileysVersion();

  const connectionOptions = {
    logger: pino({ level: 'silent' }),
    printQRInTerminal: false,
    browser: ["Ubuntu", "Chrome", "20.0.04"],
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }))
    },
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: true,
    getMessage: async (key) => {
      const jid = jidNormalizedUser(key.remoteJid);
      const msg = await store.loadMessage(jid, key.id);
      return msg?.message || "";
    },
    msgRetryCounterCache,
    version
  };

  let conn = makeWASocket(connectionOptions);
  conn.isInit = false;

  async function connectionUpdate(update) {
    const { connection, lastDisconnect, isNewLogin } = update;

    if (isNewLogin) conn.isInit = true;
    const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;

    if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
      const i = global.conns.indexOf(conn);
      if (i >= 0) {
        delete global.conns[i];
        global.conns.splice(i, 1);
      }
      fs.rmdirSync(userFolderPath, { recursive: true });
      if (code !== DisconnectReason.connectionClosed) {
        parent.sendMessage(m.chat, { text: "*Conexión perdida..*" }, { quoted: m });
      }
    }

    if (connection === 'open') {
      conn.isInit = true;
      global.conns.push(conn);
      await parent.reply(m.chat, args[0] ? 'Conectado con éxito' : `❀ ᥴ᥆ᥒᥱᥴ𝗍ᥲძ᥆ ᥱ᥊і𝗍᥆sᥲmᥱᥒ𝗍ᥱ a WhatsApp\n> ${dev}`, m);
      if (!args[0]) {
        await parent.reply(conn.user.jid, `La siguiente vez que se conecte, use este mensaje para iniciar sin otro código:`, m);
        const base64Creds = Buffer.from(fs.readFileSync(`${userFolderPath}/creds.json`), "utf-8").toString("base64");
        await parent.sendMessage(conn.user.jid, { text: `${usedPrefix + command} ${base64Creds}` }, { quoted: m });
      }
    }
  }

  conn.connectionUpdate = connectionUpdate;
  conn.credsUpdate = saveCreds;
  conn.ev.on('connection.update', conn.connectionUpdate);
  conn.ev.on('creds.update', conn.credsUpdate);

  setInterval(() => {
    if (!conn.user) {
      try { conn.ws.close(); } catch { }
      conn.ev.removeAllListeners();
      const i = global.conns.indexOf(conn);
      if (i >= 0) {
        delete global.conns[i];
        global.conns.splice(i, 1);
      }
    }
  }, 60000);

  // Si no está registrado aún, mostrar código de emparejamiento
  if (!conn.authState.creds.registered && phoneNumber) {
    setTimeout(async () => {
      const codeBot = await conn.requestPairingCode(phoneNumber.replace(/[^0-9]/g, ''));
      const codeFormatted = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot;

      let txt = `┌  🜲  *Usa este Código para convertirte en un Sub Bot*\n`
      txt += `│  ❀  Pasos\n`
      txt += `│  ❀  *1* : Haga click en los 3 puntos\n`
      txt += `│  ❀  *2* : Toque dispositivos vinculados\n`
      txt += `│  ❀  *3* : Selecciona *Vincular con el número de teléfono*\n` 
      txt += `└  ❀  *4* : Escriba el Código\n\n`
      txt += `*❖ Nota:* Este Código solo funciona en el número en el que se solicitó.*`;

      await parent.reply(m.chat, txt, m);
      await parent.reply(m.chat, codeFormatted, m);
    }, 3000);
  }

  // Cargar handler del bot
  let handlerModule = await import('../handler.js');
  conn.handler = handlerModule.handler.bind(conn);
  conn.ev.on('messages.upsert', conn.handler);
};

handler.help = ['code'];
handler.tags = ['serbot'];
handler.command = ['code', 'Code'];
handler.rowner = false;

export default handler;