/* ============================================
   Main - Initialization & core functionality
   ============================================ */

// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
  // Loader
  const loader = document.querySelector(".loader");
  if (loader) {
    loader.classList.add("hidden");
  }
  // Trigger hero animation after loader
  if (typeof window.animateHero === "function") {
    window.animateHero();
  }

  // Mobile Menu
  const hamburger = document.querySelector(".nav-menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const navLinksItems = document.querySelectorAll(".nav-links a");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      const isOpen = hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
      hamburger.setAttribute("aria-expanded", isOpen);
    });

    navLinksItems.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Navbar Scroll Effect
  const navbar = document.querySelector(".navbar");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (navbar) {
      if (currentScroll > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }

      if (currentScroll > lastScroll && currentScroll > 500) {
        navbar.style.transform = "translateY(-100%)";
      } else {
        navbar.style.transform = "translateY(0)";
      }
    }

    lastScroll = currentScroll;
  });

  // Active Navigation Link Highlighting
  const sections = document.querySelectorAll("section[id]");

  function highlightNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute("id");

      const navLink = document.querySelector(
        `.nav-links a[href="#${sectionId}"]`
      );
      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add("active");
        } else {
          navLink.classList.remove("active");
        }
      }
    });
  }

  window.addEventListener("scroll", highlightNavLink);

  // Contact Form
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);


      // Show success message
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      btn.style.background = "linear-gradient(135deg, #10b981, #059669)";

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = "";
        contactForm.reset();
      }, 3000);
    });
  }

  // Section Reveal Animation (Premium enhancement)
  const revealSections = document.querySelectorAll(".section-reveal");
  if (revealSections.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    revealSections.forEach((section) => revealObserver.observe(section));
  }
});
