/* ============================================
   Three.js Scenes - 3D visualizations
   ============================================ */
import * as THREE from 'three';

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

  // Theme colors from CSS variables (single source of truth for palette)
  const rootStyles = getComputedStyle(document.documentElement);
  const accentColor =
    rootStyles.getPropertyValue("--color-accent").trim() || "#ffb454";
  const coolColor =
    rootStyles.getPropertyValue("--color-cool").trim() || "#6f9fbe";

  // Icosahedron geometry
  const geometry = new THREE.IcosahedronGeometry(2.5, 1);
  const material = new THREE.MeshBasicMaterial({
    color: accentColor,
    wireframe: true,
    transparent: true,
    opacity: 0.6,
  });
  const icosahedron = new THREE.Mesh(geometry, material);
  scene.add(icosahedron);

  // Inner sphere — cool steel blue against the amber outer shell
  const innerGeometry = new THREE.IcosahedronGeometry(2, 0);
  const innerMaterial = new THREE.MeshBasicMaterial({
    color: coolColor,
    wireframe: true,
    transparent: true,
    opacity: 0.35,
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
    color: accentColor,
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

  // Resize handler — stored so it can be removed if scene is torn down
  function onHeroResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }
  window.addEventListener("resize", onHeroResize);
  // Expose cleanup for dev/hot-reload scenarios
  initHero3D.cleanup = () => window.removeEventListener("resize", onHeroResize);
}

/* ============================================
   Contact 3D Scene - Listening Dish
   ============================================

   A wireframe radio dish that slowly pans the sky
   while signal pulses ripple in along its beam —
   always listening for the next transmission.
   ============================================ */

