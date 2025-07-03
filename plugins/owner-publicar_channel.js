const handler = async (m, { conn, text }) => {
  const canalJid = '120363318267632676@newsletter';

  // ✅ Validar que haya un mensaje citado o texto proporcionado
  if (!m.quoted && !text) {
    return conn.reply(m.chat, '⚠️ Responde a un mensaje que contenga imagen, video, sticker o texto, o escribe texto después del comando.', m);
  }

  const q = m.quoted || m;
  const type = q.mtype || '';
  const mime = q?.mime || q?.mimetype || '';

  try {
    let content;

    if (type === 'imageMessage') {
      const media = await q.download();
      content = { image: media };
    } else if (type === 'videoMessage') {
      const media = await q.download();
      content = { video: media };
    } else if (type === 'stickerMessage') {
      const media = await q.download();
      content = { sticker: media };
    } else if (type === 'conversation' || type === 'extendedTextMessage') {
      let mensaje = m.quoted ? (q.text || '') : (text || '');

      // Si no se responde a un mensaje y hay texto, limpiar comando manualmente
      if (!m.quoted && m.body) {
        const usedCommand = m.body.trim().split(/\s+/)[0]; // ej: .publicar
        mensaje = m.body.slice(usedCommand.length).trim(); // eliminar el comando del texto
      }

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