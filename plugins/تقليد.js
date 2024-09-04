let handler = async (m, { conn, text, participants }) => {
	
    let users = participants.map(u => u.id).filter(v => v !== conn.user.jid)
    if (!m.quoted) return m.reply('*\`『 اعمل ريب ع الرساله وهقلدو😹 』\`*')
    conn.sendMessage(m.chat, { forward: m.quoted.fakeObj, mentions: users })
}

handler.help = ['قلد']
handler.tags = ['group']
handler.command = /^(قلد|قلدو|)$/i

handler.admin = true
handler.group = true

export default handler