function initContactDish() {
  const container = document.getElementById("contact-canvas");
  if (!container) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Theme colors
  const rootStyles = getComputedStyle(document.documentElement);
  const accentColor =
    rootStyles.getPropertyValue("--color-accent").trim() || "#ffb454";
  const coolColor =
    rootStyles.getPropertyValue("--color-cool").trim() || "#6f9fbe";
  const GREEN = 0x34d399; // availability green, matches status dots

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    50,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0.4, 6.2);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // rig pans (azimuth); dishGroup elevates (the dish + feed ride on it)
  const BASE_ELEVATION = -0.75; // shallow enough that the parabola profile reads
  const rig = new THREE.Group();
  rig.position.y = -1.3;
  scene.add(rig);

  const dishGroup = new THREE.Group();
  dishGroup.position.y = 1.1; // gimbal height above the base
  dishGroup.rotation.x = BASE_ELEVATION;
  rig.add(dishGroup);

  // Parabolic reflector: lathe of y = k·x², opening along local +Y
  const profile = [];
  for (let i = 0; i <= 12; i++) {
    const x = (i / 12) * 1.55;
    profile.push(new THREE.Vector2(x, 0.34 * x * x));
  }
  const dishGeometry = new THREE.LatheGeometry(profile, 28);

  const dishWire = new THREE.Mesh(
    dishGeometry,
    new THREE.MeshBasicMaterial({
      color: accentColor,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    })
  );
  dishGroup.add(dishWire);

  const dishSkin = new THREE.Mesh(
    dishGeometry.clone(),
    new THREE.MeshBasicMaterial({
      color: accentColor,
      transparent: true,
      opacity: 0.06,
      side: THREE.DoubleSide,
    })
  );
  dishGroup.add(dishSkin);

  // Feed struts + receiver at the focal point
  const FOCUS_Y = 1.15;
  const strutMaterial = new THREE.LineBasicMaterial({
    color: accentColor,
    transparent: true,
    opacity: 0.5,
  });
  const strutPoints = [];
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2;
    strutPoints.push(
      new THREE.Vector3(Math.cos(a) * 1.05, 0.39, Math.sin(a) * 1.05),
      new THREE.Vector3(0, FOCUS_Y, 0)
    );
  }
  const struts = new THREE.LineSegments(
    new THREE.BufferGeometry().setFromPoints(strutPoints),
    strutMaterial
  );
  dishGroup.add(struts);

  const receiver = new THREE.Mesh(
    new THREE.SphereGeometry(0.09, 12, 12),
    new THREE.MeshBasicMaterial({ color: GREEN, transparent: true, opacity: 0.9 })
  );
  receiver.position.y = FOCUS_Y;
  dishGroup.add(receiver);

  // Mount: mast down to a base ring
  const mast = new THREE.Mesh(
    new THREE.CylinderGeometry(0.035, 0.05, 1.1, 8),
    new THREE.MeshBasicMaterial({
      color: accentColor,
      transparent: true,
      opacity: 0.45,
    })
  );
  mast.position.y = 0.55;
  rig.add(mast);

  const baseRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.55, 0.02, 8, 40),
    new THREE.MeshBasicMaterial({
      color: coolColor,
      transparent: true,
      opacity: 0.5,
    })
  );
  baseRing.rotation.x = Math.PI / 2;
  rig.add(baseRing);

  // Incoming signal pulses: rings that ride the beam down into the dish
  const PULSE_COUNT = 5;
  const PULSE_FAR = 4.2; // beam length in dish-local units
  const pulses = [];
  for (let i = 0; i < PULSE_COUNT; i++) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1, 0.015, 8, 48),
      new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? accentColor : coolColor,
        transparent: true,
        opacity: 0,
      })
    );
    ring.rotation.x = Math.PI / 2; // perpendicular to the beam (local Y)
    ring.userData = { progress: i / PULSE_COUNT };
    pulses.push(ring);
    dishGroup.add(ring);
  }

  const placePulse = (ring) => {
    // progress 0 → far out in the sky, 1 → swallowed by the receiver
    const p = ring.userData.progress;
    ring.position.y = FOCUS_Y + (1 - p) * PULSE_FAR;
    const spread = 0.35 + (1 - p) * 1.3;
    ring.scale.setScalar(spread);
    // fade in from the far end, brighten on approach
    ring.material.opacity = p < 0.12 ? p * 3 : 0.18 + p * 0.42;
  };
  pulses.forEach(placePulse);

  // Ambient starfield
  const starGeo = new THREE.BufferGeometry();
  const starCount = 160;
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    const r = 3.8 + Math.random() * 2.6;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    starPos[i * 3 + 1] = r * Math.cos(phi);
    starPos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
  }
  starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
  const stars = new THREE.Points(
    starGeo,
    new THREE.PointsMaterial({
      size: 0.02,
      color: accentColor,
      transparent: true,
      opacity: 0.5,
    })
  );
  scene.add(stars);

  // ===== SIGNAL-ACQUIRED INTERACTION =====
  // Clicking the radar cell makes the dish lock onto a blip in the sky,
  // pull the transmission down into the receiver, and flash the status line.
  const blip = new THREE.Group();
  const blipDot = new THREE.Mesh(
    new THREE.SphereGeometry(0.055, 10, 10),
    new THREE.MeshBasicMaterial({ color: GREEN, transparent: true, opacity: 0 })
  );
  blip.add(blipDot);
  const blipPing = new THREE.Mesh(
    new THREE.RingGeometry(0.12, 0.14, 32),
    new THREE.MeshBasicMaterial({
      color: GREEN,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    })
  );
  blip.add(blipPing);
  scene.add(blip);

  // scan → locking (dish turns to face the blip) → receiving (blip rides in)
  const SCAN_SPEED = 0.24; // rad/s, constant continuous rotation
  const LOCK_DUR = 0.75; // s, quick ease-in-out turn onto the signal
  const RECV_DUR = 0.9; // s, blip travels into the receiver
  let mode = "scan";
  let lockT = 0;
  let recvT = 0;
  let lockStartAz = 0;
  let lockTargetAz = 0;
  const blipStart = new THREE.Vector3();
  const receiverWorld = new THREE.Vector3();

  const statusDefault = document.getElementById("status-default");
  const statusAlert = document.getElementById("status-alert");
  let statusTimer = null;
  const flashStatus = () => {
    if (!statusDefault || !statusAlert) return;
    statusDefault.hidden = true;
    statusAlert.hidden = false;
    clearTimeout(statusTimer);
    statusTimer = setTimeout(() => {
      statusAlert.hidden = true;
      statusDefault.hidden = false;
    }, 5000);
  };

  const GIMBAL_Y = rig.position.y + 1.1;

  const G = new THREE.Vector3(0, GIMBAL_Y, 0);
  const SKY_R = 3.2; // blip sits this far out from the gimbal, in the sky

  const startAcquire = (e) => {
    if (mode !== "scan") return;
    if (prefersReducedMotion) {
      flashStatus();
      return;
    }

    // Cast a ray through the exact clicked pixel so the blip lands
    // precisely under the cursor.
    const rect = renderer.domElement.getBoundingClientRect();
    const ndcX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ndcY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    const ray = new THREE.Vector3(ndcX, ndcY, 0.5)
      .unproject(camera)
      .sub(camera.position)
      .normalize();

    // Intersect the ray with a sky sphere around the gimbal, far side, so
    // the blip is under the cursor, out in the sky (not on the dish), a
    // consistent distance away, and on the side the dish naturally faces.
    const oc = camera.position.clone().sub(G);
    const b = oc.dot(ray);
    const c = oc.dot(oc) - SKY_R * SKY_R;
    const disc = b * b - c;
    const t = disc >= 0 ? -b + Math.sqrt(disc) : -b;
    blipStart.copy(camera.position).addScaledVector(ray, Math.max(t, 0.5));
    blip.position.copy(blipStart);
    blipDot.material.opacity = 0;

    // Azimuth that makes the dish's beam face the blip. The beam's
    // horizontal bearing is (rig.rotation.y + π) for the fixed elevation,
    // so face it by turning to (bearing − π). Take the shortest path.
    const bearing = Math.atan2(blipStart.x - G.x, blipStart.z - G.z);
    const desired = bearing - Math.PI;
    const delta = Math.atan2(
      Math.sin(desired - rig.rotation.y),
      Math.cos(desired - rig.rotation.y)
    );
    lockStartAz = rig.rotation.y;
    lockTargetAz = rig.rotation.y + delta;
    lockT = 0;
    mode = "locking";
  };

  const globeCell = container.closest(".console-globe");
  (globeCell || container).addEventListener("click", startAcquire);

  // Radar readout (az/el HUD in the cell corner)
  const hud = document.getElementById("radar-hud");
  let hudFrame = 0;
  const HUD_STATES = {
    scan: "listening…",
    locking: "signal detected — locking…",
    receiving: "receiving transmission…",
  };
  const updateHud = () => {
    if (!hud) return;
    const az = ((Math.round(rig.rotation.y * 57.3) % 360) + 360) % 360;
    const el = Math.round(-dishGroup.rotation.x * 57.3);
    hud.textContent = `az ${String(az).padStart(3, "0")}° · el ${el}° · ${HUD_STATES[mode]}`;
  };

  // Only render while the section is on screen
  let visible = true;
  if ("IntersectionObserver" in window) {
    visible = false;
    new IntersectionObserver(
      (entries) => (visible = entries[0].isIntersecting),
      { rootMargin: "100px" }
    ).observe(container);
  }

  if (prefersReducedMotion) {
    // Static frame: dish parked mid-sweep, pulses frozen along the beam
    rig.rotation.y = 0.4;
    updateHud();
    renderer.render(scene, camera);
  } else {
    let time = 0;
    let receiverFlare = 0;
    let lastTick = performance.now();
    function animate() {
      requestAnimationFrame(animate);
      const now = performance.now();
      // real elapsed time (clamped) so the sequence runs at the same
      // speed regardless of frame rate; also resets after tab switches
      const dt = Math.min(0.05, (now - lastTick) / 1000);
      lastTick = now;
      if (!visible) return;
      time += dt;

      if (mode === "scan") {
        // Continuous rotation at a constant speed
        rig.rotation.y += SCAN_SPEED * dt;
      } else if (mode === "locking") {
        // Quick ease-in-out turn (slow → fast → slow) onto the signal,
        // while the blip waits in the sky, pulsing
        lockT += dt;
        const u = Math.min(1, lockT / LOCK_DUR);
        const e = u * u * u * (u * (u * 6 - 15) + 10); // smootherstep
        rig.rotation.y = lockStartAz + (lockTargetAz - lockStartAz) * e;

        blipDot.material.opacity = Math.min(1, lockT * 3);
        const ping = (lockT % 0.8) / 0.8;
        blipPing.scale.setScalar(1 + ping * 3);
        blipPing.material.opacity = 0.7 * (1 - ping);
        blipPing.lookAt(camera.position);

        // Only once the dish is actually facing the blip does it ride in
        if (u >= 1) {
          mode = "receiving";
          recvT = 0;
        }
      } else if (mode === "receiving") {
        // Dish holds its aim; the blip travels down the beam into the dish
        rig.rotation.y = lockTargetAz;
        recvT += dt;
        receiver.getWorldPosition(receiverWorld);
        const p = Math.min(1, recvT / RECV_DUR);
        const e = p * p * (3 - 2 * p); // smoothstep
        blip.position.lerpVectors(blipStart, receiverWorld, e);
        blipDot.scale.setScalar(1 - e * 0.6);
        blipDot.material.opacity = 1 - e * 0.35;
        blipPing.material.opacity = 0;
        if (p >= 1) {
          blipDot.material.opacity = 0;
          receiverFlare = 1;
          mode = "scan";
          flashStatus();
        }
      }

      // Elevation only ever does a gentle nod — the dish holds its tilt
      // and pans to acquire, so it never bends forward
      const nod = Math.sin(time * 0.14) * 0.06;
      dishGroup.rotation.x += (BASE_ELEVATION + nod - dishGroup.rotation.x) * 0.08;

      // Receiver heartbeat — flares hard when a transmission lands
      receiver.material.opacity =
        Math.min(1, 0.55 + Math.sin(time * 3.2) * 0.3 + receiverFlare * 0.5);
      receiver.scale.setScalar(
        1 + Math.sin(time * 3.2) * 0.18 + receiverFlare * 1.6
      );
      receiverFlare *= 0.93;

      // Pulses ride the beam into the dish, then respawn far out
      pulses.forEach((ring) => {
        ring.userData.progress += 0.21 * dt;
        if (ring.userData.progress > 1) ring.userData.progress -= 1;
        placePulse(ring);
      });

      stars.rotation.y += 0.024 * dt;

      if (hudFrame++ % 12 === 0) updateHud();

      renderer.render(scene, camera);
    }
    animate();
  }

  // Resize handler — stored so it can be removed if scene is torn down
  function onContactResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
    if (prefersReducedMotion) renderer.render(scene, camera);
  }
  window.addEventListener("resize", onContactResize);
  initContactDish.cleanup = () =>
    window.removeEventListener("resize", onContactResize);
}

// Initialize 3D scenes
initHero3D();
initContactDish();

