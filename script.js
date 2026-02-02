// ============================================
// Custom Cursor
// ============================================
const cursor = document.querySelector(".cursor");
const cursorFollower = document.querySelector(".cursor-follower");

let mouseX = 0,
  mouseY = 0;
let cursorX = 0,
  cursorY = 0;
let followerX = 0,
  followerY = 0;

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  if (prefersReducedMotion) {
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
    cursorFollower.style.left = mouseX + "px";
    cursorFollower.style.top = mouseY + "px";
  } else {
    // Smooth cursor movement
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;

    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";
    cursorFollower.style.left = followerX + "px";
    cursorFollower.style.top = followerY + "px";
  }

  requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effects
const hoverElements = document.querySelectorAll(
  "a, button, .project-card, .skill-item, .stat"
);
hoverElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("hover");
    cursorFollower.classList.add("hover");
  });
  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("hover");
    cursorFollower.classList.remove("hover");
  });
});

// ============================================
// Loader
// ============================================
const loader = document.querySelector(".loader");

window.addEventListener("load", () => {
  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
    document.body.style.overflow = "visible";

    // Trigger hero animations after loader
    animateHero();
  }, 2500);
});

// ============================================
// Mobile Menu
// ============================================
const menuBtn = document.querySelector(".nav-menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-link");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  mobileMenu.classList.toggle("active");
  document.body.style.overflow = mobileMenu.classList.contains("active")
    ? "hidden"
    : "visible";
});

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuBtn.classList.remove("active");
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "visible";
  });
});

// ============================================
// GSAP Animations
// ============================================
gsap.registerPlugin(ScrollTrigger);

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

// Section animations
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
    y: 60,
    duration: 1,
    ease: "power3.out",
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
  x: -60,
  duration: 1,
  ease: "power3.out",
});

