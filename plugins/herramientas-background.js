import axios from 'axios';

let handler = async (m, { conn, text }) => {
    if (!text) {
        return conn.reply(m.chat, "*[ ℹ️ ] Ingresa el nombre de usuario de Instagram que quieras stalkear*", m);
    }

    try {
        const { data } = await axios.get(`https://api.vreden.my.id/api/igstalk?query=${encodeURIComponent(text)}`, { timeout: 10000 });

        if (!data?.status) {
            return conn.reply(m.chat, "*[ ❌ ] No se encontró ningún usuario con ese nombre*", m);
        }

        const user = data.result;

        let info = `*[ INFO - INSTAGRAM ]*
- *Usuario:* ${user.username}
- *Nombre completo:* ${user.full_name || "No disponible"}
- *Biografía:* ${user.biography || "No disponible"}
- *Seguidores:* ${user.followers}
- *Siguiendo:* ${user.following}
- *Cantidad de publicaciones:* ${user.posts}
- *Cuenta privada:* ${user.is_private ? "Sí" : "No"}
- *Cuenta verificada:* ${user.is_verified ? "Sí" : "No"}
- *URL del perfil:* ${user.profile_url}`;

        // Si quieres también enviar su foto de perfil
        await conn.sendMessage(m.chat, { image: { url: user.profile_pic_url_hd }, caption: info }, { quoted: m });

    } catch (error) {
        console.error("Error en la API de Instagram Stalk:", error);
        let msg = "Hubo un error al obtener los datos. Intenta nuevamente más tarde.";

        if (error.response) {
            msg += `\n\n*Detalles:*\n- Código: ${error.response.status}\n- Mensaje: ${error.response.statusText}`;
        } else if (error.code === "ECONNABORTED") {
            msg += "\n\nLa API tardó demasiado en responder.";
        }

        conn.reply(m.chat, msg, m);
    }
};

handler.command = ['igstalk', 'instagramstalk', 'instastalk'];
handler.register = true;
export default handler;