const {
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  MessageRetryMap,
  makeCacheableSignalKeyStore,
  jidNormalizedUser
} = await import('@whiskeysockets/baileys')
import fs from "fs"
import pino from 'pino'
import NodeCache from 'node-cache'
import crypto from 'crypto'
import moment from 'moment-timezone'
import qrcode from "qrcode"
import { makeWASocket } from '../lib/simple.js'
import { Boom } from '@hapi/boom'

if (!(global.conns instanceof Array)) global.conns = [];

let handler = async (m, { conn: _conn, args, usedPrefix, command, isOwner }) => {
  const bot = global.db.data.settings[conn.user.jid] || {}
  if (!bot.jadibotmd) return m.reply('💛 Este comando está desactivado por mi creador.')

  let parent = args[0] && args[0] == 'plz' ? _conn : await global.conn
  if (!((args[0] && args[0] == 'plz') || (await global.conn).user.jid == _conn.user.jid)) {
    return m.reply(`Este comando solo puede usarse en el bot principal: wa.me/${global.conn.user.jid.split`@`[0]}?text=${usedPrefix}code`)
  }

  await m.react('🕐') // Indicando que empieza el proceso

  async function serbot() {
    let phoneNumber = m.sender.split('@')[0]
    let authFolderB = phoneNumber
    const userFolderPath = `./JadiBots/${authFolderB}`

    if (!fs.existsSync(userFolderPath)) fs.mkdirSync(userFolderPath, { recursive: true })
    if (args[0]) {
      const json = Buffer.from(args[0], "base64").toString("utf-8")
      fs.writeFileSync(`${userFolderPath}/creds.json`, JSON.stringify(JSON.parse(json), null, 2))
    }

    const { state, saveCreds } = await useMultiFileAuthState(userFolderPath)
    const { version } = await fetchLatestBaileysVersion()
    const msgRetryCounterCache = new NodeCache()

    const connectionOptions = {
      logger: pino({ level: 'silent' }),
      printQRInTerminal: false,
      browser: ["Ubuntu", "Chrome", "20.0.04"],
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' }))
      },
      markOnlineOnConnect: true,
      generateHighQualityLinkPreview: true,
      getMessage: async (key) => {
        let jid = jidNormalizedUser(key.remoteJid)
        let msg = await store.loadMessage(jid, key.id)
        return msg?.message || ""
      },
      msgRetryCounterMap: {},
      msgRetryCounterCache,
      version
    }

    let conn
    try {
      conn = makeWASocket(connectionOptions)
    } catch (e) {
      await m.react('❌')
      return m.reply(`Error al crear socket: ${e.message}`)
    }

    if (!conn.authState.creds.registered) {
      try {
        const cleaned = phoneNumber.replace(/[^0-9]/g, '')
        const codeBot = await conn.requestPairingCode(cleaned)
        const formattedCode = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot

        await parent.reply(m.chat, "📡 Enviando código de vinculación, copia y pega.", m)
        await parent.reply(m.chat, formattedCode, m)

        await m.react('✅')
      } catch (e) {
        await m.react('❌')
        return m.reply(`❌ No se pudo generar el código: ${e.message}`)
      }
    }

    conn.isInit = false
    let isInit = true

    async function connectionUpdate(update) {
      const { connection, lastDisconnect, isNewLogin } = update
      if (isNewLogin) conn.isInit = true

      const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
      if (code && code !== DisconnectReason.loggedOut && conn?.ws?.socket == null) {
        let i = global.conns.indexOf(conn)
        if (i >= 0) {
          delete global.conns[i]
          global.conns.splice(i, 1)
        }
        fs.rmdirSync(userFolderPath, { recursive: true })
        parent.sendMessage(m.chat, { text: "⚠️ Conexión perdida..." }, { quoted: m })
      }

      if (connection === 'open') {
        conn.isInit = true
        global.conns.push(conn)

        await parent.reply(m.chat, args[0] ? '✅ Conectado con éxito' : '✅ Sub Bot conectado correctamente.', m)
        await sleep(2000)

        if (!args[0]) {
          const credsBase64 = Buffer.from(fs.readFileSync(`${userFolderPath}/creds.json`), 'utf-8').toString('base64')
          await parent.reply(conn.user.jid, 'Para reconectar envía este mensaje:', m)
          await parent.sendMessage(conn.user.jid, { text: `${usedPrefix}${command} ${credsBase64}` }, { quoted: m })
        }
      }
    }

    setInterval(async () => {
      if (!conn.user) {
        try { conn.ws.close() } catch { }
        conn.ev.removeAllListeners()
        let i = global.conns.indexOf(conn)
        if (i >= 0) {
          delete global.conns[i]
          global.conns.splice(i, 1)
        }
      }
    }, 60000)

    let handler = await import('../handler.js')
    let creloadHandler = async function (restatConn) {
      try {
        const Handler = await import(`../handler.js?update=${Date.now()}`).catch(console.error)
        if (Object.keys(Handler || {}).length) handler = Handler
      } catch (e) {
        console.error(e)
      }

      if (restatConn) {
        try { conn.ws.close() } catch { }
        conn.ev.removeAllListeners()
        conn = makeWASocket(connectionOptions)
        isInit = true
      }

      if (!isInit) {
        conn.ev.off('messages.upsert', conn.handler)
        conn.ev.off('connection.update', conn.connectionUpdate)
        conn.ev.off('creds.update', conn.credsUpdate)
      }

      conn.handler = handler.handler.bind(conn)
      conn.connectionUpdate = connectionUpdate.bind(conn)
      conn.credsUpdate = saveCreds.bind(conn, true)

      conn.ev.on('messages.upsert', conn.handler)
      conn.ev.on('connection.update', conn.connectionUpdate)
      conn.ev.on('creds.update', conn.credsUpdate)

      isInit = false
      return true
    }

    creloadHandler(false)
  }

  serbot()
}

handler.help = ['code']
handler.tags = ['jadibot']
handler.command = ['code', 'Code']
handler.rowner = false

export default handler

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}