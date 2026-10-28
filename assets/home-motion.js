const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menu.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(expanded));
  navigation.classList.toggle('is-open', expanded);
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) {
    menu.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    menu.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
    menu.focus();
  }
});
// Interface handoff only: do not send or persist personal information.
for (const form of document.querySelectorAll('form')) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const status = form.querySelector('.form-status');
    status.textContent = 'This form is a preview. Submission will be available once the service is connected.';
    status.hidden = false;
  });
}
// Destinations for future pages and official social accounts are pending.
document.querySelectorAll('.pending-link').forEach(link => {
  link.addEventListener('click', event => event.preventDefault());
});




(()=>{'use strict';const preference=matchMedia('(prefers-reduced-motion: reduce)'),clamp=x=>Math.max(0,Math.min(1,x)),ease=x=>{x=clamp(x);return x*x*(3-2*x)};const story=document.querySelector('.home-story'),stage=story.querySelector('.home-stage'),scenes=[...stage.querySelectorAll('[data-home-scene]')];let current=0,target=0,frame=0,last=0,step=0,enabled=false;
const masks=scenes.map(scene=>[...scene.querySelectorAll('.scene-visual,.capability-grid article>img')].map(original=>{const wrap=document.createElement('div');wrap.className='step-image';original.parentNode.insertBefore(wrap,original);wrap.append(original);original.classList.add('step-original');const strips=Array.from({length:6},(_,i)=>{const strip=document.createElement('div');strip.className='step-strip';strip.setAttribute('aria-hidden','true');const image=original.cloneNode();image.removeAttribute('class');image.alt='';strip.append(image);wrap.append(strip);return strip});return {wrap,strips}}));
const text=scenes.map(scene=>[...scene.querySelectorAll('h1,h2,h3,p,.hero-actions,.discover')].filter(el=>!el.parentElement.closest('h1,h2,h3,p,.hero-actions,.discover')).map((el,index)=>{const mask=document.createElement('div');mask.className='text-mask';el.parentNode.insertBefore(mask,el);mask.append(el);return {el,mask,index:scene.classList.contains('company-scene')?(el.matches('h2')?0:el.matches('h3')?1:el.matches('p')?2:3):index}}));
function paint(){const active=Math.min(scenes.length-1,Math.floor(current+.48));scenes.forEach((scene,i)=>{const local=current-i;const enter=i===0?1:ease((local+.78)/.6),exit=i===scenes.length-1?0:ease((local-.2)/.65);scene.style.visibility=local<=-1||local>=1.05?'hidden':'visible';scene.style.zIndex=i+1;scene.style.clipPath='inset('+((1-enter)*100)+'% 0 0 0)';scene.classList.toggle('current-scene',i===active);scene.inert=i!==active;scene.setAttribute('aria-hidden',String(i!==active));masks[i].forEach(({strips})=>strips.forEach((strip,j)=>{const lag=j*.055;const opening=i===0?1:ease((local+.8-lag)/.5);const closing=i===scenes.length-1?0:ease((local-.13-lag)/.5);const overlap=100/Math.max(1,strip.clientWidth);const left=Math.max(0,j*100/6-overlap),right=Math.min(100,(j+1)*100/6+overlap);const top=(1-opening)*100,bottom=100-closing*100;strip.style.clipPath='polygon('+left+'% '+top+'%,'+right+'% '+top+'%,'+right+'% '+Math.max(top,bottom)+'%,'+left+'% '+Math.max(top,bottom)+'%)';}));text[i].forEach(({el,index})=>{const lag=Math.min(index,6)*.04;const incoming=i===0?1:ease((local+.52-lag)/.4);const outgoing=i===scenes.length-1?0:ease((local-.06-lag)/.48);el.style.transform='translate3d(0,'+((1-incoming)*115-outgoing*115)+'%,0)';});});stage.querySelectorAll('[data-home-go]').forEach((b,i)=>b.setAttribute('aria-current',i===active?'step':'false'))}
function tick(time){const dt=Math.min(64,time-(last||time-16));last=time;current+=(target-current)*(1-Math.exp(-dt/90));if(Math.abs(target-current)<.0002)current=target;paint();if(current!==target)frame=requestAnimationFrame(tick);else{frame=0;last=0}}
function update(){if(!enabled)return;target=clamp(-story.getBoundingClientRect().top/(step*(scenes.length-1)))*(scenes.length-1);if(!frame)frame=requestAnimationFrame(tick)}function setup(){enabled=!preference.matches&&!(innerWidth<=700&&innerHeight<650);document.documentElement.classList.toggle('stepped-home',enabled);cancelAnimationFrame(frame);frame=0;if(enabled){step=Math.max(650,innerHeight*1.15);story.style.height=innerHeight+step*(scenes.length-1)+'px';update()}else{story.style.height='';scenes.forEach((s,i)=>{s.removeAttribute('style');s.removeAttribute('aria-hidden');s.inert=false;text[i].forEach(({el})=>el.style.transform='')})}}
addEventListener('scroll',update,{passive:true});addEventListener('resize',setup);preference.addEventListener('change',setup);stage.querySelectorAll('[data-home-go]').forEach(b=>b.addEventListener('click',()=>{if(enabled)scrollTo({top:scrollY+story.getBoundingClientRect().top+Number(b.dataset.homeGo)*step,behavior:'smooth'})}));document.querySelectorAll('a[href="#about"]').forEach(link=>link.addEventListener('click',e=>{if(!enabled)return;e.preventDefault();scrollTo({top:scrollY+story.getBoundingClientRect().top+(link.hash==='#about'?1:2)*step,behavior:'smooth'})}));setup();
})();
