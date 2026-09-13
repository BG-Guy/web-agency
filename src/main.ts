import './style.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Pine tree nestled in a valley — the two slopes in the brand purple/green,
// the tree in currentColor so it adapts to light and dark backgrounds.
const logoMark = (className: string) => `
  <svg class="${className}" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M5 18 L24 42" stroke="#6C3BAA" stroke-width="4.5" stroke-linecap="round" />
    <path d="M43 18 L24 42" stroke="#3BAA99" stroke-width="4.5" stroke-linecap="round" />
    <path d="M24 17 L35 29 L13 29 Z" fill="currentColor" />
    <path d="M24 12 L32 22 L16 22 Z" fill="currentColor" />
    <path d="M24 8 L28 16 L20 16 Z" fill="currentColor" />
    <rect x="21" y="29" width="6" height="7" rx="1" fill="currentColor" />
  </svg>
`

// A single pine silhouette (no valley lines), for scattering in decorative backgrounds.
const pineSilhouette = (className: string) => `
  <svg class="${className}" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M24 17 L35 29 L13 29 Z" />
    <path d="M24 12 L32 22 L16 22 Z" />
    <path d="M24 8 L28 16 L20 16 Z" />
    <rect x="21" y="29" width="6" height="7" rx="1" />
  </svg>
`

// Hero backdrop: a soft purple-to-green horizon (the logo's valley line,
// stretched wide) with a scatter of pine silhouettes and one outline circle
// standing in for a low sun. Everything sits well under 15% opacity so it
// reads as texture, not as competing artwork, and never touches the copy.
const heroBackground = () => `
  <div class="hero-bg absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <svg class="hero-horizon absolute inset-x-0 bottom-0 w-full h-[46%] sm:h-[58%]" viewBox="0 0 1440 320" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="horizonGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#6C3BAA" />
          <stop offset="1" stop-color="#3BAA99" />
        </linearGradient>
      </defs>
      <path
        d="M0,230 C200,150 340,270 520,200 C700,130 860,250 1040,180 C1220,110 1340,210 1440,160"
        fill="none" stroke="url(#horizonGradient)" stroke-width="2.5" stroke-linecap="round" stroke-opacity="0.22"
      />
    </svg>

    <svg class="hero-sun absolute right-[10%] top-24 sm:top-28 w-20 h-20 sm:w-32 sm:h-32 opacity-20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="none" stroke="#6C3BAA" stroke-width="1.5" />
    </svg>

    ${pineSilhouette('hero-pine absolute right-[2%] bottom-[12%] w-16 h-16 sm:w-24 sm:h-24 text-ink opacity-10')}
    ${pineSilhouette('hero-pine absolute right-[13%] bottom-[4%] w-20 h-20 sm:w-28 sm:h-28 text-ink opacity-10')}
    ${pineSilhouette('hero-pine absolute right-[23%] bottom-[16%] w-10 h-10 sm:w-14 sm:h-14 text-ink opacity-5')}
    ${pineSilhouette('hero-pine absolute right-[32%] bottom-[6%] w-8 h-8 sm:w-10 sm:h-10 text-ink opacity-5')}
  </div>
`

// Logotype: an italic serif for "Pine Valley" (the place) against the bold
// grotesque for "Digital" (the craft) — same typographic pairing as the
// body copy, deliberately contrasted for the wordmark itself.
const logoWordmark = (sizeClass: string) => `
  <span class="inline-flex items-baseline gap-[0.3em] leading-none ${sizeClass}">
    <span class="font-logo italic font-medium">Pine Valley</span>
    <span class="font-display font-extrabold tracking-tight">Digital</span>
  </span>
`