gsap.from(".about-text > *", {
  scrollTrigger: {
    trigger: ".about",
    start: "top 70%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  y: 40,
  duration: 0.8,
  stagger: 0.15,
  ease: "power3.out",
});

// Project cards animation
gsap.from(".project-card", {
  scrollTrigger: {
    trigger: ".projects-grid",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  y: 80,
  duration: 0.8,
  stagger: 0.15,
  ease: "power3.out",
});

// Skills animation
gsap.from(".skill-item", {
  scrollTrigger: {
    trigger: ".skills-list",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  y: 60,
  duration: 0.6,
  stagger: 0.1,
  ease: "power3.out",
});

// Contact animation
gsap.from(".contact-content > *", {
  scrollTrigger: {
    trigger: ".contact",
    start: "top 70%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  y: 40,
  duration: 0.8,
  stagger: 0.1,
  ease: "power3.out",
});

// ============================================
// Stats Counter Animation
// ============================================
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

// ============================================
// Three.js 3D Scene - Hero
// ============================================
function initHero3D() {
  const container = document.getElementById("hero-canvas");
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Create icosahedron geometry with wireframe
  const geometry = new THREE.IcosahedronGeometry(2.5, 1);
  const material = new THREE.MeshBasicMaterial({
    color: 0x6c63ff,
    wireframe: true,
    transparent: true,
    opacity: 0.6,
  });
  const icosahedron = new THREE.Mesh(geometry, material);
  scene.add(icosahedron);

  // Inner sphere
  const innerGeometry = new THREE.IcosahedronGeometry(2, 0);
  const innerMaterial = new THREE.MeshBasicMaterial({
    color: 0x764ba2,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
  });
  const innerIcosahedron = new THREE.Mesh(innerGeometry, innerMaterial);
  scene.add(innerIcosahedron);

  // Particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 500;
  const posArray = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 15;
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(posArray, 3)
  );

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x6c63ff,
    transparent: true,
    opacity: 0.8,
  });

  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  camera.position.z = 6;

  // Mouse interaction
  let mouseX = 0,
    mouseY = 0;
  let targetX = 0,
    targetY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // Animation
  function animate() {
    requestAnimationFrame(animate);

    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    icosahedron.rotation.x += 0.002;
    icosahedron.rotation.y += 0.003;
    icosahedron.rotation.x += targetY * 0.02;
    icosahedron.rotation.y += targetX * 0.02;

    innerIcosahedron.rotation.x -= 0.003;
    innerIcosahedron.rotation.y -= 0.002;

    particlesMesh.rotation.y += 0.0005;

    renderer.render(scene, camera);
  }
  animate();

  // Resize handler
  window.addEventListener("resize", () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}

// ============================================
// Three.js 3D Scene - Contact
// ============================================
function initContact3D() {
  const container = document.getElementById("contact-canvas");
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Create a glowing communication/network sphere
  const mainGroup = new THREE.Group();

  // Central glowing core
  const coreGeometry = new THREE.IcosahedronGeometry(1.2, 2);
  const coreMaterial = new THREE.MeshBasicMaterial({
    color: 0x6c63ff,
    transparent: true,
    opacity: 0.3,
    wireframe: true,
  });
  const core = new THREE.Mesh(coreGeometry, coreMaterial);
  mainGroup.add(core);

  // Inner solid sphere
  const innerGeometry = new THREE.SphereGeometry(0.8, 32, 32);
  const innerMaterial = new THREE.MeshBasicMaterial({
    color: 0x667eea,
    transparent: true,
    opacity: 0.15,
  });
  const innerSphere = new THREE.Mesh(innerGeometry, innerMaterial);
  mainGroup.add(innerSphere);

  // Outer ring 1 - horizontal
  const ring1Geometry = new THREE.TorusGeometry(2, 0.03, 16, 100);
  const ring1Material = new THREE.MeshBasicMaterial({
    color: 0x667eea,
    transparent: true,
    opacity: 0.6,
  });
  const ring1 = new THREE.Mesh(ring1Geometry, ring1Material);
  mainGroup.add(ring1);

  // Outer ring 2 - tilted
  const ring2 = new THREE.Mesh(ring1Geometry, ring1Material.clone());
  ring2.rotation.x = Math.PI / 3;
  ring2.rotation.y = Math.PI / 6;
  mainGroup.add(ring2);

  // Outer ring 3 - opposite tilt
  const ring3Material = new THREE.MeshBasicMaterial({
    color: 0x764ba2,
    transparent: true,
    opacity: 0.6,
  });
  const ring3 = new THREE.Mesh(ring1Geometry, ring3Material);
  ring3.rotation.x = -Math.PI / 3;
  ring3.rotation.y = -Math.PI / 6;
  mainGroup.add(ring3);

  // Create orbiting dots on rings
  const createOrbitingDots = (radius, count, color) => {
    const dots = [];
    for (let i = 0; i < count; i++) {
      const dotGeometry = new THREE.SphereGeometry(0.08, 16, 16);
      const dotMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.9,
      });
      const dot = new THREE.Mesh(dotGeometry, dotMaterial);
      dot.userData = {
        angle: (i / count) * Math.PI * 2,
        radius: radius,
        speed: 0.02 + Math.random() * 0.01,
      };
      dots.push(dot);
      mainGroup.add(dot);
    }
    return dots;
  };

  const orbitDots1 = createOrbitingDots(2, 8, 0x667eea);
  const orbitDots2 = createOrbitingDots(2, 6, 0x764ba2);

  // Connection lines (representing network/communication)
  const linesMaterial = new THREE.LineBasicMaterial({
    color: 0x6c63ff,
    transparent: true,
    opacity: 0.3,
  });

  const connectionLines = [];
  for (let i = 0; i < 12; i++) {
    const points = [];
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    const r = 0.8;

    points.push(
      new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      )
    );

    const outerR = 2.5 + Math.random() * 1;
    points.push(
      new THREE.Vector3(
        outerR * Math.sin(phi) * Math.cos(theta),
        outerR * Math.sin(phi) * Math.sin(theta),
        outerR * Math.cos(phi)
      )
    );

    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(lineGeometry, linesMaterial);
    connectionLines.push(line);
    mainGroup.add(line);
  }

  // Floating particles around
  const particlesGroup = new THREE.Group();
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const size = 0.03 + Math.random() * 0.05;
    const particleGeometry = new THREE.SphereGeometry(size, 8, 8);
    const particleMaterial = new THREE.MeshBasicMaterial({
      color: Math.random() > 0.5 ? 0x667eea : 0x764ba2,
      transparent: true,
      opacity: 0.5 + Math.random() * 0.3,
    });
    const particle = new THREE.Mesh(particleGeometry, particleMaterial);

    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    const r = 3 + Math.random() * 2;

    particle.position.set(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    );

    particle.userData = {
      originalPos: particle.position.clone(),
      speed: 0.5 + Math.random() * 0.5,
      offset: Math.random() * Math.PI * 2,
    };

    particlesGroup.add(particle);
  }

  scene.add(mainGroup);
  scene.add(particlesGroup);

  camera.position.z = 6;

  // Mouse interaction
  let mouseX = 0,
    mouseY = 0;

  container.addEventListener("mousemove", (e) => {
    const rect = container.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
    mouseY = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;
  });

  // Animation
  let time = 0;
  function animate() {
    requestAnimationFrame(animate);
    time += 0.01;

    // Rotate main group
    mainGroup.rotation.y += 0.003;
    mainGroup.rotation.x = mouseY * 0.2;
    mainGroup.rotation.z = mouseX * 0.1;

    // Rotate core faster
    core.rotation.x += 0.005;
    core.rotation.y += 0.008;

    // Rotate rings at different speeds
    ring1.rotation.z += 0.002;
    ring2.rotation.z -= 0.003;
    ring3.rotation.z += 0.004;

    // Animate orbiting dots
    orbitDots1.forEach((dot) => {
      dot.userData.angle += dot.userData.speed;
      dot.position.x = Math.cos(dot.userData.angle) * dot.userData.radius;
      dot.position.z = Math.sin(dot.userData.angle) * dot.userData.radius;
    });

    orbitDots2.forEach((dot) => {
      dot.userData.angle -= dot.userData.speed;
      const angle = dot.userData.angle;
      dot.position.x =
        Math.cos(angle) * Math.cos(Math.PI / 3) * dot.userData.radius;
      dot.position.y =
        Math.sin(Math.PI / 3) * Math.sin(angle) * dot.userData.radius;
      dot.position.z =
        Math.sin(angle) * Math.cos(Math.PI / 3) * dot.userData.radius;
    });

    // Animate floating particles
    particlesGroup.children.forEach((particle) => {
      const { originalPos, speed, offset } = particle.userData;
      particle.position.x =
        originalPos.x + Math.sin(time * speed + offset) * 0.2;
      particle.position.y =
        originalPos.y + Math.cos(time * speed + offset) * 0.2;
      particle.position.z =
        originalPos.z + Math.sin(time * speed * 0.5 + offset) * 0.15;
    });

    renderer.render(scene, camera);
  }
  animate();

  // Resize handler
  window.addEventListener("resize", () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}

