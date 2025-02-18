import cheerio from 'cheerio';
import axios from 'axios';

const handler = async (m, { args }) => {
  const q = args.join(' ');
  if (!q || !args[0]) {
    return m.reply('*[❗] INGRESE EL NÚMERO QUE DESEA DESACTIVAR EN FORMATO INTERNACIONAL, EJEMPLO: +1 (450) 555-555*');
  }

  try {
    const ntah = await axios.get('https://www.whatsapp.com/contact/noclient/');
    
    // Verificar si WhatsApp envió cookies
    const cookies = ntah.headers['set-cookie'] || [];
    if (!cookies.length) {
      return m.reply('*[❗] Error: No se recibieron cookies de WhatsApp. Intente de nuevo más tarde.*');
    }
    
    const cookie = cookies.join('; ');
    const $ = cheerio.load(ntah.data);
    const $form = $('form');

    if (!$form.attr('action')) {
      return m.reply('*[❗] Error: No se encontró el formulario de WhatsApp. Es posible que el método ya no funcione.*');
    }

    const url = new URL($form.attr('action'), 'https://www.whatsapp.com').href;
    const form = new URLSearchParams();
    
    form.append('jazoest', $form.find('input[name=jazoest]').val() || '');
    form.append('lsd', $form.find('input[name=lsd]').val() || '');
    form.append('step', 'submit');
    form.append('country_selector', 'ID');
    form.append('phone_number', q);
    form.append('platform', 'ANDROID');
    form.append('your_message', `Perdido/robado: desactive mi cuenta: ${q}`);
    
    const res = await axios({
      url,
      method: 'POST',
      data: form,
      headers: { cookie }
    });

    const payload = String(res.data);
    if (payload.includes(`"payload":true`)) {
      return m.reply(`✅ *WhatsApp Support*\n\nSu cuenta ha sido desactivada con éxito.\n\nSi desea recuperarla, vuelva a registrarse dentro de los próximos 30 días.`);
    } else {
      return m.reply(`⚠️ *WhatsApp Support*\n\nNo se pudo procesar la solicitud. Es posible que necesite verificar la propiedad del número.`);
    }

  } catch (error) {
    return m.reply(`❌ *Error*\n\nNo se pudo completar la solicitud. Detalles: ${error.message}`);
  }
};

handler.command = /^(supportwa|swa|soporte|support|desactivarwa)$/i;
export default handler;