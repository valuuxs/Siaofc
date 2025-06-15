import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Boom } from '@hapi/boom';
import pino from 'pino';
import QRCode from 'qrcode';
import {
  default as makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  DisconnectReason
} from '@whiskeysockets/baileys';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const handler = async (msg, { conn, command }) => {
  const usarPairingCode = ["sercode", "code"].includes(command);
  let sentCodeMessage = false;

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function serbot() {
    try {
      const number = msg.key?.participant || msg.key.remoteJid;
      const sessionDir = path.join(__dirname, "../subbots");
      const sessionPath = path.join(sessionDir, number);
      const rid = number.split("@")[0];

      if (!fs.existsSync(sessionDir)) {
        fs.mkdirSync(sessionDir, { recursive: true });
      }

      const sesiones = fs.readdirSync(sessionDir);
      const maxSesiones = 10;

      if (sesiones.length >= maxSesiones) {
        return await conn.sendMessage(msg.key.remoteJid, {
          text: `🚫 *Límite alcanzado:*\nYa hay ${maxSesiones} subbots conectados.\n❌ No se pueden crear más por ahora.`
        }, { quoted: msg });
      }

      const disponibles = maxSesiones - sesiones.length;
      await conn.sendMessage(msg.key.remoteJid, {
        text: `🆕 Nueva sesión iniciándose...\n💡 *Subbots disponibles:* ${disponibles} restantes.`
      }, { quoted: msg });

      await conn.sendMessage(msg.key.remoteJid, {
        react: { text: '⌛', key: msg.key }
      });

      const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
      const { version } = await fetchLatestBaileysVersion();
      const logger = pino({ level: "silent" });

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

      socky.ev.on("connection.update", async ({ qr, connection, lastDisconnect }) => {
        if (qr && !sentCodeMessage) {
          if (usarPairingCode) {
            const code = await socky.requestPairingCode(rid);
            await conn.sendMessage(msg.key.remoteJid, {
              video: { url: "https://cdn.russellxz.click/b0cbbbd3.mp4" },
              caption: "🔐 *Código generado:*\nAbre WhatsApp > Vincular dispositivo y pega el siguiente código:",
              gifPlayback: true
            }, { quoted: msg });
            await sleep(1000);
            await conn.sendMessage(msg.key.remoteJid, {
              text: "```" + code + "```"
            }, { quoted: msg });
          } else {
            const qrImage = await QRCode.toBuffer(qr);
            await conn.sendMessage(msg.key.remoteJid, {
              image: qrImage,
              caption: `📲 Escanea este código QR desde *WhatsApp > Vincular dispositivo* para conectarte como subbot.`
            }, { quoted: msg });
          }
          sentCodeMessage = true;
        }

        switch (connection) {
          case "open":
            await conn.sendMessage(msg.key.remoteJid, {
              text: `✅ WELCOME - SUB CONECTADO ES TEST HIJO DE PUTA`
            }, { quoted: msg });

            await conn.sendMessage(msg.key.remoteJid, {
              react: { text: "🔁", key: msg.key }
            });
            break;

          case "close": {
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
                  text: `⚠️ *Sesión eliminada.*\n${messageError}\nUsa ${global.prefix}serbot para volver a conectar.`
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
                  text: `⚠️ *Reintentos de conexión fallidos.*`
                }, { quoted: msg });
                break;

              case DisconnectReason.connectionReplaced:
                console.log(`ℹ️ Sesión reemplazada por otra instancia.`);
                break;

              default:
                await conn.sendMessage(msg.key.remoteJid, {
                  text: `
⚠️ *Problema de conexión detectado:*
 ${messageError}
Intentando reconectar...`
                }, { quoted: msg });
                break;
            }
            break;
          }
        }
      });

      socky.ev.on("creds.update", saveCreds);

    } catch (e) {
      console.error("❌ Error en serbot:", e);
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