let handler = async (m, { conn, text, command }) => {
    let id = text ? text : m.chat
    let chat = global.db.data.chats[m.chat]
    chat.welcome = false
    await conn.reply(id, `*${xowner} SiaBot abandona el grupo, fué genial estar aquí 👋*`)
    await conn.groupLeave(id)
    try {
        chat.welcome = true
    } catch (e) {
        await m.reply(`${fg}`)
        return console.log(e)
    }
}
handler.command = /^(salir|leavegc|salirdelgrupo|leave|out)$/i
handler.group = true
handler.rowner = true
export default handler