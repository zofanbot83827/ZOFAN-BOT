import {WAMessageStubType} from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

export async function before(m, {conn, participants}) {
  if (!m.messageStubType || !m.isGroup) return !0;
  const groupName = (await conn.groupMetadata(m.chat)).subject;
  const groupAdmins = participants.filter((p) => p.admin);
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch((_) => null) || 'https://telegra.ph/file/e85649fe62814c6e15d71.jpg';
  const img = await (await fetch(pp)).buffer();
  const chat = global.db.data.chats[m.chat];
  const mentionsString = [m.sender, m.messageStubParameters[0], ...groupAdmins.map((v) => v.id)];
  const mentionsContentM = [m.sender, m.messageStubParameters[0]];
  const fkontak2 = {'key': {'participants': '0@s.whatsapp.net', 'remoteJid': 'status@broadcast', 'fromMe': false, 'id': 'Halo'}, 'message': {'contactMessage': {'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}, 'participant': '0@s.whatsapp.net'};


  if (chat.welcome2 && m.messageStubType == 27) {
    let txt3 = `*╭──────≼𝑍𝛩𝐹𝐴𝑁•𝐵𝛩𝑇≽──────╮*\n*┆ •نورت الجروب يقلب ⦓🤭⦔⎽!*\n*┆ ━─━───⊱⋅⋄⋅⊰───━─━*\n`;
    txt3 += `*┆ ⦓📇⦔⎽ • الجروب:* 《 ${groupName} 》\n`;
    if (!m.sender.endsWith('@g.us')) {
      txt3 += `*┆ ⦓👾⦔⎽ • تمت إضافته:* 《 @${m.messageStubParameters[0].split`@`[0]} 》\n`;
      txt3 += `*┆ ⦓👾⦔⎽ • بواسطة:* 《 @${m.sender.split`@`[0]} 》\n*╰──────≼𝑍𝛩𝐹𝐴𝑁•𝐵𝛩𝑇≽──────╯*`;
    } else {
      txt3 += `*┆ ⦓📧⦔⎽ • الـمـنـشـن:* 《 @${m.messageStubParameters[0].split`@`[0]} 》\n*╰──────≼𝑍𝛩𝐹𝐴𝑁•𝐵𝛩𝑇≽──────╯*`;
    }
    await conn.sendMessage(m.chat, {image: img, caption: txt3, mentions: mentionsContentM}, {quoted: fkontak2});
  }

  if (chat.welcome2 && m.messageStubType == 32) {
    let ax;
    if (m.messageStubParameters[0] === m.sender) {
      ax = 'salido';
    } else {
      ax = 'eliminado';
    }
    let txt5 = `*╭──────≼𝑍𝛩𝐹𝐴𝑁•𝐵𝛩𝑇≽──────╮*\n*┆ •اللي باعنا وخرج فداهيه ⦓🚯⦔⎽!*\n┆ *━─━───⊱⋅⋄⋅⊰───━─━*\n`;
    txt5 += `*┆ ⦓📇⦔⎽  الجروب:* ${groupName}\n`;
    if (ax === 'إزالة') {
      txt5 += `*┆ ⦓📧⦔⎽ • تم القضاء عليه:* 《 @${m.messageStubParameters[0].split`@`[0]} 》\n`;
      txt5 += `*┆ ⦓📧⦔⎽ • نفت بواسطة:* 《 @${m.sender.split`@`[0]} 》\n*╰──────≼𝑍𝛩𝐹𝐴𝑁•𝐵𝛩𝑇≽──────╯*`;
    } else {
      txt5 += `*┆ ⦓📧⦔⎽ • الـمـنـشـن:* 《 @${m.messageStubParameters[0].split`@`[0]} 》\n*╰──────≼𝑍𝛩𝐹𝐴𝑁•𝐵𝛩𝑇≽──────╯*`;
    }
    await conn.sendMessage(m.chat, {image: {url: pp}, caption: txt5, mentions: mentionsContentM}, {quoted: fkontak2});
  }

} /* Cierre del comando*/
