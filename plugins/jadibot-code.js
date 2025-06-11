import fs from 'fs';
import path from 'path';
import pino from 'pino';
import qrcode from 'qrcode';
import { fileURLToPath } from 'url';
import * as ws from 'ws';

import { makeWASocket } from '../lib/simple.js';

const {
  useMultiFileAuthState,
  DisconnectReason,
  makeCacheableSignalKeyStore,
  fetchLatestBaileysVersion
} = await import('@whiskeysockets/baileys');

import util from 'util';
const { child, spawn, exec } = await import('child_process');

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
      const number = msg.key?.participant || msg.key.remoteJid;
      const sessionDir = path.join(__dirname, '../subbots');
      const sessionPath = path.join(sessionDir, number);
      const rid = number.split('@')[0];

      if (!fs.existsSync(sessionDir)) {
        fs.mkdirSync(sessionDir, { recursive: true });
      }

      // 🧹 Limpieza de sesiones antiguas (más de 3 días)
      try {
        const diasMaximos = 3;
        const ahora = Date.now();

        for (const dir of fs.readdirSync(sessionDir)) {
          const fullPath = path.join(sessionDir, dir);
          if (!fs.lstatSync(fullPath).isDirectory()) continue;
          const stats = fs.statSync(fullPath);
          const edadDias = (ahora - stats.mtimeMs) / (1000 * 60 * 60 * 24);
          if (edadDias > diasMaximos) {
            fs.rmSync(fullPath, { recursive: true, force: true });
            console.log(`🧹 Eliminada sesión inactiva: ${dir} (${edadDias.toFixed(1)} días)`);
          }
        }
      } catch (e) {
        console.error('Error al limpiar sesiones antiguas:', e);
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

      // ⏱️ Tiempo máximo de espera (2 minutos) para conexión
      const timeout = setTimeout(() => {
        if (!socky.user) {
          if (fs.existsSync(sessionPath)) {
            fs.rmSync(sessionPath, { recursive: true, force: true });
          }
          conn.sendMessage(msg.key.remoteJid, {
            text: '⚠️ *Sesión eliminada por inactividad.*\nNo se detectó conexión en los primeros 2 minutos.'
          }, { quoted: msg });
          try {
            socky.end();
          } catch {}
        }
      }, 2 * 60 * 1000); // 2 minutos

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
            const qrImage = await qrcode.toBuffer(qr);
            await conn.sendMessage(msg.key.remoteJid, {
              image: qrImage,
              caption: '📲 Escanea este código QR desde *WhatsApp > Vincular dispositivo* para conectarte como subbot.'
            }, { quoted: msg });
          }
          sentCodeMessage = true;
        }

        switch (connection) {
          case 'open':
            clearTimeout(timeout);
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
            const reason = lastDisconnect?.error?.output?.statusCode;
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