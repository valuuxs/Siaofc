const {
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  MessageRetryMap,
  makeCacheableSignalKeyStore,
  jidNormalizedUser
} = await import('@whiskeysockets/baileys')
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

let handler = async (m, { conn: _conn, args, usedPrefix, command, isOwner }) => {
  const bot = global.db.data.settings[conn.user.jid] || {};

  if (!bot.jadibotmd) return m.reply('💛 Este Comando Se Encuentra Desactivado Por Mi Creador');

  const isMain = (args[0] && args[0] === 'plz') || ((await global.conn).user.jid === _conn.user.jid);
  if (!isMain) return m.reply(`Este comando solo puede ser usado en el bot principal: wa.me/${global.conn.user.jid.split`@`[0]}?text=${usedPrefix}code`);

  async function serbot() {
    const senderJID = m.sender;
    const authFolderB = (senderJID.match(/^\d+/) || [])[0];

    if (!authFolderB) return m.reply('❌ No se pudo extraer tu número correctamente');

    const BASE_SESSIONS_FOLDER = './JadiBots';
    const userFolderPath = `${BASE_SESSIONS_FOLDER}/${authFolderB}`;

    if (!fs.existsSync(userFolderPath)) fs.mkdirSync(userFolderPath, { recursive: true });

    if (args[0]) {
      try {
        const decoded = Buffer.from(args[0], "base64").toString("utf-8");
        fs.writeFileSync(`${userFolderPath}/creds.json`, JSON.stringify(JSON.parse(decoded), null, '\t'));
      } catch (e) {
        return m.reply('❌ El código proporcionado es inválido o está corrupto.');
      }
    }

    const { state, saveState, saveCreds } = await useMultiFileAuthState(userFolderPath);
    const msgRetryCounterCache = new NodeCache();
    const { version } = await fetchLatestBaileysVersion();

    const methodCode = !!authFolderB || process.argv.includes("code");
    const MethodMobile = process.argv.includes("mobile");

    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const question = (texto) => new Promise((res) => rl.question(texto, res));

    const connectionOptions = {
      logger: pino({ level: 'silent' }),
      printQRInTerminal: false,
      mobile: MethodMobile,
      browser: ["Ubuntu", "Chrome", "20.0.04"],
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }))
      },
      markOnlineOnConnect: true,
      generateHighQualityLinkPreview: true,
      getMessage: async (key) => {
        let jid = jidNormalizedUser(key.remoteJid);
        let msg = await store.loadMessage(jid, key.id);
        return msg?.message || "";
      },
      msgRetryCounterCache,
      msgRetryCounterMap: MessageRetryMap,
      version
    };

    let conn = makeWASocket(connectionOptions);
    conn.isInit = false;
    let isInit = true;

    if (methodCode && !conn.authState.creds.registered) {
      setTimeout(async () => {
        const codeBot = await conn.requestPairingCode(authFolderB);
        const formattedCode = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot;

        const txt = `┌  *Usa este Código para convertirte en un Sub Bot*\n` +
          `│  ❀  *1* : Haz click en los 3 puntos\n` +
          `│  ❀  *2* : Toca "Dispositivos vinculados"\n` +
          `│  ❀  *3* : Selecciona *Vincular con número de teléfono*\n` +
          `└  ❀  *4* : Escribe el código mostrado\n\n` +
          `*❖ Nota:* Este código solo funciona en el número que lo solicitó.`;

        await parent.reply(m.chat, txt, m);
        await parent.reply(m.chat, formattedCode, m);
        rl.close();
      }, 3000);
    }

    async function connectionUpdate(update) {
      const { connection, lastDisconnect, isNewLogin } = update;
      const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;

      if (isNewLogin) conn.isInit = true;

      if (code && code !== DisconnectReason.loggedOut && conn?.ws?.socket == null) {
        let i = global.conns.indexOf(conn);
        if (i >= 0) {
          delete global.conns[i];
          global.conns.splice(i, 1);
        }
        if (fs.existsSync(userFolderPath)) fs.rmSync(userFolderPath, { recursive: true, force: true });
        if (code !== DisconnectReason.connectionClosed) {
          parent.sendMessage(m.chat, { text: "❌ Conexión perdida.." }, { quoted: m });
        }
      }

      if (!global.db.data) loadDatabase();

      if (connection === 'open') {
        conn.isInit = true;
        global.conns.push(conn);
        const mensaje = args[0]
          ? '✅ Conectado con éxito.'
          : `❀ ᥴ᥆ᥒᥱᥴ𝗍ᥲძ᥆ ᥱ᥊і𝗍᥆sᥲmᥱᥒ𝗍ᥱ ᥲ ᥕһᥲ𝗍sᥲ⍴⍴.\n\n> ${dev}`;
        await parent.reply(m.chat, mensaje, m);
        await sleep(5000);

        if (!args[0]) {
          const credsRaw = fs.readFileSync(`${userFolderPath}/creds.json`, "utf-8");
          const credsBase64 = Buffer.from(credsRaw).toString("base64");
          await parent.reply(conn.user.jid, `La próxima vez puedes usar este mensaje para reconectar sin QR:`, m);
          await parent.sendMessage(conn.user.jid, { text: usedPrefix + command + " " + credsBase64 }, { quoted: m });
        }
      }
    }

    setInterval(async () => {
      if (!conn.user) {
        try { conn.ws.close(); } catch { }
        conn.ev.removeAllListeners();
        let i = global.conns.indexOf(conn);
        if (i >= 0) {
          delete global.conns[i];
          global.conns.splice(i, 1);
        }
      }
    }, 60000);

    let handlerModule = await import('../handler.js');
    const reloadHandler = async function (restart) {
      try {
        const updated = await import(`../handler.js?update=${Date.now()}`).catch(console.error);
        if (Object.keys(updated || {}).length) handlerModule = updated;
      } catch (e) {
        console.error(e);
      }

      if (restart) {
        try { conn.ws.close(); } catch { }
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

    reloadHandler(false);
  }

  serbot();
};

handler.help = ['code'];
handler.tags = ['serbot'];
handler.command = ['code', 'Code'];
handler.rowner = false;

export default handler;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}