const services = [
  {
    n: '01',
    title: 'Web Design',
    copy: 'Interfaces built around your content and your users, not a template — wireframed, art-directed, and refined until it feels inevitable.',
  },
  {
    n: '02',
    title: 'Development',
    copy: 'Hand-built front ends with lean, modern tooling. No bloated CMS, no unnecessary dependencies — just fast, maintainable code.',
  },
  {
    n: '03',
    title: 'Brand & Identity',
    copy: 'Logo, type system, color, voice — a visual language that holds up across the site, social, and everything after launch.',
  },
  {
    n: '04',
    title: 'SEO & Performance',
    copy: 'Sites that load in a blink and rank because of it. Technical SEO, Core Web Vitals, and clean semantic markup from day one.',
  },
]

const projects = [
  { name: 'Northfield Studio', tag: 'Architecture · 2025' },
  { name: 'Marlow & Co.', tag: 'Hospitality · 2025' },
  { name: 'Petra Fintech', tag: 'SaaS · 2024' },
  { name: 'Kiln Ceramics', tag: 'E-commerce · 2024' },
]

const process = [
  { n: '01', title: 'Discover', copy: 'Goals, audience, and constraints — a short, focused kickoff so we build the right thing.' },
  { n: '02', title: 'Design', copy: 'Wireframes to high-fidelity screens, reviewed together at every stage.' },
  { n: '03', title: 'Build', copy: 'Hand-coded, tested across devices, optimized before it ever ships.' },
  { n: '04', title: 'Launch', copy: 'Deployed, measured, and handed off with everything you need to run it.' },
]

