const scene = document.querySelector('.launch');
const photo = document.querySelector('.launch-bike');
const motion = matchMedia('(prefers-reduced-motion: reduce)');
let scheduled = false;
function paint() {
  scheduled = false;
  const progress = Math.max(0, Math.min(1, -scene.getBoundingClientRect().top / scene.offsetHeight));
  photo.style.transform = motion.matches ? '' : 'translateY(' + (-22 * progress) + 'px) scale(' + (1 + .035 * progress) + ')';
}
function update() {
  if (!scheduled) { scheduled = true; requestAnimationFrame(paint); }
}
addEventListener('scroll', update, {passive:true});
motion.addEventListener('change', update);
paint();
