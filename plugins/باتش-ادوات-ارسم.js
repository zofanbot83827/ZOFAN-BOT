import translate from '@vitalets/google-translate-api';
import fetch from 'node-fetch';
import fs from 'fs';

const handler = async (m, { text, usedPrefix, command, conn }) => {
  
 if (!text) {
      await conn.sendMessage(m.chat, { text: `*❲ ❗ ❳ يرجي إدخال نص للبحث .*\nمثال :\n> ➤  ${usedPrefix + command} ارسم ناروتو` }, { quoted: m });
      await conn.sendMessage(m.chat, { react: { text: '❗', key: m.key } });
      return;
    }
    
    await conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } });
 
 let txt = text;
let lang = 'en';
if (!text && m.quoted && m.quoted.text) txt = m.quoted.text;
  
    try {
    
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    const res = await translate(`${txt}`, {to: lang, autoCorrect: true});
    
      const BK9 = `https://bk9.fun/ai/photoleap?q=${encodeURIComponent(res.text)}`;
      const response = await fetch(BK9);
      const result = await response.json();

      if (result.status) {
        await conn.sendMessage(m.chat, {image: {url: result.BK9}}, {quoted: m});
        await conn.sendMessage(m.chat, { react: { text: '👌🏻', key: m.key } });
      }
      
    } catch (error) {
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    throw `خطا`;
    }
    
}

handler.help = ['ai2'];
handler.tags = ['ai'];
handler.command = /^(ارسم)$/i;
export default handler;
