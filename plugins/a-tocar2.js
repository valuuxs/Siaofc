/* ౨ৎ ˖ ࣪⊹ 𝐁𝐲 𝐉𝐭𝐱𝐬 𐙚˚.ᡣ𐭩

❀ Canal Principal ≽^•˕• ྀི≼
https://whatsapp.com/channel/0029VaeQcFXEFeXtNMHk0D0n

❀ Canal Rikka Takanashi Bot
https://whatsapp.com/channel/0029VaksDf4I1rcsIO6Rip2X

❀ Canal StarlightsTeam
https://whatsapp.com/channel/0029VaBfsIwGk1FyaqFcK91S

❀ HasumiBot FreeCodes 
https://whatsapp.com/channel/0029Vanjyqb2f3ERifCpGT0W
*/
/*
// *𓍯𓂃𓏧♡  FREE FIRE STALK*
import axios from 'axios'

let HS = async (m, { conn, text }) => {
if (!text) return conn.reply(m.chat, `🌿 Ingresa el ID de un usuario de Free Fire que quieras stalkear`, m)

try {
let api = await axios.get(`https://vapis.my.id/api/ff-stalk?id=${text}`)
let json = api.data
if (!json.status) return conn.reply(m.chat, "No se encontraron resultados", m)

    let { account, pet_info, guild, ketua_guild } = json.data
    let { id, name, level, xp, region, like, bio, create_time,  last_login, honor_score, booyah_pass, booyah_pass_badge, evo_access_badge,  equipped_title, BR_points, CS_points } = account

let { name: petName, level: petLevel, xp: petXP } = pet_info

let { name: guildName, level: guildLevel, member, capacity } = guild

let HS = `*[ INFO - USUARIO ]*
- *Usuario:* ${name}
- *Nivel:* ${level}
- *XP:* ${xp}
- *Región:* ${region}
- *Like:* ${like}
- *Bio:* ${bio || "No disponible"}
- *Fecha de Creación:* ${create_time}
- *Último Inicio de Sesión:* ${last_login}
- *Honor Score:* ${honor_score}
- *Booyah Pass:* ${booyah_pass}
- *Puntos BR:* ${BR_points}
- *Puntos CS:* ${CS_points}

*[ INFO - MASCOTA ]*
  - *Nombre:* ${petName}
  - *Nivel:* ${petLevel}
  - *XP:* ${petXP}

*[ INFO - CLAN ]*
  - *Nombre del clan:* ${guildName}
  - *Nivel del clan:* ${guildLevel}
  - *Miembros:* ${member} / ${capacity} miembros
`

let { name: leaderName, level: leaderLevel, xp: leaderXP, BR_points: leaderBR, CS_points: leaderCS, like: leaderLike } = ketua_guild
HS += `*[ INFO - LIDER CLAN ]*
  - *Nombre:* ${leaderName}
  - *Nivel:* ${leaderLevel}
  - *XP:* ${leaderXP}
  - *Puntos BR:* ${leaderBR}
  - *Puntos CS:* ${leaderCS}
  - *Like:* ${leaderLike}
  - *Fecha de Creación:* ${ketua_guild.create_time}
  - *Último Inicio de Sesión:* ${ketua_guild.last_login}`

await conn.sendMessage(m.chat, { text: HS }, { quoted: m })
} catch (error) {
console.error(error)
}}

HS.command = ['freefirestalk', 'ffstalk']

export default HS
*/

import axios from 'axios';

let handler = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, `*[ ℹ️ ] Ingresa el ID de un usuario de Free Fire que quieras stalkear*`, m);

    try {
        let api = await axios.get(`https://vapis.my.id/api/ff-stalk?id=${text}`);
        let json = api.data;
        if (!json.status) return conn.reply(m.chat, "*[ ❌ ] No se encontraron resultados*", m);

        let { account, pet_info = {}, guild = {}, ketua_guild = {}, equippedItems = {} } = json.data;
        let { id, name, level, xp, region, like, bio, create_time, last_login, honor_score, booyah_pass, BR_points, CS_points } = account;

        let { name: petName = "Sin mascota", level: petLevel = 0, xp: petXP = 0 } = pet_info;
        let { name: guildName = "Sin clan", level: guildLevel = 0, member = 0, capacity = 0 } = guild;
        let equipped_title = equippedItems?.Title?.[0]?.name || "Ninguno";

        let HS = `*[ INFO - USUARIO ]*
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

*[ INFO - MASCOTA ]*
  - *Nombre:* ${petName}
  - *Nivel:* ${petLevel}
  - *XP:* ${petXP}

*[ INFO - CLAN ]*
  - *Nombre del clan:* ${guildName}
  - *Nivel del clan:* ${guildLevel}
  - *Miembros:* ${member} / ${capacity} miembros
`;

        if (ketua_guild.name) {
            HS += `\n*[ INFO - LÍDER DEL CLAN ]*
  - *Nombre:* ${ketua_guild.name}
  - *Nivel:* ${ketua_guild.level}
  - *XP:* ${ketua_guild.xp}
  - *Puntos BR:* ${ketua_guild.BR_points}
  - *Puntos CS:* ${ketua_guild.CS_points}
  - *Like:* ${ketua_guild.like}
  - *Fecha de Creación:* ${ketua_guild.create_time}
  - *Último Inicio de Sesión:* ${ketua_guild.last_login}`;
        }

        await conn.sendMessage(m.chat, { text: HS }, { quoted: m });
    } catch (error) {
        console.error("Error en la API:", error);
        conn.reply(m.chat, "Hubo un error al obtener los datos. Intenta de nuevo más tarde.", m);
    }
};

handler.command = ['freefirestalk', 'ffstalk'];
handler.register = true
export default handler;