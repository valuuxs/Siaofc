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
import qrcode from "qrcode";
import crypto from 'crypto';
import fs from "fs";
import pino from 'pino';
import * as ws from 'ws';
const { CONNECTING } = ws;
import { Boom } from '@hapi/boom';
import { makeWASocket } from '../lib/simple.js';

if (!(global.conns instanceof Array)) global.conns = [];

let handler = async (m, { conn: _conn, args, usedPrefix, command }) => {
  const bot = global.db.data.settings[_conn.user.jid] || {};
  if (!bot.jadibotmd) return m.reply('💛 Este Comando Se Encuentra Desactivado Por Mi Creador');

  const parent = args[0] && args[0] === 'plz' ? _conn : await global.conn;
  const phoneNumber = m.sender.split('@')[0];
  const authFolder = `./CrowJadiBot/${phoneNumber}`;

  if (!fs.existsSync(authFolder)) fs.mkdirSync(authFolder, { recursive: true });

  // Si recibió un código en base64, lo guarda como creds.json
  if (args[0] && args[0] !== 'plz') {
    const decoded = Buffer.from(args[0], "base64").toString("utf-8");
    fs.writeFileSync(`${authFolder}/creds.json`, JSON.stringify(JSON.parse(decoded), null, '\t'));
  }

  const { state, saveCreds } = await useMultiFileAuthState(authFolder);
  const { version } = await fetchLatestBaileysVersion();
  const msgRetryCounterCache = new NodeCache();

  const conn = makeWASocket({
    logger: pino({ level: 'silent' }),
    printQRInTerminal: false,
    browser: ["Ubuntu", "Chrome", "20.0.04"],
    mobile: false,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" }))
    },
    msgRetryCounterCache,
    getMessage: async () => null,
    version,
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: true,
  });

  let isInit = true;

  async function connectionUpdate(update) {
    const { connection, lastDisconnect, isNewLogin } = update;
    const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;

    if (isNewLogin) conn.isInit = true;

    if (code && code !== DisconnectReason.loggedOut && conn?.ws?.socket == null) {
      let i = global.conns.indexOf(conn);
      if (i >= 0) {
        delete global.conns[i];
        global.conns.splice(i, 1);
        if (fs.existsSync(authFolder)) fs.rmdirSync(authFolder, { recursive: true });
      }
      if (code !== DisconnectReason.connectionClosed) {
        parent.sendMessage(m.chat, { text: "Conexión perdida..." }, { quoted: m });
      }
    }

    if (global.db.data == null) loadDatabase?.();

    if (connection === 'open') {
      conn.isInit = true;
      global.conns.push(conn);
      await parent.reply(m.chat, args[0] && args[0] !== 'plz' ? '✅ Sub Bot Conectado con éxito' : `✨ ¡Conexión exitosa a WhatsApp! Puedes volver a conectarte luego con *#code* sin volver a escanear el código.`, m);

      await sleep(3000);

      if (!args[0] || args[0] === 'plz') {
        await parent.reply(conn.user.jid, `💠 Guarda este mensaje para futuras conexiones:\n`, m);
        const creds = fs.readFileSync(`${authFolder}/creds.json`);
        const base64Creds = Buffer.from(creds).toString("base64");
        await parent.sendMessage(conn.user.jid, { text: `${usedPrefix}${command} ${base64Creds}` }, { quoted: m });
      }
    }
  }

  conn.ev.on('connection.update', connectionUpdate);
  conn.ev.on('creds.update', saveCreds);

  // Generar código de emparejamiento si no está registrado
  if (!conn.authState.creds.registered) {
    setTimeout(async () => {
      try {
        const codeBot = await conn.requestPairingCode(phoneNumber);
        const formattedCode = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot;

        let txt = `┌  🜲  *Usa este Código para convertirte en un Sub Bot*\n`;
        txt += `│  ❀  Pasos:\n`;
        txt += `│  ❀  *1*: Toca los tres puntos de WhatsApp\n`;
        txt += `│  ❀  *2*: Dispositivos vinculados\n`;
        txt += `│  ❀  *3*: *Vincular con número de teléfono*\n`; 
        txt += `└  ❀  *4*: Ingresa el código mostrado\n\n`;
        txt += `*❖ Nota:* Este código solo sirve en el número que lo solicitó.`;

        await parent.reply(m.chat, txt, m);
        await parent.reply(m.chat, `📲 Código: *${formattedCode}*`, m);
      } catch (e) {
        console.error("Error al generar código:", e);
        await parent.reply(m.chat, "❌ Error al generar el código de emparejamiento.", m);
      }
    }, 3000);
  }

  // Reinicio automático de sesión si se cae
  setInterval(() => {
    if (!conn.user) {
      try { conn.ws.close(); } catch {}
      conn.ev.removeAllListeners();
      const i = global.conns.indexOf(conn);
      if (i >= 0) global.conns.splice(i, 1);
    }
  }, 60_000);

  // Cargar y vincular handler
  let handlerModule = await import('../handler.js');
  let creloadHandler = async (restart = false) => {
    try {
      const NewHandler = await import(`../handler.js?update=${Date.now()}`);
      if (NewHandler?.handler) handlerModule = NewHandler;
    } catch (e) {
      console.error("❌ Error cargando handler:", e);
    }

    if (restart) {
      try { conn.ws.close(); } catch {}
      conn.ev.removeAllListeners();
      conn = makeWASocket(connectionOptions);
      isInit = true;
    }

    if (!isInit) {
      conn.ev.off('messages.upsert', conn.handler);
      conn.ev.off('connection.update', conn.connectionUpdate);
      conn.ev.off('creds.update', conn.credsUpdate);
    }

    conn.handler = handlerModule.handler.bind(conn);
    conn.connectionUpdate = connectionUpdate.bind(conn);
    conn.credsUpdate = saveCreds.bind(conn, true);

    conn.ev.on('messages.upsert', conn.handler);
    conn.ev.on('connection.update', conn.connectionUpdate);
    conn.ev.on('creds.update', conn.credsUpdate);

    isInit = false;
    return true;
  };

  await creloadHandler(false);
};

handler.help = ['code'];
handler.tags = ['serbot'];
handler.command = ['code', 'codep', 'sercode', 'serbot', 'jadibot', 'qrp'];
handler.rowner = false;

export default handler;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}