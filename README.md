# Rise at Seven — React Website

A modern, scroll-aware React website featuring an advanced navbar with multi-dropdown hover interactions, GSAP & Framer Motion powered animations.

**Live Demo:** [https://rise-at-seven-red.vercel.app](https://rise-at-seven-red.vercel.app)

## Features

### Smart Navbar
- Transparent over hero → solid on scroll → hides on scroll down → reappears on scroll up
- Announcement bar that collapses smoothly on scroll
- Mobile-responsive hamburger menu with animated toggle

### Advanced Dropdown System
- **Services** — Two-column service list with featured image and CTA
- **Industries** — Featured industry card with rotating content and image
- **International** — Country office list with hover-to-preview image swapping
- All dropdowns animate with GSAP (fade, slide, staggered list items)
- Dropdowns close on mouse leave with smooth exit animation

## Tech Stack

- **React 18** — UI framework
- **GSAP + @gsap/react** — Animations and scroll-driven effects
- **Framer Motion** — Animations and scroll-driven effects
- **CSS3** — Custom properties, backdrop-filter, transitions

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/rise-at-seven.git

# Navigate into the project
cd rise-at-seven

# Install dependencies
npm install

# Start the development server
npm run dev
