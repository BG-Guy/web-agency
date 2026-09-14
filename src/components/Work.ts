// Work: the "Selected work" project grid.

import './Work.css'
import { projects } from '../data/content'

export function renderWork(): string {
  const cards = projects
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
    .join('')

  return `
    <section id="work" class="px-6 sm:px-10 py-24 sm:py-32 bg-[var(--color-paper-dim)]">
      <div class="mx-auto max-w-7xl">
        <div class="reveal flex items-end justify-between gap-6 mb-14">
          <h2 class="font-display font-extrabold text-4xl sm:text-5xl tracking-tight">Selected <span class="text-[var(--color-accent-2)]">work</span></h2>
          <span class="hidden sm:block text-sm font-semibold text-[var(--color-accent)]">(04)</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          ${cards}
        </div>
      </div>
    </section>
  `
}
