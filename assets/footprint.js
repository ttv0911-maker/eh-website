const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#navigation');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');}});
const reduced=matchMedia('(prefers-reduced-motion:reduce)');
const counters=[...document.querySelectorAll('[data-count]')];
const numberFormat=new Intl.NumberFormat('en-US');
const frames=new Map();
function finishCounter(element){cancelAnimationFrame(frames.get(element));element.textContent=numberFormat.format(Number(element.dataset.count));}
function count(element){
 if(reduced.matches){finishCounter(element);return;}
 const target=Number(element.dataset.count),start=performance.now();
 const draw=time=>{const p=Math.min(1,(time-start)/1400);element.textContent=numberFormat.format(Math.round(target*(1-Math.pow(1-p,3))));if(p<1)frames.set(element,requestAnimationFrame(draw));else frames.delete(element);};
 frames.set(element,requestAnimationFrame(draw));
}
if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){count(entry.target);observer.unobserve(entry.target);}}),{threshold:.6});counters.forEach(element=>observer.observe(element));}else counters.forEach(finishCounter);
reduced.addEventListener('change',()=>{if(reduced.matches){counters.forEach(finishCounter);document.getAnimations().forEach(animation=>animation.cancel());}});
// Replace null with confirmed percentages; placeholders are not measured data.
const customerShares={northAmerica:null,china:null,oceania:null,europe:null};
document.querySelectorAll('[data-market]').forEach(element=>{const value=customerShares[element.dataset.market];element.textContent=value===null?'—%':`${value}%`;});
document.querySelectorAll('.pending-link').forEach(link=>link.addEventListener('click',event=>event.preventDefault()));
document.querySelector('#newsletter-form').addEventListener('submit',event=>{event.preventDefault();const status=event.currentTarget.querySelector('.form-status');status.hidden=false;status.textContent='This form is a preview. Submission will be available once the service is connected.';});
