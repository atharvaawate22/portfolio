/* ============================================
   Three.js Scenes - 3D visualizations
   ============================================ */

// Hero 3D Scene
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

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Icosahedron geometry
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

  // Animation loop
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

// Contact 3D Scene
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

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const mainGroup = new THREE.Group();

  // Central core
  const coreGeometry = new THREE.IcosahedronGeometry(1.2, 2);
  const coreMaterial = new THREE.MeshBasicMaterial({
    color: 0x6c63ff,
    transparent: true,
    opacity: 0.3,
    wireframe: true,
  });
  const core = new THREE.Mesh(coreGeometry, coreMaterial);
  mainGroup.add(core);

  // Inner sphere
  const innerGeometry = new THREE.SphereGeometry(0.8, 32, 32);
  const innerMaterial = new THREE.MeshBasicMaterial({
    color: 0x667eea,
    transparent: true,
    opacity: 0.15,
  });
  const innerSphere = new THREE.Mesh(innerGeometry, innerMaterial);
  mainGroup.add(innerSphere);

  // Rings
  const ring1Geometry = new THREE.TorusGeometry(2, 0.03, 16, 100);
  const ring1Material = new THREE.MeshBasicMaterial({
    color: 0x667eea,
    transparent: true,
    opacity: 0.6,
  });
  const ring1 = new THREE.Mesh(ring1Geometry, ring1Material);
  mainGroup.add(ring1);

  const ring2 = new THREE.Mesh(ring1Geometry, ring1Material.clone());
  ring2.rotation.x = Math.PI / 3;
  ring2.rotation.y = Math.PI / 6;
  mainGroup.add(ring2);

  const ring3Material = new THREE.MeshBasicMaterial({
    color: 0x764ba2,
    transparent: true,
    opacity: 0.6,
  });
  const ring3 = new THREE.Mesh(ring1Geometry, ring3Material);
  ring3.rotation.x = -Math.PI / 3;
  ring3.rotation.y = -Math.PI / 6;
  mainGroup.add(ring3);

  // Orbiting dots
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

  // Connection lines
  const linesMaterial = new THREE.LineBasicMaterial({
    color: 0x6c63ff,
    transparent: true,
    opacity: 0.3,
  });

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
    mainGroup.add(line);
  }

  // Floating particles
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

  // Animation loop
  let time = 0;
  function animate() {
    requestAnimationFrame(animate);
    time += 0.01;

    mainGroup.rotation.y += 0.003;
    mainGroup.rotation.x = mouseY * 0.2;
    mainGroup.rotation.z = mouseX * 0.1;

    core.rotation.x += 0.005;
    core.rotation.y += 0.008;

    ring1.rotation.z += 0.002;
    ring2.rotation.z -= 0.003;
    ring3.rotation.z += 0.004;

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
