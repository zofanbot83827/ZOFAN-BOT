let handler = async (m, { conn, participants, usedPrefix, command }) => {

    let developers = ['201273070745@s.whatsapp.net', '201225784766@s.whatsapp.net'];   

    let kickte = `*مــنشـن الـشـخص !*`;

    
    if (!m.mentionedJid[0] && !m.quoted) return m.reply(kickte, m.chat, { mentions: conn.parseMention(kickte) });

    let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;


    if (developers.includes(user)) {
        return m.reply(`*❌┃ 👩🏿‍🦲 انت بتعمل اي يا زنجي دا مطوري مقدرش اطردو المطور بيجي يفشخك يا زنجي  😈*`);
    }

//حقوق زوفـان ممنوع تغيير المصدر https://whatsapp.com/channel/0029VamcGDO9hXF3tRB8LX11

    await conn.groupParticipantsUpdate(m.chat, [user], 'remove');

   
    m.reply(`*تـــم الــطرد*`);

 
    let admins = participants.filter(participant => participant.admin).map(participant => participant.id);
    let alertMessage = `*⚠️┃ تم طرد ${user} من المجموعة*`;

    conn.sendMessage(m.chat, { text: alertMessage, mentions: admins });
}

handler.help = ['kick @user'];
handler.tags = ['group'];
handler.command = ['kick', 'طرد'];
handler.admin = true;
handler.group = true;
handler.botAdmin = true;

export default handler;
