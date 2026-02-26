/* ============================================
   Cursor Module - Custom cursor functionality
   ============================================ */

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

// Only run custom cursor on devices with a precise pointer (mouse/trackpad)
if (window.matchMedia('(pointer: fine)').matches) {
  animateCursor();
}

// Cursor hover effects
const hoverElements = document.querySelectorAll(
  "a, button, .project-card, .skill-item, .stat"
);

if (window.matchMedia('(pointer: fine)').matches) {
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
}


