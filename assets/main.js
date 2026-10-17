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

const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const variant = document.documentElement.dataset.motion || 'a';
document.documentElement.dataset.motion = variant;
const photos = [...document.querySelectorAll('.showroom,.capability-grid article>img,.material-grid>img,.support article>img,.work-grid>img,.contact-image')];
const headings = [...document.querySelectorAll('.companies>h2,.section-title')];
let frame = 0;
const clamp = value => Math.max(0, Math.min(1, value));
function renderMotion() {
  frame = 0;
  if (motionPreference.matches) return;
  photos.forEach((photo, index) => {
    const rect = photo.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > innerHeight) return;
    const progress = clamp((innerHeight - rect.top) / (innerHeight * (variant === 'b' ? .65 : .42)));
    const eased = 1 - Math.pow(1 - progress, 3);
    const cut = (1 - eased) * (variant === 'b' ? 22 : 14);
    photo.style.clipPath = variant === 'b'
      ? `inset(0 ${cut.toFixed(3)}% 0 ${cut.toFixed(3)}%)`
      : `inset(0 ${(index % 2 ? 0 : cut).toFixed(3)}% 0 ${(index % 2 ? cut : 0).toFixed(3)}%)`;
  });
  if (variant === 'b' && innerWidth > 700) {
    const hero = document.querySelector('.hero');
    const distance = clamp(-hero.getBoundingClientRect().top / hero.offsetHeight);
    // Move only the image within the existing hero crop, never the logo or copy.
    document.querySelector('.hero-image').style.objectPosition = `50% ${50 + distance * 6}%`;
  }
}
function scheduleMotion() {
  if (!frame && !motionPreference.matches) frame = requestAnimationFrame(renderMotion);
}
function startMotion() {
  if (motionPreference.matches) return;
  renderMotion();
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        if (entry.target.getBoundingClientRect().top > 60) {
          const animation = variant === 'b'
            ? [{clipPath:'inset(0 0 90% 0)',translate:'0 8px'},{clipPath:'inset(0)',translate:'0 0'}]
            : [{opacity:.35},{opacity:1}];
          entry.target.animate(animation, {duration:variant === 'b' ? 650 : 380,easing:'cubic-bezier(.22,1,.36,1)'});
        }
        observer.unobserve(entry.target);
      });
    }, {rootMargin:'0px 0px -48px 0px'});
    headings.forEach(heading => observer.observe(heading));
    motionPreference.addEventListener('change', () => observer.disconnect(), {once:true});
  }
  if (variant === 'b') {
    document.querySelector('.hero-image').animate([{opacity:.65},{opacity:1}], {duration:700,easing:'ease-out'});
    document.querySelector('.hero-copy').animate([{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0)'}],{duration:850,easing:'cubic-bezier(.22,1,.36,1)'});
  }
}
addEventListener('scroll',scheduleMotion,{passive:true});
addEventListener('resize',scheduleMotion);
addEventListener('pageshow',scheduleMotion);
motionPreference.addEventListener('change', () => {
  cancelAnimationFrame(frame);frame=0;
  photos.forEach(photo => {photo.style.clipPath='';});
  document.querySelector('.hero-image').style.objectPosition='';
  if (motionPreference.matches) {
    document.getAnimations().forEach(animation=>animation.cancel());
  } else startMotion();
});
startMotion();


