import fetch from 'node-fetch';
import fs from 'fs';
import uploader from '../lib/uploadImage.js';
import translate from '@vitalets/google-translate-api';

const handler = async (m, { text, usedPrefix, command, conn }) => {
  
 if (!text) {
      await conn.sendMessage(m.chat, { text: `*❲ ❗ ❳ يرجي تحديد صوره مع إدخال نص للبحث .*` }, { quoted: m });
      await conn.sendMessage(m.chat, { react: { text: '❗', key: m.key } });
      return;
    }

let img = m.quoted ? m.quoted : m;

let ph = (img.msg || img).mimetype || img.mediaType || '';
    
if (!/image/g.test(ph) && !/webp/g.test(ph)) {

await conn.sendMessage(m.chat, { text: `*❲ ❗ ❳ يرجي تحديد صوره مع إدخال نص للبحث .*` }, { quoted: m });
      await conn.sendMessage(m.chat, { react: { text: '❗', key: m.key } });
      return;
    }
    
await conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } });

try {

await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

let lang = 'ar';
    
let p = await img.download();
      
let pp = await uploader(p);
      
let image = await (await fetch(`https://bk9.fun/ai/geminiimg?url=${pp}&q=${text}`)).json();

const res = await translate(`${image.BK9}`, {to: lang, autoCorrect: true});
      
conn.sendMessage(m.chat, { text: res.text }, { quoted: m });


   } catch (error) {
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    throw `خطا`;
    }
    
}

handler.help = ['ai2'];
handler.tags = ['ai'];
handler.command = /^(شوف)$/i;
export default handler;
