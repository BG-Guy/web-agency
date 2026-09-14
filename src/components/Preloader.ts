// Preloader: a full-screen splash showing the logo while the curved-panel
// transition (src/lib/transition.ts) covers the page, then hands off to the
// hero's entrance animation. The timing/animation sequence itself is
// orchestrated from src/main.ts (it needs to coordinate with the navbar and
// hero), so this module only renders the markup.

import './Preloader.css'
import { logoMark, logoWordmark } from '../lib/logo'

export function renderPreloader(): string {
  return `
    <div id="preloader">
      <div class="pre-word tracking-tight">
        <span class="relative inline-flex items-center justify-center text-4xl sm:text-6xl">
          <span class="absolute inset-0 -z-10 flex items-center justify-center">
            ${logoMark('w-[6em] h-[6em] opacity-20')}
          </span>
          ${logoWordmark('')}
        </span>
      </div>
    </div>
  `
}
