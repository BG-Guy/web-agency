// Hero: the big opening headline. Its entrance animation (lines sliding up
// into place) runs as part of the page-level intro sequence in
// src/main.ts, alongside the preloader and navbar — see the `.hero-line`,
// `.hero-eyebrow`, and `.hero-sub` hooks used there.

import './Hero.css'

export function renderHero(): string {
  return `
    <section id="hero" class="relative px-6 sm:px-10 pt-40 pb-24 sm:pt-52 sm:pb-32">
      <div class="mx-auto max-w-7xl">
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
  `
}
