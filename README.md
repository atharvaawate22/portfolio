# Atharva Awate | Portfolio

A modern, interactive portfolio website featuring 3D elements, smooth animations, and premium visual effects.

![Portfolio Preview](assets/preview.png)

## ✨ Features

- **3D Interactive Elements** - Three.js powered geometric shapes and particle systems
- **Smooth Animations** - GSAP-powered scroll animations and transitions
- **Premium Visual Effects** - Parallax layers, floating shapes, gradient overlays
- **Custom Cursor** - Interactive cursor with hover effects
- **Responsive Design** - Fully optimized for all devices
- **Accessibility** - Respects `prefers-reduced-motion` preferences
- **GPU Accelerated** - Optimized transforms for smooth 60fps performance

## 🗂️ Project Structure

```
Portfolio/
├── index.html              # Main HTML entry point
├── css/
│   ├── base.css            # Variables, reset, utilities
│   ├── components.css      # UI components (cursor, nav, buttons, modal)
│   ├── sections.css        # Page sections (hero, about, projects, etc.)
│   └── animations.css      # Keyframes & animation classes
├── js/
│   ├── cursor.js           # Custom cursor functionality
│   ├── animations.js       # GSAP animations & scroll effects
│   ├── three-scenes.js     # Three.js 3D visualizations
│   ├── interactions.js     # UI interactions (modal, tilt, magnetic)
│   └── main.js             # Core initialization & utilities
├── assets/
│   └── favicon.svg         # Site favicon
└── README.md               # Project documentation
```

## 🚀 Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/Atharva12210985/portfolio.git
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

- **Hero** - Animated introduction with 3D icosahedron
- **About** - Personal introduction with stats counter
- **Projects** - Featured work with modal previews
- **Skills** - Technical expertise with marquee ticker
- **Contact** - Social links with 3D communication sphere

## 🎨 Customization

### Colors

Edit CSS variables in `css/styles.css`:

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

- GitHub: [@Atharva12210985](https://github.com/Atharva12210985)
- LinkedIn: [Atharva D Awate](https://www.linkedin.com/in/atharva-d-awate)
- Email: atharvaawate14@gmail.com

---

⭐ Star this repo if you found it helpful!
