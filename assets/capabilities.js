const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
menu.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded',String(expanded));
  nav.classList.toggle('is-open',expanded);
});
document.addEventListener('keydown',event=>{
  if(event.key==='Escape') {
    nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');
    document.querySelectorAll('.cap-tile').forEach(tile=>tile.classList.remove('is-preview'));
  }
});
document.querySelectorAll('.pending-link').forEach(link=>link.addEventListener('click',event=>event.preventDefault()));
document.querySelector('#newsletter-form').addEventListener('submit',event=>{
  event.preventDefault();
  const status=event.currentTarget.querySelector('.form-status');
  status.hidden=false;status.textContent='This form is a preview. Submission will be available once the service is connected.';
});
