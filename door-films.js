const films = [...document.querySelectorAll('.door-film')];
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const visible = new Set();
function sync() {
  for (const film of films) {
    if (visible.has(film) && !document.hidden && !reduced.matches) {
      film.play().catch(() => {});
    } else {
      film.pause();
    }
  }
}
const observer = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (entry.isIntersecting) visible.add(entry.target);
    else visible.delete(entry.target);
  }
  sync();
});
films.forEach(film => observer.observe(film));
document.addEventListener('visibilitychange', sync);
reduced.addEventListener('change', sync);
