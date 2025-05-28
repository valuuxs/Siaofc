import PhoneNumber from 'awesome-phonenumber';
import chalk from 'chalk';
import boxen from 'boxen';
import gradient from 'gradient-string';
import urlRegex from 'url-regex-safe';
import { watchFile } from 'fs';

export default async function printLog(m, conn = { user: {} }) {
  // Fecha y hora
  const now = new Date();
  const dateStr = now.toLocaleDateString('es-ES');
  const timeStr = now.toLocaleTimeString('it-IT', { hour12: false }).slice(0, 8);

  // Icono según hora del día
  const hour = now.getHours();
  const dayIcon = hour < 6 ? '🌙'
                  : hour < 12 ? '☀️'
                  : hour < 18 ? '🌤️'
                  : '🌙';

  // Tipo de mensaje y degradado según tipo
  const typeRaw = (m.mtype || '').replace(/message$/i, '').toUpperCase() || '-';
  const grad = typeRaw === 'IMAGE'
    ? gradient(['#ff5f6d', '#ffc371'])
    : gradient.rainbow;
  const stamp = grad(`${dayIcon} ${dateStr} ${timeStr}`);

  // Mapa de emojis por tipo de mensaje
  const typeIcons = {
    TEXT: '📝',
    IMAGE: '🖼️',
    VIDEO: '🎬',
    AUDIO: '🎵',
    DOCUMENT: '📄',
    STICKER: '🏷️',
    LOCATION: '📍',
    CONTACT: '👤',
  };
  const typeIcon = typeIcons[typeRaw] || '💭';

  // Remitente y nombre
  const name = await conn.getName(m.sender);
  const sender =
    PhoneNumber('+' + m.sender.replace('@s.whatsapp.net', '')).getNumber('international') +
    (name ? ` ~${name}` : '');

  // ID del mensaje
  const msgId = m.key?.id || '-';

  // Nombre del chat con emoji según grupo/privado
  const chatRaw = await conn.getName(m.chat);
  const chatNameRaw = chatRaw
    ? m.isGroup
      ? `Grupo: ${chatRaw}`
      : `Privado: ${chatRaw}`
    : '-';
  const chatEmoji = m.isGroup ? '👥' : '🗨️';
  const chatName = `${chatEmoji}  ${chatNameRaw}`;

  // Detectar reenvío con emoji
  const fwdIcon = m.isForwarded ? ' 🔁' : '';

  // Estado de visibilidad con emoji
  const vis = m.message?.viewOnceMessage
    ? ' ⏳'
    : m.message?.ephemeralMessage
    ? ' 🔒'
    : '';

  // Tamaño
  let size = 0;
  if (m.msg) size = m.msg.fileLength?.low || m.msg.fileLength || 0;
  else size = m.text?.length || 0;
  const humanSize = size > 0 ? `${(size / 1024).toFixed(1)}KB` : '-';

  // Procesar texto: limpiar bidi
  let text = m.text || '';
  text = text.replace(/\u200e+/g, '');

  // Si es JSON válido, formatear bonito y añadir emoji
  let isJSON = false;
  try {
    const obj = JSON.parse(text);
    text = chalk.green(JSON.stringify(obj, null, 2));
    isJSON = true;
  } catch (e) {}

  // Si no era JSON, colorear URLs y markdown básico, con emoji en enlaces
  if (!isJSON) {
    const urlPattern = urlRegex({ strict: false });
    text = text.replace(urlPattern, u => chalk.blueBright('🔗 ' + u));
    text = text.replace(/([*_~])(.+?)\1/g, (_, m1, t) => {
      if (m1 === '*') return chalk.bold(t);
      if (m1 === '_') return chalk.italic(t);
      if (m1 === '~') return chalk.strikethrough(t);
      return t;
    });
  }

  // Truncar texto largo
  const MAX = 500;
  if (text.length > MAX) {
    text = text.slice(0, MAX) + chalk.gray('…[truncado]');
  }

  // Conteo de palabras y líneas
  const wordCount = text ? text.split(/\s+/).length : 0;
  const lineCount = text ? text.split('\n').length : 0;

  // Si es respuesta citada, previsualizar con emoji
  let quoteLine = null;
  if (m.quoted?.text) {
    const quote = m.quoted.text.slice(0, 100).replace(/\n/g, ' ');
    quoteLine = `💬  ${quote}${m.quoted.text.length > 100 ? '...' : ''}`;
  }

  // Construir líneas de salida con emojis
  const lines = [
    `${chalk.gray('ID:       ')} ${chalk.yellow(msgId)}`,
    `${chalk.gray('Remitente:')} ${sender}`,
    `${chalk.gray('Chat:     ')} ${chatName}`,
    `${vis ? chalk.gray('Vis:      ') + vis : ''}`,
    `${chalk.gray('Tipo:     ')} ${typeIcon}  ${chalk.magenta(typeRaw)}${fwdIcon}`,
    `${chalk.gray('Tamaño:   ')} ${humanSize}`,
    `${chalk.gray('Palabras: ')} ${wordCount}`,
    `${chalk.gray('Líneas:   ')} ${lineCount}`,
    quoteLine,
    text ? `
${text}` : ''
  ]
    .filter(Boolean)
    .join('\n');

  // Mostrar por consola con Boxen
  console.log(
    boxen(lines, {
      title: `${stamp}`,
      titleAlignment: 'left',
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'cyan'
    })
  );
}

// hot reload
const file = global.__filename(import.meta.url);
watchFile(file, () => console.log(chalk.redBright('print.js actualizado')));