// Footer: the closing bar with the logo/copyright and secondary nav links.
// It sits fixed at the viewport bottom and "reveals" itself as the page
// shell above it scrolls out of the way (src/lib/revealFooter.ts), while
// its own shell morphs from an inset card to a full-bleed bar as that
// reveal progresses (initFooterMorph below).

import './Footer.css'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { logoMark } from '../lib/logo'
import { initRevealFooter } from '../lib/revealFooter'

export function renderFooter(): string {
  return `
    <footer id="site-footer">
      <div id="footer-shell" class="footer-shell px-6 sm:px-10 py-10">
        <div class="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-ink/50">
          <span class="inline-flex items-center gap-2">${logoMark('w-5 h-5 shrink-0')}&copy; ${new Date().getFullYear()} Pine Valley Digital.</span>
          <div class="flex items-center gap-6">
            <a href="#services" class="nav-link">Services</a>
            <a href="#work" class="nav-link">Work</a>
            <a href="#contact" class="nav-link">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  `
}

// `pageShell` is everything above the footer (see src/main.ts) — the
// reveal effect needs it to size the scroll spacer that makes room for the
// footer to appear from behind it.
export function initFooter(pageShell: HTMLElement) {
  const footer = document.getElementById('site-footer')!
  const { spacer } = initRevealFooter(pageShell, footer)
  initFooterMorph(spacer)
}

function initFooterMorph(spacer: HTMLElement) {
  const shell = document.querySelector<HTMLElement>('#footer-shell')
  if (!shell) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    shell.style.setProperty('--footer-progress', '1')
    return
  }

  // progress 0 exactly when the reveal window starts (spacer's top hits the
  // viewport bottom — the same moment the footer starts peeking up from
  // behind the shell); progress 1 at max scroll, fully revealed.
  ScrollTrigger.create({
    trigger: spacer,
    start: 'top bottom',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: (self) => {
      shell.style.setProperty('--footer-progress', String(self.progress))
    },
  })
}
