export async function all(m) {
    if (!m.isGroup)
        return
    let chats = global.db.data.chats[m.chat]
    if (!chats.expired)
        return !0
    if (+new Date() > chats.expired) {
        await this.reply(m.chat, `*📖 Tiempo de Uso Expirado*

*El tiempo del bot ah finalizado. Para renovarlo y seguir disfrutando de sus funciones, contacta con mi creador:*
Wa.me/56971943258

*O también puedes unirte al grupo oficial donde podrás disfrutar del bot sin límites.*
https://chat.whatsapp.com/HhZUtxp2KRTD5rD5j09VCy`)
        await this.groupLeave(m.chat)
        chats.expired = null
    }
}