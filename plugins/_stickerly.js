import fetch from 'node-fetch';
import { writeFile } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';
import { fileTypeFromBuffer } from 'file-type';

let handler = async (m, { conn, args }) => {
  if (!args[0]) return m.reply(`🍭 Ingresa un link de YouTube.`);

  m.react('🕒');

  let api = await (await fetch(`https://api.neoxr.eu/api/youtube?url=${args[0]}&type=audio&quality=128kbps&apikey=GataDios`)).json();

  if (!api.data?.url) return m.reply('❌ No se pudo obtener el audio.');

  // Descargar el archivo
  let res = await fetch(api.data.url);
  if (!res.ok) return m.reply('❌ Error al descargar el archivo de audio.');

  let buffer = await res.buffer();
  let type = await fileTypeFromBuffer(buffer) || { ext: 'mp3', mime: 'audio/mpeg' };
  let tempFilePath = join(tmpdir(), `shadow_audio_${Date.now()}.${type.ext}`);

  await writeFile(tempFilePath, buffer);

  // Enviar el audio como archivo
  await conn.sendMessage(m.chat, {
    audio: { url: tempFilePath },
    mimetype: type.mime,
    fileName: api.data.filename || 'audio.mp3',
    ptt: false // pon true si quieres que se envíe como nota de voz
  }, { quoted: m });

  m.react('✅');
};

handler.help = ['ytmp3'];
handler.tags = ['descargas'];
handler.command = ['ytesx'];

export default handler;