// Reveal footer: the footer sits fixed at the viewport bottom the whole
// time, hidden behind the (opaque) page shell in front of it. A spacer
// matching the footer's height reserves the scroll room needed for the
// shell to scroll fully out of the way, "revealing" the footer beneath.

const STYLE_ID = 'reveal-footer-styles'

function ensureStyles() {
  if (document.getElementById(STYLE_ID)) return

  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = `
    .rf-shell {
      position: relative;
      z-index: 1;
      background: inherit;
    }
    .rf-footer {
      position: fixed;
      inset: auto 0 0 0;
      z-index: 0;
    }
  `
  document.head.appendChild(style)
}

export function initRevealFooter(shell: HTMLElement, footer: HTMLElement) {
  ensureStyles()
  shell.classList.add('rf-shell')
  footer.classList.add('rf-footer')

  const spacer = document.createElement('div')
  shell.insertAdjacentElement('afterend', spacer)

  const syncHeight = () => {
    spacer.style.height = `${footer.offsetHeight}px`
  }

  syncHeight()
  window.addEventListener('resize', syncHeight)

  if ('ResizeObserver' in window) {
    new ResizeObserver(syncHeight).observe(footer)
  }

  return { spacer }
}

// Usage — everything above the footer goes inside `shell`; `footer`
// can live anywhere in the DOM, since position: fixed takes it out
// of normal flow regardless of where it's declared.
