import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Boom } from '@hapi/boom';
import pino from 'pino';
import QRCode from 'qrcode';
import makeWASocket, {
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  DisconnectReason
} from '@whiskeysockets/baileys';

// Necesario para __dirname en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Nombre del bot
//const botname = 'Azura Ultra 2.0';

const handler = async (msg, { conn, command }) => {
  const usarPairingCode = ['sercode', 'code'].includes(command);
  let sentCodeMessage = false;

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function serbot() {
    try {
      const number = msg.key?.participant || msg.key.remoteJid;
      const sessionDir = path.join(__dirname, '../subbots');
      const sessionPath = path.join(sessionDir, number);
      const rid = number.split('@')[0];

      if (!fs.existsSync(sessionDir)) {
        fs.mkdirSync(sessionDir, { recursive: true });
      }

      await conn.sendMessage(msg.key.remoteJid, {
        react: { text: '⌛', key: msg.key }
      });

      const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
      const { version } = await fetchLatestBaileysVersion();
      const logger = pino({ level: 'silent' });

      const socky = makeWASocket({
        version,
        logger,
        auth: {
          creds: state.creds,
          keys: makeCacheableSignalKeyStore(state.keys, logger)
        },
        printQRInTerminal: !usarPairingCode,
        browser: ['Windows', 'Chrome']
      });

      let reconnectionAttempts = 0;
      const maxReconnectionAttempts = 3;

      socky.ev.on('connection.update', async ({ qr, connection, lastDisconnect }) => {
        if (qr && !sentCodeMessage) {
          if (usarPairingCode) {
            const code = await socky.requestPairingCode(rid);
            await conn.sendMessage(msg.key.remoteJid, {
              video: { url: 'https://cdn.russellxz.click/b0cbbbd3.mp4' },
              caption: '🔐 *Código generado:*\nAbre WhatsApp > Vincular dispositivo y pega el siguiente código:',
              gifPlayback: true
            }, { quoted: msg });
            await sleep(1000);
            await conn.sendMessage(msg.key.remoteJid, {
              text: '```' + code + '```'
            }, { quoted: msg });
          } else {
            const qrImage = await QRCode.toBuffer(qr);
            await conn.sendMessage(msg.key.remoteJid, {
              image: qrImage,
              caption: '📲 Escanea este código QR desde *WhatsApp > Vincular dispositivo* para conectarte como subbot.'
            }, { quoted: msg });
          }
          sentCodeMessage = true;
        }

        switch (connection) {
          case 'open':
            await conn.sendMessage(msg.key.remoteJid, {
              text: `╭───〔 *🤖 SUBBOT CONECTADO* 〕───╮
│
│ ✅ *Bienvenido a ${botname}*
│
│ Ya eres parte del mejor sistema de juegos RPG
│
│ 🛠️ Usa los siguientes comandos para comenzar:
│
│ #help
│ #menu
│
│ ⚔️ Disfruta de las funciones del subbot
│ y conquista el mundo digital
│
│ ℹ️ Por defecto, el subbot está en *modo privado*,
│ lo que significa que *solo tú puedes usarlo*.
│
│ Usa el comando:
│ #menu
│ (para ver configuraciones y cómo hacer
│ que otras personas puedan usarlo.)
│
│ ➕ Los prefijos por defecto son: *. y #*
│ Si quieres cambiarlos, usa:
│ #setprefix
│
│ 🔄 Si notas que el subbot *no responde al instante*
│ o tarda mucho *aunque esté conectado*, no te preocupes.
│ Puede ser un fallo temporal.
│
│ En ese caso, simplemente ejecuta:
│ #delbots
│ para eliminar tu sesión y luego vuelve a conectarte usando:
│ #serbot o #code
│ hasta que se conecte correctamente.
│
╰────✦ *${botname}* ✦────╯`
            }, { quoted: msg });

            await conn.sendMessage(msg.key.remoteJid, {
              react: { text: '🔁', key: msg.key }
            });
            break;

          case 'close': {
            const reason = new Boom(lastDisconnect?.error)?.output.statusCode || lastDisconnect?.error?.output?.statusCode;
            const messageError = DisconnectReason[reason] || `Código desconocido: ${reason}`;

            const eliminarSesion = () => {
              if (fs.existsSync(sessionPath)) {
                fs.rmSync(sessionPath, { recursive: true, force: true });
              }
            };

            switch (reason) {
              case 401:
              case DisconnectReason.badSession:
              case DisconnectReason.loggedOut:
                await conn.sendMessage(msg.key.remoteJid, {
                  text: `⚠️ *Sesión eliminada.*\n${messageError}\nUsa #serbot para volver a conectar.`
                }, { quoted: msg });
                eliminarSesion();
                break;

              case DisconnectReason.restartRequired:
                if (reconnectionAttempts < maxReconnectionAttempts) {
                  reconnectionAttempts++;
                  await sleep(3000);
                  await serbot();
                  return;
                }
                await conn.sendMessage(msg.key.remoteJid, {
                  text: '⚠️ *Reintentos de conexión fallidos.*'
                }, { quoted: msg });
                break;

              case DisconnectReason.connectionReplaced:
                console.log('ℹ️ Sesión reemplazada por otra instancia.');
                break;

              default:
                await conn.sendMessage(msg.key.remoteJid, {
                  text: `╭───〔 *⚠️ SUBBOT* 〕───╮
│⚠️ *Problema de conexión detectado:*
│ ${messageError}
│ Intentando reconectar...
│
│ 🔄 Si el problema persiste, ejecuta:
│ #delbots
│ y vuelve a intentar con:
│ #serbot o #code
╰────✦ *${botname}* ✦────╯`
                }, { quoted: msg });
                break;
            }
            break;
          }
        }
      });

      socky.ev.on('creds.update', saveCreds);

    } catch (e) {
      console.error('❌ Error en serbot:', e);
      await conn.sendMessage(msg.key.remoteJid, {
        text: `❌ *Error inesperado:* ${e.message}`
      }, { quoted: msg });
    }
  }

  await serbot();
};

handler.command = ['sercode', 'code', 'jadibot', 'serbot', 'qr'];
handler.tags = ['owner'];
handler.help = ['serbot', 'code'];

export default handler;