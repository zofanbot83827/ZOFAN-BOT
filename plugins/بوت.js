let handler = async (m, { conn }) => {

    let user = global.db.data.users[m.sender];
    let name = conn.getName(m.sender);
    let taguser = '@' + m.sender.split("@s.whatsapp.net")[0];
 
let reply = {
  "key": {
    "participants": `${m.sender.split('@')[0]}`+"@s.whatsapp.net",
    "remoteJid": "status@broadcast",
    "fromMe": false
  },
  "message": {
    "contactMessage": {
      'displayName': `${m.pushName}`,
      "vcard": `BEGIN:VCARD\nVERSION:3.0\nFN:${m.pushName}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nEND:VCARD`
    }
  },
  "participant": "0@s.whatsapp.net"
};


    let pp = 'https://telegra.ph/file/b1b1f66e3a16652c9d66a.mp4';
    
    let message = `*˼❄️˹┊「 مرحبآ ↫ ${taguser}」*\n> اهـلًا مـعـك 𝐵𝛩𝑇•𝑍𝛩𝐹𝐴𝑁 \n> لـلمـساعـدة اكــتب اوامـر او شـرح\n> لإضافة البوت لقروبك اكـتب الـمـطـور\n*✧━━ • ━ 「  ✤  」 ━ • ━━✧*`;


conn.sendButton(m.chat, `${message}`, `${wm}`, pp, [['',``]], null, null, reply, { mentions: [m.sender] });


    //conn.sendFile(m.chat, 'https://telegra.ph/file/b1b1f66e3a16652c9d66a.mp4','image.jpg', message, global.reply, m, { mentions: [m.sender] });
};

handler.customPrefix = /^(زوفان)$/i;
handler.command = new RegExp;

export default handler;
