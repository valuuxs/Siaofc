import { proto } from '@whiskeysockets/baileys'

/**
 * Envía un mensaje mini con título, imagen y botón.
 * @param {Object} conn - Conexión de Baileys
 * @param {String} jid - ID del chat
 * @param {String} title - Título principal (opcional)
 * @param {String} content - Contenido del mensaje
 * @param {String} footer - Texto de pie de mensaje
 * @param {Buffer} thumbnail - Imagen miniatura (recomendada en buffer)
 * @param {String} url - Enlace del botón
 * @param {Object} quoted - Mensaje citado
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
              displayText: title || 'Visitar',
              url: url || 'https://github.com/CristianOff/ShadowBot-MDv3'
            }
          }
        ],
        locationMessage: {
          jpegThumbnail: thumbnail
        }
      }
    }
  }

  await conn.relayMessage(jid, template, { messageId: quoted?.key?.id || undefined })
}