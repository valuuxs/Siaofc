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

if (!bot.jadibotmd) return m.reply('☕ Esta función se encuentra desactivada.');

let parent = args[0] && args[0] == 'plz' ? _conn : await global.conn;

if (!((args[0] && args[0] == 'plz') || (await global.conn).user.jid == _conn.user.jid)) {
return m.reply(*☁️ Esta función solo puede ser usada desde el bot principal o desde el grupo oficial. 👇🏻\nhttps://chat.whatsapp.com/Caj518FwPjHLVmGn48GvhW*);
}
/*
async function serbot() {
let authFolderB = m.sender.split('@')[0];/
async function serbot() {
if (global.conns.length >= 15) {
return m.reply('⚠️ Límite máximo de 15 Sub Bots alcanzado.*\nElimina uno con #delsesion antes de crear otro.');
}

let authFolderB = m.sender.split('@')[0];  
const userFolderPath = `./JadiBots/${authFolderB}`;  

if (!fs.existsSync(userFolderPath)) {  
  fs.mkdirSync(userFolderPath, { recursive: true });  
}  

args[0] ? fs.writeFileSync(`${userFolderPath}/creds.json`, JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, '\t')) : "";  

const { state, saveState, saveCreds } = await useMultiFileAuthState(userFolderPath);  
const msgRetryCounterMap = (MessageRetryMap) => { };  
const msgRetryCounterCache = new NodeCache();  
const { version } = await fetchLatestBaileysVersion();  
let phoneNumber = m.sender.split('@')[0];  

const methodCodeQR = process.argv.includes("qr");  
const methodCode = !!phoneNumber || process.argv.includes("code");  
const MethodMobile = process.argv.includes("mobile");  

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });  
const question = (texto) => new Promise((resolver) => rl.question(texto, resolver));  

const connectionOptions = {  
  logger: pino({ level: 'silent' }),  
  printQRInTerminal: false,  
  mobile: MethodMobile,  
  browser: ["Ubuntu", "Chrome", "20.0.04"],  
  auth: {  
    creds: state.creds,  
    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" }))  
  },  
  markOnlineOnConnect: true,  
  generateHighQualityLinkPreview: true,  
  getMessage: async (clave) => {  
    let jid = jidNormalizedUser(clave.remoteJid);  
    let msg = await store.loadMessage(jid, clave.id);  
    return msg?.message || "";  
  },  
  msgRetryCounterCache,  
  msgRetryCounterMap,  
  defaultQueryTimeoutMs: undefined,  
  version  
};  

let conn = makeWASocket(connectionOptions);  

if (methodCode && !conn.authState.creds.registered) {  
  if (!phoneNumber) process.exit(0);  
  let cleanedNumber = phoneNumber.replace(/[^0-9]/g, '');  
    let codeBot = await conn.requestPairingCode(cleanedNumber);  
    codeBot = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot;  
        const txt = `
  ⋄  ㅤ̠ *𝖲𝗁𝖺𝖽𝗈𝗐 𝖴𝗅𝗍𝗋𝖺 - 𝖬𝖣* ㅤׄ͜✧ׅ͡ -
         ︶ּ⏝ׅ︶ ౨ৎ ︶ׁׅ⏝ּ︶ 
  𔓕  ☁️ㅤ𝖲𝗎𝖻ㅤ˚ㅤ𝖡𝗈𝗍ㅤׅㅤ୨ৎ

ㅤ۟   🍝 ִ  \`𝖢𝗈𝗇𝖾𝗑𝗂𝗈́𝗇 - 𝖢𝗈𝖽𝖾\`  ওㅤ۫   

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

> ${club}
`;  
    await parent.reply(m.chat, txt, m);  
  setTimeout(async () => {  
    await parent.reply(m.chat, codeBot, m);  
    rl.close();  
  }, 4000);  
}  

conn.isInit = false;  
let isInit = true;  

async function connectionUpdate(update) {  
  const { connection, lastDisconnect, isNewLogin, qr } = update;  
  if (isNewLogin) conn.isInit = true;  
  const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;  

  if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {  
    let i = global.conns.indexOf(conn);  
    if (i < 0) return console.log(await creloadHandler(true).catch(console.error));  
    delete global.conns[i];  
    global.conns.splice(i, 1);  
    fs.rmdirSync(userFolderPath, { recursive: true });  
    if (code !== DisconnectReason.connectionClosed) {  
      parent.sendMessage(m.chat, { text: "*Conexión perdida..*" }, { quoted: fkontak });  
    }  
  }  

  if (global.db.data == null) loadDatabase();  

  if (connection == 'open') {  
    conn.isInit = true;  
    global.conns.push(conn);  
    await parent.reply(m.chat, args[0] ? 'Conectado con éxito' : `❀ ᥴ᥆ᥒᥱᥴ𝗍ᥲძ᥆ ᥱ᥊і𝗍᥆sᥲmᥱᥒ𝗍ᥱ ᥲ ᥕһᥲ𝗍sᥲ⍴⍴, ᥣᥲ ⍴r᥆́᥊іmᥲ ᥎ᥱz 𝗊ᥙᥱ sᥱ ძᥱsᥴ᥆ᥒᥱᥴ𝗍ᥱ ᥙsᥱ *#delsesion* ᥡ ძᥱ ᥒᥙᥱ᥎᥆ *#code*.\n\n> ${dev}`, m);  
    await sleep(5000);  
    if (args[0]) return;  

    await parent.reply(conn.user.jid, `La siguiente vez que se conecte envía el siguiente mensaje para iniciar sesión sin utilizar otro código `, m);  
    await parent.sendMessage(conn.user.jid, { text: usedPrefix + command + " " + Buffer.from(fs.readFileSync(`./JadiBots/${authFolderB}/creds.json`), "utf-8").toString("base64") }, { quoted: m });  
  }  
}  

setInterval(async () => {  
  if (!conn.user) {  
    try { conn.ws.close() } catch { }  
    conn.ev.removeAllListeners();  
    let i = global.conns.indexOf(conn);  
    if (i < 0) return;  
    delete global.conns[i];  
    global.conns.splice(i, 1);  
  }  
}, 60000);  

let handler = await import('../handler.js');  
let creloadHandler = async function (restatConn) {  
  try {  
    const Handler = await import(`../handler.js?update=${Date.now()}`).catch(console.error);  
    if (Object.keys(Handler || {}).length) handler = Handler;  
  } catch (e) {  
    console.error(e);  
  }  
  if (restatConn) {  
    try { conn.ws.close() } catch { }  
    conn.ev.removeAllListeners();  
    conn = makeWASocket(connectionOptions);  
    isInit = true;  
  }  

  if (!isInit) {  
    conn.ev.off('messages.upsert', conn.handler);  
    conn.ev.off('connection.update', conn.connectionUpdate);  
    conn.ev.off('creds.update', conn.credsUpdate);  
  }  

  conn.handler = handler.handler.bind(conn);  
  conn.connectionUpdate = connectionUpdate.bind(conn);  
  conn.credsUpdate = saveCreds.bind(conn, true);  

  conn.ev.on('messages.upsert', conn.handler);  
  conn.ev.on('connection.update', conn.connectionUpdate);  
  conn.ev.on('creds.update', conn.credsUpdate);  
  isInit = false;  
  return true;  
};  
creloadHandler(false);

}

serbot();
};

handler.help = ['code'];
handler.tags = ['serbot'];
handler.command = ['code', 'Code'];
handler.rowner = false

export default handler;

function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));
}

funciona, Pero no se si falta mejoras quitar lo innecesario mejorar el code

