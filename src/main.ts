// Entry point / composition root.
//
// This file does two things only:
//   1. Assembles the page by concatenating each section component's markup
//      (see src/components/*) into #app.
//   2. Runs the page-level intro animation — the preloader hold, curtain
//      reveal, and hero/nav entrance — since that sequence spans multiple
//      components and doesn't belong to any single one of them.
//
// Everything else (a component's own interactivity — the mobile menu, the
// navbar/footer scroll morphs, the contact heading parallax, the marquee
// loop) is initialized by that component's own `initX()` function, called
// below once the markup is mounted. See src/components/README.md-style
// comments at the top of each component file for what it owns.

import './styles/base.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { curveTransition } from './lib/transition'
import { initScrollReveals } from './lib/scrollReveal'
import { renderPreloader } from './components/Preloader'
import { renderNavbar, initNavbar } from './components/Navbar'
import { renderHero } from './components/Hero'
import { renderMarquee, initMarquee } from './components/Marquee'
import { renderServices } from './components/Services'
import { renderWork } from './components/Work'
import { renderProcess } from './components/Process'
import { renderContact, initContact } from './components/Contact'
import { renderFooter, initFooter } from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  ${renderPreloader()}

  <div id="page-shell">
  ${renderNavbar()}

  <main id="top">
    ${renderHero()}
    ${renderMarquee()}
    ${renderServices()}
    ${renderWork()}
    ${renderProcess()}
    ${renderContact()}
  </main>
  </div>

  ${renderFooter()}
`

initIntro()
initNavbar()
initContact()
initFooter(document.getElementById('page-shell')!)

async function initIntro() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const nav = document.querySelector('#site-nav')
  const heroLines = gsap.utils.toArray<HTMLElement>('.hero-line > span')
  const heroEyebrow = document.querySelector('.hero-eyebrow span')
  const heroSub = document.querySelector('.hero-sub')
  const preloader = document.querySelector<HTMLElement>('#preloader')
  const preWord = document.querySelector<HTMLElement>('#preloader .pre-word')

  if (reduceMotion) {
    gsap.set([preloader], { display: 'none' })
    gsap.set([nav, heroSub], { opacity: 1 })
    gsap.set(heroLines, { y: 0 })
    if (heroEyebrow) gsap.set(heroEyebrow, { y: 0 })
    initScrollReveals()
    initMarquee()
    return
  }

  gsap.set(heroLines, { yPercent: 110 })
  gsap.set(heroEyebrow, { yPercent: 110 })
  gsap.set(heroSub, { autoAlpha: 0, y: 16 })
  gsap.set(preWord, { autoAlpha: 1, scale: 1 })

  const revealPage = gsap.timeline({ paused: true, defaults: { ease: 'power4.out' } })
  revealPage
    .to(nav, { opacity: 1, duration: 0.6 })
    .to(heroEyebrow, { yPercent: 0, duration: 0.7 }, '<')
    .to(heroLines, { yPercent: 0, duration: 0.9, stagger: 0.08 }, '<+=0.1')
    .to(heroSub, { autoAlpha: 1, y: 0, duration: 0.6 }, '-=0.5')

  initScrollReveals()
  initMarquee()

  if (preloader) {
    // Total load sequence: 1200ms hold + 300ms fade + 1000ms curtain = 2.5s.
    const curtain = curveTransition({ container: preloader, color: '#333333', duration: 1000 })
    curtain.setCovered() // start already closed, logo already visible — no grow-in

    await new Promise((resolve) => setTimeout(resolve, 1200)) // hold on the logo
    await new Promise<void>((resolve) => {
      gsap.to(preWord, { autoAlpha: 0, duration: 0.3, onComplete: resolve })
    })
    revealPage.play()
    await curtain.reveal() // single motion: curtain opens, revealing the hero
    curtain.destroy()

    gsap.set(preloader, { display: 'none' })
  } else {
    revealPage.play()
  }
}
