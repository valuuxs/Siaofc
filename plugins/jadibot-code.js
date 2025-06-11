import fs from 'fs';
import path from 'path';
import pino from 'pino';
import qrcode from 'qrcode';
import * as ws from 'ws';
import { Boom } from '@hapi/boom';
import { makeWASocket } from '../lib/simple.js';

const {
  useMultiFileAuthState,
  DisconnectReason,
  makeCacheableSignalKeyStore,
  fetchLatestBaileysVersion
} = await import('@whiskeysockets/baileys');

import util from 'util';
const { spawn } = await import('child_process');
import { fileURLToPath } from 'url';

if (!(global.conns instanceof Array)) global.conns = [];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const handler = async (msg, { conn, command }) => {
  const usarPairingCode = ['sercode', 'code'].includes(command);
  let sentCodeMessage = false;

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function serbot() {
    try {
      const number = msg.key?.participant || msg.key?.remoteJid;
      if (!number) {
        return await conn.sendMessage(msg.key.remoteJid, {
          text: '❌ No se pudo identificar el número del usuario.'
        }, { quoted: msg });
      }

      const sessionDir = path.join(__dirname, '../JadiBots');
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
      let conectado = false;

      const timeout = setTimeout(() => {
        if (!conectado) {
          if (fs.existsSync(sessionPath)) {
            fs.rmSync(sessionPath, { recursive: true, force: true });
          }
          conn.sendMessage(msg.key.remoteJid, {
            text: '⏱️ *Tiempo de espera agotado.*\nEl subbot no se conectó en los 2 minutos permitidos.\n\nIntenta nuevamente con *#serbot* o *#code*.'
          }, { quoted: msg });
        }
      }, 2 * 60 * 1000);

      socky.ev.on('connection.update', async ({ qr, connection, lastDisconnect }) => {
        if (qr && !sentCodeMessage) {
          if (usarPairingCode) {
            try {
              const code = await socky.requestPairingCode(rid);
              await conn.sendMessage(msg.key.remoteJid, {
                video: { url: 'https://files.catbox.moe/6uao9h.mp4' },
                caption: '🔐 Código generado\n\nAbre WhatsApp > Vincular dispositivo y pega el siguiente código:',
                gifPlayback: true
              }, { quoted: msg });
              await sleep(1000);
              await conn.sendMessage(msg.key.remoteJid, {
                text: '' + code + ''
              }, { quoted: msg });
            } catch (e) {
              return await conn.sendMessage(msg.key.remoteJid, {
                text: `❌ No se pudo generar el código de emparejamiento.\n${e.message}`
              }, { quoted: msg });
            }
          } else {
            const qrImage = await qrcode.toBuffer(qr);
            await conn.sendMessage(msg.key.remoteJid, {
              image: qrImage,
              caption: '📲 Escanea este código QR desde WhatsApp > Vincular dispositivo para conectarte como subbot.'
            }, { quoted: msg });
          }
          sentCodeMessage = true;
        }

        switch (connection) {
          case 'open':
            conectado = true;
            clearTimeout(timeout);

            await conn.sendMessage(msg.key.remoteJid, {
              text: `╭──〔 SUBBOT CONECTADO 〕──╮
│ ✅ Bienvenido a ${botname}
│ El bot se conectó exitosamente.
╰───✦ ${botname} ✦───╯`
            }, { quoted: msg });

            await conn.sendMessage(msg.key.remoteJid, {
              react: { text: '🔁', key: msg.key }
            });
            break;

          case 'close': {
            const reason = new Boom(lastDisconnect?.error)?.output?.statusCode || lastDisconnect?.error?.output?.statusCode;
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
                  text: `⚠️ *Sesión eliminada.*\n${messageError}\n\nUsa *#serbot* para volver a conectar.`
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
│⚠️ Problema de conexión detectado:
│ ${messageError}
│ Intentando reconectar...
│
│ 🔄 Si el problema persiste, ejecuta:
│ #delbots
│ y vuelve a intentar con:
│ #serbot o #code
╰────✦ ${botname} ✦────╯`
                }, { quoted: msg });
                break;
            }
            break;
          }
        }
      });

      socky.ev.on('creds.update', async () => {
        try {
          await saveCreds();
        } catch (err) {
          console.error('❌ Error guardando credenciales:', err);
        }
      });

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