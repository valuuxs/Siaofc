import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, isOwner }) => {
  if (!isOwner) return m.reply('⛔ Solo el dueño puede usar este comando');

  const basePath = './JadiBots';
  if (!fs.existsSync(basePath)) return m.reply('⚠️ No hay sesiones para limpiar.');

  const sesiones = fs.readdirSync(basePath);
  let eliminadas = 0;
  let activas = 0;

  for (let carpeta of sesiones) {
    const fullPath = path.join(basePath, carpeta);

    // Verifica si la carpeta corresponde a una sesión activa
    const activa = global.conns.some(c => c?.authState?.creds?.me?.id?.includes(carpeta));
    if (!activa) {
      try {
        fs.rmdirSync(fullPath, { recursive: true });
        eliminadas++;
      } catch (e) {
        console.error(`Error eliminando ${carpeta}:`, e);
      }
    } else {
      activas++;
    }
  }

  m.reply(`✅ Limpieza completada.\n\n🗑️ Carpetas eliminadas: ${eliminadas}\n📌 Sesiones activas conservadas: ${activas}`);
};

handler.command = ['cleansesiones', 'limpiasesiones', 'limpiarsesiones', 'cs'];
handler.tags = ['jadibot'];
handler.help = ['cleansesiones'];
handler.rowner = true;

export default handler;