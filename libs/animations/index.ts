import { gsap } from '~/libs/gsap'
import SplitType from 'split-type'
import { useEffectOnce, useEventListener } from '@studio-lumio/hooks'
import { useRef } from 'react'

/**General */
export const useTextAnimation = (el: string, delay = 0.1) => {
  const split = useRef<any>(null)
  const resetTextAnimation = () => {
    split.current = new SplitType(document.querySelectorAll(el), {
      types: 'lines,words',
    })
    return gsap
      .timeline()
      .set(split.current.lines, {
        overflowY: 'hidden',
      })
      .set(split.current.words, {
        y: '100%',
        willChange: 'transform',
      })
  }

  const showTextAnimation = () => {
    if (!split.current) return

    const promises = gsap.utils
      .toArray(split.current.lines)
      .map((element: Element, idx: number) => {
        const words = element.querySelectorAll('.word')

        return new Promise((resolve) => {
          gsap.to(words, {
            y: 0,
            delay: idx * delay,
            duration: 2,
            onComplete: resolve, // Resolve the promise when the animation is complete
          })
        })
      })

    // Return a promise that resolves when all animations are completed
    return Promise.all(promises)
  }
  const hideTextAnimation = () => {
    if (!split.current) return

    const promises = gsap.utils
      .toArray(split.current.lines)
      .map((element: Element, idx: number) => {
        const words = element.querySelectorAll('.word')

        return new Promise((resolve) => {
          gsap.to(words, {
            y: '-100%',
            delay: idx * delay,
            duration: 2,
            onComplete: resolve, // Resolve the promise when the animation is complete
          })
        })
      })

    // Return a promise that resolves when all animations are completed
    return Promise.all(promises)
  }

  useEventListener('resize', () => {
    resetTextAnimation().add(showTextAnimation)
  })

  return { resetTextAnimation, showTextAnimation, hideTextAnimation }
}

export const useObserveTextY = (el: string) => {
  const split = useRef<any>(null)

  const resetObserveAnimation = () => {
    gsap.utils.toArray(el).forEach((element: HTMLElement) => {
      split.current = new SplitType(element, {
        types: 'lines,words',
      })
      gsap
        .timeline()
        .set(split.current.lines, {
          overflowY: 'hidden',
        })
        .set(split.current.words, {
          y: '100%',
          willChange: 'transform',
        })
    })
  }

  const showObserveAnimation = () => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry: any) => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target)
            const lines = entry.target.querySelectorAll('.line')
            return gsap.utils
              .toArray(lines)
              .forEach((element: Element, idx: number) => {
                const words = element.querySelectorAll('.word')
                gsap.to(words, {
                  y: 0,
                  delay: idx * 0.075 + 0.15,
                  duration: 1.75,
                })
              })
          }
        })
      },
      { threshold: 1 }
    )

    gsap.utils.toArray(el).forEach((element: HTMLElement) => {
      observer.observe(element)
    })
  }

  useEventListener('resize', () => {
    resetObserveAnimation()
    showObserveAnimation()
  })

  return { resetObserveAnimation, showObserveAnimation }
}

export const useRevealAnimation = (el: string) => {
  const elRef = useRef(null)

  useEffectOnce(() => {
    elRef.current = document.querySelectorAll(el)
  })

  const resetRevealAnimation = () => {
    return gsap.set(elRef.current, {
      autoAlpha: 0,
      willChange: 'opacity',
    })
  }

  const showRevealAnimation = () => {
    return gsap.to(elRef.current, {
      autoAlpha: 1,
      duration: 1,
    })
  }

  return { resetRevealAnimation, showRevealAnimation }
}

export const observeRevealY = (el: string) => {
  const observer = new window.IntersectionObserver(
    (entries) => {
      entries.forEach((entry: any) => {
        const element: any = entry.target
        gsap.set(element, {
          autoAlpha: 0,
          willChange: 'opacity',
        })

        if (entry.isIntersecting) {
          observer.unobserve(entry.target)
          gsap.to(entry.target, {
            autoAlpha: 1,
          })
        } else {
          gsap.set(element, {
            autoAlpha: 0,
            willChange: 'opacity',
          })
        }
      })
    },
    { threshold: 1 }
  )

  gsap.utils.toArray(el).forEach((element: HTMLElement) => {
    observer.observe(element)
  })
}

export const useObserveRevealY = (el: string) => {
  const reset = () => {
    gsap.utils.toArray(el).forEach((element: HTMLElement) => {
      gsap.set(element, {
        autoAlpha: 0,
        willChange: 'opacity',
      })
    })
  }

  const show = () => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry: any) => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target)
            return gsap.to(entry.target, {
              autoAlpha: 1,
            })
          }
        })
      },
      { threshold: 1 }
    )

    gsap.utils.toArray(el).forEach((element: HTMLElement) => {
      observer.observe(element)
    })
  }

  useEventListener('resize', () => {
    reset()
    show()
  })

  return { reset, show }
}
