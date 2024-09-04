 /*
`كود التحويل لريكورد :`
بواسطة :
- زوفان
- 
*/


 import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'

let handler = async (m) => {

let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) throw '*اعمل ريبلي للفيديو او الصوت اللي عاوز تحولو لريك ي حوب ❄️*'
let media = await q.download()
let isTele = /audio\/mp3|video\/mp4/.test(mime)
let link = await (isTele ? uploadImage : uploadFile)(media)
conn.sendMessage(m.chat, {audio: {url: link}, ptt: true, mimetype: 'audio/mpeg', fileName: `shawaza_zizo_2024.opp`}, {quoted: m});

}
handler.help = ['tovoice <reply video>','tovoice <reply audio>']
handler.tags = ['convert'] 
handler.command = /^(لريك)$/i
export default handler
