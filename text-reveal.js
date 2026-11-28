(() => {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches || !window.IntersectionObserver || !Element.prototype.animate) return;

  const observer = new IntersectionObserver(entries => {
    for (const { target, isIntersecting } of entries) {
      if (!isIntersecting) continue;
      observer.unobserve(target);
      if (reducedMotion.matches) continue;
      target.animate([
        { opacity: 0.15, translate: '0 12px' },
        { opacity: 1, translate: '0 0' }
      ], { duration: 460, easing: 'cubic-bezier(.2,.7,.2,1)' });
    }
  });

  for (const element of document.querySelectorAll('main h2, main h3, main p')) {
    if (element.getBoundingClientRect().top >= innerHeight) observer.observe(element);
  }
})();
