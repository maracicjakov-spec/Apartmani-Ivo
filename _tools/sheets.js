// Contact sheets (4x3, numbered) for visual classification
const sharp=require('sharp'),fs=require('fs'),path=require('path');
const d='../images/original',out=process.argv[2];fs.mkdirSync(out,{recursive:true});
const files=fs.readdirSync(d).sort();fs.writeFileSync(out+'/index.txt',files.map((f,i)=>i+'\t'+f).join('\n'));
const W=380,Hh=285,C=4,R=3;
(async()=>{for(let s=0;s*C*R<files.length;s++){const comps=[];
 for(let k=0;k<C*R;k++){const i=s*C*R+k;if(i>=files.length)break;
  const buf=await sharp(path.join(d,files[i])).resize(W,Hh,{fit:'contain',background:'#222'}).toBuffer();
  const x=(k%C)*(W+6),y=Math.floor(k/C)*(Hh+6);comps.push({input:buf,left:x,top:y});
  comps.push({input:Buffer.from(`<svg width="60" height="34"><rect width="60" height="34" fill="#000" opacity=".75"/><text x="6" y="25" font-size="24" fill="#ff0" font-family="Arial" font-weight="bold">${i}</text></svg>`),left:x,top:y});}
 await sharp({create:{width:C*(W+6),height:R*(Hh+6),channels:3,background:'#fff'}}).composite(comps).jpeg({quality:80}).toFile(`${out}/sheet${String(s).padStart(2,'0')}.jpg`);}})();
