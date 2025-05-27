/* eslint-disable no-unused-vars */
import { gsap } from '../gsap'
import SplitType from 'split-type'

// Helper function for debounce
function debounce<F extends (...args: any[]) => any>(
  func: F,
  wait: number
): (...args: Parameters<F>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  return function (...args: Parameters<F>): void {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => func(...args), wait)
  }
}

export class LineReveal {
  private el: string | Element | Element[]
  delay: number
  duration: number
  threshold: number

  constructor({
    el,
    delay = 0.25,
    threshold = 0.5,
    duration = 1.5,
  }: {
    el: string | Element | Element[]
    delay?: number
    duration?: number
    threshold?: number
  }) {
    this.el = el
    this.delay = delay
    this.duration = duration
    this.threshold = threshold

    this.reset()
    this.createObserver()

    window.addEventListener('resize', this.resize.bind(this))
  }

  public reset(): void {
    const elements = gsap.utils.toArray(this.el)
    elements.forEach((element: Element) => {
      gsap.timeline().set(element, {
        scaleX: 0,
        transformOrigin: '0% 0%',
        willChange: 'transform',
      })
    })
  }

  public createObserver(): void {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target)
            gsap.to(entry.target, {
              scaleX: 1,
              ease: 'expo.inOut',
              duration: this.duration,
              delay: this.delay,
            })
          }
        })
      },
      { threshold: this.threshold }
    )

    gsap.utils.toArray(this.el).forEach((element: Element) => {
      observer.observe(element)
    })
  }

  public resize(): void {
    this.reset()
    this.createObserver()
  }
}

export class OpacityReveal {
  private el: string | Element | Element[]
  delay: number
  duration: number
  threshold: number

  constructor({
    el,
    delay = 0.25,
    threshold = 0.5,
    duration = 1.25,
  }: {
    el: string | Element | Element[]
    delay?: number
    duration?: number
    threshold?: number
  }) {
    this.el = el
    this.delay = delay
    this.duration = duration
    this.threshold = threshold

    this.reset()
    this.createObserver()

    window.addEventListener('resize', this.resize.bind(this))
  }

  public reset(): void {
    const elements = gsap.utils.toArray(this.el)
    elements.forEach((element: Element) => {
      gsap.set(element, {
        opacity: 0,
        willChange: 'opacity',
      })
    })
  }

  public createObserver(): void {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target)
            gsap.to(entry.target, {
              opacity: 1,
              ease: 'expo.inOut',
              duration: this.duration,
              delay: this.delay,
            })
          }
        })
      },
      { threshold: this.threshold }
    )

    gsap.utils.toArray(this.el).forEach((element: Element) => {
      observer.observe(element)
    })
  }

  public resize(): void {
    this.reset()
    this.createObserver()
  }
}

interface SplitTypeResult {
  lines: HTMLElement[]
  words: HTMLElement[]
  chars: HTMLElement[]
  revert: () => void
}

export class TextReveal {
  private els: Element[]
  private splits: Map<Element, SplitTypeResult>
  private observer: IntersectionObserver | null
  private revealed: Set<Element>
  private delay: number
  private threshold: number
  private duration: number
  private debouncedResize: () => void

  constructor({
    el,
    delay,
    threshold,
    duration,
  }: {
    el: string | Element | Element[]
    delay?: number
    duration?: number
    threshold?: number
  }) {
    this.els = gsap.utils.toArray(el)

    this.splits = new Map()
    this.observer = null
    this.delay = delay
    this.duration = duration
    this.threshold = threshold
    this.revealed = new Set()

    this.reset()
    this.createObserver()

    this.debouncedResize = debounce(this.resize.bind(this), 200)
    window.addEventListener('resize', this.debouncedResize)
  }

  public reset(elements?: Element[]): void {
    const elementsToReset = elements || this.els

    elementsToReset.forEach((element: HTMLElement) => {
      if (this.splits.has(element)) {
        this.splits.get(element)?.revert()
      }

      const split = new SplitType(element, {
        types: 'lines,words',
        absolute: !!(element as HTMLElement).dataset.position,
      })

      this.splits.set(element, split)

      gsap
        .timeline()
        .set(split.lines, {
          overflowY: 'clip',
        })
        .set(split.words, {
          y: '120%',
          willChange: 'transform',
        })
    })
  }

