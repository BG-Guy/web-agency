# Pine Valley Digital

Marketing site for Pine Valley Digital — a single-page, fast-loading site built with Vite, vanilla TypeScript, Tailwind CSS, and GSAP.

## Stack

- [Vite](https://vite.dev/) + vanilla TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)
- [GSAP](https://gsap.com/) + ScrollTrigger for the loading animation and scroll reveals

## Project structure

The page is composed from small, self-contained section components rather
than one large file. Each component pairs its markup with its own
stylesheet, so a section can be found, read, and edited in one place:

```
src/
  main.ts                 # composition root: assembles the page, runs the intro animation
  styles/base.css         # design tokens (colors/fonts), resets, shared utility classes
  data/content.ts         # editable copy: services, projects, process steps, marquee items
  components/             # one section of the page per file, e.g.
    Navbar.ts + .css        #   fixed header, mobile drawer, scroll morph
    Hero.ts + .css          #   headline
    Marquee.ts + .css       #   scrolling service strip
    Services.ts + .css      #   "What we do"
    Work.ts + .css          #   "Selected work"
    Process.ts + .css       #   "How we work"
    Contact.ts + .css       #   closing CTA
    Footer.ts + .css        #   reveal-on-scroll footer
    Preloader.ts + .css     #   loading splash
  lib/                     # standalone behavior shared across components
    logo.ts                  #   logo mark/wordmark markup
    scrollReveal.ts           #   GSAP ScrollTrigger fade/rise-in
    transition.ts              #   curved-panel cover/reveal used by the preloader
    revealFooter.ts             #   scroll-reveal mechanics for the footer
    hoverTeaserMenu.ts           #   color-teaser nav used in the mobile drawer
```

Each component file renders its own markup (`renderX()`) and, where it has
interactive behavior, initializes it (`initX()`); `main.ts` calls those
functions in order to assemble and wire up the page.

## Design system

The color theme (purple `#6C3BAA` / green `#3BAA99` on warm off-white paper,
dark ink for contrast) and several component patterns — the sliding-fill CTA
button, the offset-shadow work cards, the duotone contact heading — are
shared with [portfolio-2025](https://github.com/bg-guy/portfolio-2025), which
also hosts this content as a page (`/web-agency`) alongside the personal
portfolio.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```
