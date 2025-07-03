const handler = async (m, { conn, text }) => {
  const canalJid = '120363318267632676@newsletter';

  // ✅ Validar que haya un mensaje citado o texto proporcionado
  if (!m.quoted && !text) {
    return conn.reply(m.chat, '⚠️ Responde a un mensaje que contenga imagen, video, sticker o texto, o escribe texto después del comando.', m);
  }

  const q = m.quoted || m;
  const type = q.mtype || '';

  try {
    let content;

    if (type === 'imageMessage') {
      content = { image: await q.download() };
    } else if (type === 'videoMessage') {
      content = { video: await q.download() };
    } else if (type === 'stickerMessage') {
      content = { sticker: await q.download() };
    } else if (type === 'conversation' || type === 'extendedTextMessage') {
      // ✅ Si se cita un mensaje, usamos ese texto. Si no, usamos `text` que ya está limpio.
      const mensaje = m.quoted ? (q.text || '') : text;
      if (!mensaje) {
        return conn.reply(m.chat, '⚠️ No se detectó texto válido para enviar al canal.', m);
      }
      content = { text: mensaje };
    } else {
      return conn.reply(m.chat, '⚠️ Solo se permiten imágenes, videos, stickers o texto.', m);
    }

    const res = await conn.sendMessage(canalJid, content);

    if (!res?.key?.id) throw '❌ El contenido no se pudo enviar (respuesta inválida).';

    return conn.reply(m.chat, '*✅ Contenido enviado correctamente al canal.*', m);

  } catch (e) {
    console.error('[ERROR EN PUBLICAR]:', e);
    return conn.reply(m.chat, '❌ Error al procesar o enviar al canal.', m);
  }
};

handler.help = ['send2channel'];
handler.tags = ['tools'];
handler.command = ['send2channel', 'enviarcanal', 'reenviar', 'publicar'];
handler.rowner = true;

export default handler;