/*import translate from '@vitalets/google-translate-api';
import fetch from 'node-fetch';
const handler = async (m, {args, usedPrefix, command}) => {
  const msg = `👑 *Uso correcto del comando ${usedPrefix + command} (idioma) (texto)*\n*Ejemplo:*\n*${usedPrefix + command} es Hello*\n\n*Conoce los idiomas admitidos en:*\n*- https://cloud.google.com/translate/docs/languages*`;
  if (!args || !args[0]) return m.reply(msg);
  let lang = args[0];
  let text = args.slice(1).join(' ');
  const defaultLang = 'es';
  if ((args[0] || '').length !== 2) {
    lang = defaultLang;
    text = args.join(' ');
  }
  if (!text && m.quoted && m.quoted.text) text = m.quoted.text;
  try {
    conn.reply(m.chat, wait, m, {
    contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, showAdAttribution: true,
    title: packname,
    body: wm,
    previewType: 0, thumbnail: icons,
    sourceUrl: redes }}})
    const result = await translate(`${text}`, {to: lang, autoCorrect: true});
    await m.reply('*Traducción:* ' + result.text);
  } catch {
    try {
    conn.reply(m.chat, wait, m, {
    contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, showAdAttribution: true,
    title: packname,
    body: wm,
    previewType: 0, thumbnail: icons,
    sourceUrl: redes }}})
      const lol = await fetch(`https://api.lolhuman.xyz/api/translate/auto/${lang}?apikey=${lolkeysapi}&text=${text}`);
      const loll = await lol.json();
      const result2 = loll.result.translated;
      await m.reply('*Traducción:* ' + result2);
    } catch {
      await m.reply('*[ ❌ ] Ocurrió un error*');
    }
  }
};
handler.help = ['traductor'];
handler.tag = ['tools'];
handler.command = /^(traductor|traducir|googletrad)$/i;
export default handler;*/

import translate from '@vitalets/google-translate-api';
import fetch from 'node-fetch';

const handler = async (m, { args, usedPrefix, command }) => {
  const msg = `👑 *Uso correcto del comando:* ${usedPrefix + command} _(idioma)_ _(texto)_\n\n` +
              `*Ejemplo:* ${usedPrefix + command} es Hello`;
              
  if (!args || !args[0]) return m.reply(msg);

  let lang = args[0];
  let text = args.slice(1).join(' ');
  const defaultLang = 'es';

  // Validar si el primer argumento es un código de idioma válido
  const isValidLang = /^[a-z]{2}$/.test(lang);
  if (!isValidLang) {
    lang = defaultLang;
    text = args.join(' ');
  }

  // Usar texto citado si no se proporcionó en los argumentos
  if (!text && m.quoted?.text) text = m.quoted.text;
  if (!text) return m.reply('*[❗] Debes proporcionar un texto para traducir.*');

  try {
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } }); // Reacción de espera
    
    // Intentar traducción con la API principal
    const result = await translate(text, { to: lang, autoCorrect: true });
    await m.reply(`*Traducción:* ${result.text}`);
    
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } }); // Reacción de éxito
  } catch (error) {
    try {
      // Intentar traducción con API secundaria si la primera falla
      const res = await fetch(`https://api.lolhuman.xyz/api/translate/auto/${lang}?apikey=${lolkeysapi}&text=${encodeURIComponent(text)}`);
      if (!res.ok) throw new Error('Error en la API secundaria');
      
      const json = await res.json();
      if (!json.result || !json.result.translated) throw new Error('Respuesta inválida de la API secundaria');
      
      await m.reply(`*Traducción:* ${json.result.translated}`);
      await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } }); // Reacción de éxito
    } catch (err) {
      await m.reply('*[ ❌ ] Ocurrió un error al traducir.*');
      await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } }); // Reacción de fallo
      console.error(err); // Para depuración
    }
  }
};

handler.help = ['traductor'];
handler.tag = ['tools'];
handler.command = /^(traductor|traducir|googletrad)$/i;

export default handler;