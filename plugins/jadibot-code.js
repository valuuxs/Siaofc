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
  const dev = 'Shadow Bot';
  const bot = global.db.data.settings[_conn.user.jid] || {};
  if (!bot.jadibotmd) return m.reply('*☕ Esta función se encuentra desactivada.*');

  const isMain = args[0] === 'plz';
  const parent = isMain ? _conn : (global.conn ?? _conn);

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

  const existingConnIndex = global.conns.findIndex(c => c.user?.id?.startsWith(phoneNumber));
  if (existingConnIndex !== -1) {
    const existingConn = global.conns[existingConnIndex];
    try {
      existingConn.ws?.close();
      existingConn.ev.removeAllListeners();
    } catch (e) {
      console.error('Error cerrando conexión previa:', e);
    }
    global.conns.splice(existingConnIndex, 1);
  }

  if (args[0]) {
    try {
      const data = Buffer.from(args[0], 'base64').toString('utf-8');
      const parsed = JSON.parse(data);
      fs.writeFileSync(`${userFolderPath}/creds.json`, JSON.stringify(parsed, null, '\t'));
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
    browser: ['Ubuntu', 'Chrome', '20.0.04'],
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'fatal' }))
    },
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: true,
    getMessage: async (key) => {
      const jid = jidNormalizedUser(key.remoteJid);
      const msg = await store.loadMessage(jid, key.id);
      return msg?.message || '';
    },
    msgRetryCounterCache,
    version
  };

  const newConn = makeWASocket(connectionOptions);
  newConn.isInit = false;

  async function connectionUpdate(update) {
    const { connection, lastDisconnect, isNewLogin } = update;

    if (isNewLogin) newConn.isInit = true;
    const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;

    if (code && code !== DisconnectReason.loggedOut && !newConn?.ws?.socket) {
      const i = global.conns.indexOf(newConn);
      if (i >= 0) {
        global.conns.splice(i, 1);
      }
      try {
        fs.rmdirSync(userFolderPath, { recursive: true });
      } catch (e) {
        console.error('Error al eliminar carpeta:', e);
      }
      if (code !== DisconnectReason.connectionClosed) {
        parent.sendMessage(m.chat, { text: '*🪶 Conexión perdida..*' }, { quoted: m });
      }
    }

    if (connection === 'open') {
      newConn.isInit = true;
      global.conns.push(newConn);
      await parent.reply(m.chat, args[0] ? 'Conectado con éxito' : `❀ ᥴ᥆ᥒᥱᥴ𝗍ᥲძ᥆ ᥱ᥊і𝗍᥆sᥲmᥱᥒ𝗍ᥱ a WhatsApp\n> ${dev}`, m);
      if (!args[0]) {
        await parent.reply(newConn.user.jid, `La siguiente vez que se conecte, use este mensaje para iniciar sin otro código:`, m);
        const base64Creds = Buffer.from(fs.readFileSync(`${userFolderPath}/creds.json`), 'utf-8').toString('base64');
        await parent.sendMessage(newConn.user.jid, { text: `${usedPrefix + command} ${base64Creds}` }, { quoted: m });
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
