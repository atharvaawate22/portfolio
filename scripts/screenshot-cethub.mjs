// One-off: capture a clean hero-area screenshot of cethub.in
// for use in the portfolio CETHub modal image.
//
// Usage:  node scripts/screenshot-cethub.mjs
// Requires playwright (resolved from career-guidance-platform/frontend).

import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "..", "assets", "cethub-preview.jpg");

// Run from a dir that can resolve `playwright`, e.g.
//   cd ../career-guidance-platform/frontend && node ../../portfolio/scripts/screenshot-cethub.mjs

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();

await page.goto("https://cethub.in", {
  waitUntil: "networkidle",
  timeout: 60000,
});

// Give Next.js a beat to settle (any client hydration / animations)
await page.waitForTimeout(2000);

// Capture just the visible hero area, not the full scroll.
// JPEG @ q85 ≈ 90 KB vs 1.8 MB for PNG at 2x DPR.
await page.screenshot({
  path: OUT,
  clip: { x: 0, y: 0, width: 1440, height: 900 },
  type: "jpeg",
  quality: 85,
});

console.log("Saved:", OUT);

await browser.close();
