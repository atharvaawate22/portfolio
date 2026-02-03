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
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navLinksItems = document.querySelectorAll(".nav-links a");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    navLinksItems.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
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

      // Ensure navbar remains visible
      if (currentScroll > lastScroll && currentScroll > 500) {
        navbar.style.transform = "translateY(0)"; // Keep navbar visible
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

      console.log("Form submitted:", data);

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

  // Typing Effect for Hero
  const typingElement = document.querySelector(".typing-text");
  if (typingElement) {
    const texts = ["Full Stack Developer", "UI/UX Designer", "Creative Coder"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentText = texts[textIndex];

      if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
      }

      setTimeout(typeEffect, typeSpeed);
    }

    setTimeout(typeEffect, 2000);
  }

  // Parallax Background Layers (Premium enhancement)
  const parallaxLayers = document.querySelectorAll(".parallax-layer");
  if (parallaxLayers.length > 0) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      parallaxLayers.forEach((layer) => {
        const speed = layer.dataset.speed || 0.5;
        layer.style.transform = `translateY(${scrolled * speed}px)`;
      });
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
