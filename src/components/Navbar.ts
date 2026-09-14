// Navbar: the fixed header (logo, desktop nav links, CTA, mobile menu
// toggle) plus the mobile drawer it opens. Owns three independent bits of
// behavior:
//   - initMobileMenu   toggles the drawer open/closed
//   - initNavbarMorph  scroll-driven pill -> full-width bar shape morph
//   - the drawer's own nav links, built by the shared hover-teaser-menu
//     widget (src/lib/hoverTeaserMenu.ts)

import './Navbar.css'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { logoMark, logoWordmark } from '../lib/logo'
import { initHoverTeaserMenu } from '../lib/hoverTeaserMenu'

export function renderNavbar(): string {
  return `
    <header id="site-nav" class="navbar-shell fixed top-0 inset-x-0 z-40 opacity-0">
      <div id="navbar-bar" class="navbar-bar border-[3px] border-[var(--color-ink)] bg-[var(--color-paper)]">
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
            <a href="#contact" class="btn-cta hidden sm:inline-flex text-sm font-semibold">
              <span class="btn-cta-clip">
                <span class="btn-cta-bg"></span>
                <span class="btn-cta-label">Start a project</span>
              </span>
            </a>
            <button id="menu-toggle" type="button" aria-label="Toggle menu" aria-expanded="false" class="md:hidden cursor-pointer flex items-center justify-center w-10 h-10 border border-[var(--color-ink)] rounded-full">
              <span class="hamburger">
                <span class="bar"></span>
                <span class="bar"></span>
              </span>
            </button>
          </div>
        </div>
      </div>
      <nav id="mobile-menu" class="md:hidden hidden px-6 pb-6">
        <div id="mobile-menu-teaser" class="w-full h-72 sm:h-80"></div>
      </nav>
    </header>
  `
}

// Wires up all navbar behavior. Call once after renderNavbar()'s markup is
// in the DOM.
export function initNavbar() {
  initMobileMenu()
  initNavbarMorph()
  initHoverTeaserMenu(document.getElementById('mobile-menu-teaser')!, [
    { id: 'services', label: 'Services', href: '#services', color: 'var(--color-accent)' },
    { id: 'work', label: 'Work', href: '#work', color: 'var(--color-accent-2)' },
    { id: 'process', label: 'Process', href: '#process', color: '#d9a441' },
    { id: 'contact', label: 'Contact', href: '#contact', color: 'var(--color-ink)' },
  ])
}

function initMobileMenu() {
  const toggle = document.querySelector<HTMLButtonElement>('#menu-toggle')
  const menu = document.querySelector<HTMLElement>('#mobile-menu')
  if (!toggle || !menu) return

  const close = () => {
    menu.classList.add('hidden')
    menu.classList.remove('flex')
    toggle.classList.remove('is-open')
    toggle.setAttribute('aria-expanded', 'false')
  }

  toggle.addEventListener('click', () => {
    const isOpen = !menu.classList.contains('hidden')
    if (isOpen) {
      close()
    } else {
      menu.classList.remove('hidden')
      menu.classList.add('flex')
      toggle.classList.add('is-open')
      toggle.setAttribute('aria-expanded', 'true')
    }
  })

  // The teaser menu's own links (data-link) may preventDefault on a first
  // touch tap to just "prime" the color teaser — only close the drawer once
  // a click is actually about to navigate.
  menu.addEventListener('click', (e) => {
    const link = (e.target as HTMLElement).closest('[data-link]')
    if (link && !e.defaultPrevented) close()
  })
}

function initNavbarMorph() {
  const shell = document.querySelector<HTMLElement>('#site-nav')
  if (!shell) return

  // Floating rounded pill, inset from the screen edges, at the very top of
  // the page — docking into a flush full-width rectangle over the first
  // 100px of scroll. Same technique as the shared Navbar, just translated
  // out of Framer Motion's useTransform into ScrollTrigger's onUpdate —
  // with the 0/1 ends swapped relative to the source component, per this
  // site's own direction (inset first, full-bleed on scroll).
  ScrollTrigger.create({
    start: 0,
    end: 100,
    scrub: true,
    onUpdate: (self) => {
      shell.style.setProperty('--nav-progress', String(1 - self.progress))
    },
  })
}
