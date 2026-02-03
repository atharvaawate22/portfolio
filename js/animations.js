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

// Contact animation
gsap.from(".contact-content > *", {
  scrollTrigger: {
    trigger: ".contact",
    start: "top 70%",
    toggleActions: "play none none none",
  },
  opacity: 0,
  y: 40,
  duration: 0.8,
  stagger: 0.1,
  ease: "power3.out",
  immediateRender: false,
});

// Stats counter animation
const stats = document.querySelectorAll(".stat-number");

stats.forEach((stat) => {
  const target = parseInt(stat.getAttribute("data-target"));

  ScrollTrigger.create({
    trigger: stat,
    start: "top 85%",
    onEnter: () => {
      gsap.to(stat, {
        innerHTML: target,
        duration: 2,
        ease: "power2.out",
        snap: { innerHTML: 1 },
        onUpdate: function () {
          stat.innerHTML = Math.floor(this.targets()[0].innerHTML);
        },
      });
    },
    once: true,
  });
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

// Text reveal on scroll
const revealElements = document.querySelectorAll(".reveal");

revealElements.forEach((el) => {
  ScrollTrigger.create({
    trigger: el,
    start: "top 85%",
    onEnter: () => el.classList.add("active"),
    onLeaveBack: () => el.classList.remove("active"),
  });
});

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
