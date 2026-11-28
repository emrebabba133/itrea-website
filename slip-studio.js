const sample = document.querySelector('#sample');
const selectors = document.querySelectorAll('[data-sample]');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
selectors.forEach(button => button.addEventListener('click', () => {
  selectors.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  sample.src = '/assets/slippers/model-' + button.dataset.sample + '.webp';
  sample.alt = button.textContent;
  if (!reduced.matches) sample.animate([{opacity:.45},{opacity:1}], {duration:320});
}));
const panel = document.querySelector('.inspect');
document.querySelectorAll('.zoom').forEach(button => button.addEventListener('click', () => {
  const card = button.closest('figure');
  const image = button.querySelector('img');
  const enlarged = panel.querySelector('img');
  enlarged.src = image.src;
  enlarged.alt = image.alt;
  panel.querySelector('h2').textContent = card.querySelector('strong').textContent;
  panel.querySelector('p').textContent = card.querySelector('p').textContent + ' · ' + card.querySelector('small').textContent;
  panel.querySelector('.modal-spec').replaceChildren(card.querySelector('.model-spec dl').cloneNode(true));
  panel.querySelector('a').href = card.querySelector('.ask').href;
  panel.showModal();
}));
panel.querySelector('.dismiss').addEventListener('click', () => panel.close());
panel.addEventListener('click', event => { if(event.target === panel) {
  const rect = panel.getBoundingClientRect();
  if(event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) panel.close();
}});
let queued = false;
function paint() {
  queued = false;
  const offset = reduced.matches ? 0 : Math.min(18,Math.max(0,scrollY*.045));
  sample.style.setProperty('--lift', -offset + 'px');
}
addEventListener('scroll', () => {if(!queued){queued=true;requestAnimationFrame(paint);}}, {passive:true});
reduced.addEventListener('change',paint);
