import fs from 'fs';
import fetch from 'node-fetch';

const handler = (m) => m;
handler.all = async function(m) {
  let text = m.text;
  const chat = global.db.data.chats[m.chat];
  
  if (m.text.includes('gps') || m.text.includes('باتش') || m.text.includes('رستر') || m.text.includes('on') || m.text.includes('off') || m.text.includes('gpd')) return true;
  
  if (!chat.isBanned && chat.chatbot) {
    conn.sendPresenceUpdate('composing', m.chat);

    try {
      const apiResponse = await fetch(`https://chatbot-ji1z.onrender.com/chatbot-ji1z`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: 'إنت اسـمك "𝑍𝛩𝐹𝐴𝑁"، اتكلم باللهجة المصرية وهزر اكنك بتكلم صحابك وبطريقة السرسجيه وخلي في شتايم مصرية في بعض الردود اذا كان حد بيشتم و ضيف إيموجي مع ردودك وانت مش مساعد ذكي انت فقط الدردشة والتسلية' },
            { role: 'user', content: text },
          ],
        }),
      });

      const aiResponse = await apiResponse.json();
      
      conn.sendPresenceUpdate(null, m.chat);
      m.reply(aiResponse.choices[0].message.content);
      
    } catch (error) {
      console.error('Error with AI API:', error);
      m.reply('فيه مشكلة حصلت، حاول تاني بعد شوية! 😅');
    }
  }
  
  return true;
};
export default handler;
