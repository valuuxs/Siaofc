import { fetch } from "undici";

let handler = async (m, { conn, usedPrefix, command, args }) => {
  try {
    if (!args[0]) {
      return m.reply(`🌿 Ejemplo de uso:\n${usedPrefix + command} https://www.facebook.com/share/v/1FwfwCUQEv/`);
    }

    if (!args[0].match(/^(https?:\/\/)?(www\.|m\.)?(facebook|fb)\.(com|watch)[^\s]*$/i)) {
      return m.reply("⚠️ Enlace inválido. Asegúrate de que sea un enlace de Facebook válido.");
    }

    if (typeof m.react === "function") m.react('🕒');

    const fb = await aio(args[0]);

    if (!fb?.medias?.[0]) {
      return m.reply("❌ No se pudo obtener el video. Puede que el enlace no sea público o esté restringido.");
    }

    const { url, quality, formattedSize } = fb.medias[0];

    await conn.sendMessage(m.chat, {
      video: { url },
      caption: `🌷 *Calidad:* ${quality}\n🌳 *Peso:* ${formattedSize}`
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    return m.reply(`❌ Error al descargar el video:\n${e.message}`);
  }
};

handler.help = ["facebook"];
handler.command = ["fbc2", "facebook2"];
handler.tags = ["dl"];
export default handler;

async function aio(url) {
  try {
    const response = await fetch("https://anydownloader.com/wp-json/aio-dl/video-data/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": "https://anydownloader.com/",
        "Token": "5b64d1dc13a4b859f02bcf9e572b66ea8e419f4b296488b7f32407f386571a0d"
      },
      body: new URLSearchParams({ url }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}