import axios from 'axios';

let handler = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, '*[ ℹ️ ] Ingresa el ID de un usuario de Free Fire que quieras stalkear.*\n\n*[ 💡 ] Ejemplo:* .ffstalk 2307852461\n\n> El comando está en desarrollo, puede haber errores.', m);

    try {
        await m.react('⏳'); // Indica que el proceso ha comenzado

        let api = await axios.get(`https://vapis.my.id/api/ff-stalk?id=${text}`);  
        let json = api.data;  
        if (!json.status) {
            await m.react('❌');
            return conn.reply(m.chat, "*[ ❌ ] No se encontraron resultados.*", m);  
        }

        let { account, pet_info = {}, guild = {}, equippedItems = {} } = json.data;  
        let { name, level, xp, region, like, bio, create_time, last_login, honor_score, booyah_pass, BR_points, CS_points } = account;  
        let { name: petName = "Sin mascota", level: petLevel = 0, xp: petXP = 0 } = pet_info;
        let { name: guildName = "Sin clan", level: guildLevel = 0, member = 0, capacity = 0 } = guild;  
        let equipped_title = equippedItems?.Title?.[0]?.name || "Ninguno";

        let HS = `*[ 🔍 INFO - USUARIO ]*
- *Usuario:* ${name}
- *Nivel:* ${level}
- *XP:* ${xp}
- *Región:* ${region}
- *Like:* ${like}
- *Bio:* ${bio || "No disponible"}
- *Fecha de Creación:* ${create_time}
- *Último Inicio de Sesión:* ${last_login}
- *Honor Score:* ${honor_score}
- *Booyah Pass:* ${booyah_pass ? "Sí" : "No"}
- *Puntos BR:* ${BR_points}
- *Puntos CS:* ${CS_points}
- *Título Equipado:* ${equipped_title}

*[ 🐾 INFO - MASCOTA ]*
- *Nombre:* ${petName}
- *Nivel:* ${petLevel}
- *XP:* ${petXP}

*[ 🏆 INFO - CLAN ]*
- *Nombre del clan:* ${guildName}
- *Nivel del clan:* ${guildLevel}
- *Miembros:* ${member} / ${capacity} miembros
`;

        await conn.sendMessage(m.chat, { text: HS }, { quoted: m });
        await m.react('✅'); // Indica que el proceso terminó con éxito

    } catch (error) {
        console.error("Error en la API:", error.response?.data || error);
        await m.react('❌'); // Indica error
        conn.reply(m.chat, "*[ ⚠️ ] Hubo un error al obtener los datos. Intenta de nuevo más tarde.*", m);
    }
};

handler.command = ['freefirestalk', 'ffstalk', 'ffs'];
handler.register = true;
export default handler;