// Initialize 3D scenes
initHero3D();
initContact3D();

// ============================================
// Smooth Scroll
// ============================================
gsap.registerPlugin(ScrollToPlugin);

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);
    if (target) {
      gsap.to(window, {
        duration: 0.3,
        scrollTo: {
          y: target,
          offsetY: 80,
        },
        ease: "power2.out",
      });
    }
  });
});

// ============================================
// Project Modal Functionality
// ============================================
const projectData = {
  1: {
    title: "3D Interactive Gallery",
    description:
      "An immersive 3D art gallery built with Three.js and WebGL. Users can navigate through a virtual space, interact with artworks, and experience a unique digital exhibition. The project features realistic lighting, smooth camera transitions, and responsive design.",
    tags: ["Three.js", "WebGL", "GSAP", "JavaScript"],
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    liveUrl: "#",
    githubUrl: "https://github.com/Atharva12210985",
  },
  2: {
    title: "Real-time Dashboard",
    description:
      "A comprehensive real-time data visualization dashboard with WebSocket integration. Features live charts, notifications, and multi-user collaboration. Built with React for the frontend and Node.js for the backend with Redis for caching.",
    tags: ["React", "Node.js", "WebSocket", "Redis", "Chart.js"],
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    liveUrl: "#",
    githubUrl: "https://github.com/Atharva12210985",
  },
  3: {
    title: "E-Commerce Platform",
    description:
      "A modern e-commerce solution with seamless user experience. Features include product search, filtering, shopping cart, secure checkout with Stripe, user authentication, and order tracking. Built with Next.js for optimal performance and SEO.",
    tags: ["Next.js", "Stripe", "MongoDB", "Tailwind CSS", "Auth.js"],
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    liveUrl: "#",
    githubUrl: "https://github.com/Atharva12210985",
  },
  4: {
    title: "WebGL Particles",
    description:
      "An interactive particle system with physics simulation. Features thousands of particles reacting to mouse movement, gravity, and wind forces. Custom GLSL shaders provide stunning visual effects with optimized performance.",
    tags: ["WebGL", "GLSL Shaders", "JavaScript", "Physics"],
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    liveUrl: "#",
    githubUrl: "https://github.com/Atharva12210985",
  },
};

const modal = document.getElementById("projectModal");
const modalOverlay = modal.querySelector(".modal-overlay");
const modalClose = modal.querySelector(".modal-close");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTags = document.getElementById("modalTags");
const modalLiveBtn = document.getElementById("modalLiveBtn");
const modalGithubBtn = document.getElementById("modalGithubBtn");

