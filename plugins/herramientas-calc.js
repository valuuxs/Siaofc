let handler = async (m, { conn, text }) => {
  let id = m.chat
  conn.math = conn.math ? conn.math : {}
  if (id in conn.math) {
    clearTimeout(conn.math[id][3])
    delete conn.math[id]
    m.reply('.... ')
  }
  let val = text
    .replace(/[^0-9\-\/+*×÷πEe()piPI/]/g, '')
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/π|pi/gi, 'Math.PI')
    .replace(/e/gi, 'Math.E')
    .replace(/\/+/g, '/')
    .replace(/\++/g, '+')
    .replace(/-+/g, '-')
  let format = val
    .replace(/Math\.PI/g, 'π')
    .replace(/Math\.E/g, 'e')
    .replace(/\//g, '÷')
    .replace(/\*×/g, '×')
  try {
    console.log(val)
    let result = (new Function('return ' + val))()
    if (!result) throw result
    m.reply(`*${format}* = _${result}_`)
  } catch (e) {
    if (e == undefined) return m.reply(`*${xtools} Por favor, ingresa una ecuación.*\n*Símbolos compatibles:*\n> -, +, *, /, ×, ÷, π, e, (, )`)
    return m.reply(`*${xtools} Ingresa un formato correcto, números del \`0-9\` y símbolos* \`-, +, *, /, ×, ÷, π, e, (, )\``)
  }
}
handler.help = ['cal *<ecuacion>*']
handler.tags = ['tools']
handler.command = ['cal', 'calc', 'calcular', 'calculadora'] 

export default handler