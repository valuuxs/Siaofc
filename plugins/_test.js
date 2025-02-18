const handler = async (m, { args }) => {
  const q = args.join(' ');
  if (!q || !args[0]) throw '*[❗] INGRESE EL NÚMERO QUE DESEA DESACTIVAR EN FORMATO INTERNACIONAL, EJEMPLO: +1 (450) 555-555*';

  // Simula un pequeño retraso para hacerlo más creíble
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Mensaje falso de éxito
  m.reply(`##- WhatsApp Support -##\n\nHola,\n\nGracias por tu mensaje.\n\nHemos desactivado tu cuenta de WhatsApp. Esto significa que su cuenta está deshabilitada temporalmente y se eliminará automáticamente en 30 días si no vuelve a registrar la cuenta.\n\nSi tiene alguna otra pregunta o inquietud, no dude en ponerse en contacto con nosotros. ¡Estaremos encantados de ayudar!`);
};

handler.command = /^(soporte2)$/i;

export default handler;