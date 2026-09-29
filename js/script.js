const S=[...document.querySelectorAll('.slide')],N=S.length,DUR=7000;
const env=document.getElementById('env'),au=document.getElementById('au'),mus=document.getElementById('mus'),bar=document.querySelector('#bar i'),dots=document.getElementById('dots');
dots.innerHTML=S.map(()=>'<i></i>').join('');const D=[...dots.children];
S.forEach(s=>[...s.children].forEach((c,i)=>{if(!c.classList.contains('bgimg'))c.style.transitionDelay=(i*.25)+'s'}));
let cur=-1,timer=null,started=false;
function go(i){if(i<0||i>=N)return;cur=i;S.forEach((s,k)=>s.classList.toggle('active',k===i));D.forEach((d,k)=>d.classList.toggle('on',k===i));document.getElementById('stage').classList.toggle('dark',i===N-1);
clearTimeout(timer);bar.style.transition='none';bar.style.width='0';
if(i<N-1){requestAnimationFrame(()=>requestAnimationFrame(()=>{bar.style.transition=`width ${DUR}ms linear`;bar.style.width='100%'}));timer=setTimeout(()=>go(cur+1),DUR)}
else{bar.style.transition='none';bar.style.width='100%'}}
env.onclick=()=>{env.classList.add('open');mus.style.display='block';au.play().catch(()=>{});setTimeout(()=>{env.remove();started=true;go(0)},1500)};
mus.onclick=()=>{if(au.paused){au.play();mus.textContent='♪'}else{au.pause();mus.textContent='✕'}};
document.getElementById('stage').addEventListener('click',e=>{if(!started||e.target.closest('a,button'))return;
e.clientX<innerWidth*.3?go(cur-1):go(cur+1);document.getElementById('hint').style.display='none'});
document.getElementById('again').onclick=()=>go(0);
addEventListener('keydown',e=>{if(e.key==='ArrowRight')go(cur+1);if(e.key==='ArrowLeft')go(cur-1)});
const P=document.getElementById('petals'),cols=['#f6b8c4','#f08fa5','#fbd5dc','#e9a0b3','#f3c98b'];
for(let i=0;i<24;i++){const p=document.createElement('div'),s=9+Math.random()*10;p.className='petal';
p.style.cssText=`left:${Math.random()*100}%;width:${s}px;height:${s*1.35}px;background:linear-gradient(135deg,${cols[i%5]},#fff0f3);opacity:${.6+Math.random()*.35};animation-duration:${9+Math.random()*9}s;animation-delay:-${Math.random()*14}s;--dx:${(Math.random()*160-80)}px;--r:${(Math.random()>.5?1:-1)*(360+Math.random()*360)}deg`;P.appendChild(p)}
const t=new Date('2026-10-03T15:30:00-04:00'),cd=document.getElementById('cd');
function tick(){let s=Math.max(0,Math.floor((t-Date.now())/1000));cd.innerHTML=[['Días',86400],['Horas',3600],['Min',60],['Seg',1]].map(([l,n])=>{const q=Math.floor(s/n);s%=n;return `<div><b>${q}</b><small>${l}</small></div>`}).join('')}
tick();setInterval(tick,1000);