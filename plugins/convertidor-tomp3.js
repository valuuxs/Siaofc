import { toAudio } from '../lib/converter.js';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';

function hasAudioTrack(filePath) {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) return reject(err);
      const hasAudio = metadata.streams.some(s => s.codec_type === 'audio');
      resolve(hasAudio);
    });
  });
}

const handler = async (m, { conn, usedPrefix, command }) => {
  const q = m.quoted ? m.quoted : m;
  const mime = (q || q.msg).mimetype || q.mediaType || '';

  if (!/video|audio/.test(mime)) {
    return conn.reply(m.chat, `*☕ Responda al video o nota de voz con el comando ${usedPrefix + command} para convertirlo en audio.*`, m);
  }

  const media = await q.download();
  if (!media) {
    return conn.reply(m.chat, '```❌ Ocurrió un error al descargar el video.```', m);
  }

  const hasAudio = await hasAudioTrack(media).catch(() => false);
  if (!hasAudio) {
    fs.unlinkSync(media); // elimina el archivo si no tiene audio
    return conn.reply(m.chat, '```⚠️ El video no contiene pista de audio.```', m);
  }

  const audio = await toAudio(media, 'mp4');
  fs.unlinkSync(media); // elimina el archivo temporal tras convertir

  if (!audio.data) {
    return conn.reply(m.chat, '```❌ Ocurrió un error al convertir el archivo a audio.```', m);
  }

  conn.sendMessage(m.chat, { audio: audio.data, mimetype: 'audio/mpeg' }, { quoted: m });
};

handler.help = ['tomp3', 'toaudio'];
handler.tags = ['convertidor'];
handler.command = ['tomp3', 'toaudio', 'toaud'];
handler.register = true;

export default handler;