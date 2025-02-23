//CODIGO MEJORADO POR CRISS ESCOBAR

import fetch from 'node-fetch';
import axios from 'axios';

const handler = async (m, { conn, command }) => {
  if (command === 'consejo') {
    const consejo = consejos[Math.floor(Math.random() * consejos.length)];
    const mensaje = `╭─◆────◈⚘◈─────◆─╮\n\n🌟 *Consejo del día* 🌟\n\n❥ ${consejo}\n\n╰─◆────◈⚘◈─────◆─╯`;
    await m.reply(mensaje);
  }

  if (command === 'fraseromantica') {
    const frase_romantica = frasesromanticas[Math.floor(Math.random() * frasesromanticas.length)];
    const mensaje = `╭─◆────◈⚘◈─────◆─╮\n\n💖 *Frase romántica* 💖\n\n❥ ${frase_romantica}\n\n╰─◆────◈⚘◈─────◆─╯`;
    await m.reply(mensaje);
  }

  if (command === 'historiaromantica') {
    try {
      await conn.sendPresenceUpdate('composing', m.chat); // Indica que está escribiendo

      const prompt = "Crea una historia romántica breve con diálogos y emociones profundas.";
      const historia = await generarHistoria(prompt);

      const mensaje = `╭─◆────◈📖◈─────◆─╮\n\n💌 *Historia Romántica* 💌\n\n${historia}\n\n╰─◆────◈📖◈─────◆─╯`;
      await m.reply(mensaje);
    } catch (error) {
      console.error('*[ ℹ️ ] Error al generar historia:*', error);
      await m.reply(m.chat, '*🥀 Error al generar la historia. Inténtalo más tarde.*', m);
    }
  }
};

handler.tags = ['frases'];
handler.command = handler.help = ['consejo', 'fraseromantica', 'historiaromantica'];
export default handler;

/*
async function generarHistoria(prompt) {
  try {
    const response = await axios.post('https://Luminai.my.id', {
      content: prompt,
      user: 'usuario',
      webSearchMode: false
    });

    return response.data.result;
  } catch (error) {
    console.error('Error en la IA:', error);
    throw error;
  }
}*/

async function luminsesi(q, username, logic) {
  try {
    const response = await axios.post("https://Luminai.my.id", {
      content: q,
      user: username,
      prompt: `${logic} Responde en español.`,
      webSearchMode: false
    });
    return response.data.result;
  } catch (error) {
    console.error('*[ ℹ️ ] Error al obtener la historia:*', error);
    return '*🥀 Error al generar la historia. Intenta nuevamente más tarde.*';
  }
}

global.frasesromanticas = [
  'Eres la luz que ilumina mi vida en la oscuridad.',
  'Contigo, cada día es una nueva aventura llena de amor.',
  'Tus ojos son el reflejo del cielo en el que quiero perderme.',
  'Cada latido de mi corazón lleva tu nombre.',
  'En tus brazos encontré el hogar que siempre busqué.',
  'Eres el sueño que nunca quiero despertar.',
  'El amor verdadero es estar juntos en las buenas y en las malas.',
  'No existen distancias cuando dos corazones están unidos.',
  'Tus besos son la melodía que acelera mi corazón.',
  'Amar es ver en ti lo que nadie más puede ver.',
  'En cada latido, te llevo conmigo a todas partes.',
  'El amor que siento por ti es mi fuerza y mi inspiración.',
  'Tus palabras dulces son mi alimento emocional diario.',
  'Eres el regalo más preciado que la vida me ha dado.',
  'El tiempo se detiene cuando estoy junto a ti.',
  'En tu sonrisa encuentro la felicidad que buscaba.',
  'Cada día a tu lado es una historia de amor sin fin.',
  'Nuestro amor es como un cuento de hadas hecho realidad.',
  'Tus abrazos son mi refugio en este mundo caótico.',
  'Eres la razón por la que creo en el destino.',
  'Amar es descubrir cada día algo nuevo que admiro en ti.',
  'Tu amor es el lienzo en blanco donde pinto mi felicidad.',
  'Contigo, el futuro es un camino lleno de promesas y sueños.',
  'Eres el faro que guía mi corazón en la oscuridad.',
  'La magia del amor se encuentra en cada gesto que compartimos.',
  'Nuestro amor es un baile eterno de pasión y ternura.',
  'En tus brazos, el mundo entero desaparece y solo existimos tú y yo.',
  'El amor es el idioma en el que nuestros corazones conversan.',
  'Eres el pedacito que me faltaba para completar mi alma.',
  'Amar es encontrar en ti todo lo que nunca supe que necesitaba.',
];

