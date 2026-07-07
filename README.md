# atharvaawate.me

Personal portfolio. Vanilla HTML/CSS/JS with custom Three.js scenes and
GSAP scroll animations — no framework, no build step.

**Live:** [atharvaawate.me](https://atharvaawate.me)

## Features

- Real-time 3D: wireframe icosahedron in the hero, paper-airplane scene in
  the contact section (Three.js, colors driven by CSS variables)
- Animated terminal in the About section — types `whoami`, `cat about.md`,
  a live `date` in IST, `ls projects/`, and `status`; pauses on hover
- Hero text scramble; backdrop word cycles through `CRAFT / BUILD / SHIP`
- Project cards with per-project SVG mockups and real screenshots, each
  opening a detail modal (keyboard-operable)
- Magnetic cursor and CTAs on fine-pointer devices
- Respects `prefers-reduced-motion` (static terminal snapshot, no scramble)

## Structure

```
index.html          single page
css/                base (variables/reset), components, sections,
                    animations, premium (terminal, badges, mockups)
js/                 cursor, effects (terminal/scramble), animations (GSAP),
                    three-scenes, interactions (modal), main (nav)
assets/             favicons, project screenshots
scripts/            one-off screenshot helper
```

## Run locally

```bash
npx http-server -p 8080
```

Static site — any file server works.

## Theme

The palette lives in `css/base.css` as custom properties (`--color-accent`,
`--color-gradient-1/2`, `--color-cool`, …). The Three.js scenes read the
same variables, so changing the palette is a one-file edit.

## Author

**Atharva Awate** — [GitHub](https://github.com/atharvaawate22) ·
[LinkedIn](https://www.linkedin.com/in/atharva-d-awate) ·
[atharvaawate14@gmail.com](mailto:atharvaawate14@gmail.com)
