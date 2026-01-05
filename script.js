
document.addEventListener("DOMContentLoaded", () => {

  const calendarWrap = document.querySelector('#revenuehero-container');
  const demoLogos = document.querySelector('.demo_logos_wrapper');

  if (!calendarWrap || !demoLogos) return;

  let calendarInView = false;
  let calendarLoaded = false;
  let visibilityTimeout = null;
  let lastVisibilityState = null;

  function applyVisibility() {
    const shouldHideDemoLogos = calendarInView && calendarLoaded;

    // Prevent unnecessary DOM updates if state hasn't changed
    if (lastVisibilityState === shouldHideDemoLogos) {
      return;
    }

    // Clear any pending visibility changes
    if (visibilityTimeout) {
      clearTimeout(visibilityTimeout);
    }

    // Debounce visibility changes to prevent flickering
    visibilityTimeout = setTimeout(() => {
      demoLogos.style.display = shouldHideDemoLogos ? 'none' : '';
      lastVisibilityState = shouldHideDemoLogos;
    }, 150); // 150ms debounce delay
  }

  // 1️⃣ Viewport detection with more stable threshold
  const observer = new IntersectionObserver(
    ([entry]) => {
      // Only update if the intersection state actually changed
      const newInView = entry.isIntersecting && entry.intersectionRatio >= 0.25;
      if (newInView !== calendarInView) {
        calendarInView = newInView;
        applyVisibility();
      }
    },
    { 
      threshold: [0, 0.25, 0.5, 0.75, 1],
      rootMargin: '0px'
    }
  );

  observer.observe(calendarWrap);

  // 2️⃣ RevenueHero lifecycle events
  window.addEventListener('message', (event) => {
    if (!event?.data?.type) return;

    if (
      event.data.type === 'PAGE_LOADED' ||
      event.data.type === 'RESIZE_IFRAME'
    ) {
      // Add a small delay to ensure calendar is fully rendered
      setTimeout(() => {
        calendarLoaded = true;
        applyVisibility();
      }, 100);
    }
  });
  




});

