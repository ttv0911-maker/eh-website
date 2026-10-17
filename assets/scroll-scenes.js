(()=>{'use strict';const reduce=matchMedia('(prefers-reduced-motion: reduce)');const clamp=x=>Math.max(0,Math.min(1,x));const ease=x=>{x=clamp(x);return x*x*(3-2*x)};
document.querySelectorAll('[data-scroll-scenes]').forEach(track=>{const stage=track.querySelector('.scene-stage'),scenes=[...stage.querySelectorAll('[data-scene]')];if(!scenes.length)return;let step=0,current=0,target=0,raf=0,last=0,enabled=false;const parts=scenes.map(s=>[...s.querySelectorAll('[data-stagger],h2,h3,p,.button,li,.history-icon')].map(el=>{if(el.tagName==='IMG')return el;const inner=document.createElement('motion-text');while(el.firstChild)inner.append(el.firstChild);el.append(inner);el.classList.add('scene-text-mask');return inner}));function paint(){const active=Math.round(current);scenes.forEach((s,i)=>{const d=current-i;
if(track.classList.contains('about-history')){
 const incoming=i===0?1:ease((d+.46)/.35);
 const outgoing=i===scenes.length-1?0:ease((d-.08)/.38);
 const opacity=incoming*(1-outgoing);
 s.style.opacity=opacity;
 s.style.visibility=opacity>.00001?'visible':'hidden';
 s.style.clipPath='none';
 s.style.transform='translate3d(0,'+((1-incoming)*28-outgoing*28)+'px,0)';
 s.style.zIndex=i+1;
 s.classList.toggle('scene-active',i===active&&opacity>.01);
 s.inert=i!==active||opacity<=.01;
 s.setAttribute('aria-hidden',String(i!==active||opacity<=.01));
 parts[i].forEach((el,j)=>{
  const lag=Math.min(j,5)*.018;
  const v=i===0?1:ease((d+.46-lag)/(.35-lag));
  el.style.transform='translate3d(0,'+((1-v)*20)+'px,0)';
  el.style.opacity=v;
 });
 return;
}
const entry=i===0?1:ease((d+.82)/.66);const exit=ease((d-.32)/.66);const edge=(1-entry)*118;const skew=(1-entry)*18;s.style.opacity=entry===0?'0':'1';const points=[];for(let col=0;col<6;col++){const v=i===0?1:ease((d+.82-col*.045)/.435),y=(1-v)*100;points.push(col*100/6+'% '+y+'%',(col+1)*100/6+'% '+y+'%')}points.push('100% 100%','0 100%');s.style.clipPath='polygon('+points.join(',')+')';s.style.transform='translate3d(0,'+(-exit*3)+'%,0)';s.style.zIndex=i+1;s.classList.toggle('scene-active',i===active);s.inert=i!==active;s.setAttribute('aria-hidden',String(i!==active));parts[i].forEach((el,j)=>{const lag=Math.min(j,6)*.045;const v=i===0?1:ease((d+.65-lag)/.48);el.style.transform='translate3d('+((1-v)*12)+'px,'+((1-v)*54-exit*12)+'px,0)';el.style.opacity=v;});s.querySelectorAll('img:not(.history-icon)').forEach((img,j)=>{const v=i===0?1:ease((d+.72-Math.min(j,3)*.06)/.6);img.style.transform='translate3d(0,'+((1-v)*7-exit*2)+'%,0) scale('+(1.035-v*.035)+')';img.style.clipPath='inset(0 '+((1-v)*100)+'% 0 0)';});});const bg=stage.querySelector('.history-background');if(bg)bg.style.transform='translate3d(0,'+(-current*1.1)+'%,0) scale(1.09)';track.querySelectorAll('nav a').forEach(l=>{const i=scenes.findIndex(s=>'#'+s.id===l.hash);if(i===active)l.setAttribute('aria-current','step');else l.removeAttribute('aria-current')});}
function tick(time){const dt=Math.min(64,time-(last||time-16));last=time;current+=(target-current)*(1-Math.exp(-dt/85));if(Math.abs(target-current)<.0005)current=target;paint();if(current!==target)raf=requestAnimationFrame(tick);else{raf=0;last=0}}
function update(){if(!enabled)return;target=clamp(-track.getBoundingClientRect().top/(step*(scenes.length-1)))*(scenes.length-1);if(!raf)raf=requestAnimationFrame(tick)}
function setup(){enabled=!reduce.matches&&!(track.classList.contains('fp-story')&&innerWidth<=700);track.classList.toggle('scene-enhanced',enabled);cancelAnimationFrame(raf);raf=0;if(enabled){step=Math.max(520,innerHeight*.9);track.style.height=(innerHeight+step*(scenes.length-1))+'px';update()}else{track.style.height='';const bg=stage.querySelector('.history-background');if(bg)bg.style.transform='';scenes.forEach((s,i)=>{s.removeAttribute('style');s.removeAttribute('aria-hidden');s.classList.remove('scene-active');s.inert=false;parts[i].forEach(el=>{el.style.transform='';el.style.opacity=''});s.querySelectorAll('img').forEach(img=>{img.style.transform='';img.style.clipPath=''})})}}
addEventListener('scroll',update,{passive:true});addEventListener('resize',setup);reduce.addEventListener('change',setup);document.querySelectorAll('a[href^="#"]').forEach(l=>{const i=scenes.findIndex(s=>'#'+s.id===l.hash);if(i<0)return;l.addEventListener('click',e=>{if(!enabled)return;e.preventDefault();history.replaceState(null,'',l.hash);scrollTo({top:scrollY+track.getBoundingClientRect().top+i*step,behavior:'smooth'})})});setup();if(location.hash){const i=scenes.findIndex(s=>'#'+s.id===location.hash);if(i>=0&&enabled)requestAnimationFrame(()=>scrollTo(0,scrollY+track.getBoundingClientRect().top+i*step))}});
if(!document.querySelector('script[src*="site-motion.js"]')&&!reduce.matches&&'IntersectionObserver'in window){document.documentElement.classList.add('motion-ready');const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed');io.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('[data-reveal]').forEach(el=>io.observe(el))}})();