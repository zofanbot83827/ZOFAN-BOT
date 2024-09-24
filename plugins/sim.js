import fs from 'fs';
import fetch from 'node-fetch';

const handler = (m) => m;
handler.all = async function(m) {
  let text = m.text;
  const chat = global.db.data.chats[m.chat];
  
  // التحقق من النصوص التي يجب تجاهلها
  if (m.text.includes('gps') || m.text.includes('باتش') || m.text.includes('رستر') || m.text.includes('on') || m.text.includes('off') || m.text.includes('gpd')) return true;
  
  if (!chat.isBanned && chat.chatbot) {
    conn.sendPresenceUpdate('composing', m.chat);

    try {
      // استخدام واجهة API الجديدة فقط
      const apiResponse = await fetch(`https://chatbot-ji1z.onrender.com/chatbot-ji1z`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: 'You are a helpful assistant. Reply in Egyptian Arabic dialect.' },
            { role: 'user', content: text },
          ],
        }),
      });

      const aiResponse = await apiResponse.json();
      
      conn.sendPresenceUpdate(null, m.chat);
      m.reply(aiResponse.choices[0].message.content); // عرض الرد من واجهة API الجديدة
      
    } catch (error) {
      console.error('Error with AI API:', error);
      m.reply('حدث خطأ أثناء الاتصال بخدمة الذكاء الاصطناعي.');
    }
  }
  
  return true;
};
export default handler;
