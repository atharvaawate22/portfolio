/* ============================================
   Main - Initialization & core functionality
   ============================================ */

// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
  // Hero entrance animation
  if (typeof window.animateHero === "function") {
    window.animateHero();
  }

  // Footer year
  const yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile Menu
  const hamburger = document.querySelector(".nav-menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (hamburger && mobileMenu) {
    const closeMenu = () => {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("active");
      document.body.classList.remove("menu-open");
      hamburger.setAttribute("aria-expanded", "false");
    };

    hamburger.addEventListener("click", () => {
      const isOpen = hamburger.classList.toggle("active");
      mobileMenu.classList.toggle("active", isOpen);
      document.body.classList.toggle("menu-open", isOpen);
      hamburger.setAttribute("aria-expanded", isOpen);
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
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
});
