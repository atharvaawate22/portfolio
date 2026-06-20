/* ============================================
   Effects - Cursor blob, text scramble, word cycle
   ============================================ */

(function () {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- Hero gradient blob (cursor-following) ---------- */
  const blob = document.querySelector(".cursor-blob");
  if (blob && !prefersReducedMotion && window.matchMedia("(pointer: fine)").matches) {
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 3;
    let blobX = targetX;
    let blobY = targetY;

    document.addEventListener("mousemove", (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    });

    function animateBlob() {
      blobX += (targetX - blobX) * 0.06;
      blobY += (targetY - blobY) * 0.06;
      blob.style.transform = `translate3d(${blobX}px, ${blobY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(animateBlob);
    }
    animateBlob();
  } else if (blob) {
    blob.style.display = "none";
  }

  /* ---------- Subtitle scramble on hero load ----------
     Cycles random chars then resolves to the original text.
     Triggered after the hero entrance animation. */
  const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#________";
  function scrambleTo(el, finalText, duration = 900) {
    if (prefersReducedMotion) {
      el.textContent = finalText;
      return;
    }
    const start = performance.now();
    const len = finalText.length;
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      let out = "";
      for (let i = 0; i < len; i++) {
        const charProgress = Math.max(0, Math.min(1, t * 2 - i / len));
        if (charProgress >= 1 || finalText[i] === " " || finalText[i] === "&") {
          out += finalText[i];
        } else {
          out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
      }
      el.textContent = out;
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = finalText;
    }
    requestAnimationFrame(tick);
  }

  // Run scramble after a brief delay so it follows the title reveal
  const scrambleTargets = document.querySelectorAll("[data-scramble]");
  if (scrambleTargets.length) {
    setTimeout(() => {
      scrambleTargets.forEach((el, i) => {
        const final = el.getAttribute("data-scramble") || el.textContent;
        setTimeout(() => scrambleTo(el, final, 700), i * 120);
      });
    }, 700);
  }

  /* ---------- Backdrop word cycle (CRAFT / BUILD / SHIP) ---------- */
  const cycler = document.querySelector("[data-cycle]");
  if (cycler && !prefersReducedMotion) {
    let words;
    try {
      words = JSON.parse(cycler.getAttribute("data-cycle"));
    } catch (e) {
      words = null;
    }
    if (Array.isArray(words) && words.length > 1) {
      let idx = 0;
      setInterval(() => {
        idx = (idx + 1) % words.length;
        const next = words[idx];
        // brief scramble transition
        scrambleTo(cycler, next, 550);
      }, 3800);
    }
  }

  /* ---------- Magnetic cursor for hover targets ---------- */
  document.querySelectorAll(".magnetic").forEach((el) => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const strength = parseFloat(el.dataset.magneticStrength || "0.35");
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });
})();
