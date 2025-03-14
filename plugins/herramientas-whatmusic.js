import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'fs';

let handler = async (m) => {
    let q = m.quoted ? m.quoted : m;
    let mime = q.mimetype || '';

    if (/audio|video/.test(mime)) {
        let media = await q.download(true);
        let upload = await uploadFile(media);

        if (!upload || !upload.files || !upload.files[0]) {
            return m.reply('🚩 Error al subir el archivo.');
        }

        let url = upload.files[0];
        let response = await fetch(`https://apis-starlights-team.koyeb.app/starlight/chazam?url=${url}`);
        let json = await response.json();

        if (!json || !json.title) {
            return m.reply('🚩 No se pudo reconocer la canción.');
        }

        let txt = `*\`-• C H A Z A M - M U S I C •-\`*\n\n` +
                  `🍟 *Nombre:* ${json.title}\n` +
                  `🍟 *Artista:* ${json.artist}\n` +
                  `🍟 *Tipo:* ${json.type}\n` +
                  `🍟 *Link:* ${json.url}`;

        m.reply(txt);
    } else {
        return m.reply('🚩 Responde a un *Audio/Video.*');
    }
};

handler.help = ['shazam *<Audio/Video>*'];
handler.tags = ['tools'];
handler.command = /^(shazam|whatmusic)$/i;
handler.register = true;

export default handler;

async function uploadFile(path) {
    let form = new FormData();
    form.append('files[]', fs.createReadStream(path));

    let res = await (await fetch('https://uguu.se/upload.php', {
        method: 'post',
        headers: {
            ...form.getHeaders()
        },
        body: form
    })).json();

    await fs.promises.unlink(path);
    return res;
}