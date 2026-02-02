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
      title: "Portfolio Website",
      description:
        "A modern, responsive portfolio showcasing creative work with smooth animations and 3D elements.",
      tech: ["HTML5", "CSS3", "JavaScript", "Three.js", "GSAP"],
      features: [
        "Responsive design for all devices",
        "Interactive 3D graphics",
        "Smooth scroll animations",
        "Dark theme with gradient accents",
      ],
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      link: "#",
      github: "#",
    },
    2: {
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with real-time inventory management and secure payments.",
      tech: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
      features: [
        "User authentication & authorization",
        "Shopping cart functionality",
        "Payment integration",
        "Admin dashboard",
      ],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
      link: "#",
      github: "#",
    },
    3: {
      title: "AI Dashboard",
      description:
        "Analytics dashboard with machine learning insights and real-time data visualization.",
      tech: ["Python", "TensorFlow", "React", "D3.js", "FastAPI"],
      features: [
        "Real-time data processing",
        "ML model integration",
        "Interactive charts",
        "Export functionality",
      ],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      link: "#",
      github: "#",
    },
    4: {
      title: "Social Media App",
      description:
        "Mobile-first social platform with real-time messaging and content sharing features.",
      tech: ["React Native", "Firebase", "Node.js", "Socket.io"],
      features: [
        "Real-time messaging",
        "Image/video sharing",
        "Push notifications",
        "User profiles",
      ],
      image:
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800",
      link: "#",
      github: "#",
    },
    5: {
      title: "Crypto Tracker",
      description:
        "Real-time cryptocurrency tracking with portfolio management and price alerts.",
      tech: ["Vue.js", "Chart.js", "CoinGecko API", "PWA"],
      features: [
        "Live price updates",
        "Portfolio tracking",
        "Price alerts",
        "Historical data charts",
      ],
      image:
        "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800",
      link: "#",
      github: "#",
    },
    6: {
      title: "Task Management",
      description:
        "Collaborative project management tool with kanban boards and team features.",
      tech: ["Angular", "NestJS", "PostgreSQL", "WebSocket"],
      features: [
        "Drag-and-drop kanban",
        "Team collaboration",
        "File attachments",
        "Activity timeline",
      ],
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800",
      link: "#",
      github: "#",
    },
  };

  const project = projects[projectId];
  if (!project) return;

  // Populate modal
  const modalImage = projectModal.querySelector(".modal-image img");
  const modalTitle = projectModal.querySelector(".modal-title");
  const modalDescription = projectModal.querySelector(".modal-description");
  const techTags = projectModal.querySelector(".tech-tags");
  const featuresList = projectModal.querySelector(".features-list");
  const liveLink = projectModal.querySelector(".project-link.primary");
  const githubLink = projectModal.querySelector(".project-link.secondary");

  if (modalImage) modalImage.src = project.image;
  if (modalTitle) modalTitle.textContent = project.title;
  if (modalDescription) modalDescription.textContent = project.description;

  if (techTags) {
    techTags.innerHTML = project.tech
      .map((tech) => `<span class="tech-tag">${tech}</span>`)
      .join("");
  }

  if (featuresList) {
    featuresList.innerHTML = project.features
      .map((feature) => `<li>${feature}</li>`)
      .join("");
  }

  if (liveLink) liveLink.href = project.link;
  if (githubLink) githubLink.href = project.github;

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
    this.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
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
