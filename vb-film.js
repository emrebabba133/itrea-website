const film=document.querySelector('.vbfilm');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let visible=false;
function playback(){
 if(visible && !reduced.matches && !document.hidden)film.play().catch(()=>{});
 else film.pause();
}
new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;playback();}).observe(film);
reduced.addEventListener('change',playback);
document.addEventListener('visibilitychange',playback);
