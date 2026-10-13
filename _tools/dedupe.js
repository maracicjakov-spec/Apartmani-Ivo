// Perceptual dHash to find duplicate uploads across galleries
const sharp=require('sharp'),fs=require('fs'),path=require('path');
const d='../images/original';
(async()=>{
  const files=fs.readdirSync(d).sort();const H={};
  for(const f of files){const {data}=await sharp(path.join(d,f)).greyscale().resize(9,8,{fit:'fill'}).raw().toBuffer({resolveWithObject:true});
    let h='';for(let y=0;y<8;y++)for(let x=0;x<8;x++)h+=data[y*9+x]>data[y*9+x+1]?'1':'0';H[f]=h;}
  const dist=(a,b)=>{let n=0;for(let i=0;i<64;i++)if(a[i]!==b[i])n++;return n};
  const groups=[];const seen=new Set();
  for(const a of files){if(seen.has(a))continue;const g=[a];for(const b of files){if(b!==a&&!seen.has(b)&&dist(H[a],H[b])<=6){g.push(b);seen.add(b)}}seen.add(a);if(g.length>1)groups.push(g)}
  console.log(JSON.stringify(groups,null,0).replace(/\],/g,'],\n'));console.log('dupe groups',groups.length);
})();
