const nav=document.querySelector('.links'), menu=document.querySelector('.burger');
function toggleMenu(open){nav.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));}
menu.addEventListener('click',()=>toggleMenu(!nav.classList.contains('open')));
nav.addEventListener('click',()=>toggleMenu(false));
document.addEventListener('keydown',e=>{if(e.key==='Escape')toggleMenu(false);});
document.querySelectorAll('.langs a').forEach(link=>link.addEventListener('click',()=>{link.hash=location.hash;}));

const canvas = document.querySelector('.constellation');
const context = canvas.getContext('2d');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const clamp = value => Math.max(0, Math.min(1, value));

// Branches share endpoints so the growing paths form one connected constellation.
const nodes = [[.48,.60],[.54,.48],[.61,.52],[.65,.38],[.72,.43],[.78,.34],
 [.83,.46],[.91,.39],[.87,.57],[.76,.63],[.68,.58],[.59,.68],[.80,.74],
 [.94,.64],[.71,.24],[.56,.30],[.89,.24],[.97,.47]];
const links = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[2,10],[10,9],[9,6],
 [9,8],[8,7],[7,6],[2,11],[11,0],[9,12],[8,13],[5,14],[3,15],[7,16],[7,17]];
let seed = 317;
function random(){seed = (Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;}
const dust = Array.from({length:145},()=>[random(),random(),random()]);
const still = document.createElement('canvas');
let width,height,ratio,positions,reach,visibleProgress=0,goal=0,frame=0,last=0;
function resize(){
 width=canvas.clientWidth;height=canvas.clientHeight;ratio=Math.min(devicePixelRatio||1,2);
 canvas.width=still.width=Math.round(width*ratio);
 canvas.height=still.height=Math.round(height*ratio);
 const bg=still.getContext('2d');
 bg.setTransform(ratio,0,0,ratio,0,0);
 positions=nodes.map(([x,y])=>width<700?[(x-.42)*1.65*width,(.04+y*.53)*height]:[x*width,y*height]);
 function dot(x,y,r,alpha){bg.fillStyle='rgba(194,208,226,'+alpha+')';bg.beginPath();bg.arc(x,y,r,0,2*Math.PI);bg.fill();}
 dust.forEach(([x,y,s])=>dot(x*width,y*height,.35+s*.64,.12+s*.43));
 positions.forEach(([x,y])=>dot(x,y,1.45,.82));
 reach=Math.max(1,document.documentElement.scrollHeight-innerHeight);
 updateTarget();draw();
}
function draw(){
 context.setTransform(1,0,0,1,0,0);context.clearRect(0,0,canvas.width,canvas.height);context.drawImage(still,0,0);
 context.setTransform(ratio,0,0,ratio,0,0);context.strokeStyle='rgba(103,157,220,.44)';context.lineWidth=.85;context.beginPath();
 links.forEach(([a,b],i)=>{
  const u=clamp((visibleProgress-i*.79/(links.length-1))/.21);
  if(!u)return;
  const t=u*u*(3-2*u);
  const [x,y]=positions[a],[xx,yy]=positions[b];
  context.moveTo(x,y);context.lineTo(x+(xx-x)*t,y+(yy-y)*t);
 });
 context.stroke();
}
function tick(now){
 const dt=Math.min(64,now-last);last=now;
 visibleProgress+=(goal-visibleProgress)*(1-Math.exp(-dt/200));
 if(Math.abs(goal-visibleProgress)<.0002)visibleProgress=goal;
 draw();frame=visibleProgress===goal?0:requestAnimationFrame(tick);
}
function updateTarget(){
 goal=reduced.matches?1:clamp(.36*clamp(scrollY/(height*.58))+.64*clamp(scrollY/reach));
 if(reduced.matches){cancelAnimationFrame(frame);frame=0;visibleProgress=goal;draw();return;}
 if(!frame && goal!==visibleProgress){last=performance.now();frame=requestAnimationFrame(tick);}
}
if(context){resize();addEventListener('resize',resize);addEventListener('scroll',updateTarget,{passive:true});reduced.addEventListener('change',updateTarget);addEventListener('load',resize);}
