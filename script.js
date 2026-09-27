(function(){
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var header = document.querySelector('header');
  var progress = document.querySelector('.progress');

  function onScroll(){
    var y = window.scrollY;
    header.classList.toggle('scrolled', y > 40);
    if(progress){
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
  }
  document.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // mobile nav
  var burger = document.querySelector('.burger');
  var navLinks = document.querySelector('nav.links');
  if(burger && navLinks){
    burger.addEventListener('click', function(){
      var open = navLinks.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    navLinks.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        navLinks.classList.remove('open');
        burger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // active nav link on scroll
  var sections = document.querySelectorAll('section[id]');
  var navAnchors = document.querySelectorAll('nav.links a[href^="#"]');
  function setActive(){
    var pos = window.scrollY + 140;
    var current = '';
    sections.forEach(function(sec){
      if(pos >= sec.offsetTop) current = sec.id;
    });
    navAnchors.forEach(function(a){
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }
  document.addEventListener('scroll', setActive, {passive:true});
  setActive();

  // generic scroll reveal
  var revealTargets = document.querySelectorAll('[data-reveal]');
  if(reduced || !('IntersectionObserver' in window)){
    revealTargets.forEach(function(el){ el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){ entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, {threshold:0.15, rootMargin:'0px 0px -60px 0px'});
    revealTargets.forEach(function(el){ io.observe(el); });
  }

  // approach steps sequential
  var steps = document.querySelectorAll('.step');
  if(steps.length){
    if(reduced || !('IntersectionObserver' in window)){
      steps.forEach(function(s){ s.classList.add('in'); });
    } else {
      var stepIo = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            steps.forEach(function(s, i){
              setTimeout(function(){ s.classList.add('in'); }, i * 180);
            });
            stepIo.unobserve(entry.target);
          }
        });
      }, {threshold:0.3});
      stepIo.observe(steps[0].closest('.approach-line'));
    }
  }

  // italy-turkiye activation
  var itTr = document.querySelector('.it-tr');
  if(itTr){
    if(reduced || !('IntersectionObserver' in window)){
      itTr.classList.add('active');
    } else {
      var itIo = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){ itTr.classList.add('active'); itIo.unobserve(entry.target); }
        });
      }, {threshold:0.4});
      itIo.observe(itTr);
    }
  }

  // hero mouse parallax on map graphic
  var map = document.querySelector('.map');
  var hero = document.querySelector('.hero');
  if(map && hero && !reduced && window.matchMedia('(pointer:fine)').matches){
    hero.addEventListener('mousemove', function(e){
      var r = hero.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      map.style.transform = 'translateY(-50%) translate(' + (x * 14) + 'px,' + (y * 10) + 'px)';
    });
  }

  // magnetic CTA
  if(!reduced && window.matchMedia('(pointer:fine)').matches){
    document.querySelectorAll('.link-cta').forEach(function(btn){
      btn.addEventListener('mousemove', function(e){
        var r = btn.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * 0.18;
        btn.style.transform = 'translateX(' + x + 'px)';
      });
      btn.addEventListener('mouseleave', function(){ btn.style.transform = ''; });
    });
  }
})();
