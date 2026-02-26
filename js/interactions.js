/* ============================================
   Interactions - UI interactions & effects
   ============================================ */

// Project Modal
const projectModal = document.getElementById("project-modal");
const modalOverlay = projectModal?.querySelector(".modal-overlay");
const modalClose = projectModal?.querySelector(".modal-close");

function openProjectModal(projectId) {
  if (!projectModal) return;

  // Project data
  const projects = {
    1: {
      title: "Personal Portfolio",
      description:
        "A fully custom portfolio built with vanilla HTML, CSS, and JavaScript — featuring real-time 3D scenes (Three.js), scroll-triggered animations (GSAP), a custom magnetic cursor, and a responsive dark-theme UI. Deployed at atharvaawate.me.",
      tech: ["HTML5", "CSS3", "JavaScript", "Three.js", "GSAP"],
      image: "/assets/portfolio-preview.png",
      link: "https://atharvaawate.me",
      github: "https://github.com/atharvaawate22/portfolio",
    },
    2: {
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with real-time inventory management and secure payments.",
      tech: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
      link: "#",
      github: "#",
    },
    3: {
      title: "AI Dashboard",
      description:
        "Analytics dashboard with machine learning insights and real-time data visualization.",
      tech: ["Python", "TensorFlow", "React", "D3.js", "FastAPI"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      link: "#",
      github: "#",
    },
    4: {
      title: "Social Media App",
      description:
        "Mobile-first social platform with real-time messaging and content sharing features.",
      tech: ["React Native", "Firebase", "Node.js", "Socket.io"],
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800",
      link: "#",
      github: "#",
    },
    5: {
      title: "Crypto Tracker",
      description:
        "Real-time cryptocurrency tracking with portfolio management and price alerts.",
      tech: ["Vue.js", "Chart.js", "CoinGecko API", "PWA"],
      image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800",
      link: "#",
      github: "#",
    },
    6: {
      title: "Task Management",
      description:
        "Collaborative project management tool with kanban boards and team features.",
      tech: ["Angular", "NestJS", "PostgreSQL", "WebSocket"],
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800",
      link: "#",
      github: "#",
    },
  };

  const project = projects[projectId];
  if (!project) return;

  // Populate modal — use document-level lookups for reliable ID resolution
  const modalImage = document.querySelector("#modalImage img");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const techTags = document.getElementById("modalTags");
  const liveLink = document.getElementById("modalLiveBtn");
  const githubLink = document.getElementById("modalGithubBtn");

  if (modalImage) { modalImage.src = project.image; modalImage.alt = project.title + " preview"; }
  if (modalTitle) modalTitle.textContent = project.title;
  if (modalDescription) modalDescription.textContent = project.description;

  if (techTags) {
    techTags.innerHTML = project.tech
      .map((tech) => `<span>${tech}</span>`)
      .join("");
  }

  if (liveLink) {
    liveLink.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (project.link && project.link !== "#") {
        window.open(project.link, "_blank", "noopener,noreferrer");
      }
    };
    liveLink.style.opacity = project.link !== "#" ? "1" : "0.4";
    liveLink.style.cursor = project.link !== "#" ? "pointer" : "not-allowed";
  }

  if (githubLink) {
    githubLink.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (project.github && project.github !== "#") {
        window.open(project.github, "_blank", "noopener,noreferrer");
      }
    };
    githubLink.style.opacity = project.github !== "#" ? "1" : "0.4";
    githubLink.style.cursor = project.github !== "#" ? "pointer" : "not-allowed";
  }

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
