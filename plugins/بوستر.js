.gps v|import { createCanvas, loadImage } from 'canvas';
import fetch from 'node-fetch';

const handler = async (m, { command, usedPrefix, conn, args, text }) => {
    if (!text) {
        await conn.sendMessage(m.chat, { text: 'ادخل نص اولا' }, { quoted: m });
        await conn.sendMessage(m.chat, { react: { text: '❗', key: m.key } });
        return;
    }

    await conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } });

    try {
        // تحميل صورة الملف الشخصي
        let pp;
        try {
            pp = await conn.profilePictureUrl(m.sender, 'image');
        } catch (e) {
            pp = 'https://telegra.ph/file/c0f8bb917592f4684820b.jpg'; // صورة احتياطية
        }

        // تحميل الصور وإنشاء اللوحة
        const canvas = createCanvas(1200, 630);
        const ctx = canvas.getContext('2d');

        // تحميل خلفية
        ctx.fillStyle = '#007bff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // تحميل صورة الملف الشخصي
        const profileImage = await loadImage(pp);
        ctx.drawImage(profileImage, 50, 50, 150, 150); // مكان وحجم الصورة الشخصية

        // إضافة النص
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 40px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(text, canvas.width / 2, canvas.height - 100);

        // حفظ الصورة
        const imageBuffer = canvas.toBuffer('image/png');
        const imgUrl = 'data:image/png;base64,' + imageBuffer.toString('base64');

        await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
        await conn.sendMessage(m.chat, { image: { url: imgUrl } }, { quoted: m });
        await conn.sendMessage(m.chat, { react: { text: '👌🏻', key: m.key } });
    } catch (e) {
        console.error(e);
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    }
};

handler.command = /^(بوستر)$/i;
export default handler;
