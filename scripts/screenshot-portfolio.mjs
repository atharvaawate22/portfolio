// One-off: capture the hero of this site for assets/portfolio-preview.png
// (Open Graph / Twitter image and the Personal Portfolio card).
//
// Usage: start the site on :8080 (npx http-server -p 8080), then run from a
// dir that can resolve `playwright`, e.g.
//   cd ../career-guidance-platform/frontend && node ../../portfolio/scripts/screenshot-portfolio.mjs

import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

// ESM resolves bare imports from this file's folder, which has no
// playwright; resolve it from the working directory instead.
const require = createRequire(path.join(process.cwd(), "noop.js"));
const { chromium } = require("playwright");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "..", "assets", "portfolio-preview.png");

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1920, height: 970 },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();

await page.goto("http://localhost:8080/", { waitUntil: "networkidle" });

// Let the hero entrance, subtitle scramble and Three.js scene settle
await page.waitForTimeout(3500);

await page.screenshot({ path: OUT, clip: { x: 0, y: 0, width: 1920, height: 970 } });

console.log("Saved:", OUT);

await browser.close();
