export async function all(m) {
    if (!m.isGroup)
        return
    let chats = global.db.data.chats[m.chat]
    if (!chats.expired)
        return !0
    if (+new Date() > chats.expired) {
        await this.reply(m.chat, `*📖 Tiempo de Uso Expirado*

*El tiempo del bot ah finalizado. Para renovarlo y seguir disfrutando de sus funciones, contacta con mi creador:*
Wa.me/51927238856

*O también puedes unirte al grupo oficial donde podrás disfrutar del bot sin límites.*
https://chat.whatsapp.com/FCS6htvAmlT7nq006lxU4I`)
        await this.groupLeave(m.chat)
        chats.expired = null
    }
}