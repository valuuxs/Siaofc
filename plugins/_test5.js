/**
 * Envía un mensaje con botón, imagen y texto compatible con todas las versiones.
 * @param {Object} conn - Conexión de Baileys
 * @param {String} jid - ID del chat
 * @param {String} title - Texto del botón
 * @param {String} content - Texto del mensaje principal
 * @param {String} footer - Pie del mensaje
 * @param {Buffer} thumbnail - Imagen como buffer
 * @param {String} url - (opcional) Enlace si quieres incluirlo como texto
 * @param {Object} quoted - Mensaje citado
 */
export async function sendMini(conn, jid, title, content, footer, thumbnail, url, quoted) {
  try {
    let message = {
      image: { jpegThumbnail: thumbnail, url: undefined },
      caption: content + (url ? `\n\n🌐 ${url}` : ''),
      footer: footer || '',
      buttons: [
        {
          buttonId: '.help',
          buttonText: { displayText: title || 'Ver menú' },
          type: 1
        }
      ],
      headerType: 4 // 4 = mensaje con imagen
    }

    await conn.sendMessage(jid, message, { quoted })
  } catch (e) {
    console.error('[sendMini ERROR]', e)
    conn.reply(jid, 'Ocurrió un error al enviar el mensaje mini.', quoted)
  }
}