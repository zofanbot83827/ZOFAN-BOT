export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner }) {
  if (m.isBaileys && m.fromMe) return !0;
  if (m.isGroup) return !1;
  if (!m.message) return !0;
  
  
  if (m.text.includes('المطور') || m.text.includes('تنصيب') || m.text.includes('owner') || m.text.includes('الدعم') || m.text.includes('اسكريبت')) return !0;

  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[this.user.jid] || {};
   
  const rep = `_*<حالا سأقوم بمنعك لانه ممنوع/>*_\n\n*⦓🚯⦔⎽ ممنوع الخاص خد احلي بان استخدمني بالجروب فقط*.\n\n*⦓⧱⦔⎽ المطور الخاص بي يمكنك مراسلته ورفع البان*`;
 
  chat.warningCount = chat.warningCount || 0;
  const nuum = 5;

  if (bot.autoBan && !isOwner && !isROwner && !chat.isBanned) {
    chat.warningCount++;
    
    if (chat.warningCount < nuum) {
    
    const war = `*<ممنوع استخدامي في الخاص/>*\n\n*<المخالف: @${m.sender.split('@')[0]}/>*\n*<التحذيرات: ${chat.warningCount} من ${nuum}/>*\n*<عند اكتمال التحذيرات سيتم منعك من استخدامي/>*`;
    
      await m.reply(
        war, 
        false, 
        { mentions: [m.sender] }
      );
    } else if (chat.warningCount === nuum) {
      global.db.data.chats[m.chat].isBanned = true;

      await m.reply(
        rep, 
        false, 
        { mentions: [m.sender] }
      );

      
      chat.warningCount = 0;
    }
  }

  return !1;
}
