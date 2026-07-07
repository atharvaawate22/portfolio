/* ============================================
   Animations Module - GSAP & scroll animations
   ============================================ */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Hero entrance animation
function animateHero() {
  const tl = gsap.timeline();

  tl.to(".title-word", {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out",
    stagger: 0.1,
  })
    .to(
      ".subtitle-line",
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
      },
      "-=0.5"
    )
    .to(
      ".hero-description",
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.3"
    )
    .to(
      ".hero-cta",
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.5"
    )
    .to(
      ".hero-scroll",
      {
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.3"
    );
}

// Section header animations - simple fade in
const sections = document.querySelectorAll(
  ".about, .projects, .skills, .contact"
);

sections.forEach((section) => {
  gsap.from(section.querySelector(".section-header"), {
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });
});

// About section animations
gsap.from(".about-image", {
  scrollTrigger: {
    trigger: ".about",
    start: "top 70%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  scale: 0.95,
  duration: 0.8,
  ease: "power2.out",
});

gsap.from(".about-text > *", {
  scrollTrigger: {
    trigger: ".about",
    start: "top 70%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  duration: 0.8,
  stagger: 0.15,
  ease: "power3.out",
});

// Project cards animation - simple fade in with scale
gsap.from(".project-card", {
  scrollTrigger: {
    trigger: ".projects-grid",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  scale: 0.95,
  duration: 0.6,
  stagger: 0.1,
  ease: "power2.out",
});

// Skills animation - simple fade in with scale
gsap.from(".skill-item", {
  scrollTrigger: {
    trigger: ".skills-list",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  scale: 0.95,
  duration: 0.5,
  stagger: 0.08,
  ease: "power2.out",
});

// Contact console reveal
gsap.from(".contact-console", {
  scrollTrigger: {
    trigger: ".contact",
    start: "top 70%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  y: 32,
  duration: 0.8,
  ease: "power3.out",
});

gsap.from(".contact-row, .console-status", {
  scrollTrigger: {
    trigger: ".contact-console",
    start: "top 75%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  x: -16,
  duration: 0.5,
  stagger: 0.09,
  ease: "power2.out",
});

// About terminal slide-in
gsap.from(".about-terminal", {
  scrollTrigger: {
    trigger: ".about-terminal",
    start: "top 85%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  x: -30,
  duration: 0.8,
  ease: "power3.out",
});

// Parallax effect for background text
gsap.to(".hero-bg-text", {
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: 1,
  },
  y: 200,
  opacity: 0,
  ease: "none",
});

// Scroll progress bar — width tracks page scroll
const scrollProgressBar = document.querySelector(".scroll-progress-bar");
if (scrollProgressBar) {
  gsap.to(scrollProgressBar, {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.3,
    },
  });
}


// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);
    if (target) {
      gsap.to(window, {
        duration: 0.3,
        scrollTo: { y: target, offsetY: 80 },
        ease: "power2.out",
      });
    }
  });
});

// Export animateHero for use after loader
window.animateHero = animateHero;
