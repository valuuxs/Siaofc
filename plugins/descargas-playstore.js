import gplay from 'google-play-scraper';
import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix: prefix, command }) => {
    if (!args[0]) {
        return conn.reply(m.chat, `*[ ☕ ] Ingresa el enlace de la aplicación que deseas descargar de la Play Store.*\n\n*[ 💡 ] Ejemplo:* ${prefix}playstore https://play.google.com/store/apps/details?id=com.whatsapp`, m);
    }

    m.react('⌛');

    const url = args[0];
    let packageName;
    try {
        packageName = new URL(url).searchParams.get("id");
        if (!packageName) throw new Error();
    } catch {
        return conn.reply(m.chat, `*[ ❌ ] La URL proporcionada no es válida o no contiene un ID de aplicación.*`, m);
    }

    let info;
    try {
        info = await gplay.app({ appId: packageName });
    } catch (err) {
        console.error(err);
        return conn.reply(m.chat, `*[ ❌ ] No se pudo encontrar la aplicación. Asegúrate de que el enlace sea correcto.*`, m);
    }

    const h = info.title;
    let link = `https://d.apkpure.com/b/APK/${info.appId}?version=latest`;

    try {
        const response = await fetch(link);
        if (!response.ok) throw new Error('No se pudo obtener el archivo APK.');
        
        await conn.sendFile(m.chat, link, `${h}.apk`, ``, m, false, { mimetype: 'application/vnd.android.package-archive', asDocument: true });
        m.react('✅️');
    } catch (err) {
        console.error(err);
        return conn.reply(m.chat, `*[ ❌ ] No se pudo obtener el archivo APK. Intenta con otro enlace.*`, m);
    }
}

handler.help = ['playstore *<url>*']; 
handler.tags = ['downloader'];
handler.command = /^(playstore|psdl)$/i;
handler.register = true;

export default handler;

// ⚠️⚠️⚠️⚠️⚠️
import gplay from 'google-play-scraper';
import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix: prefix, command }) => {
    m.react('🤍');

    if (!args[0]) {
        console.log('Argumento vacío, enviando mensaje de ayuda');
        return conn.reply(m.chat, `*🚩 Ingresa el enlace de la aplicación que deseas descargar de la Play Store.*\n\n*Ejemplo:*\n\`${prefix + command} https://play.google.com/store/apps/details?id=com.whatsapp\``, m, rcanal);
    }

    const url = args[0];

    let packageName;
    try {
        packageName = new URL(url).searchParams.get("id");
        if (!packageName) throw new Error();
    } catch {
        return conn.reply(m.chat, `*❌ La URL proporcionada no es válida o no contiene un ID de aplicación.*`, m, rcanal);
    }

    console.log(`ID de paquete: ${packageName}`);

    let info;
    try {
        info = await gplay.app({ appId: packageName });
    } catch (error) {
        console.error(error);
        return conn.reply(m.chat, `*❌ No se pudo encontrar la aplicación. Asegúrate de que el enlace sea correcto.*`, m, rcanal);
    }

    const h = info.title;
    console.log(`Título de la aplicación: ${h}\nID de la aplicación: ${info.appId}`);

    let link = `https://d.apkpure.com/b/APK/${info.appId}?version=latest`;

    conn.sendFile(m.chat, link, `${h}.apk`, ``, m, false, { mimetype: 'application/vnd.android.package-archive', asDocument: true });
    m.react('✅️');

    //conn.reply(m.chat, `*¡Descarga completada para "${h}"!*`, m, rcanal);
}

handler.help = ['playstore *<url>*']; 
handler.tags = ['descargas'];
handler.command = /^(playstore)$/i;
export default handler;