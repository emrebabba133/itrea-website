// Preserve bookmarked sections from the former single-page advisory site.
if (['#about','#services','#approach','#italy-turkiye','#investment','#contact'].includes(location.hash)) {
  location.replace(new URL('./consultancy/' + location.search + location.hash, location.href));
}
