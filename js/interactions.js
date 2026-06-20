/* ============================================
   Interactions - UI interactions & effects
   ============================================ */

// Project Modal
const projectModal = document.getElementById("project-modal");
const modalOverlay = projectModal?.querySelector(".modal-overlay");
const modalClose = projectModal?.querySelector(".modal-close");

// Project data — matches the four cards in index.html in order.
// IMPORTANT: keep this array length and order in sync with the .project-card
// elements; the card index drives which entry opens.
const PROJECTS = [
  {
    id: 1,
    title: "CETHub",
    tagline: "MHT-CET Admission Platform",
    description:
      "Full-stack platform helping Maharashtra engineering students navigate MHT-CET CAP admissions. Features a percentile-based college predictor, historical cutoff explorer (2022–2025), consultation booking with Google Meet, CET update tracking, and a role-protected admin dashboard. Deployed across Vercel (frontend), Render (backend) and Supabase (Postgres) with Redis caching, Sentry monitoring, and Playwright e2e.",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Node.js",
      "Express",
      "Zod",
      "PostgreSQL",
      "Redis",
      "Sentry",
    ],
    image: "/assets/cethub-preview.jpg",
    imageVariant: "cethub",
    link: "https://cethub.in",
    github: null, // source-available, repo not public
  },
  {
    id: 2,
    title: "Yoga Therapy App",
    tagline: "On-device pose correction",
    description:
      "Mobile app that analyzes yoga poses in real time. Extracts 33 3D body landmarks via MediaPipe Pose, engineers hip-normalized joint-angle features, and runs them through a scikit-learn classifier (Random Forest / SVM / MLP) converted to TensorFlow Lite for on-device inference. A real-time feedback engine computes angular deviation from reference templates, surfaces joint-specific corrections, and tracks per-session accuracy and streaks on a progress dashboard.",
    tech: [
      "React Native",
      "Python",
      "MediaPipe Pose",
      "TensorFlow Lite",
      "scikit-learn",
    ],
    image: null,
    imageVariant: "yoga",
    link: null,
    github: null,
  },
  {
    id: 3,
    title: "Swadesh Shop",
    tagline: "MERN E-commerce Platform",
    description:
      "Full-stack e-commerce app built on the MERN stack. Express.js REST APIs for product, cart, and order modules with controller→service layering and structured error handling. Mongoose schemas for products, orders, and users; JWT middleware and server-side validation on protected routes. Integrated a geolocation API for location-based delivery, and implemented payment workflows with transaction validation.",
    tech: ["MongoDB", "Express", "React", "Node.js", "JWT", "REST APIs"],
    image: null,
    imageVariant: "swadesh",
    link: null,
    github: null,
  },
  {
    id: 4,
    title: "Personal Portfolio",
    tagline: "The site you’re on",
    description:
      "A fully custom portfolio built with vanilla HTML, CSS and JavaScript — real-time 3D scenes (Three.js), scroll-driven animations (GSAP), a magnetic cursor, and a dark-theme responsive UI. No framework, no build step. Deployed at atharvaawate.me.",
    tech: ["Vanilla JS", "Three.js", "GSAP", "CSS3", "HTML5"],
    image: "/assets/portfolio-preview.png",
    imageVariant: "portfolio",
    link: "https://atharvaawate.me",
    github: "https://github.com/atharvaawate22/portfolio",
  },
];

function openProjectModal(projectId) {
  if (!projectModal) return;

  const project = PROJECTS.find((p) => p.id === Number(projectId));
  if (!project) return;

  // Populate modal — use document-level lookups for reliable ID resolution
  const modalImage = document.querySelector("#modalImage img");
  const modalImageWrap = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const techTags = document.getElementById("modalTags");
  const liveLink = document.getElementById("modalLiveBtn");
  const githubLink = document.getElementById("modalGithubBtn");

  // Image: use real image when available, otherwise gradient fallback.
  // The .has-image flag tells CSS to suppress the variant wordmark overlay
  // so it doesn't bleed through on top of a real screenshot.
  if (modalImageWrap) {
    modalImageWrap.dataset.variant = project.imageVariant || "default";
    modalImageWrap.classList.toggle("has-image", !!project.image);
  }
  if (modalImage) {
    if (project.image) {
      modalImage.src = project.image;
      modalImage.alt = project.title + " preview";
      modalImage.style.display = "";
    } else {
      modalImage.removeAttribute("src");
      modalImage.style.display = "none";
    }
  }

  if (modalTitle) {
    modalTitle.textContent = project.title;
    if (project.tagline) {
      modalTitle.setAttribute("data-tagline", project.tagline);
    }
  }
  if (modalDescription) modalDescription.textContent = project.description;

  if (techTags) {
    techTags.innerHTML = project.tech
      .map((tech) => `<span>${tech}</span>`)
      .join("");
  }

  // Action buttons: hide entirely when no link rather than showing a dead button
  const setActionButton = (btn, url, fallbackLabel) => {
    if (!btn) return;
    if (url) {
      btn.style.display = "";
      btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.open(url, "_blank", "noopener,noreferrer");
      };
    } else {
      btn.style.display = "none";
      btn.onclick = null;
    }
    if (fallbackLabel) btn.setAttribute("aria-label", fallbackLabel);
  };
  setActionButton(liveLink, project.link, "View live site");
  setActionButton(githubLink, project.github, "View source on GitHub");

  // Show modal
  projectModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeProjectModal() {
  if (!projectModal) return;
  projectModal.classList.remove("active");
  document.body.style.overflow = "";
}

// Modal event listeners
modalOverlay?.addEventListener("click", closeProjectModal);
modalClose?.addEventListener("click", closeProjectModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && projectModal?.classList.contains("active")) {
    closeProjectModal();
  }
});

// Initialize project card click handlers
document.querySelectorAll(".project-card").forEach((card, index) => {
  card.addEventListener("click", () => openProjectModal(index + 1));
});

// Magnetic Effect for CTA buttons
document.querySelectorAll(".magnetic").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0, 0)";
  });
});

// Project Card Tilt Effect
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });

  card.addEventListener("mouseleave", function () {
    // Remove inline style to let CSS handle the transition back
    this.style.transform = "";
  });
});

// About Image Tilt Effect
const aboutImage = document.querySelector(".about-image");
if (aboutImage) {
  aboutImage.addEventListener("mousemove", function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 30;
    const rotateY = (centerX - x) / 30;

    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  aboutImage.addEventListener("mouseleave", function () {
    this.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
  });
}

// Skill Card Hover Glow Effect
document.querySelectorAll(".skill-card").forEach((card) => {
  card.addEventListener("mousemove", function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    this.style.setProperty("--mouse-x", `${x}px`);
    this.style.setProperty("--mouse-y", `${y}px`);
  });
});

// Hero Parallax Effect
const hero = document.querySelector(".hero");
if (hero) {
  hero.addEventListener("mousemove", (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

    const heroContent = document.querySelector(".hero-content");
    const heroVisual = document.querySelector(".hero-visual");

    if (heroContent) {
      heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
    if (heroVisual) {
      heroVisual.style.transform = `translate(${-moveX * 2}px, ${-moveY * 2}px)`;
    }
  });
}
