const handler = async (m, { conn }) => {
  let totalf = Object.values(global.plugins).reduce((total, plugin) => {
    if (plugin.command) {
      if (Array.isArray(plugin.command)) {
        return total + plugin.command.length;
      } else {
        return total + 1;
      }
    }
    return total;
  }, 0);

  conn.reply(m.chat, `*[ ℹ️ ] El bot cuenta actualmente con \`${totalf}\` comandos disponibles.*\n*Si tienes alguna sugerencia no dudes en contactar con mi creador.*`, m);
};
handler.command = ['totalcomandos', 'comandostotales', 'totalf'];
export default handler;