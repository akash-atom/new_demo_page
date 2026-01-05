document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");
// 1) Detect when the calendar container comes into view
const calendarWrap = document.querySelector('#revenuehero-container'); // your div
const divsToHide = document.querySelectorAll('.demo_logos_wrapper'); 

function setHidden(hidden) {
  divsToHide.forEach(el => {
    
    el.style.opacity = hidden ? '0' : '1';
    el.style.pointerEvents = hidden ? 'none' : 'auto';
  });
}

let calendarInView = false;
let calendarLoaded = false;

const apply = () => {
  // hide only when it's both in view AND loaded
  setHidden(calendarInView && calendarLoaded);
};

const io = new IntersectionObserver(
  ([entry]) => {
    calendarInView = entry.isIntersecting;
    apply();
  },
  { threshold: 0.25 } // adjust
);

if (calendarWrap) io.observe(calendarWrap);

// 2) Listen for RevenueHero events (postMessage)
window.addEventListener('message', (ev) => {
  if (!ev?.data?.type) return;

  if (
    ev.data.type === 'PAGE_LOADED' ||
    ev.data.type === 'RESIZE_IFRAME'
  ) {
    calendarLoaded = true;
    apply();
  }
});
});