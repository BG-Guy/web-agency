// Scroll-triggered fade/rise-in for section content. Any element with the
// `.reveal` class starts hidden (see styles/base.css) and animates to its
// resting state once it scrolls into view — either individually, or as a
// staggered group for the three repeating "row" layouts (services, work,
// process).

import { gsap } from 'gsap'

export function initScrollReveals() {
  const staggeredGroups: [selector: string, stagger: number][] = [
    ['#services .service-row', 0.08],
    ['#work .project-card', 0.1],
    ['#process .process-step', 0.08],
  ]

  staggeredGroups.forEach(([selector, stagger]) => {
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

  // Everything else with `.reveal` (section headings, the contact block,
  // etc.) animates on its own, not as part of a staggered group.
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
