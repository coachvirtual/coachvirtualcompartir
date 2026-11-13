const fs=require('node:fs');
const crypto=require('node:crypto');
(async()=>{
 const base='https://coachvirtual.github.io/coachvirtualcompartir/';
 const version=process.argv[2]||'integra';
 const files=['index.html','creo.html','creo-guia.html','creo-imagen.html','creo-malla.html','css/creo.css','css/creo-connections.css','js/main.js','js/bot-programas.js','js/creo-content.js','js/creo-media.js','js/creo-experience.js','js/creo-image.js','js/creo-curriculum-data.js','js/creo-connections-media.js','js/creo-connections.js','js/creo-malla.js','assets/creo/brand/logo-navy.png','assets/creo/brand/logo-cyan.png','assets/creo/brand/cross.png','assets/creo/brand/brand.jpg',...fs.readdirSync('assets/creo/conexiones').filter(f=>f.endsWith('.webp')).map(f=>'assets/creo/conexiones/'+f)];
 const checks=await Promise.all(files.map(async file=>{
  const response=await fetch(base+file+'?v='+version,{signal:AbortSignal.timeout(20000)});
  if(!response.ok)return{file,status:response.status,match:false};
  const binary=/\.(docx|png|jpg|webp)$/.test(file);
  const remote=binary?Buffer.from(await response.arrayBuffer()):(await response.text()).replace(/\r\n/g,'\n');
  const local=binary?fs.readFileSync(file):fs.readFileSync(file,'utf8').replace(/\r\n/g,'\n');
  const hash=text=>crypto.createHash('sha256').update(text).digest('hex');
  return{file,status:response.status,match:hash(remote)===hash(local)};
 }));
 const report={url:base,commit:version,allMatch:checks.every(c=>c.match),checks};
 fs.writeFileSync('audit/creo-publication-verification.json',JSON.stringify(report,null,2));
 console.log(JSON.stringify(report,null,2));
 if(!report.allMatch)process.exitCode=1;
})().catch(e=>{console.error(e.message);process.exitCode=1;});
