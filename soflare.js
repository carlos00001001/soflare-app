document.addEventListener('DOMContentLoaded', () => {
  // Register GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  const steps = document.querySelectorAll('.hero-step');
  const allButtons = document.querySelectorAll('.step-btn');
  let currentStep = 1;

  function updateStepUI(targetStep) {
    if (currentStep === targetStep) return;
    currentStep = targetStep;

    // Update step visibility
    steps.forEach((step) => {
      const stepNum = parseInt(step.getAttribute('data-step'), 10);
      step.classList.toggle('is-active', stepNum === currentStep);
    });

    // Update pagination active indicator
    allButtons.forEach((btn) => {
      const btnNum = parseInt(btn.getAttribute('data-step'), 10);
      btn.classList.toggle('is-active', btnNum === currentStep);
    });
  }

  // Pin the hero section and step through 1 -> 2 -> 3
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: '+=200%', // Keeps section pinned for 2 screen heights of scrolling
      pin: true,     // Locks hero card on screen
      scrub: 0.5,    // Smooth response to wheel/touch
      onUpdate: (self) => {
        const progress = self.progress;
        if (progress < 0.33) {
          updateStepUI(1);
        } else if (progress < 0.66) {
          updateStepUI(2);
        } else {
          updateStepUI(3);
        }
      }
    }
  });

  // Handle pagination button clicks
  allButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetStep = parseInt(btn.getAttribute('data-step'), 10);
      const st = ScrollTrigger.getById(tl.scrollTrigger.id) || tl.scrollTrigger;
      
      let targetProgress = 0;
      if (targetStep === 2) targetProgress = 0.4;
      if (targetStep === 3) targetProgress = 0.8;

      window.scrollTo({
        top: st.start + (st.end - st.start) * targetProgress,
        behavior: 'smooth'
      });
    });
  });
});