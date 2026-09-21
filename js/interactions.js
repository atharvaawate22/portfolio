/* ============================================
   Interactions - UI interactions & effects
   ============================================ */

// Project Modal
const projectModal = document.getElementById("project-modal");
const modalOverlay = projectModal?.querySelector(".modal-overlay");
const modalClose = projectModal?.querySelector(".modal-close");
let modalOpener = null;

// Project data — matches the cards in index.html in order.
// IMPORTANT: keep this array length and order in sync with the .project-card
// elements; the card index drives which entry opens.
// `linkLabel` customizes the primary button text ("View Live" by default).
// TODO: replace "#" placeholder links (yoga APK, swadesh live, sta live)
// and set swadesh's github once those repos/artifacts exist.
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
      "Zod",
      "PostgreSQL",
      "Redis",
      "Sentry",
    ],
    image: "/assets/cethub-preview.png",
    imageVariant: "cethub",
    link: "https://cethub.in",
    github: "https://github.com/atharvaawate22/career-guidance-platform",
  },
  {
    id: 2,
    title: "Yoga Therapy App",
    tagline: "AI pose correction",
    description:
      "Mobile app that checks yoga poses from the camera. Each frame goes to a FastAPI backend, where MoveNet (TF-Lite) finds 17 body keypoints. The keypoints are normalized around the hip midpoint and scaled by torso width, then a small Keras MLP classifies the pose. Confidence and temporal-stability gates keep the result steady before rule-based checks return joint-specific corrections. The app keeps a practice history and tracks daily streaks.",
    tech: [
      "React Native",
      "Python",
      "FastAPI",
      "TensorFlow",
      "MoveNet",
    ],
    image: null,
    imageVariant: "yoga",
    link: "#", // placeholder until the APK is hosted
    linkLabel: "Download APK",
    github: "https://github.com/atharvaawate22/yoga-therapy-app",
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
    link: "#", // placeholder until deployed
    github: null, // no public repo; null hides the GitHub button
  },
  {
    id: 4,
    title: "Last Known Good",
    tagline: "VS Code Extension",
    description:
      "VS Code extension that answers “it was working 40 minutes ago and I don’t know which change broke it.” Snapshots the workspace at known-good states — manually, on error-free compiles, or after passing test/build tasks — and restores any of them in one command with file-by-file diff preview. Snapshots are hidden git commits under refs/lkg/*: invisible to git log and git GUIs, deduplicated by tree hash, never touching the index or working tree. A safety snapshot before every restore makes restores themselves undoable.",
    tech: [
      "TypeScript",
      "VS Code API",
      "Git plumbing",
      "esbuild",
      "node:test",
    ],
    image: null,
    imageVariant: "lkg",
    link: "https://github.com/atharvaawate22/last-known-good/releases",
    linkLabel: "View Extension",
    github: "https://github.com/atharvaawate22/last-known-good",
  },
  {
    id: 5,
    title: "STA Debugger",
    tagline: "Rule-based timing analysis",
    description:
      "Full-stack tool that parses OpenSTA static timing analysis reports and diagnoses every violation with a rule-based engine — bottleneck cells, excessive logic depth, clock skew, and severity per path, plus WNS/TNS metrics, worst-path slack charts, and stage-by-stage delay breakdowns. An optional LLM layer (Groq) turns each diagnosis into a plain-English explanation; the tool is fully functional without it. FastAPI + SQLAlchemy backend with JWT auth and per-user analysis history, React + Vite frontend.",
    tech: ["Python", "FastAPI", "SQLAlchemy", "React", "Groq API"],
    image: null,
    imageVariant: "sta",
    link: "#", // placeholder until deployed
    github: "https://github.com/atharvaawate22/STA-debugger",
  },
  {
    id: 6,
    title: "Personal Portfolio",
    tagline: "The site you’re on",
    description:
      "A fully custom portfolio built with vanilla HTML, CSS and JavaScript — real-time 3D scenes (Three.js), scroll-driven animations (GSAP), a magnetic cursor, and a dark-theme responsive UI. No framework, no build step. Deployed at atharvaawate.me.",
    tech: ["Vanilla JS", "Three.js", "GSAP", "CSS3", "HTML5"],
    image: "/assets/portfolio-preview.png",
    imageVariant: "portfolio",
    link: null, // no "View Live" — the visitor is already on it
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
  const setActionButton = (btn, url, fallbackLabel, labelText) => {
    if (!btn) return;
    // "#" marks a link that doesn't exist yet (see the TODO above), so it
    // counts as no link; otherwise the button would open a blank tab.
    if (url && url !== "#") {
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
    if (labelText) {
      const span = btn.querySelector("span");
      if (span) span.textContent = labelText;
    }
    if (fallbackLabel) btn.setAttribute("aria-label", fallbackLabel);
  };
  setActionButton(
    liveLink,
    project.link,
    project.linkLabel || "View live site",
    project.linkLabel || "View Live"
  );
  setActionButton(githubLink, project.github, "View source on GitHub");

  // Show modal
  modalOpener = document.activeElement;
  projectModal.classList.add("active");
  document.body.style.overflow = "hidden";
  // The modal is still visibility:hidden on this frame; focus once it's shown
  setTimeout(() => modalClose?.focus(), 50);
}

function closeProjectModal() {
  if (!projectModal) return;
  projectModal.classList.remove("active");
  document.body.style.overflow = "";
  if (modalOpener && document.contains(modalOpener)) modalOpener.focus();
  modalOpener = null;
}

// Modal event listeners
modalOverlay?.addEventListener("click", closeProjectModal);
modalClose?.addEventListener("click", closeProjectModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && projectModal?.classList.contains("active")) {
    closeProjectModal();
    return;
  }
  // Keep Tab focus inside the open modal
  if (e.key === "Tab" && projectModal?.classList.contains("active")) {
    const focusable = [
      ...projectModal.querySelectorAll("a[href], button, [tabindex]"),
    ].filter((el) => el.offsetParent !== null && el.tabIndex >= 0);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!projectModal.contains(document.activeElement)) {
      e.preventDefault();
      first.focus();
    } else if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

// Initialize project card handlers — clickable and keyboard-operable
document.querySelectorAll(".project-card").forEach((card, index) => {
  card.setAttribute("tabindex", "0");
  card.setAttribute("role", "button");
  const title = card.querySelector(".project-title");
  if (title) {
    card.setAttribute("aria-label", `View details: ${title.textContent}`);
  }
  card.addEventListener("click", () => openProjectModal(index + 1));
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openProjectModal(index + 1);
    }
  });
});

// (Magnetic CTA effect lives in effects.js, gated on fine pointers.)

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
    if (heroContent) {
      heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
  });
}