const marqueeItems = ['Web Design', 'Development', 'Brand Identity', 'SEO & Performance']

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="preloader">
    <div class="pre-word tracking-tight">
      <span class="inline-flex items-center gap-3 sm:gap-4">
        ${logoMark('w-9 h-9 sm:w-12 sm:h-12 shrink-0')}
        ${logoWordmark('text-4xl sm:text-6xl')}
      </span>
    </div>
  </div>

  <header id="site-nav" class="fixed top-0 inset-x-0 z-40 opacity-0 bg-[var(--color-paper)]/85 backdrop-blur-sm">
    <div class="mx-auto max-w-7xl px-6 sm:px-10 py-5 flex items-center justify-between">
      <a href="#top" class="flex items-center gap-2">
        ${logoMark('w-7 h-7 shrink-0')}
        ${logoWordmark('text-base sm:text-lg')}
      </a>
      <nav class="hidden md:flex items-center gap-8 text-sm font-medium">
        <a href="#services" class="nav-link">Services</a>
        <a href="#work" class="nav-link">Work</a>
        <a href="#process" class="nav-link">Process</a>
        <a href="#contact" class="nav-link">Contact</a>
      </nav>
      <div class="flex items-center gap-3">
        <a href="#contact" class="btn-cta hidden sm:inline-flex text-sm font-semibold border border-[var(--color-ink)] rounded-full px-5 py-2">
          <span class="btn-cta-bg"></span>
          <span class="btn-cta-label">Start a project</span>
        </a>
        <button id="menu-toggle" type="button" aria-label="Toggle menu" aria-expanded="false" class="md:hidden flex flex-col justify-center items-center w-10 h-10 border border-[var(--color-ink)] rounded-full">
          <span class="menu-bar block w-4 h-[1.5px] bg-[var(--color-ink)] transition-transform"></span>
          <span class="menu-bar block w-4 h-[1.5px] bg-[var(--color-ink)] mt-1 transition-transform"></span>
        </button>
      </div>
    </div>
    <nav id="mobile-menu" class="md:hidden hidden flex-col gap-1 px-6 pb-6 text-lg font-display font-bold">
      <a href="#services" class="mobile-nav-link py-3 border-b border-[var(--color-ink)]/10">Services</a>
      <a href="#work" class="mobile-nav-link py-3 border-b border-[var(--color-ink)]/10">Work</a>
      <a href="#process" class="mobile-nav-link py-3 border-b border-[var(--color-ink)]/10">Process</a>
      <a href="#contact" class="mobile-nav-link py-3">Contact</a>
    </nav>
  </header>

  <main id="top">
    <section id="hero" class="relative overflow-hidden px-6 sm:px-10 pt-40 pb-24 sm:pt-52 sm:pb-32">
      ${heroBackground()}
      <div class="relative z-10 mx-auto max-w-7xl">
        <p class="hero-eyebrow overflow-hidden">
          <span class="block text-sm font-semibold uppercase tracking-[0.2em] text-ink/60">Web design &amp; development studio</span>
        </p>
        <h1 class="font-display font-extrabold tracking-tight mt-6 text-[13vw] leading-[0.95] sm:text-[7.5vw] sm:leading-[0.92]">
          <span class="hero-line block overflow-hidden"><span class="block">We build fast,</span></span>
          <span class="hero-line block overflow-hidden"><span class="block">modern websites<span class="text-[var(--color-accent)]">.</span></span></span>
        </h1>
        <div class="hero-sub mt-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
          <p class="max-w-md text-lg text-ink/70">
            Pine Valley Digital designs and builds lean, high-performance websites for
            studios, founders, and small teams who need to move fast without looking cheap.
          </p>
          <a href="#work" class="shrink-0 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide">
            See our work
            <span aria-hidden="true">&darr;</span>
          </a>
        </div>
      </div>
    </section>

    <div class="marquee-wrap border-y border-[var(--color-ink)]/10 py-4 overflow-hidden">
      <div class="marquee-track font-display text-2xl sm:text-3xl font-semibold">
        ${Array(2)
          .fill(
            marqueeItems
              .map(
                (item) =>
                  `<span class="flex items-center gap-6 pr-6"><span>${item}</span><span aria-hidden="true" class="text-[var(--color-accent)]">&#10022;</span></span>`
              )
              .join('')
          )
          .join('')}
      </div>
    </div>

    <section id="services" class="px-6 sm:px-10 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl">
        <div class="reveal flex items-end justify-between gap-6 mb-14">
          <h2 class="font-display font-extrabold text-4xl sm:text-5xl tracking-tight">What we <span class="text-[var(--color-accent-2)]">do</span></h2>
          <span class="hidden sm:block text-sm font-semibold text-[var(--color-accent)]">(04)</span>
        </div>
        <div class="divide-y divide-[var(--color-ink)]/10 border-t border-[var(--color-ink)]/10">
          ${services
            .map(
              (s) => `
            <div class="service-row reveal grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 py-10 items-start">
              <span class="sm:col-span-2 font-display text-ink/30 text-2xl">${s.n}</span>
              <h3 class="sm:col-span-3 font-display font-bold text-2xl sm:text-3xl">${s.title}</h3>
              <p class="sm:col-span-7 text-ink/65 text-base sm:text-lg max-w-xl">${s.copy}</p>
            </div>`
            )
            .join('')}
        </div>
      </div>
    </section>

    <section id="work" class="px-6 sm:px-10 py-24 sm:py-32 bg-[var(--color-paper-dim)]">
      <div class="mx-auto max-w-7xl">
        <div class="reveal flex items-end justify-between gap-6 mb-14">
          <h2 class="font-display font-extrabold text-4xl sm:text-5xl tracking-tight">Selected <span class="text-[var(--color-accent-2)]">work</span></h2>
          <span class="hidden sm:block text-sm font-semibold text-[var(--color-accent)]">(04)</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          ${projects
            .map(
              (p) => `
            <a href="#" class="project-card reveal group block">
              <div class="relative">
                <div class="project-card-shadow absolute inset-0"></div>
                <div class="project-card-face relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[var(--color-ink)] bg-[var(--color-paper)]">
                  <div class="absolute inset-0 flex items-center justify-center text-center px-6 font-display font-extrabold text-2xl sm:text-3xl group-hover:scale-105 transition-transform duration-500">
                    ${p.name}
                  </div>
                </div>
              </div>
              <div class="mt-4 flex items-center justify-between">
                <span class="font-display font-bold text-lg">${p.name}</span>
                <span class="text-sm text-ink/50">${p.tag}</span>
              </div>
            </a>`
            )
            .join('')}
        </div>
      </div>
    </section>

    <section id="process" class="px-6 sm:px-10 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl">
        <div class="reveal mb-14">
          <h2 class="font-display font-extrabold text-4xl sm:text-5xl tracking-tight">How we <span class="text-[var(--color-accent-2)]">work</span></h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-8 sm:gap-6">
          ${process
            .map(
              (p, i) => `
            <div class="process-step reveal pt-5" style="border-top: 2px solid ${i % 2 === 0 ? 'var(--color-accent)' : 'var(--color-accent-2)'}">
              <span class="font-display text-ink/30 text-xl">${p.n}</span>
              <h3 class="font-display font-bold text-xl mt-2 mb-2">${p.title}</h3>
              <p class="text-ink/65 text-sm leading-relaxed">${p.copy}</p>
            </div>`
            )
            .join('')}
        </div>
      </div>
    </section>

    <section id="contact" class="px-6 sm:px-10 py-24 sm:py-32 bg-[var(--color-ink)] text-[var(--color-paper)]">
      <div class="mx-auto max-w-7xl">
        <p class="reveal text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-paper)]/50 mb-6">Get in touch</p>
        <h2 id="contact-heading" class="duotone-heading reveal font-display font-extrabold tracking-tight text-[10vw] leading-[0.95] sm:text-6xl sm:leading-[1.02] max-w-3xl">
          <span class="duotone-back" aria-hidden="true">Let&rsquo;s build something fast.</span>
          <span class="duotone-front">Let&rsquo;s build something fast.</span>
        </h2>
        <div class="reveal mt-12 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
          <a href="mailto:hello@pinevalleydigital.com" class="inline-flex items-center gap-3 text-xl sm:text-2xl font-display font-bold border-b-2 border-[var(--color-accent)] pb-1 w-fit">
            hello@pinevalleydigital.com
          </a>
          <span class="text-[var(--color-paper)]/50 text-sm">Usually replies within one business day.</span>
        </div>
      </div>
    </section>
  </main>

  <footer class="px-6 sm:px-10 py-10 border-t border-[var(--color-ink)]/10">
    <div class="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-ink/50">
      <span class="inline-flex items-center gap-2">${logoMark('w-5 h-5 shrink-0')}&copy; ${new Date().getFullYear()} Pine Valley Digital.</span>
      <div class="flex items-center gap-6">
        <a href="#services" class="nav-link">Services</a>
        <a href="#work" class="nav-link">Work</a>
        <a href="#contact" class="nav-link">Contact</a>
      </div>
    </div>
  </footer>
