/**
 * Envía un mensaje mini con título, imagen y botón.
 * @param {Object} conn - Conexión de Baileys
 * @param {String} jid - ID del chat
 * @param {String} title - Título del botón
 * @param {String} content - Texto del mensaje
 * @param {String} footer - Texto de pie de mensaje
 * @param {Buffer} thumbnail - Imagen como buffer
 * @param {String} url - Enlace al que apunta el botón
 * @param {Object} quoted - Mensaje citado (opcional)
 */
export async function sendMini(conn, jid, title, content, footer, thumbnail, url, quoted) {
  const template = {
    templateMessage: {
      hydratedTemplate: {
        hydratedContentText: content,
        hydratedFooterText: footer || null,
        hydratedButtons: [
          {
            urlButton: {
              displayText: title || 'Ver enlace',
              url: url || 'https://github.com/ShadowUltra-MD'
            }
          }
        ],
        locationMessage: {
          jpegThumbnail: thumbnail
        }
      }
    }
  }

  await conn.relayMessage(jid, template, { messageId: quoted?.key?.id })
}