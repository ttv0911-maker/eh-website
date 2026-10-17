const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#navigation');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');}});
const reduced=matchMedia('(prefers-reduced-motion:reduce)');
const pictures=[...document.querySelectorAll('.pd-brief>img')];
let frame=0;
function render(){frame=0;if(reduced.matches)return;pictures.forEach(image=>{const r=image.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;const p=Math.min(1,Math.max(0,(innerHeight-r.top)/(innerHeight*.6)));image.classList.add('pd-image-motion');image.style.setProperty('--pd-cut',`${(16*Math.pow(1-p,3)).toFixed(2)}%`);});}
function schedule(){if(!frame&&!reduced.matches)frame=requestAnimationFrame(render);}
if(!reduced.matches){document.querySelector('.pd-hero h1').animate([{opacity:0,clipPath:'inset(0 0 100% 0)'},{opacity:1,clipPath:'inset(0)'}],{duration:1200,easing:'cubic-bezier(.22,1,.36,1)'});render();}
addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);addEventListener('pageshow',schedule);
reduced.addEventListener('change',()=>{cancelAnimationFrame(frame);frame=0;if(reduced.matches){document.getAnimations().forEach(a=>a.cancel());pictures.forEach(image=>image.classList.remove('pd-image-motion'));}else render();});
document.querySelectorAll('.pending-link').forEach(link=>link.addEventListener('click',event=>event.preventDefault()));
document.querySelector('#newsletter-form').addEventListener('submit',event=>{event.preventDefault();const status=event.currentTarget.querySelector('.form-status');status.hidden=false;status.textContent='This form is a preview. Submission will be available once the service is connected.';});

