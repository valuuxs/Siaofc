import fs from 'fs';
import path from 'path';
import moment from 'moment-timezone';
import crypto from 'crypto';
import readline from 'readline';
import qrcode from 'qrcode';
import pino from 'pino';
import { Boom } from '@hapi/boom';
import * as ws from 'ws';
const { CONNECTING } = ws;

import { fileURLToPath } from 'url';
import {
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  jidNormalizedUser
} from '@whiskeysockets/baileys';

import { makeWASocket } from '../lib/simple.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

if (!(global.conns instanceof Array)) global.conns = [];

let handler = async (m, { conn, command }) => {
  const usarPairingCode = ['sercode', 'code'].includes(command);
  let sentCodeMessage = false;

  const sleep = (ms) => new Promise(res => setTimeout(res, ms));

  const iniciarSubBot = async () => {
    try {
      const jid = m.key.participant || m.key.remoteJid;
      const user = jidNormalizedUser(jid); // ej: '521234567890@s.whatsapp.net'
      const jidClean = user.replace(/[@.:]/g, '_'); // ej: '521234567890_s_whatsapp_net'

      const sessionDir = path.join(__dirname, '../JadiBots');
      const sessionPath = path.join(sessionDir, jidClean);

      if (!fs.existsSync(sessionDir)) fs.mkdirSync(sessionDir, { recursive: true });

      const sesiones = fs.readdirSync(sessionDir);
      const maxSesiones = 100;
      if (sesiones.length >= maxSesiones) {
        return await conn.sendMessage(m.chat, {
          text: `🚫 *Límite alcanzado:* Ya hay ${maxSesiones} subbots activos.`
        }, { quoted: m });
      }

      const disponibles = maxSesiones - sesiones.length;
      await conn.sendMessage(m.chat, {
        text: `🆕 Iniciando nueva sesión...\n📊 *Subbots disponibles:* ${disponibles}`
      }, { quoted: m });

      const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
      const { version } = await fetchLatestBaileysVersion();
      const logger = pino({ level: 'silent' });

      const sock = makeWASocket({
        version,
        logger,
        browser: ['Ubuntu', 'Chrome'],
        auth: {
          creds: state.creds,
          keys: makeCacheableSignalKeyStore(state.keys, logger)
        },
        printQRInTerminal: false
      });

      let reconnectionAttempts = 0;
      const maxRetries = 3;

      sock.ev.on('connection.update', async ({ connection, lastDisconnect, qr }) => {
        if (qr && !sentCodeMessage) {
          if (usarPairingCode) {
            const code = await sock.requestPairingCode(user);
            await conn.sendMessage(m.chat, {
              video: { url: 'https://cdn.russellxz.click/b0cbbbd3.mp4' },
              caption: '🔐 *Código generado:*\nPega este código en WhatsApp > Vincular dispositivo:',
              gifPlayback: true
            }, { quoted: m });
            await sleep(1000);
            await conn.sendMessage(m.chat, {
              text: '```' + code + '```'
            }, { quoted: m });
          } else {
            const qrImage = await qrcode.toBuffer(qr);
            await conn.sendMessage(m.chat, {
              image: qrImage,
              caption: '📲 Escanea este QR desde *WhatsApp > Vincular dispositivo* para conectarte.'
            }, { quoted: m });
          }
          sentCodeMessage = true;
        }

        switch (connection) {
          case 'open':
            await conn.sendMessage(m.chat, {
              text: `🤖 *Subbot conectado exitosamente*\nBienvenido a tu subbot privado.\n\nUsa *${global.prefix}menu* para ver comandos.`
            }, { quoted: m });
            break;

          case 'close': {
            const statusCode = new Boom(lastDisconnect?.error)?.output?.statusCode || lastDisconnect?.error?.output?.statusCode;
            const motivo = DisconnectReason[statusCode] || `Código desconocido: ${statusCode}`;

            const eliminarSesion = () => {
              if (fs.existsSync(sessionPath)) fs.rmSync(sessionPath, { recursive: true, force: true });
            };

            if ([DisconnectReason.badSession, DisconnectReason.loggedOut, 401].includes(statusCode)) {
              eliminarSesion();
              await conn.sendMessage(m.chat, {
                text: `⚠️ *Sesión finalizada.*\nMotivo: ${motivo}\nUsa nuevamente *${global.prefix}serbot* para reconectar.`
              }, { quoted: m });
            } else if (statusCode === DisconnectReason.restartRequired) {
              if (reconnectionAttempts < maxRetries) {
                reconnectionAttempts++;
                await sleep(3000);
                await iniciarSubBot();
              } else {
                await conn.sendMessage(m.chat, {
                  text: '❌ *No se pudo reconectar después de varios intentos.*'
                }, { quoted: m });
              }
            } else {
              await conn.sendMessage(m.chat, {
                text: `❌ *Conexión cerrada.*\nMotivo: ${motivo}`
              }, { quoted: m });
            }
            break;
          }
        }
      });

      sock.ev.on('creds.update', saveCreds);

    } catch (e) {
      console.error('[SUBBOT ERROR]', e);
      await conn.sendMessage(m.chat, {
        text: `❌ *Error:* ${e.message || e}`
      }, { quoted: m });
    }
  };

  await iniciarSubBot();
};

handler.command = ['serbot', 'sercode', 'jadibot', 'code', 'qr'];
handler.help = ['serbot', 'sercode'];
handler.tags = ['owner'];
handler.owner = false;

export default handler;