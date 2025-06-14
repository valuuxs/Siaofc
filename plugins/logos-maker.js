/*import {Maker} from 'imagemaker.js';
const handler = async (m, {conn, args, command, usedPrefix}) => {
  const response = args.join(' ').split('|');
  if (!args[0]) throw '*[❗] 𝙄𝙉𝙂𝙍𝙀𝙎𝙀 𝙐𝙉 𝙏𝙀𝙓𝙏𝙊*';
  if (command == 'logocorazon') {
    try {
      await conn.reply(m.chat, '*[❗] 𝙀𝙇𝘼𝘽𝙊𝙍𝘼𝙉𝘿𝙊 𝙇𝙊𝙂𝙊, 𝘼𝙂𝙐𝘼𝙍𝘿𝙀 𝙐𝙉 𝙋𝙊𝘾𝙊...*', m);
      const res = await new Maker().Ephoto360('https://en.ephoto360.com/text-heart-flashlight-188.html', [response[0]]);
      await conn.sendFile(m.chat, res.imageUrl, 'error.jpg', null, m);
    } catch {
      await conn.reply(m.chat, '*[❗𝐈𝐍𝐅𝐎❗] 𝙀𝙍𝙍𝙊𝙍. 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍, 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍𝙇𝙊*', m);
    }
  }
  if (command == 'logochristmas') {
    try {
      await conn.reply(m.chat, '*[❗] 𝙀𝙇𝘼𝘽𝙊𝙍𝘼𝙉𝘿𝙊 𝙇𝙊𝙂𝙊, 𝘼𝙂𝙐𝘼𝙍𝘿𝙀 𝙐𝙉 𝙋𝙊𝘾𝙊...*', m);
      const res2 = await new Maker().Ephoto360('https://en.ephoto360.com/christmas-effect-by-name-376.html', [response[0]]);
      await conn.sendFile(m.chat, res2.imageUrl, 'error.jpg', null, m);
    } catch {
      await conn.reply(m.chat, '*[❗] 𝙀𝙍𝙍𝙊𝙍. 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍, 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍𝙇𝙊*', m);
    }
  }
  if (command == 'logopareja') {
    try {
      await conn.reply(m.chat, '*[❗] 𝙀𝙇𝘼𝘽𝙊𝙍𝘼𝙉𝘿𝙊 𝙇𝙊𝙂𝙊, 𝘼𝙂𝙐𝘼𝙍𝘿𝙀 𝙐𝙉 𝙋𝙊𝘾𝙊...*', m);
      const res = await new Maker().Ephoto360('https://en.ephoto360.com/sunlight-shadow-text-204.html', [response[0]]);
      await conn.sendFile(m.chat, res.imageUrl, 'error.jpg', null, m);
    } catch {
      await conn.reply(m.chat, '*[❗] 𝙀𝙍𝙍𝙊𝙍. 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍, 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍𝙇𝙊*', m);
    }
  }
  if (command == 'logoglitch') {
    try {
      await conn.reply(m.chat, '*[❗] 𝙀𝙇𝘼𝘽𝙊𝙍𝘼𝙉𝘿𝙊 𝙇𝙊𝙂𝙊, 𝘼𝙂𝙐𝘼𝙍𝘿𝙀 𝙐𝙉 𝙋𝙊𝘾𝙊...*', m);
      const res = await new Maker().Ephoto360('https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html', [response[0]]);
      await conn.sendFile(m.chat, res.imageUrl, 'error.jpg', null, m);
    } catch {
      await conn.reply(m.chat, '*[❗] 𝙀𝙍𝙍𝙊𝙍. 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍, 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍𝙇𝙊*', m);
    }
  }
  if (command == 'logosad') {
    try {
      await conn.reply(m.chat, '*[❗] 𝙀𝙇𝘼𝘽𝙊𝙍𝘼𝙉𝘿𝙊 𝙇𝙊𝙂𝙊, 𝘼𝙂𝙐𝘼𝙍𝘿𝙀 𝙐𝙉 𝙋𝙊𝘾𝙊...*', m);
      const res = await new Maker().Ephoto360('https://en.ephoto360.com/write-text-on-wet-glass-online-589.html', [response[0]]);
      await conn.sendFile(m.chat, res.imageUrl, 'error.jpg', null, m);
    } catch {
      await conn.reply(m.chat, '*[❗] 𝙀𝙍𝙍𝙊𝙍. 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍, 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍𝙇𝙊*', m);
    }
  }
if (command == 'logogaming') {
  try {
    await conn.reply(m.chat, '*[❗] 𝙀𝙇𝘼𝘽𝙊𝙍𝘼𝙉𝘿𝙊 𝙇𝙊𝙂𝙊, 𝘼𝙂𝙐𝘼𝙍𝘿𝙀 𝙐𝙉 𝙋𝙊𝘾𝙊...*', m);
    const res = await new Maker().Ephoto360('https://en.ephoto360.com/make-team-logo-online-free-432.html', [response[0]]);
    await conn.sendFile(m.chat, res.imageUrl, 'error.jpg', null, m);
  } catch {
    await conn.reply(m.chat, '*[❗] 𝙀𝙍𝙍𝙊𝙍. 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍, 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍𝙇𝙊*', m);
  }
}
if (command == 'logosolitario') {
  try {
    await conn.reply(m.chat, '*[❗] 𝙀𝙇𝘼𝘽𝙊𝙍𝘼𝙉𝘿𝙊 𝙇𝙊𝙂𝙊, 𝘼𝙂𝙐𝘼𝙍𝘿𝙀 𝙐𝙉 𝙋𝙊𝘾𝙊...*', m);
    const res = await new Maker().Ephoto360('https://en.ephoto360.com/create-typography-text-effect-on-pavement-online-774.html', [response[0]]);
    await conn.sendFile(m.chat, res.imageUrl, 'error.jpg', null, m);
  } catch {
    await conn.reply(m.chat, '*[❗] 𝙀𝙍𝙍𝙊𝙍. 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍, 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍𝙇𝙊*', m);
  }
}
if (command == 'logodragonball') {
  try {
    await conn.reply(m.chat, '*[❗] 𝙀𝙇𝘼𝘽𝙊𝙍𝘼𝙉𝘿𝙊 𝙇𝙊𝙂𝙊, 𝘼𝙂𝙐𝘼𝙍𝘿𝙀 𝙐𝙉 𝙋𝙊𝘾𝙊...*', m);
    const res = await new Maker().Ephoto360('https://en.ephoto360.com/create-dragon-ball-style-text-effects-online-809.html', [response[0]]);
    await conn.sendFile(m.chat, res.imageUrl, 'error.jpg', null, m);
  } catch {
    await conn.reply(m.chat, '*[❗] 𝙀𝙍𝙍𝙊𝙍. 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍, 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍𝙇𝙊*', m);
  }
}
if (command == 'logoneon') {
  try {
    await conn.reply(m.chat, '*[❗] 𝙀𝙇𝘼𝘽𝙊𝙍𝘼𝙉𝘿𝙊 𝙇𝙊𝙂𝙊, 𝘼𝙂𝙐𝘼𝙍𝘿𝙀 𝙐𝙉 𝙋𝙊𝘾𝙊...*', m);
    const res = await new Maker().Ephoto360('https://en.ephoto360.com/create-impressive-neon-glitch-text-effects-online-768.html', [response[0]]);
    await conn.sendFile(m.chat, res.imageUrl, 'error.jpg', null, m);
  } catch {
    await conn.reply(m.chat, '*[❗] 𝙀𝙍𝙍𝙊𝙍. 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍, 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍𝙇𝙊*', m);
  }
}
if (command == 'logogatito') {
  try {
    await conn.reply(m.chat, '*[❗] 𝙀𝙇𝘼𝘽𝙊𝙍𝘼𝙉𝘿𝙊 𝙇𝙊𝙂𝙊, 𝘼𝙂𝙐𝘼𝙍𝘿𝙀 𝙐𝙉 𝙋𝙊𝘾𝙊...*', m);
    const res = await new Maker().Ephoto360('https://en.ephoto360.com/handwritten-text-on-foggy-glass-online-680.html', [response[0]]);
    await conn.sendFile(m.chat, res.imageUrl, 'error.jpg', null, m);
  } catch {
    await conn.reply(m.chat, '*[❗] 𝙀𝙍𝙍𝙊𝙍. 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍, 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍𝙇𝙊*', m);
  }
}
if (command == 'logochicagamer') {
  try {
    await conn.reply(m.chat, '*[❗] 𝙀𝙇𝘼𝘽𝙊𝙍𝘼𝙉𝘿𝙊 𝙇𝙊𝙂𝙊, 𝘼𝙂𝙐𝘼𝙍𝘿𝙀 𝙐𝙉 𝙋𝙊𝘾𝙊...*', m);
    const res = await new Maker().Ephoto360('https://en.ephoto360.com/create-cute-girl-gamer-mascot-logo-online-687.html', [response[0]]);
    await conn.sendFile(m.chat, res.imageUrl, 'error.jpg', null, m);
  } catch {
    await conn.reply(m.chat, '*[❗] 𝙀𝙍𝙍𝙊𝙍. 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍, 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍𝙇𝙊*', m);
  }
}
if (command == 'logonaruto') {
  try {
    await conn.reply(m.chat, '*[❗] 𝙀𝙇𝘼𝘽𝙊𝙍𝘼𝙉𝘿𝙊 𝙇𝙊𝙂𝙊, 𝘼𝙂𝙐𝘼𝙍𝘿𝙀 𝙐𝙉 𝙋𝙊𝘾𝙊...*', m);
    const res = await new Maker().Ephoto360('https://en.ephoto360.com/naruto-shippuden-logo-style-text-effect-online-808.html', [response[0]]);
    await conn.sendFile(m.chat, res.imageUrl, 'error.jpg', null, m);
  } catch {
    await conn.reply(m.chat, '*[❗] 𝙀𝙍𝙍𝙊𝙍. 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍, 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍𝙇𝙊*', m);
  }
}
if (command == 'logofuturista') {
  try {
    await conn.reply(m.chat, '*[❗] 𝙀𝙇𝘼𝘽𝙊𝙍𝘼𝙉𝘿𝙊 𝙇𝙊𝙂𝙊, 𝘼𝙂𝙐𝘼𝙍𝘿𝙀 𝙐𝙉 𝙋𝙊𝘾𝙊...*', m);
    const res = await new Maker().Ephoto360('https://en.ephoto360.com/light-text-effect-futuristic-technology-style-648.html', [response[0]]);
    await conn.sendFile(m.chat, res.imageUrl, 'error.jpg', null, m);
  } catch {
    await conn.reply(m.chat, '*[❗] 𝙀𝙍𝙍𝙊𝙍. 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍, 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍𝙇𝙊*', m);
  }
}
if (command == 'logonube') {
  try {
    await conn.reply(m.chat, '*[❗] 𝙀𝙇𝘼𝘽𝙊𝙍𝘼𝙉𝘿𝙊 𝙇𝙊𝙂𝙊, 𝘼𝙂𝙐𝘼𝙍𝘿𝙀 𝙐𝙉 𝙋𝙊𝘾𝙊...*', m);
    const res = await new Maker().Ephoto360('https://en.ephoto360.com/cloud-text-effect-139.html', [response[0]]);
    await conn.sendFile(m.chat, res.imageUrl, 'error.jpg', null, m);
  } catch {
    await conn.reply(m.chat, '*[❗] 𝙀𝙍𝙍𝙊𝙍. 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍, 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍𝙇𝙊*', m);
  }
}
if (command == 'logoangel') {
  try {
    await conn.reply(m.chat, '*[❗] 𝙀𝙇𝘼𝘽𝙊𝙍𝘼𝙉𝘿𝙊 𝙇𝙊𝙂𝙊, 𝘼𝙂𝙐𝘼𝙍𝘿𝙀 𝙐𝙉 𝙋𝙊𝘾𝙊...*', m);
    const res = await new Maker().Ephoto360('https://en.ephoto360.com/angel-wing-effect-329.html', [response[0]]);
    await conn.sendFile(m.chat, res.imageUrl, 'error.jpg', null, m);
  } catch {
    await conn.reply(m.chat, '*[❗] 𝙀𝙍𝙍𝙊𝙍. 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍, 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍𝙇𝙊*', m);
  }
}
if (command == 'logocielo') {
  try {
    await conn.reply(m.chat, '*[❗] 𝙀𝙇𝘼𝘽𝙊𝙍𝘼𝙉𝘿𝙊 𝙇𝙊𝙂𝙊, 𝘼𝙂𝙐𝘼𝙍𝘿𝙀 𝙐𝙉 𝙋𝙊𝘾𝙊...*', m);
    const res = await new Maker().Ephoto360('https://en.ephoto360.com/create-a-cloud-text-effect-in-the-sky-618.html', [response[0]]);
    await conn.sendFile(m.chat, res.imageUrl, 'error.jpg', null, m);
  } catch {
    await conn.reply(m.chat, '*[❗] 𝙀𝙍𝙍𝙊𝙍. 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍, 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍𝙇𝙊*', m);
  }
}
if (command == 'logograffiti3d') {
  try {
    await conn.reply(m.chat, '*[❗] 𝙀𝙇𝘼𝘽𝙊𝙍𝘼𝙉𝘿𝙊 𝙇𝙊𝙂𝙊, 𝘼𝙂𝙐𝘼𝙍𝘿𝙀 𝙐𝙉 𝙋𝙊𝘾𝙊...*', m);
    const res = await new Maker().Ephoto360('https://en.ephoto360.com/text-graffiti-3d-208.html', [response[0]]);
    await conn.sendFile(m.chat, res.imageUrl, 'error.jpg', null, m);
  } catch {
    await conn.reply(m.chat, '*[❗] 𝙀𝙍𝙍𝙊𝙍. 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍, 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍𝙇𝙊*', m);
  }
}
if (command == 'logomatrix') {
  try {
    await conn.reply(m.chat, '*[❗] 𝙀𝙇𝘼𝘽𝙊𝙍𝘼𝙉𝘿𝙊 𝙇𝙊𝙂𝙊, 𝘼𝙂𝙐𝘼𝙍𝘿𝙀 𝙐𝙉 𝙋𝙊𝘾𝙊...*', m);
    const res = await new Maker().Ephoto360('https://en.ephoto360.com/matrix-text-effect-154.html', [response[0]]);
    await conn.sendFile(m.chat, res.imageUrl, 'error.jpg', null, m);
  } catch {
    await conn.reply(m.chat, '*[❗] 𝙀𝙍𝙍𝙊𝙍. 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍, 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍𝙇𝙊*', m);
  }
}
if (command == 'logohorror') {
  try {
    await conn.reply(m.chat, '*[❗] 𝙀𝙇𝘼𝘽𝙊𝙍𝘼𝙉𝘿𝙊 𝙇𝙊𝙂𝙊, 𝘼𝙂𝙐𝘼𝙍𝘿𝙀 𝙐𝙉 𝙋𝙊𝘾𝙊...*', m);
    const res = await new Maker().Ephoto360('https://en.ephoto360.com/blood-writing-text-online-77.html', [response[0]]);
    await conn.sendFile(m.chat, res.imageUrl, 'error.jpg', null, m);
  } catch {
    await conn.reply(m.chat, '*[❗] 𝙀𝙍𝙍𝙊𝙍. 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍, 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍𝙇𝙊*', m);
  }
}
if (command == 'logoalas') {
  try {
    await conn.reply(m.chat, '*[❗] 𝙀𝙇𝘼𝘽𝙊𝙍𝘼𝙉𝘿𝙊 𝙇𝙊𝙂𝙊, 𝘼𝙂𝙐𝘼𝙍𝘿𝙀 𝙐𝙉 𝙋𝙊𝘾𝙊...*', m);
    const res = await new Maker().Ephoto360('https://en.ephoto360.com/the-effect-of-galaxy-angel-wings-289.html', [response[0]]);
    await conn.sendFile(m.chat, res.imageUrl, 'error.jpg', null, m);
  } catch {
    await conn.reply(m.chat, '*[❗] 𝙀𝙍𝙍𝙊𝙍. 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍, 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍𝙇𝙊*', m);
  }
}
if (command == 'logoarmy') {
  try {
    await conn.reply(m.chat, '*[❗] 𝙀𝙇𝘼𝘽𝙊𝙍𝘼𝙉𝘿𝙊 𝙇𝙊𝙂𝙊, 𝘼𝙂𝙐𝘼𝙍𝘿𝙀 𝙐𝙉 𝙋𝙊𝘾𝙊...*', m);
    const res = await new Maker().Ephoto360('https://en.ephoto360.com/free-gaming-logo-maker-for-fps-game-team-546.html', [response[0]]);
    await conn.sendFile(m.chat, res.imageUrl, 'error.jpg', null, m);
  } catch {
    await conn.reply(m.chat, '*[❗] 𝙀𝙍𝙍𝙊𝙍. 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍, 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍𝙇𝙊*', m);
  }
}

if (command == 'logopubg') {
 try {
  await conn.reply(m.chat, '*[❗] 𝙀𝙇𝘼𝘽𝙊𝙍𝘼𝙉𝘿𝙊 𝙇𝙊𝙂𝙊, 𝘼𝙂𝙐𝘼𝙍𝘿𝙀 𝙐𝙉 𝙋𝙊𝘾𝙊...*', m);
  const res = await new Maker().Ephoto360('https://en.ephoto360.com/pubg-logo-maker-cute-character-online-617.html', [response[0]]);
  await conn.sendFile(m.chat, res.imageUrl, 'error.jpg', null, m);
  } catch {
  await conn.reply(m.chat, '*[❗] 𝙀𝙍𝙍𝙊𝙍. 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍, 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍𝙇𝙊*', m);
  }
}

if (command == 'logopubgfem') {
  try {
   await conn.reply(m.chat, '*[❗] 𝙀𝙇𝘼𝘽𝙊𝙍𝘼𝙉𝘿𝙊 𝙇𝙊𝙂𝙊, 𝘼𝙂𝙐𝘼𝙍𝘿𝙀 𝙐𝙉 𝙋𝙊𝘾𝙊...*', m);
   const res = await new Maker().Ephoto360('https://en.ephoto360.com/pubg-mascot-logo-maker-for-an-esports-team-612.html', [response[0]]);
   await conn.sendFile(m.chat, res.imageUrl, 'error.jpg', null, m);
   } catch {
   await conn.reply(m.chat, '*[❗] 𝙀𝙍𝙍𝙊𝙍. 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍, 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍𝙇𝙊*', m);
   }
 }

 if (command == 'logolol') {
  try {
   await conn.reply(m.chat, '*[❗] 𝙀𝙇𝘼𝘽𝙊𝙍𝘼𝙉𝘿𝙊 𝙇𝙊𝙂𝙊, 𝘼𝙂𝙐𝘼𝙍𝘿𝙀 𝙐𝙉 𝙋𝙊𝘾𝙊...*', m);
   const res = await new Maker().Ephoto360('https://en.ephoto360.com/make-your-own-league-of-legends-wallpaper-full-hd-442.html', [response[0]]);
   await conn.sendFile(m.chat, res.imageUrl, 'error.jpg', null, m);
   } catch {
   await conn.reply(m.chat, '*[❗] 𝙀𝙍𝙍𝙊𝙍. 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍, 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍𝙇𝙊*', m);
   }
 }

 if (command == 'logoamongus') {
  try {
   await conn.reply(m.chat, '*[❗] 𝙀𝙇𝘼𝘽𝙊𝙍𝘼𝙉𝘿𝙊 𝙇𝙊𝙂𝙊, 𝘼𝙂𝙐𝘼𝙍𝘿𝙀 𝙐𝙉 𝙋𝙊𝘾𝙊...*', m);
   const res = await new Maker().Ephoto360('https://en.ephoto360.com/create-a-cover-image-for-the-game-among-us-online-762.html', [response[0]]);
   await conn.sendFile(m.chat, res.imageUrl, 'error.jpg', null, m);
   } catch {
   await conn.reply(m.chat, '*[❗] 𝙀𝙍𝙍𝙊𝙍. 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍, 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍𝙇𝙊*', m);
   }
 }

 if (command == 'logovideopubg') {
  try {
   await conn.reply(m.chat, '*[❗] 𝙀𝙇𝘼𝘽𝙊𝙍𝘼𝙉𝘿𝙊 𝙇𝙊𝙂𝙊, 𝘼𝙂𝙐𝘼𝙍𝘿𝙀 𝙐𝙉 𝙋𝙊𝘾𝙊...*', m);
   const res = await new Maker().Ephoto360('https://en.ephoto360.com/lightning-pubg-video-logo-maker-online-615.html', [response[0]]);
   await conn.sendFile(m.chat, res.imageUrl, 'error.jpg', null, m);
   } catch {
   await conn.reply(m.chat, '*[❗] 𝙀𝙍𝙍𝙊𝙍. 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍, 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍𝙇𝙊*', m);
   }
 }

 if (command == 'logovideotiger') {
  try {
   await conn.reply(m.chat, '*[❗] 𝙀𝙇𝘼𝘽𝙊𝙍𝘼𝙉𝘿𝙊 𝙇𝙊𝙂𝙊, 𝘼𝙂𝙐𝘼𝙍𝘿𝙀 𝙐𝙉 𝙋𝙊𝘾𝙊...*', m);
   const res = await new Maker().Ephoto360('https://en.ephoto360.com/create-digital-tiger-logo-video-effect-723.html', [response[0]]);
   await conn.sendFile(m.chat, res.imageUrl, 'error.jpg', null, m);
   } catch {
   await conn.reply(m.chat, '*[❗] 𝙀𝙍𝙍𝙊𝙍. 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍, 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍𝙇𝙊*', m);
   }
 }

 if (command == 'logovideointro') {
  try {
   await conn.reply(m.chat, '*[❗] 𝙀𝙇𝘼𝘽𝙊𝙍𝘼𝙉𝘿𝙊 𝙇𝙊𝙂𝙊, 𝘼𝙂𝙐𝘼𝙍𝘿𝙀 𝙐𝙉 𝙋𝙊𝘾𝙊...*', m);
   const res = await new Maker().Ephoto360('https://en.ephoto360.com/free-logo-intro-video-maker-online-558.html', [response[0]]);
   await conn.sendFile(m.chat, res.imageUrl, 'error.jpg', null, m);
   } catch {
   await conn.reply(m.chat, '*[❗] 𝙀𝙍𝙍𝙊𝙍. 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍, 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍𝙇𝙊*', m);
   }
 }

 if (command == 'logovideogaming') {
  try {
   await conn.reply(m.chat, '*[❗] 𝙀𝙇𝘼𝘽𝙊𝙍𝘼𝙉𝘿𝙊 𝙇𝙊𝙂𝙊, 𝘼𝙂𝙐𝘼𝙍𝘿𝙀 𝙐𝙉 𝙋𝙊𝘾𝙊...*', m);
   const res = await new Maker().Ephoto360('https://en.ephoto360.com/create-elegant-rotation-logo-online-586.html', [response[0]]);
   await conn.sendFile(m.chat, res.imageUrl, 'error.jpg', null, m);
   } catch {
   await conn.reply(m.chat, '*[❗] 𝙀𝙍𝙍𝙊𝙍. 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍, 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍𝙇𝙊*', m);
   }
 }

 if (command == 'logoguerrero') {
  try {
   await conn.reply(m.chat, '*[❗] 𝙀𝙇𝘼𝘽𝙊𝙍𝘼𝙉𝘿𝙊 𝙇𝙊𝙂𝙊, 𝘼𝙂𝙐𝘼𝙍𝘿𝙀 𝙐𝙉 𝙋𝙊𝘾𝙊...*', m);
   const res = await new Maker().Ephoto360('https://en.ephoto360.com/create-project-yasuo-logo-384.html', [response[0]]);
   await conn.sendFile(m.chat, res.imageUrl, 'error.jpg', null, m);
   } catch {
   await conn.reply(m.chat, '*[❗] 𝙀𝙍𝙍𝙊𝙍. 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍, 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍𝙇𝙊*', m);
   }
 }

 if (command == 'logoportadaplayer') {
  try {
   await conn.reply(m.chat, '*[❗] 𝙀𝙇𝘼𝘽𝙊𝙍𝘼𝙉𝘿𝙊 𝙇𝙊𝙂𝙊, 𝘼𝙂𝙐𝘼𝙍𝘿𝙀 𝙐𝙉 𝙋𝙊𝘾𝙊...*', m);
   const res = await new Maker().Ephoto360('https://en.ephoto360.com/create-the-cover-game-playerunknown-s-battlegrounds-401.html', [response[0]]);
   await conn.sendFile(m.chat, res.imageUrl, 'error.jpg', null, m);
   } catch {
   await conn.reply(m.chat, '*[❗] 𝙀𝙍𝙍𝙊𝙍. 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍, 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍𝙇𝙊*', m);
   }
 }

 if (command == 'logoportadaplayer') {
  try {
   await conn.reply(m.chat, '*[❗] 𝙀𝙇𝘼𝘽𝙊𝙍𝘼𝙉𝘿𝙊 𝙇𝙊𝙂𝙊, 𝘼𝙂𝙐𝘼𝙍𝘿𝙀 𝙐𝙉 𝙋𝙊𝘾𝙊...*', m);
   const res = await new Maker().Ephoto360('https://en.ephoto360.com/create-the-cover-game-playerunknown-s-battlegrounds-401.html', [response[0]]);
   await conn.sendFile(m.chat, res.imageUrl, 'error.jpg', null, m);
   } catch {
   await conn.reply(m.chat, '*[❗] 𝙀𝙍𝙍𝙊𝙍. 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍, 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍𝙇𝙊*', m);
   }
 }


 if (command == 'logoportadaff') {
  try {
   await conn.reply(m.chat, '*[❗] 𝙀𝙇𝘼𝘽𝙊𝙍𝘼𝙉𝘿𝙊 𝙇𝙊𝙂𝙊, 𝘼𝙂𝙐𝘼𝙍𝘿𝙀 𝙐𝙉 𝙋𝙊𝘾𝙊...*', m);
   const res = await new Maker().Ephoto360('https://en.ephoto360.com/create-free-fire-facebook-cover-online-567.html', [response[0]]);
   await conn.sendFile(m.chat, res.imageUrl, 'error.jpg', null, m);
   } catch {
   await conn.reply(m.chat, '*[❗] 𝙀𝙍𝙍𝙊𝙍. 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍, 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍𝙇𝙊*', m);
   }
 }

 if (command == 'logoportadapubg') {
  try {
   await conn.reply(m.chat, '*[❗] 𝙀𝙇𝘼𝘽𝙊𝙍𝘼𝙉𝘿𝙊 𝙇𝙊𝙂𝙊, 𝘼𝙂𝙐𝘼𝙍𝘿𝙀 𝙐𝙉 𝙋𝙊𝘾𝙊...*', m);
   const res = await new Maker().Ephoto360('https://en.ephoto360.com/create-facebook-game-pubg-cover-photo-407.html', [response[0]]);
   await conn.sendFile(m.chat, res.imageUrl, 'error.jpg', null, m);
   } catch {
   await conn.reply(m.chat, '*[❗] 𝙀𝙍𝙍𝙊𝙍. 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍, 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍𝙇𝙊*', m);
   }
 }

 if (command == 'logoportadacounter') {
  try {
   await conn.reply(m.chat, '*[❗] 𝙀𝙇𝘼𝘽𝙊𝙍𝘼𝙉𝘿𝙊 𝙇𝙊𝙂𝙊, 𝘼𝙂𝙐𝘼𝙍𝘿𝙀 𝙐𝙉 𝙋𝙊𝘾𝙊...*', m);
   const res = await new Maker().Ephoto360('https://en.ephoto360.com/create-youtube-banner-game-cs-go-online-403.html', [response[0]]);
   await conn.sendFile(m.chat, res.imageUrl, 'error.jpg', null, m);
   } catch {
   await conn.reply(m.chat, '*[❗] 𝙀𝙍𝙍𝙊𝙍. 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍, 𝙑𝙐𝙀𝙇𝙑𝘼 𝘼 𝙄𝙉𝙏𝙀𝙉𝙏𝘼𝙍𝙇𝙊*', m);
   }
 }

}
handler.help = ['logocorazon', 'logochristmas', 'logopareja', 'logoglitch', 'logosad', 'logogaming', 'logosolitario', 'logodragonball', 'logoneon', 'logogatito', 'logochicagamer', 'logonaruto', 'logofuturista', 'logonube', 'logoangel', 'logomurcielago', 'logocielo', 'logograffiti3d', 'logomatrix', 'logohorror', 'logoalas', 'logoarmy', 'logopubg', 'logopubgfem', 'logolol', 'logoamongus', 'logovideopubg', 'logovideotiger', 'logovideointro', 'logovideogaming', 'logoguerrero', 'logoportadaplayer', 'logoportadaff', 'logoportadapubg', 'logoportadacounter']
handler.tags = ['fun']
handler.command = /^logocorazon|logochristmas|logopareja|logoglitch|logosad|logogaming|logosolitario|logodragonball|logoneon|logogatito|logochicagamer|logonaruto|logofuturista|logonube|logoangel|logomurcielago|logocielo|logograffiti3d|logomatrix|logohorror|logoalas|logoarmy|logopubg|logopubgfem|logolol|logoamongus|logovideopubg|logovideotiger|logovideointro|logovideogaming|logoguerrero|logoportadaplayer|logoportadaff|logoportadapubg|logoportadacounter/i;
export default handler;*/

