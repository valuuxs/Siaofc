const handler = async (m, { conn, text }) => {
  const canalJidDefault = '120363318267632676@newsletter';

  const q = m.quoted || m;
  const type = q.mtype || '';

  try {
    let canalJid = canalJidDefault;
    let mensaje = text;

    // Detectar si el texto contiene link de canal de WhatsApp
    const canalLinkRegex = /https?:\/\/chat\.whatsapp\.com\/channel\/([\w\d]+)/i;
    const match = text?.match(canalLinkRegex);

    if (match) {
      const canalId = match[1];
      canalJid = `${canalId}@newsletter`;
      mensaje = text.replace(match[0], '').trim(); // eliminar el link del mensaje
    }

    let content;

    if (type === 'imageMessage') {
      content = { image: await q.download() };
    } else if (type === 'videoMessage') {
      content = { video: await q.download() };
    } else if (type === 'stickerMessage') {
      content = { sticker: await q.download() };
    } else if (type === 'conversation' || type === 'extendedTextMessage') {
      const msgText = m.quoted?.text || mensaje;
      if (!msgText.trim()) {
        return conn.reply(m.chat, '⚠️ No se detectó texto válido para enviar al canal.', m);
      }
      content = { text: msgText.trim() };
    } else {
      return conn.reply(m.chat, '⚠️ Responde a un mensaje con imagen, video, sticker o texto, o escribe texto después del comando.', m);
    }

    const res = await conn.sendMessage(canalJid, content);

    if (!res?.key?.id) throw '❌ El contenido no se pudo enviar (respuesta inválida).';

    return conn.reply(m.chat, `*✅ Contenido enviado correctamente al canal:*\n${canalJid.replace('@newsletter', '')}`, m);

  } catch (e) {
    console.error('[ERROR EN PUBLICAR]:', e);
    return conn.reply(m.chat, '❌ Error al procesar o enviar al canal.', m);
  }
};

handler.help = ['send2channel'];
handler.tags = ['tools'];
handler.command = ['sendtes'];
handler.rowner = true;

export default handler;