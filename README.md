# Atharva Awate | Portfolio

Personal portfolio for a full-stack developer & creative coder. Vanilla HTML/CSS/JS with custom Three.js scenes, GSAP-driven scroll choreography, a magnetic cursor, and cursor-following gradient blob. No framework, no build step.

**Live:** [atharvaawate.me](https://atharvaawate.me)

## ✨ Features

- **Real-time 3D scenes** — wireframe icosahedron in the hero, animated paper-airplane scene in the contact section (Three.js)
- **Scroll progress bar** with gradient fill driven by GSAP ScrollTrigger
- **Cursor-following gradient blob** layered behind hero content (desktop only)
- **Hero text scramble** — subtitle decodes from random chars; backdrop word cycles through `CRAFT / BUILD / SHIP`
- **Magnetic cursor + magnetic CTAs** with smooth easing
- **Project cards** with stylized per-project mockups (browser frame for CETHub, pose-landmark SVG for the yoga app, product-grid SVG for the e-commerce build)
- **Status badges** — Live / In Dev / Build pills on each card
- **Accessibility** — respects `prefers-reduced-motion`; cursor falls back on coarse-pointer devices

## 🗂️ Project Structure

```
Portfolio/
├── index.html              # Main HTML entry point
├── css/
│   ├── base.css            # Variables, reset, utilities
│   ├── components.css      # UI components (cursor, nav, buttons, modal)
│   ├── sections.css        # Page sections (hero, about, projects, etc.)
│   ├── animations.css      # Keyframes & animation classes
│   └── premium.css         # Scroll progress, cursor blob, status badges, mockups
├── js/
│   ├── cursor.js           # Custom magnetic cursor
│   ├── effects.js          # Cursor blob, scramble, word cycle, magnetic CTAs
│   ├── animations.js       # GSAP scroll animations
│   ├── three-scenes.js     # Three.js 3D visualizations
│   ├── interactions.js     # Project modal + tilt + hover effects
│   └── main.js             # Core initialization & nav scroll behavior
├── assets/
│   ├── favicon.svg         # Site favicon (SVG, modern browsers)
│   ├── favicon.png         # Site favicon (PNG 96×96, legacy fallback)
│   └── portfolio-preview.png  # Self screenshot used by the portfolio card
└── README.md               # Project documentation
```

## 🚀 Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/atharvaawate22/portfolio.git
   cd portfolio
   ```

2. **Open locally**
   - Simply open `index.html` in your browser, or
   - Use a local server:

     ```bash
     # Python
     python -m http.server 8000

     # Node.js
     npx serve
     ```

3. **Visit** `http://localhost:8000`

## 🛠️ Technologies Used

| Category        | Technologies                        |
| --------------- | ----------------------------------- |
| **Core**        | HTML5, CSS3, JavaScript (ES6+)      |
| **3D Graphics** | Three.js, WebGL                     |
| **Animations**  | GSAP, ScrollTrigger, CSS Animations |
| **Fonts**       | Google Fonts (Space Grotesk, Inter) |

## 📱 Sections

- **Hero** — name, dual subtitle, availability badge, 3D icosahedron, cursor-following gradient blob
- **About** — bio + honest credibility row (education, live project link, availability)
- **Projects** — CETHub, Yoga Therapy App (on-device ML), Swadesh Shop (MERN), Personal Portfolio. Each card opens a detailed modal.
- **Skills** — six category cards (Frontend, Backend, Databases, Mobile & ML, Creative Coding, DevOps) + scrolling tech marquee
- **Contact** — email / GitHub / LinkedIn + animated paper-airplane scene

## 🎨 Customization

### Colors

Edit CSS variables in `css/base.css`:

```css
:root {
  --color-bg: #0a0a0a;
  --color-accent: #6c63ff;
  --color-gradient-1: #667eea;
  --color-gradient-2: #764ba2;
}
```

### Content

Update personal information directly in `index.html`:

- Name and title in hero section
- About text and stats
- Project cards and descriptions
- Contact links and social URLs

## ⚡ Performance

- **Lighthouse Score**: 95+ Performance
- **No layout shifts** - All animations use `transform` and `opacity`
- **Lazy animations** - IntersectionObserver for scroll-triggered effects
- **Optimized 3D** - Limited particle count, efficient geometries

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 👤 Author

**Atharva Awate**

- GitHub: [@atharvaawate22](https://github.com/atharvaawate22)
- LinkedIn: [Atharva D Awate](https://www.linkedin.com/in/atharva-d-awate)
- Email: atharva@atharvaawate.me

---
