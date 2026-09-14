// Marquee: the infinitely-scrolling strip of service names between the
// hero and the services section.

import './Marquee.css'
import { gsap } from 'gsap'
import { marqueeItems } from '../data/content'

export function renderMarquee(): string {
  // The track is the item list duplicated twice back-to-back; initMarquee
  // scrolls it left by exactly 50% and loops, so the seam between the two
  // copies is invisible.
  const itemsMarkup = marqueeItems
    .map((item) => `<span class="flex items-center gap-6 pr-6"><span>${item}</span><span aria-hidden="true" class="text-[var(--color-accent)]">&#10022;</span></span>`)
    .join('')

  return `
    <div class="marquee-wrap border-y border-[var(--color-ink)]/10 py-4 overflow-hidden">
      <div class="marquee-track font-display text-2xl sm:text-3xl font-semibold">
        ${itemsMarkup}${itemsMarkup}
      </div>
    </div>
  `
}

export function initMarquee() {
  const track = document.querySelector<HTMLElement>('.marquee-track')
  if (!track) return
  gsap.to(track, {
    xPercent: -50,
    duration: 22,
    ease: 'none',
    repeat: -1,
  })
}
