/*import FormData from "form-data"
import Jimp from "jimp"

let handler = async (m, { conn, usedPrefix, command }) => {
  conn.hdr = conn.hdr ? conn.hdr : {}
  if (m.sender in conn.hdr)
    throw m.reply("✧ Aún hay procesos en el chat >//<");
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || q.mediaType || ""
  if (!mime)
    throw m.reply(`*[ ℹ️ ] Etiqueta una Imagen.*`)
  if (!/image\/(jpe?g|png)/.test(mime))
    throw m.reply(`*[ ℹ️ ] Etiqueta una Imagen.*`);
  else conn.hdr[m.sender] = true;
  m.reply("*Mejorando la calidad de imagen...*")
  let img = await q.download?.()
  let error
  try {
    const This = await processing(img, "enhance")
    conn.sendFile(m.chat, This, "", "*Listo :3*", m)
  } catch (er) {
    error = true
  } finally {
    if (error) {
      m.reply("Error :(")
    }
    delete conn.hdr[m.sender]
  }
}

handler.help = ['hd *<img>*', 'remini *<img>*']
handler.tags = ['herramientas']
handler.command = /^(hd|remini)$/i
handler.register = true

export default handler

async function processing(urlPath, method) {
  return new Promise(async (resolve, reject) => {
    let Methods = ["enhance"]
    Methods.includes(method) ? (method = method) : (method = Methods[0]);
    let buffer,
      Form = new FormData(),
      scheme = "https" + "://" + "inferenceengine" + ".vyro" + ".ai/" + method;
    Form.append("model_version", 1, {
      "Content-Transfer-Encoding": "binary",
      contentType: "multipart/form-data; charset=uttf-8",
    });
    Form.append("image", Buffer.from(urlPath), {
      filename: "enhance_image_body.jpg",
      contentType: "image/jpeg",
    });
    Form.submit(
      {
        url: scheme,
        host: "inferenceengine" + ".vyro" + ".ai",
        path: "/" + method,
        protocol: "https:",
        headers: {
          "User-Agent": "okhttp/4.9.3",
          Connection: "Keep-Alive",
          "Accept-Encoding": "gzip",
        },
      },
      function (err, res) {
        if (err) reject();
        let data = [];
        res
          .on("data", function (chunk, resp) {
            data.push(chunk);
          })
          .on("end", () => {
            resolve(Buffer.concat(data));
          });
        res.on("error", (e) => {
          reject();
        });
      }
    );
  });
}*/

import FormData from "form-data";
import Jimp from "jimp";
const handler = async (m, {conn, usedPrefix, command}) => {
 try {    
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || q.mediaType || "";
  if (!mime) return m.reply(`🚩 Envie una imagen o responda a la imagen utilizando el comando: ${usedPrefix + command}`);
  if (!/image\/(jpe?g|png)/.test(mime)) return m.reply(`🍂 El formato del archivo (${mime}) no es compatible, envía o responda a una imagen`);
  conn.reply(m.chat, '🚩 Mejorando la calidad de la imagen....', m, {
  contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, showAdAttribution: true,
  title: packname,
  body: wm,
  previewType: 0, thumbnail: icons,
  sourceUrl: channel }}})
  let img = await q.download?.();
  let pr = await remini(img, "enhance");
  conn.sendMessage(m.chat, {image: pr}, {quoted: fkontak});
 } catch {
 return m.reply("🚩 Ocurrió un error");
 }
};
handler.help = ["remini", "hd", "enhance"];
handler.tags = ["tools"];
handler.command = ["remini", "hd", "enhance"];
export default handler;

async function remini(imageData, operation) {
  return new Promise(async (resolve, reject) => {
    const availableOperations = ["enhance", "recolor", "dehaze"];
    if (availableOperations.includes(operation)) {
      operation = operation;
    } else {
      operation = availableOperations[0];
    }
    const baseUrl = "https://inferenceengine.vyro.ai/" + operation + ".vyro";
    const formData = new FormData();
    formData.append("image", Buffer.from(imageData), {filename: "enhance_image_body.jpg", contentType: "image/jpeg"});
    formData.append("model_version", 1, {"Content-Transfer-Encoding": "binary", contentType: "multipart/form-data; charset=utf-8"});
    formData.submit({url: baseUrl, host: "inferenceengine.vyro.ai", path: "/" + operation, protocol: "https:", headers: {"User-Agent": "okhttp/4.9.3", Connection: "Keep-Alive", "Accept-Encoding": "gzip"}},
      function (err, res) {
        if (err) reject(err);
        const chunks = [];
        res.on("data", function (chunk) {chunks.push(chunk)});
        res.on("end", function () {resolve(Buffer.concat(chunks))});
        res.on("error", function (err) {
        reject(err);
        });
      },
    );
  });
}