function openProjectModal(projectId) {
  const project = projectData[projectId];
  if (!project) return;

  modalImage.style.background = project.gradient;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalTags.innerHTML = project.tags
    .map((tag) => `<span>${tag}</span>`)
    .join("");
  modalLiveBtn.href = project.liveUrl;
  modalGithubBtn.href = project.githubUrl;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  gsap.fromTo(
    modal.querySelector(".modal-content"),
    { opacity: 0, scale: 0.9, y: 50 },
    { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out" }
  );
}

function closeProjectModal() {
  gsap.to(modal.querySelector(".modal-content"), {
    opacity: 0,
    scale: 0.9,
    y: 50,
    duration: 0.3,
    ease: "power3.in",
    onComplete: () => {
      modal.classList.remove("active");
      document.body.style.overflow = "visible";
    },
  });
}

// Project card click handlers
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => {
    const projectId = card.getAttribute("data-project");
    openProjectModal(projectId);
  });
});

// Close modal handlers
modalClose.addEventListener("click", closeProjectModal);
modalOverlay.addEventListener("click", closeProjectModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeProjectModal();
  }
});

// Add cursor hover effects for modal elements
[modalClose, modalLiveBtn, modalGithubBtn].forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("hover");
    cursorFollower.classList.add("hover");
  });
  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("hover");
    cursorFollower.classList.remove("hover");
  });
});

// ============================================
// Magnetic Effect for Buttons
// ============================================
const magneticElements = document.querySelectorAll(
  ".btn-primary, .btn-secondary, .btn-outline, .contact-link, .modal-close"
);

magneticElements.forEach((el) => {
  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(el, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  el.addEventListener("mouseleave", () => {
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  });
});

// ============================================
// Navbar Background on Scroll
// ============================================
let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.style.background = "rgba(10, 10, 10, 0.9)";
    navbar.style.backdropFilter = "blur(10px)";
    navbar.style.mixBlendMode = "normal";
  } else {
    navbar.style.background = "transparent";
    navbar.style.backdropFilter = "none";
    navbar.style.mixBlendMode = "difference";
  }

  lastScroll = currentScroll;
});

// ============================================
// Text Reveal on Scroll
// ============================================
const revealElements = document.querySelectorAll(".reveal");

revealElements.forEach((el) => {
  ScrollTrigger.create({
    trigger: el,
    start: "top 85%",
    onEnter: () => el.classList.add("active"),
    onLeaveBack: () => el.classList.remove("active"),
  });
});

// ============================================
// Parallax Effect for Background Text
// ============================================
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

// ============================================
// Image Tilt Effect
// ============================================
const tiltElements = document.querySelectorAll(".image-wrapper");

tiltElements.forEach((el) => {
  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  el.addEventListener("mouseleave", () => {
    el.style.transform = "";
  });
});

// ============================================
// Preload Critical Assets
// ============================================
const preloadImages = () => {
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    const src = img.getAttribute("src") || img.getAttribute("data-src");
    if (src) {
      const preloadImg = new Image();
      preloadImg.src = src;
    }
  });
};

preloadImages();

// ============================================
// Premium Enhancement: Hero Parallax Effect
// ============================================
if (!prefersReducedMotion) {
  const heroFloatingShapes = document.querySelectorAll(".floating-shape");
  const heroSection = document.querySelector(".hero");

  if (heroSection && heroFloatingShapes.length > 0) {
    document.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      heroFloatingShapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.02;
        const x = (clientX - centerX) * speed;
        const y = (clientY - centerY) * speed;

        shape.style.transform = `translate(${x}px, ${y}px)`;
      });
    });
  }
}

// ============================================
// Premium Enhancement: Card 3D Tilt Effect
// ============================================
if (!prefersReducedMotion) {
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Maximum tilt of 5 degrees as per requirements
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

// ============================================
// Premium Enhancement: Smooth Section Reveal
// ============================================
if (!prefersReducedMotion) {
  // IntersectionObserver for section entrance animations
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -10% 0px",
    threshold: 0.1,
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("section-visible");
        // Only trigger once
        sectionObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all major sections
  document
    .querySelectorAll(".about, .projects, .skills, .contact")
    .forEach((section) => {
      section.classList.add("section-animate");
      sectionObserver.observe(section);
    });
}

// ============================================
// Premium Enhancement: Skill Icon Hover Glow
// ============================================
if (!prefersReducedMotion) {
  const skillItems = document.querySelectorAll(".skill-item");

  skillItems.forEach((item) => {
    item.addEventListener("mousemove", (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      item.style.setProperty("--mouse-x", `${x}px`);
      item.style.setProperty("--mouse-y", `${y}px`);
    });
  });
}

console.log("🚀 Portfolio loaded successfully!");
