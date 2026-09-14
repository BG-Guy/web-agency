// Contact: the closing "Let's build something fast" call-to-action, with a
// duotone heading whose back layer drifts slightly opposite the cursor for
// a light parallax effect.

import './Contact.css'
import { gsap } from 'gsap'

export function renderContact(): string {
  return `
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
  `
}

export function initContact() {
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