`

initAnimations()
setupMobileMenu()
setupDuotoneHeading()

function setupMobileMenu() {
  const toggle = document.querySelector<HTMLButtonElement>('#menu-toggle')
  const menu = document.querySelector<HTMLElement>('#mobile-menu')
  if (!toggle || !menu) return

  const close = () => {
    menu.classList.add('hidden')
    menu.classList.remove('flex')
    toggle.setAttribute('aria-expanded', 'false')
  }

  toggle.addEventListener('click', () => {
    const isOpen = !menu.classList.contains('hidden')
    if (isOpen) {
      close()
    } else {
      menu.classList.remove('hidden')
      menu.classList.add('flex')
      toggle.setAttribute('aria-expanded', 'true')
    }
  })

  menu.querySelectorAll('.mobile-nav-link').forEach((link) => {
    link.addEventListener('click', close)
  })
}

function initAnimations() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const nav = document.querySelector('#site-nav')
  const heroLines = gsap.utils.toArray<HTMLElement>('.hero-line > span')
  const heroEyebrow = document.querySelector('.hero-eyebrow span')
  const heroSub = document.querySelector('.hero-sub')
  const preloader = document.querySelector('#preloader')
  const preWordSpan = document.querySelector('#preloader .pre-word span')

  if (reduceMotion) {
    gsap.set([preloader], { display: 'none' })
    gsap.set([nav, heroSub], { opacity: 1 })
    gsap.set(heroLines, { y: 0 })
    if (heroEyebrow) gsap.set(heroEyebrow, { y: 0 })
    setupScrollReveals()
    setupMarquee()
    return
  }

  const heroBgEls = gsap.utils.toArray<HTMLElement>('.hero-pine, .hero-sun, .hero-horizon')
  const heroBgTargetOpacity = heroBgEls.map((el) => getComputedStyle(el).opacity)

  gsap.set(heroLines, { yPercent: 110 })
  gsap.set(heroEyebrow, { yPercent: 110 })
  gsap.set(heroSub, { autoAlpha: 0, y: 16 })
  gsap.set(heroBgEls, { opacity: 0 })

  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

  tl.to(preWordSpan, { yPercent: 0, duration: 0.9, ease: 'power4.out' })
    .to(preWordSpan, { yPercent: -110, duration: 0.6, ease: 'power3.in', delay: 0.25 })
    .to(preloader, { yPercent: -100, duration: 0.7, ease: 'power4.inOut' }, '-=0.2')
    .set(preloader, { display: 'none' })
    .to(nav, { opacity: 1, duration: 0.6 }, '-=0.5')
    .to(heroEyebrow, { yPercent: 0, duration: 0.7 }, '-=0.5')
    .to(heroLines, { yPercent: 0, duration: 0.9, stagger: 0.08 }, '-=0.5')
    .to(heroSub, { autoAlpha: 1, y: 0, duration: 0.6 }, '-=0.5')
    .to(heroBgEls, { opacity: (i) => Number(heroBgTargetOpacity[i]), duration: 1.4, stagger: 0.05 }, '-=0.9')

  setupScrollReveals()
  setupMarquee()
  setupHeroParallax()
}

function setupHeroParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const hero = document.querySelector('#hero')
  if (!hero) return

  const scrollTrigger = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true }

  gsap.to('.hero-horizon', { yPercent: 10, ease: 'none', scrollTrigger })
  gsap.to('.hero-sun', { yPercent: -8, ease: 'none', scrollTrigger })
  gsap.utils.toArray<HTMLElement>('.hero-pine').forEach((pine, i) => {
    gsap.to(pine, { yPercent: 16 + (i % 3) * 6, ease: 'none', scrollTrigger })
  })
}

function setupScrollReveals() {
  const groups: [string, number][] = [
    ['#services .service-row', 0.08],
    ['#work .project-card', 0.1],
    ['#process .process-step', 0.08],
  ]

  groups.forEach(([selector, stagger]) => {
    const items = gsap.utils.toArray<HTMLElement>(selector)
    if (!items.length) return
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger,
      scrollTrigger: {
        trigger: items[0].closest('section') ?? items[0],
        start: 'top 80%',
      },
    })
  })

  gsap.utils.toArray<HTMLElement>('.reveal:not(.service-row):not(.project-card):not(.process-step)').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
      },
    })
  })
}

function setupDuotoneHeading() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const heading = document.querySelector<HTMLElement>('#contact-heading')
  const back = heading?.querySelector<HTMLElement>('.duotone-back')
  if (!heading || !back) return

  heading.addEventListener('mousemove', (e) => {
    const { left, top, width, height } = heading.getBoundingClientRect()
    const x = ((e.clientX - left) / width - 0.5) * 16
    const y = ((e.clientY - top) / height - 0.5) * 16
    gsap.to(back, { x, y, duration: 0.4, ease: 'power2.out' })
  })

  heading.addEventListener('mouseleave', () => {
    gsap.to(back, { x: 0, y: 0, duration: 0.4, ease: 'power2.out' })
  })
}

function setupMarquee() {
  const track = document.querySelector<HTMLElement>('.marquee-track')
  if (!track) return
  gsap.to(track, {
    xPercent: -50,
    duration: 22,
    ease: 'none',
    repeat: -1,
  })
}