  private createObserver(): void {
    if (this.observer) {
      this.observer.disconnect()
    }

    this.observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (
            entry.isIntersecting &&
            !this.revealed.has(entry.target as Element)
          ) {
            this.revealed.add(entry.target as Element)
            this.observer?.unobserve(entry.target)
            this.animate(entry.target as Element)
          }
        })
      },
      { threshold: this.threshold || 0.5 }
    )

    this.els.forEach((element: Element) => {
      if (!this.revealed.has(element)) {
        this.observer?.observe(element)
      }
    })
  }

  private animate(target: Element): void {
    const split = this.splits.get(target)
    if (!split) return

    gsap.to(split.words, {
      y: 0,
      opacity: 1,
      ease: 'expo.out',
      stagger: 0.015,
      delay: (i: number) =>
        Math.floor(i / split.words.length) * 0.12 + this.delay,
      duration: this.duration || 1.75,
      startAt: {
        y: '140%',
      },
    })
  }

  public resize(): void {
    const elementsToReset: Element[] = []

    this.els.forEach((element: Element) => {
      const rect = element.getBoundingClientRect()
      const inView = rect.top < window.innerHeight && rect.bottom > 0

      if (inView) {
        const splitInstance = this.splits.get(element)
        if (splitInstance) {
          splitInstance.revert()
        }

        if (!this.splits.has(element)) {
          this.reset([element])
        }
      } else {
        this.revealed.delete(element)
        elementsToReset.push(element)
      }
    })

    if (elementsToReset.length > 0) {
      this.reset(elementsToReset)
    }

    this.createObserver()
  }
}

export class CharReveal {
  private els: Element[]
  private splits: Map<Element, SplitTypeResult>
  private observer: IntersectionObserver | null
  private revealed: Set<Element>
  private debouncedResize: () => void
  delay: number
  duration: number
  threshold: number

  constructor({
    el,
    delay,
    threshold,
    duration,
  }: {
    el: string | Element | Element[]
    delay?: number
    duration?: number
    threshold?: number
  }) {
    this.els = gsap.utils.toArray(el)
    this.splits = new Map()
    this.observer = null
    this.delay = delay
    this.duration = duration
    this.threshold = threshold

    this.splits = new Map()
    this.observer = null
    this.revealed = new Set()

    this.reset()
    this.createObserver()

    this.debouncedResize = debounce(this.resize.bind(this), 200)
    window.addEventListener('resize', this.debouncedResize)
  }

  public reset(): void {
    this.els.forEach((element: HTMLElement) => {
      if (this.splits.has(element)) {
        this.splits.get(element)?.revert()
      }

      const split = new SplitType(element, {
        types: 'lines,chars',
      })

      this.splits.set(element, split)

      gsap
        .timeline()
        .set(split.lines, {
          overflowY: 'hidden',
          marginBottom: '-10px',
          paddingBottom: '10px',
        })
        .set(split.chars, {
          y: '110%',
          willChange: 'transform',
        })
    })
  }

  private createObserver(): void {
    if (this.observer) {
      this.observer.disconnect()
    }

    this.observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (
            entry.isIntersecting &&
            !this.revealed.has(entry.target as Element)
          ) {
            this.revealed.add(entry.target as Element)
            this.observer?.unobserve(entry.target)
            this.animate(entry.target as Element)
          }
        })
      },
      { threshold: 0.85 }
    )

    this.els.forEach((element: Element) => {
      this.observer?.observe(element)
    })
  }

  private animate(target: Element): void {
    const split = this.splits.get(target)
    if (!split) return

    const type = (target as HTMLElement).dataset.type || 'multi'

    gsap.to(split.chars, {
      ease: 'expo.out',
      y: 0,
      delay: this.delay,
      duration: this.duration,
      stagger: type === 'multi' ? 0.012 : 0.1,
      startAt: {
        y: '110%',
      },
    })
  }

  public resize(): void {
    this.els.forEach((element: Element) => {
      const rect = element.getBoundingClientRect()
      const inView = rect.top < window.innerHeight && rect.bottom > 0

      if (inView) {
        const splitInstance = this.splits.get(element)
        if (splitInstance) {
          splitInstance.revert()
          this.splits.delete(element)
        }
      } else {
        this.revealed.delete(element)
        this.reset()
        this.createObserver()
      }
    })
  }
}
