/* ============================================
   Effects - Cursor blob, text scramble, word cycle
   ============================================ */

(function () {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

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

  /* ---------- About terminal: auto-typing whoami sequence ---------- */
  const terminal = document.getElementById("about-terminal");
  const termOutput = document.getElementById("terminal-output");
  const termInput =
    terminal && terminal.querySelector(".terminal-current .terminal-input");

  if (terminal && termOutput && termInput) {
    // Each step: prompt → typed command → output (one or many lines).
    // Outputs may use small inline html spans (out-arrow/out-dir/out-string/
    // out-success/out-link) for color accents. Keep text content honest and
    // short. Built as a function so `date` shows the real IST time on every
    // loop pass.
    const getSteps = () => {
      const istNow = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        weekday: "short",
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date());
      return [
        {
          cmd: "whoami",
          out: [
            '<span class="out-arrow">→</span> Atharva Awate',
            '<span class="out-arrow">→</span> Full-stack developer &amp; creative coder',
          ],
        },
        {
          cmd: "cat about.md",
          out: [
            '<span class="out-string">Recent B.Tech grad based in Pune, India.</span>',
            '<span class="out-string">Builds web apps end-to-end. Writes Three.js for fun.</span>',
          ],
        },
        {
          cmd: "date",
          out: [`${escapeHtml(istNow)} IST`],
        },
        {
          cmd: "ls projects/",
          out: [
            '<span class="out-dir">cethub/</span>   <span class="out-dir">last-known-good/</span>   <span class="out-dir">yoga-therapy/</span>   <span class="out-dir">swadesh-shop/</span>   <span class="out-dir">portfolio/</span>',
          ],
        },
        {
          cmd: "status",
          out: ['<span class="out-success">●</span> Open to opportunities'],
        },
      ];
    };

    let cancelled = false;
    let paused = false;
    terminal.addEventListener("mouseenter", () => (paused = true));
    terminal.addEventListener("mouseleave", () => (paused = false));

    const wait = (ms) =>
      new Promise((r) => {
        const tick = (elapsed) => {
          if (cancelled) return r();
          if (paused) {
            setTimeout(() => tick(elapsed), 100);
            return;
          }
          if (elapsed >= ms) return r();
          setTimeout(() => tick(elapsed + 50), 50);
        };
        tick(0);
      });

    const typeInto = async (el, text, base = 45) => {
      el.textContent = "";
      for (const ch of text) {
        if (cancelled) return;
        el.textContent += ch;
        scrollToBottom();
        // small jitter so typing feels human
        const jitter = ch === " " ? 20 : Math.random() * 30;
        await wait(base + jitter);
      }
    };

    // Keep the newest lines in view as the session grows past the
    // terminal body's fixed height (works despite overflow: hidden).
    const termBody = terminal.querySelector(".terminal-body");
    const scrollToBottom = () => {
      if (termBody) termBody.scrollTop = termBody.scrollHeight;
    };

    const appendOutputLine = (html) => {
      const line = document.createElement("span");
      line.className = "terminal-output-line";
      line.innerHTML = html;
      termOutput.appendChild(line);
      scrollToBottom();
    };

    const appendCmdLine = () => {
      const line = document.createElement("div");
      line.className = "terminal-line";
      line.innerHTML =
        '<span class="terminal-prompt">~$</span><span class="terminal-command"></span>';
      termOutput.appendChild(line);
      return line.querySelector(".terminal-command");
    };

    const run = async () => {
      while (!cancelled) {
        termOutput.innerHTML = "";
        scrollToBottom();
        for (const step of getSteps()) {
          if (cancelled) return;
          // Show the active step as a real new line in the output stream
          // (the bottom "current" prompt always shows the next command being typed)
          await typeInto(termInput, step.cmd);
          await wait(280);
          // Move typed command into the history
          const histLine = document.createElement("div");
          histLine.className = "terminal-line";
          histLine.innerHTML = `<span class="terminal-prompt">~$</span><span class="terminal-command">${escapeHtml(
            step.cmd
          )}</span>`;
          termOutput.appendChild(histLine);
          termInput.textContent = "";
          scrollToBottom();
          // Print output lines with a brief beat between each
          for (const line of step.out) {
            if (cancelled) return;
            appendOutputLine(line);
            await wait(180);
          }
          await wait(1300);
        }
        // long pause at end, then loop
        await wait(2800);
      }
    };

    function escapeHtml(s) {
      return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    }

    if (prefersReducedMotion) {
      // Static snapshot for users who prefer reduced motion
      getSteps().forEach((step) => {
        const histLine = document.createElement("div");
        histLine.className = "terminal-line";
        histLine.innerHTML = `<span class="terminal-prompt">~$</span><span class="terminal-command">${step.cmd
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")}</span>`;
        termOutput.appendChild(histLine);
        step.out.forEach((html) => appendOutputLine(html));
      });
    } else {
      run();
    }
  }
})();
