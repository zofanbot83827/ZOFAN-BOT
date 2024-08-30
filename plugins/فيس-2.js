import fetch from 'node-fetch';
import axios from 'axios';
import fs from 'fs';
let enviando = false;

const handler = async (m, {conn, args, command, usedPrefix}) => {


  if (!args[0]) {
    throw `*ادخل رابط أولا* 
 ${usedPrefix + command} https://fb.watch/fOTpgn6UFQ/`;
  }

  /*const linkface = await isValidFacebookLink(args[0]);
  if (!linkface) {
    throw `_*${tradutor.texto2[0]}*_\n\n*${tradutor.texto2[1]}*\n\n*${tradutor.texto2[2]}* _${usedPrefix + command} https://fb.watch/fOTpgn6UFQ/_`;
  }*/

  if (!enviando) enviando = true;
  try {
    await m.reply(`*انتظر ...*`);
    
    const response = await fetch(`${global.MyApiRestBaseUrl}/api/facebook?url=${args[0]}&apikey=${global.MyApiRestApikey}`);
    const data = await response.json();

    if (data?.status === true) {
      const videoBuffer = await getBuffer(data.resultado.data);
      await conn.sendMessage(m.chat, {
        video: videoBuffer, 
        filename: 'video.mp4', 
        caption: `*تفضل ملفك*`
      }, {quoted: m});
      enviando = false;
    } else {
      console.error('Failed to fetch video data from API:', data);
      enviando = false;
    }
  } catch (error) {
    console.error('Error occurred:', error);
    enviando = false;
    throw `*خطأ*`;
  }
};

handler.command = /^(فيس2)$/i;
export default handler;

/*async function isValidFacebookLink(link) {
  const validPatterns = [
    /facebook\.com\/[^/]+\/videos\//i, 
    /fb\.watch\//i, 
    /fb\.com\/watch\//i, 
    /fb\.me\//i, 
    /fb\.com\/video\.php\?v=/i, 
    /facebook\.com\/share\/v\//i, 
    /facebook\.com\/share\/r\//i, 
    /fb\.com\/share\/v\//i, 
    /fb\.com\/share\/r\//i, 
    /facebook\.com\/[^/]+\/posts\/[^/]+\//i, 
    /facebook\.com\/reel\/[^/]+\//i,
    /facebook\.com\/watch\/[^/]+\//i  
  ];
  return validPatterns.some(pattern => pattern.test(link));
}*/

const getBuffer = async (url, options = {}) => {
  const res = await axios({
    method: 'get', 
    url, 
    headers: {'DNT': 1, 'Upgrade-Insecure-Request': 1},
    ...options, 
    responseType: 'arraybuffer'
  });
  return res.data;
};
