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

/* ============================================
   Contact 3D Scene - Flying Paper Airplane
   ============================================
   
   A graceful paper airplane symbolizing 
   "sending a message" - perfect for Contact section.
   Enhanced with glowing effects, sparkle trails,
   and ambient atmosphere.
   ============================================ */

function initContact3D() {
  const container = document.getElementById("contact-canvas");
  if (!container) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Theme colors
  const rootStyles = getComputedStyle(document.documentElement);
  const accentColor =
    rootStyles.getPropertyValue("--color-accent").trim() || "#6c63ff";
  const gradientColor1 =
    rootStyles.getPropertyValue("--color-gradient-1").trim() || "#667eea";
  const gradientColor2 =
    rootStyles.getPropertyValue("--color-gradient-2").trim() || "#764ba2";

  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
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

  const mainGroup = new THREE.Group();

  // ===== PAPER AIRPLANE GEOMETRY (IMPROVED) =====
  const planeGroup = new THREE.Group();

  // Enhanced paper airplane with more detail
  const bodyVertices = new Float32Array([
    // Top surface - left wing
    0,
    0,
    2.5, // Nose
    -2.5,
    0,
    -1.2, // Left wing tip
    -0.3,
    0.2,
    -1, // Left body edge

    // Top surface - center left
    0,
    0,
    2.5,
    -0.3,
    0.2,
    -1,
    0,
    0.25,
    -1.3, // Tail peak

    // Top surface - center right
    0,
    0,
    2.5,
    0,
    0.25,
    -1.3,
    0.3,
    0.2,
    -1,

    // Top surface - right wing
    0,
    0,
    2.5,
    0.3,
    0.2,
    -1,
    2.5,
    0,
    -1.2,

    // Bottom surface - left
    0,
    0,
    2.5,
    -0.25,
    -0.15,
    -1,
    -2.5,
    0,
    -1.2,

    // Bottom surface - right
    0,
    0,
    2.5,
    2.5,
    0,
    -1.2,
    0.25,
    -0.15,
    -1,

    // Bottom surface - center
    0,
    0,
    2.5,
    0.25,
    -0.15,
    -1,
    -0.25,
    -0.15,
    -1,

    // Back panel left
    -0.3,
    0.2,
    -1,
    -0.25,
    -0.15,
    -1,
    0,
    0.25,
    -1.3,

    // Back panel right
    0.3,
    0.2,
    -1,
    0,
    0.25,
    -1.3,
    0.25,
    -0.15,
    -1,
  ]);

  const bodyGeometry = new THREE.BufferGeometry();
  bodyGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(bodyVertices, 3)
  );
  bodyGeometry.computeVertexNormals();

  // Glowing solid material
  const bodyMaterial = new THREE.MeshBasicMaterial({
    color: gradientColor1,
    transparent: true,
    opacity: 0.4,
    side: THREE.DoubleSide,
  });
  const bodySolid = new THREE.Mesh(bodyGeometry, bodyMaterial);
  planeGroup.add(bodySolid);

  // Secondary inner glow
  const innerGlowMat = new THREE.MeshBasicMaterial({
    color: accentColor,
    transparent: true,
    opacity: 0.2,
    side: THREE.DoubleSide,
  });
  const innerGlow = new THREE.Mesh(bodyGeometry.clone(), innerGlowMat);
  innerGlow.scale.set(0.9, 0.9, 0.9);
  planeGroup.add(innerGlow);

  // Wireframe overlay
  const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: gradientColor2,
    wireframe: true,
    transparent: true,
    opacity: 0.9,
  });
  const bodyWireframe = new THREE.Mesh(bodyGeometry, wireframeMaterial);
  planeGroup.add(bodyWireframe);

  // Crisp edge lines
  const edgesGeometry = new THREE.EdgesGeometry(bodyGeometry, 10);
  const edgesMaterial = new THREE.LineBasicMaterial({
    color: accentColor,
    transparent: true,
    opacity: 1,
  });
  const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
  planeGroup.add(edges);

  // Nose glow point
  const noseGlowGeo = new THREE.SphereGeometry(0.08, 16, 16);
  const noseGlowMat = new THREE.MeshBasicMaterial({
    color: accentColor,
    transparent: true,
    opacity: 0.8,
  });
  const noseGlow = new THREE.Mesh(noseGlowGeo, noseGlowMat);
  noseGlow.position.set(0, 0, 2.5);
  planeGroup.add(noseGlow);

  planeGroup.scale.set(0.7, 0.7, 0.7);
  mainGroup.add(planeGroup);

  // ===== SPARKLE TRAIL =====
  const sparkleTrail = [];
  const sparkleCount = 40;

  for (let i = 0; i < sparkleCount; i++) {
    const size = 0.02 + (1 - i / sparkleCount) * 0.06;
    const sparkleGeo = new THREE.OctahedronGeometry(size, 0);
    const sparkleMat = new THREE.MeshBasicMaterial({
      color: i % 2 === 0 ? gradientColor1 : accentColor,
      transparent: true,
      opacity: (1 - i / sparkleCount) * 0.8,
    });
    const sparkle = new THREE.Mesh(sparkleGeo, sparkleMat);

    sparkle.userData = {
      index: i,
      baseOpacity: (1 - i / sparkleCount) * 0.8,
      rotSpeed: 0.05 + Math.random() * 0.1,
    };

    sparkleTrail.push(sparkle);
    mainGroup.add(sparkle);
  }

  // ===== GLOWING ORBIT RINGS =====
  const orbitRings = [];
  for (let i = 0; i < 2; i++) {
    const ringGeo = new THREE.TorusGeometry(
      2.8 + i * 0.4,
      0.01 - i * 0.003,
      8,
      64
    );
    const ringMat = new THREE.MeshBasicMaterial({
      color: i === 0 ? gradientColor1 : gradientColor2,
      transparent: true,
      opacity: 0.2 - i * 0.05,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2 + i * 0.2;
    ring.rotation.z = i * 0.3;
    orbitRings.push(ring);
    mainGroup.add(ring);
  }

  // ===== FLOATING @ SYMBOLS (representing email) =====
  const atSymbols = [];
  for (let i = 0; i < 4; i++) {
    const atGroup = new THREE.Group();

    // @ symbol using torus + small sphere
    const atRingGeo = new THREE.TorusGeometry(0.12, 0.025, 8, 24);
    const atRingMat = new THREE.MeshBasicMaterial({
      color: gradientColor1,
      transparent: true,
      opacity: 0.5,
    });
    const atRing = new THREE.Mesh(atRingGeo, atRingMat);
    atGroup.add(atRing);

    // Inner 'a' part
    const aGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const aMat = new THREE.MeshBasicMaterial({
      color: gradientColor2,
      transparent: true,
      opacity: 0.6,
    });
    const aBall = new THREE.Mesh(aGeo, aMat);
    aBall.position.set(0.03, 0, 0);
    atGroup.add(aBall);

    // Tail of @
    const tailGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.1, 8);
    const tail = new THREE.Mesh(tailGeo, atRingMat);
    tail.position.set(0.14, -0.03, 0);
    tail.rotation.z = -Math.PI / 4;
    atGroup.add(tail);

    const angle = (i / 4) * Math.PI * 2;
    const radius = 3.5 + Math.random() * 0.5;

    atGroup.position.set(
      Math.cos(angle) * radius,
      (Math.random() - 0.5) * 2,
      Math.sin(angle) * radius
    );

    atGroup.userData = {
      angle: angle,
      radius: radius,
      floatOffset: Math.random() * Math.PI * 2,
      orbitSpeed: 0.003 + Math.random() * 0.002,
      wobbleSpeed: 1 + Math.random(),
    };

    atSymbols.push(atGroup);
    mainGroup.add(atGroup);
  }

  // ===== CHAT BUBBLES =====
  const chatBubbles = [];
  for (let i = 0; i < 3; i++) {
    const bubbleGroup = new THREE.Group();

    // Rounded rectangle approximation using scaled sphere
    const bubbleGeo = new THREE.SphereGeometry(0.15, 16, 12);
    bubbleGeo.scale(1.5, 1, 0.3);

    const bubbleMat = new THREE.MeshBasicMaterial({
      color: accentColor,
      transparent: true,
      opacity: 0.25,
    });
    const bubble = new THREE.Mesh(bubbleGeo, bubbleMat);
    bubbleGroup.add(bubble);

    // Bubble wireframe
    const bubbleWire = new THREE.Mesh(
      bubbleGeo.clone(),
      new THREE.MeshBasicMaterial({
        color: gradientColor2,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      })
    );
    bubbleGroup.add(bubbleWire);

    // Three dots inside (typing indicator)
    for (let d = 0; d < 3; d++) {
      const dotGeo = new THREE.SphereGeometry(0.025, 8, 8);
      const dotMat = new THREE.MeshBasicMaterial({
        color: gradientColor1,
        transparent: true,
        opacity: 0.7,
      });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.set(-0.08 + d * 0.08, 0, 0.05);
      dot.userData = { dotIndex: d };
      bubbleGroup.add(dot);
    }

    const angle = (i / 3) * Math.PI * 2 + Math.PI / 6;
    const radius = 2.8;

    bubbleGroup.position.set(
      Math.cos(angle) * radius,
      -1.5 + i * 0.3,
      Math.sin(angle) * radius
    );

    bubbleGroup.userData = {
      angle: angle,
      baseY: -1.5 + i * 0.3,
      floatOffset: Math.random() * Math.PI * 2,
    };

    chatBubbles.push(bubbleGroup);
    mainGroup.add(bubbleGroup);
  }

  // ===== SIGNAL WAVES =====
  const signalWaves = [];
  for (let i = 0; i < 4; i++) {
    const waveGeo = new THREE.RingGeometry(
      0.2 + i * 0.2,
      0.25 + i * 0.2,
      32,
      1,
      0,
      Math.PI * 0.8
    );
    const waveMat = new THREE.MeshBasicMaterial({
      color: accentColor,
      transparent: true,
      opacity: 0.5 - i * 0.1,
      side: THREE.DoubleSide,
    });
    const wave = new THREE.Mesh(waveGeo, waveMat);
    wave.position.set(-3, 0.5, 0);
    wave.rotation.y = Math.PI / 2;
    wave.rotation.z = -Math.PI / 4;

    wave.userData = {
      baseOpacity: 0.5 - i * 0.1,
      pulseOffset: i * 0.4,
    };

    signalWaves.push(wave);
    mainGroup.add(wave);
  }

  // ===== AMBIENT PARTICLES =====
  const ambientParticles = [];
  for (let i = 0; i < 30; i++) {
    const pSize = 0.015 + Math.random() * 0.025;
    const pGeo = new THREE.SphereGeometry(pSize, 6, 6);
    const pMat = new THREE.MeshBasicMaterial({
      color: Math.random() > 0.5 ? gradientColor1 : gradientColor2,
      transparent: true,
      opacity: 0.2 + Math.random() * 0.3,
    });
    const p = new THREE.Mesh(pGeo, pMat);

    const radius = 3 + Math.random() * 2;
    const theta = Math.random() * Math.PI * 2;
    const phi = (Math.random() - 0.5) * Math.PI;

    p.position.set(
      Math.cos(phi) * Math.cos(theta) * radius,
      Math.sin(phi) * radius,
      Math.cos(phi) * Math.sin(theta) * radius
    );

    p.userData = {
      theta,
      phi,
      radius,
      speed: 0.0005 + Math.random() * 0.001,
    };

    ambientParticles.push(p);
    mainGroup.add(p);
  }

  scene.add(mainGroup);
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
  let planeAngle = 0;
  const flightRadius = 2.5;
  const flightSpeed = 0.012;

  const positionHistory = [];

  function animate() {
    requestAnimationFrame(animate);

    if (!prefersReducedMotion) {
      time += 0.016;
      planeAngle += flightSpeed;

      // ===== AIRPLANE FLIGHT PATH (smooth figure-8) =====
      const x = Math.sin(planeAngle) * flightRadius;
      const y = Math.sin(planeAngle * 2) * 0.6;
      const z = Math.cos(planeAngle) * flightRadius * 0.6;

      planeGroup.position.set(x, y, z);

      // Direction & banking
      const nextX = Math.sin(planeAngle + 0.1) * flightRadius;
      const nextY = Math.sin((planeAngle + 0.1) * 2) * 0.6;
      const nextZ = Math.cos(planeAngle + 0.1) * flightRadius * 0.6;

      planeGroup.lookAt(nextX, nextY, nextZ);
      planeGroup.rotation.z = Math.cos(planeAngle) * 0.35;

      // Nose glow pulse
      noseGlow.material.opacity = 0.6 + Math.sin(time * 4) * 0.3;
      noseGlow.scale.setScalar(0.8 + Math.sin(time * 4) * 0.3);

      // ===== SPARKLE TRAIL =====
      positionHistory.unshift({ x, y, z });
      if (positionHistory.length > sparkleCount * 2) {
        positionHistory.pop();
      }

      sparkleTrail.forEach((sparkle, i) => {
        const histIdx = Math.min(i * 2, positionHistory.length - 1);
        if (positionHistory[histIdx]) {
          const spread = (i / sparkleCount) * 0.3;
          sparkle.position.set(
            positionHistory[histIdx].x + (Math.random() - 0.5) * spread,
            positionHistory[histIdx].y + (Math.random() - 0.5) * spread,
            positionHistory[histIdx].z - 0.3
          );
        }

        sparkle.rotation.x += sparkle.userData.rotSpeed;
        sparkle.rotation.y += sparkle.userData.rotSpeed * 0.7;

        const pulse = Math.sin(time * 5 + i * 0.2) * 0.3;
        sparkle.material.opacity = Math.max(
          0,
          sparkle.userData.baseOpacity + pulse
        );
      });

      // ===== ORBIT RINGS =====
      orbitRings.forEach((ring, i) => {
        ring.rotation.z += 0.002 * (i === 0 ? 1 : -1);
      });

      // ===== @ SYMBOLS =====
      atSymbols.forEach((at) => {
        const { floatOffset, orbitSpeed, wobbleSpeed } = at.userData;

        at.userData.angle += orbitSpeed;
        at.position.x = Math.cos(at.userData.angle) * at.userData.radius;
        at.position.z = Math.sin(at.userData.angle) * at.userData.radius;
        at.position.y += Math.sin(time * wobbleSpeed + floatOffset) * 0.003;

        at.rotation.y += 0.01;
        at.rotation.x = Math.sin(time + floatOffset) * 0.2;
      });

      // ===== CHAT BUBBLES =====
      chatBubbles.forEach((bubble, idx) => {
        const { baseY, floatOffset } = bubble.userData;
        bubble.position.y = baseY + Math.sin(time * 0.8 + floatOffset) * 0.15;
        bubble.rotation.y = Math.sin(time * 0.5 + idx) * 0.1;

        // Animate typing dots
        bubble.children.forEach((child) => {
          if (child.userData && child.userData.dotIndex !== undefined) {
            const dotBounce =
              Math.sin(time * 4 + child.userData.dotIndex * 0.8) * 0.5 + 0.5;
            child.position.y = dotBounce * 0.04;
            child.material.opacity = 0.5 + dotBounce * 0.5;
          }
        });
      });

      // ===== SIGNAL WAVES =====
      signalWaves.forEach((wave) => {
        const pulse =
          Math.sin(time * 3 + wave.userData.pulseOffset) * 0.5 + 0.5;
        wave.material.opacity = wave.userData.baseOpacity * pulse;
        wave.scale.setScalar(0.9 + pulse * 0.2);
      });

      // ===== AMBIENT PARTICLES =====
      ambientParticles.forEach((p) => {
        p.userData.theta += p.userData.speed;
        const { theta, phi, radius } = p.userData;
        p.position.x = Math.cos(phi) * Math.cos(theta) * radius;
        p.position.z = Math.cos(phi) * Math.sin(theta) * radius;
      });

      // ===== MOUSE INFLUENCE =====
      mainGroup.rotation.y += (mouseX * 0.4 - mainGroup.rotation.y) * 0.03;
      mainGroup.rotation.x += (mouseY * 0.2 - mainGroup.rotation.x) * 0.03;
    }

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
// initContact3D will be called after first paint from index.html
