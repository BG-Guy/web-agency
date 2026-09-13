// Curved-panel cover/reveal transition: a bulging bottom edge that flattens
// as the panel grows to fully cover its container, and vice versa.

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2
}

function buildPanelPath(width: number, height: number, bulge: number) {
  // The bottom edge bulges downward by `bulge` px at the midpoint,
  // and flattens into a straight line as `bulge` approaches 0.
  return `M0,0 L${width},0 L${width},${height - bulge} Q${width / 2},${height + bulge} 0,${height - bulge} Z`
}

interface CurveTransitionOptions {
  container: HTMLElement
  color?: string
  duration?: number
}

export function curveTransition({ container, color = '#4f46e5', duration = 650 }: CurveTransitionOptions) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  svg.setAttribute('width', '100%')
  svg.setAttribute('height', '100%')
  svg.style.position = 'absolute'
  svg.style.inset = '0'
  svg.style.display = 'block'
  svg.style.zIndex = '-1'
  svg.style.pointerEvents = 'none'
  path.setAttribute('fill', color)
  svg.appendChild(path)
  container.appendChild(svg)

  function animate(direction: 'in' | 'out') {
    // "in"  -> panel grows to cover the container (0 -> full height)
    // "out" -> panel shrinks away, revealing new content (full -> 0)
    return new Promise<void>((resolve) => {
      const start = performance.now()
      const { width, height } = container.getBoundingClientRect()
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`)

      function frame(now: number) {
        const t = Math.min((now - start) / duration, 1)
        const eased = easeInOutCubic(t)
        const travel = direction === 'in' ? eased * height : (1 - eased) * height
        const bulge = Math.sin(eased * Math.PI) * (height * 0.08)

        path.setAttribute('d', buildPanelPath(width, travel, bulge))
        t < 1 ? requestAnimationFrame(frame) : resolve()
      }

      requestAnimationFrame(frame)
    })
  }

  // Draws the fully-covered state instantly (no animation, no bulge) — for
  // starting a page load already closed, instead of animating "in" from
  // nothing.
  function setCovered() {
    const { width, height } = container.getBoundingClientRect()
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
    path.setAttribute('d', buildPanelPath(width, height, 0))
  }

  return {
    setCovered,
    cover: () => animate('in'),
    reveal: () => animate('out'),
    destroy: () => svg.remove(),
    async run(swapContent: () => void | Promise<void>) {
      await animate('in') // cover the container
      await swapContent() // swap the DOM (or do work) while it's fully hidden
      await animate('out') // reveal the new content
      svg.remove()
    },
  }
}