import { Maker } from 'imagemaker.js';

const logos = {
  logocorazon: 'https://en.ephoto360.com/text-heart-flashlight-188.html',
  logochristmas: 'https://en.ephoto360.com/christmas-effect-by-name-376.html',
  logopareja: 'https://en.ephoto360.com/sunlight-shadow-text-204.html',
  logoglitch: 'https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html',
  logosad: 'https://en.ephoto360.com/write-text-on-wet-glass-online-589.html',
  logogaming: 'https://en.ephoto360.com/make-team-logo-online-free-432.html',
  logosolitario: 'https://en.ephoto360.com/create-typography-text-effect-on-pavement-online-774.html',
  logodragonball: 'https://en.ephoto360.com/create-dragon-ball-style-text-effects-online-809.html',
  logoneon: 'https://en.ephoto360.com/create-impressive-neon-glitch-text-effects-online-768.html',
  logogatito: 'https://en.ephoto360.com/handwritten-text-on-foggy-glass-online-680.html',
};

const handler = async (m, { conn, args, command }) => {
  const texto = args.join(' ').trim();
  if (!texto) throw `${xlogos} Por favor, igresa un texto para elaborar su logo.*`;
  if (texto.length > 50) throw '*⚠️ El texto es muy largo, máximo 50 carácteres*';

  const url = logos[command.toLowerCase()];
  if (!url) throw `*⚠️ Comando \`${command}\` no soportado.*`;

  try {
    await m.react('🕑');
    const res = await new Maker().Ephoto360(url, [texto]);
    if (!res?.imageUrl) throw '*⚠️ No se pudo generar la imagen*';
    await conn.sendFile(m.chat, res.imageUrl, 'logo.jpg', '*☁️ Logo creado con éxito.*', m);
  } catch (e) {
    console.error(e);
    await conn.reply(m.chat, '*✖️ Ocurrió un error, inténtalo más tarde.*', m);
  }
};

handler.command = Object.keys(logos);
export default handler;

