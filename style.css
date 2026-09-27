(function(){
  // header scroll state
  var header = document.querySelector('header');
  var onScroll = function(){
    if(window.scrollY > 40){ header.classList.add('scrolled'); }
    else { header.classList.remove('scrolled'); }
  };
  document.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // mobile nav
  var burger = document.querySelector('.burger');
  var navLinks = document.querySelector('nav.links');
  if(burger && navLinks){
    burger.addEventListener('click', function(){
      var open = navLinks.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.textContent = open ? '✕' : '☰';
    });
    navLinks.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        navLinks.classList.remove('open');
        burger.textContent = '☰';
      });
    });
  }

  // scroll reveal
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealTargets = document.querySelectorAll('[data-reveal]');
  if(reduced || !('IntersectionObserver' in window)){
    revealTargets.forEach(function(el){ el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:0.15, rootMargin:'0px 0px -60px 0px'});
    revealTargets.forEach(function(el){ io.observe(el); });
  }
})();

