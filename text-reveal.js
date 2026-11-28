(() => {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  if (motion.matches || !window.IntersectionObserver || !Element.prototype.animate) return;

  const pending = new Map();
  const observer = new IntersectionObserver(entries => {
    for (const {target, isIntersecting} of entries) {
      if (!isIntersecting) continue;
      observer.unobserve(target);
      pending.get(target)?.play();
      pending.delete(target);
    }
  }, {rootMargin: '0px 0px -10% 0px'});

  for (const text of document.querySelectorAll('main h2, main h3, main p, main .kicker, main .door-copy strong')) {
    const box = text.getBoundingClientRect();
    if (!box.height || box.top < innerHeight) continue;
    const animation = text.animate([
      {opacity: 0, transform: 'translateY(28px)', clipPath: 'inset(0 0 90% 0)'},
      {opacity: 1, transform: 'translateY(0)', clipPath: 'inset(0 0 0 0)'}
    ], {
      duration: 850,
      delay: text.matches('p') ? 80 : 0,
      easing: 'cubic-bezier(.18,.65,.25,1)',
      fill: 'backwards'
    });
    animation.pause();
    animation.currentTime = 0;
    pending.set(text, animation);
    observer.observe(text);
  }
  motion.addEventListener('change', () => {
    if (!motion.matches) return;
    observer.disconnect();
    for (const animation of pending.values()) animation.cancel();
    pending.clear();
  });
})();
