const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('#navigation');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');}});
const reduced=matchMedia('(prefers-reduced-motion:reduce)');
const hero=document.querySelector('.hero-before');
const composite=document.querySelector('.hero-composite');
let heroAnimation;
function revealTitle(){
 if(reduced.matches||!composite.complete||!composite.naturalWidth||!hero.complete||!hero.naturalWidth)return;
 // The supplied final artwork already places the lettering behind the vase.
 // Crossfade the aligned, text-free source over it to preserve that occlusion.
 heroAnimation=hero.animate([{opacity:1},{opacity:1,offset:.16},{opacity:0}],{duration:1900,easing:'cubic-bezier(.25,.6,.25,1)'});
}
Promise.all([composite.decode().catch(()=>{}),hero.decode().catch(()=>{})]).then(revealTitle);
reduced.addEventListener('change',()=>{if(reduced.matches)heroAnimation?.cancel();});
const track=document.querySelector('.cg-category-track');
const previous=document.querySelector('[data-carousel=previous]');
const next=document.querySelector('[data-carousel=next]');
function updateControls(){previous.disabled=track.scrollLeft<=2;next.disabled=track.scrollLeft>=track.scrollWidth-track.clientWidth-2;}
function move(direction){track.scrollBy({left:direction*330,behavior:reduced.matches?'instant':'smooth'});}
previous.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));
track.addEventListener('scroll',updateControls,{passive:true});addEventListener('resize',updateControls);
track.addEventListener('focusin',event=>{const card=event.target.closest('.cg-category');if(card)card.scrollIntoView({block:'nearest',inline:'nearest',behavior:reduced.matches?'instant':'smooth'});});
if('ResizeObserver' in window)new ResizeObserver(updateControls).observe(track);
updateControls();
document.querySelectorAll('.pending-link').forEach(link=>link.addEventListener('click',event=>event.preventDefault()));
document.querySelector('#newsletter-form').addEventListener('submit',event=>{event.preventDefault();const status=event.currentTarget.querySelector('.form-status');status.hidden=false;status.textContent='This form is a preview. Submission will be available once the service is connected.';});
