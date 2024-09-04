.ee aa import fs from 'fs';
import { sticker } from '../lib/sticker.js';

const handler = (m) => m;
handler.all = async function(m) {

const images = [
"https://telegra.ph/file/19aabd7a2f83d62eb1f6c.png",
"https://telegra.ph/file/b229704b6d5b3b0774edf.png",
"https://telegra.ph/file/da2f63bd81b4a46b290a5.png",
"https://telegra.ph/file/3988bcbb02491f737410a.png",
"https://telegra.ph/file/a639eaa4debc20b73ddd2.png",
"https://telegra.ph/file/d3363287470747e362e0e.png"
    ];


  const chat = global.db.data.chats[m.chat];
  
    const fk = {
    'key': {
      'participants': '0@s.whatsapp.net',
      'remoteJid': 'status@broadcast',
      'fromMe': false,
      'id': 'Halo'
    },
    'message': {
      'contactMessage': {
        'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    },
    'participant': '0@s.whatsapp.net'
  };

  if (/^مايكي|ميكي|زةفان|محمد|زو|تعال خاص يا زوفان$/i.test(m.text) && !chat.isBanned && chat.audios) {

const vn = images[Math.floor(Math.random() * images.length)];

let stiker = await sticker(false, vn, global.packname, global.author)

 conn.sendPresenceUpdate('recording', m.chat);
    
conn.sendFile(m.chat, stiker, 'sticker.webp', '', fk)

//m.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'sound.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: fk});
  
}
  return !0;
  };
export default handler;
