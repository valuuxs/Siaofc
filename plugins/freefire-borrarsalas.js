const handler = async (m, { args, conn }) => {
    const scope = (args[0] || '').toLowerCase();

    if (!global.vsData) global.vsData = {};

    if (scope === 'chat') {
        // Borra solo la sala del chat actual
        const salaId = Object.keys(global.vsData).find(id => global.vsData[id]?.chat === m.chat);
        if (salaId) {
            delete global.vsData[salaId];
            return conn.reply(m.chat, '*✅ Sala del chat eliminada correctamente.*', m);
        } else {
            return conn.reply(m.chat, '*⚠️ No hay ninguna sala asociada a este chat.*', m);
        }
    }

    // Borra todas las salas
    global.vsData = {};
    conn.reply(m.chat, '*✅ Todas las salas han sido eliminadas correctamente.*', m);
};

handler.command = /^borrarsalas$/i;
handler.rowner = true; // Solo el dueño puede usar este comando
export default handler;