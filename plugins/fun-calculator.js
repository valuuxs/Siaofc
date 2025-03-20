const handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) return conn.reply(m.chat, `*[ ℹ️ ] Menciona algún usuario.*`, m);

  const percentages = Math.floor(Math.random() * 101);
  const emojis = {
    gay: '🏳️‍🌈', lesbiana: '🏳️‍🌈', pajero: '😏💦', pajera: '😏💦',
    puto: '🔥🥵', puta: '🔥🥵', manco: '💩', manca: '💩',
    rata: '🐁', prostituto: '🫦👅', prostituta: '🫦👅'
  };

  const descriptions = {
    gay: [
      "💙 Eso es bajo, ¡Tú eres Joto, no Gay!",
      "🖤 Lo tuyo, lo tuyo es que eres Gay.",
      "💜 ¡Incluso más gay de lo que pensábamos!"
    ],
    lesbiana: [
      "👻 Quizás necesites más películas románticas en tu vida.",
      "💗 Mantén el amor floreciendo!",
      "❣️ ¡Eso es un amor extremo por las chicas!"
    ],
    pajero: [
      "🧡 Tal vez necesites más hobbies!",
      "💞 Mantén el buen trabajo (en solitario).",
      "💕 ¡Eso es una resistencia admirable!"
    ],
    pajera: [
      "🧡 Tal vez necesites más hobbies!",
      "💞 Mantén el buen trabajo (en solitario).",
      "💕 ¡Eso es una resistencia admirable!"
    ],
    puto: [
      "😼 ¡Más suerte en tu próxima conquista!",
      "😺 Mantén ese encanto ardiente!",
      "😻 ¡Estás en llamas!"
    ],
    puta: [
      "😼 ¡Más suerte en tu próxima conquista!",
      "😺 Mantén ese encanto ardiente!",
      "😻 ¡Estás en llamas!"
    ],
    manco: [
      "🌟 ¡No eres el único en ese club!",
      "🥷 Mantén esa actitud valiente!",
      "💌 ¡Tienes un talento muy especial!"
    ],
    manca: [
      "🌟 ¡No eres el único en ese club!",
      "🥷 Mantén esa actitud valiente!",
      "💌 ¡Tienes un talento muy especial!"
    ],
    rata: [
      "💥 Nada de malo en disfrutar del queso!",
      "👑 Come queso con responsabilidad!",
      "💖 ¡Un auténtico ratón de lujo!"
    ],
    prostituto: [
      "❀ El mercado está en auge!",
      "✨ Siempre es hora de negocios!",
      "💖 ¡Un/a verdadero/a profesional!"
    ],
    prostituta: [
      "❀ El mercado está en auge!",
      "✨ Siempre es hora de negocios!",
      "💖 ¡Un/a verdadero/a profesional!"
    ]
  };

  if (!descriptions[command]) return m.reply(`☁️ Comando inválido.`);

  const emoji = emojis[command] || '';
  let description;
  if (percentages < 50) description = descriptions[command][0];
  else if (percentages > 100) description = descriptions[command][2];
  else description = descriptions[command][1];

  const responses = [
    "El universo ha hablado.",
    "Los científicos lo confirman.",
    "¡Sorpresa!"
  ];
  const response = responses[Math.floor(Math.random() * responses.length)];

  const cal = `💫 *CALCULADORA*

💬 Los cálculos han arrojado que *${text.toUpperCase()}* es *${percentages}%* ${command} ${emoji}

➤ ${description}
➤ ${response}`.trim();

  async function loading() {
    const hawemod = [
      "《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
      "《 ████▒▒▒▒▒▒▒▒》30%",
      "《 ███████▒▒▒▒▒》50%",
      "《 ██████████▒▒》80%",
      "《 ████████████》100%"
    ];

    let { key } = await conn.sendMessage(m.chat, { text: `[🌠] ¡Calculando Porcentaje!`, mentions: conn.parseMention(cal) });

    for (let i = 0; i < hawemod.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await conn.sendMessage(m.chat, { text: hawemod[i], edit: key });
    }

    await conn.sendMessage(m.chat, { text: cal, edit: key, mentions: conn.parseMention(cal) });
  }

  loading();
};

handler.help = [
  'gay', 'lesbiana', 'pajero', 'pajera', 'puto', 'puta', 
  'manco', 'manca', 'rata', 'prostituto', 'prostituta'
];
handler.tags = ['fun'];
handler.group = true;
handler.command = [
  'gay', 'lesbiana', 'pajero', 'pajera', 'puto', 'puta', 
  'manco', 'manca', 'rata', 'prostituto', 'prostituta'
];

export default handler;