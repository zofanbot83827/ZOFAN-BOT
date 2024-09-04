import { PassThrough } from 'stream';
import ffmpeg from 'fluent-ffmpeg';
import uploadFile from '../lib/uploadFile.js';
import uploadImage from '../lib/uploadImage.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let imageBuffer = null;

const handler = async (m, { conn }) => {
  try {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || '';
    
    if (!mime) throw `*فين الملفات إللي عاوز تحولها لفيديو ي حوب*`;

    const media = await q.download();
    const isImage = /image\/(png|jpe?g|gif)/.test(mime);
    const isAudio = /audio/.test(mime);

    if (isImage) {
      if (imageBuffer) throw `*الصورة محددة بالفعل. الآن حدد ملف الصوت.*`;
      imageBuffer = media;
      await conn.reply(m.chat, `*تم تحديد الصورة بنجاح. الآن حدد ملف الصوت.*`, m);
      return;
    }

    if (isAudio) {
      if (!imageBuffer) throw `*حدد الصورة أولا.*`;

      await conn.reply(m.chat, `*تم تحديد الصوت بنجاح. جاري معالجة الملفات...*`, m);

   
      const imagePath = path.join(__dirname, 'temp_image.png');
      const audioPath = path.join(__dirname, 'temp_audio.mp3');
      const videoPath = path.join(__dirname, 'output_video.mp4');

      
      fs.writeFileSync(imagePath, imageBuffer);
      fs.writeFileSync(audioPath, media);

      
      ffmpeg()
        .input(imagePath)
        .input(audioPath)
        .inputOptions(['-t 30']) 
        .outputOptions([
          '-c:v libx264', 
          '-pix_fmt yuv420p', 
          '-c:a aac', 
          '-strict experimental',
          '-vf scale=1280:720' 
        ])
        .on('start', (commandLine) => {
          console.log('Executing ffmpeg command:', commandLine);
          conn.reply(m.chat, `*بدأت عملية إنشاء الفيديو...*`, m);
        })
        .on('end', async () => {
          console.log('Processing finished successfully');

       
          const videoBuffer = fs.readFileSync(videoPath);
          const videoLink = await uploadFile(videoBuffer);

      
          await conn.sendMessage(m.chat, { video: {url: videoLink}, caption: `*تم الانتهاء من صناعة الفيديو!*` }, {quoted: m});

         
          fs.unlinkSync(imagePath);
          fs.unlinkSync(audioPath);
          fs.unlinkSync(videoPath);

          imageBuffer = null; 
        })
        .on('error', (err) => {
          console.error('Error during processing:', err);
          conn.reply(m.chat, `*حدث خطأ أثناء معالجة الفيديو: ${err.message}*`, m);
          imageBuffer = null; 
        })
        .save(videoPath);

    } else {
      throw `*حدد صورة أو ملف صوت فقط.*`;
    }

  } catch (err) {
    console.error('An error occurred:', err);
    await conn.reply(m.chat, `*حدث خطأ: ${err.message || err}*`, m); 
    imageBuffer = null;
  }
};

handler.help = ['tovideo'];
handler.tags = ['montage'];
handler.command = ['منتج', 'مونتاج'];

export default handler;
