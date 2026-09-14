// Services: the "What we do" list of four offerings.

import './Services.css'
import { services } from '../data/content'

export function renderServices(): string {
  const rows = services
    .map(
      (s) => `
    <div class="service-row reveal grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 py-10 items-start">
      <span class="sm:col-span-2 font-display text-ink/30 text-2xl">${s.n}</span>
      <h3 class="sm:col-span-3 font-display font-bold text-2xl sm:text-3xl">${s.title}</h3>
      <p class="sm:col-span-7 text-ink/65 text-base sm:text-lg max-w-xl">${s.copy}</p>
    </div>`
    )
    .join('')

  return `
    <section id="services" class="px-6 sm:px-10 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl">
        <div class="reveal flex items-end justify-between gap-6 mb-14">
          <h2 class="font-display font-extrabold text-4xl sm:text-5xl tracking-tight">What we <span class="text-[var(--color-accent-2)]">do</span></h2>
          <span class="hidden sm:block text-sm font-semibold text-[var(--color-accent)]">(04)</span>
        </div>
        <div class="divide-y divide-[var(--color-ink)]/10 border-t border-[var(--color-ink)]/10">
          ${rows}
        </div>
      </div>
    </section>
  `
}
