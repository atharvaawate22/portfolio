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
// `highlights` (optional) renders as a bullet list under the description.
// TODO: replace "#" placeholder links (swadesh live, sta live) and set
// swadesh's github once those repos/artifacts exist.
const PROJECTS = [
  {
    id: 1,
    title: "CET Hub",
    tagline: "MHT-CET admissions · Apr–Jul 2026",
    description:
      "Full-stack platform (Next.js, Node.js/Express, TypeScript, PostgreSQL) helping Maharashtra students navigate MHT-CET CAP admissions through cutoff exploration, rank prediction and personalized college shortlisting.",
    highlights: [
      "Built 370+ statically rendered per-college pages with SSR/ISR and JSON-LD structured data, fixing a crawler-invisibility issue. During the admission season the site ranked just below the official admissions website for “cutoff explorer” searches on Google.",
      "Peaked at ~1,000 daily visits during the admission season.",
      "CI/CD via GitHub Actions: lint, typecheck, coverage-gated tests and Playwright E2E smoke tests, plus keepalive and CAP-deadline reminder cron jobs.",
      "Consultation booking with slot-conflict checks, Google Meet links via the Google Calendar API and email confirmations, plus a role-protected admin dashboard (JWT, bcrypt, rate limiting).",
      "Launched Avani, a RAG-powered admissions chatbot (hybrid keyword + pgvector retrieval, Gemini for generation). It’s live as an early version under active refinement; WhatsApp integration is in progress.",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Supabase",
      "pgvector",
      "Gemini",
      "Redis",
      "Tailwind",
      "Zod",
      "JWT",
      "Sentry",
      "GitHub Actions",
      "Playwright",
      "Vercel",
      "Render",
    ],
    image: "/assets/cethub-preview.png",
    imageVariant: "cethub",
    link: "https://cethub.in",
    github: "https://github.com/atharvaawate22/career-guidance-platform",
  },
  {
    id: 2,
    title: "Yoga Therapy App",
    tagline: "AI pose correction · Feb 2026–now",
    description:
      "React Native (Expo) app that recommends therapeutic yoga poses for 11 health conditions, with real-time AI pose correction.",
    highlights: [
      "MoveNet (TFLite) finds body keypoints; a custom feature vector feeds a lightweight MLP (TensorFlow/Keras) that recognizes 25+ poses.",
      "A rule-based corrective-feedback engine speaks its corrections aloud via text-to-speech.",
      "10+ screens, offline-first storage, custom routines, a guided Surya Namaskar mode, daily reminders and streak tracking.",
      "Inference runs on a FastAPI service, containerized with Docker and now hosted on AWS Lambda.",
    ],
    tech: [
      "React Native",
      "Expo",
      "Python",
      "FastAPI",
      "TensorFlow",
      "MoveNet",
      "OpenCV",
      "Docker",
      "AWS Lambda",
    ],
    image: null,
    imageVariant: "yoga",
    // Auto-updated by the EAS build on every push to main
    link: "https://github.com/atharvaawate22/yoga-therapy-app/releases/download/latest-preview/yoga-therapy.apk",
    linkLabel: "Download APK",
    github: "https://github.com/atharvaawate22/yoga-therapy-app",
  },
  {
    id: 3,
    title: "Last Known Good",
    tagline: "VS Code extension · Jul 2026",
    description:
      "Published VS Code extension that auto-snapshots a workspace at known-good states (clean compile, passing tests, or a manual checkpoint). Snapshots are built with pure git plumbing (a temporary index, read-tree, add, write-tree and commit-tree) and live under shadow refs (refs/lkg/*), so they never touch your index or show up in git log.",
    highlights: [
      "Undoable restore with per-file diff preview.",
      "Deduplicated by tree hash, with tiered retention.",
      "Explorer timeline UI and a status bar indicator.",
      "Unit tests against real temporary git repos, plus an end-to-end suite that drives a VS Code Extension Development Host.",
    ],
    tech: ["TypeScript", "VS Code API", "Git plumbing", "esbuild", "node:test"],
    image: null,
    imageVariant: "lkg",
    link: "https://marketplace.visualstudio.com/items?itemName=atharvaawate.last-known-good",
    linkLabel: "View on Marketplace",
    github: "https://github.com/atharvaawate22/last-known-good",
  },
  {
    id: 4,
    title: "STA Debugger",
    tagline: "Academic group project",
    description:
      "Academic group project, built collaboratively and then extended and improved. A full-stack tool that parses OpenSTA static timing analysis reports and diagnoses every violation with a rule-based engine — bottleneck cells, excessive logic depth, clock skew, and severity per path, plus WNS/TNS metrics, worst-path slack charts, and stage-by-stage delay breakdowns. An optional LLM layer (Groq) turns each diagnosis into a plain-English explanation; the tool is fully functional without it. Violations that share logic are grouped by root cause, hold fixes are checked against their setup paths, and two reports can be compared before/after. FastAPI + SQLAlchemy backend with JWT auth, per-user analysis history and an admin console; React + Vite frontend; tested with pytest.",
    tech: ["Python", "FastAPI", "SQLAlchemy", "React", "Vite", "Groq API", "pytest"],
    image: null,
    imageVariant: "sta",
    link: "#", // placeholder until deployed
    github: "https://github.com/atharvaawate22/STA-debugger",
  },
  {
    id: 5,
    title: "Swadesh Shop",
    tagline: "MERN E-commerce Platform · Aug 2025",
    description:
      "Full-stack e-commerce app built on the MERN stack. Express.js REST APIs for product, cart, and order modules with controller→service layering and structured error handling. Mongoose schemas for products, orders, and users; JWT middleware and server-side validation on protected routes. Integrated a geolocation API for location-based delivery, and implemented payment workflows with transaction validation.",
    tech: ["MongoDB", "Express", "React", "Node.js", "JWT", "REST APIs"],
    image: null,
    imageVariant: "swadesh",
    link: "#", // placeholder until deployed
    github: null, // no public repo; null hides the GitHub button
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

  const highlights = document.getElementById("modalHighlights");
  if (highlights) {
    highlights.replaceChildren(
      ...(project.highlights || []).map((text) => {
        const li = document.createElement("li");
        li.textContent = text;
        return li;
      })
    );
    highlights.hidden = !project.highlights?.length;
  }

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