global.consejos = [
  'Acepta que los cambios son parte natural de la vida, y aprende a adaptarte a ellos.',
  'Nunca dejes de aprender; el conocimiento es una herramienta poderosa.',
  'Cuida de tu salud física y mental, son fundamentales para una vida plena.',
  'Disfruta de las pequeñas cosas, pues son ellas las que dan sentido a la vida.',
  'Aprende a perdonar, tanto a los demás como a ti mismo, para liberar tu corazón.',
  'Valora el tiempo que pasas con tus seres queridos, es el regalo más valioso que puedes dar y recibir.',
  'Sé amable y compasivo con los demás, cada acto de bondad puede marcar la diferencia en sus vidas.',
  'Aprende a decir "no" cuando sea necesario, y establece límites saludables.',
  'Encuentra tiempo para hacer lo que te apasiona, pues eso nutre tu alma y te hace sentir vivo.',
  'No te compares con los demás, cada persona tiene su propio camino y ritmo en la vida.',
  'Escucha a tu pareja con empatía y comprensión, la comunicación es la base de una relación sólida.',
  'No tengas miedo de expresar tus sentimientos, la honestidad es esencial en el amor.',
  'Aprende a ceder y a comprometerte, el amor requiere de sacrificio y esfuerzo mutuo.',
  'Sorprende a tu pareja de vez en cuando, mantén viva la chispa del romance.',
  'Respeta la individualidad de tu pareja y permítele crecer como persona.',
  'El amor propio es igual de importante que amar a alguien más; cuídate y valórate.',
  'Recuerda que una relación sana se basa en la confianza mutua y el respeto.',
  'Elige a alguien que te complemente y te haga ser una mejor versión de ti mismo.',
  'El amor verdadero no te hace sentir menos, te hace sentir más.',
  'Amar es un verbo, es una elección diaria que se cultiva con acciones y palabras.',
  'Encuentra un trabajo que te apasione, y nunca sentirás que estás trabajando.',
  'Sé proactivo y toma la iniciativa en tu trabajo, eso será valorado por tus superiores.',
  'Aprende de tus errores y fracasos, son oportunidades para crecer y mejorar.',
  'Mantén una actitud positiva y busca soluciones ante los desafíos laborales.',
  'Cultiva buenas relaciones con tus colegas, el trabajo en equipo es clave para el éxito.',
  'Establece metas claras y realistas, y trabaja con determinación para alcanzarlas.',
  'No tengas miedo de pedir ayuda o buscar mentoría, siempre hay algo nuevo que aprender.',
  'Reconoce y valora tus logros, celebra tus éxitos por pequeños que sean.',
  'Busca un equilibrio entre tu vida laboral y personal, ambos aspectos son importantes.',
  'El trabajo es una parte importante de tu vida, pero no es lo único que define quién eres.',
  'Cree en ti mismo y en tu capacidad para lograr lo que te propongas.',
  'Visualiza tus metas y sueños, imagina cómo te sentirás al alcanzarlos.',
  'Encuentra inspiración en aquellos que han superado obstáculos similares a los tuyos.',
  'Acepta los fracasos como parte del proceso, son oportunidades para aprender y crecer.',
  'Rodéate de personas positivas y que te impulsen hacia adelante.',
  'Mantén una mentalidad abierta y dispuesta a aprender cosas nuevas.',
  'Recuerda por qué empezaste cuando te sientas desmotivado; reconecta con tu propósito.',
];