import gsap from 'gsap'
import { raf } from '@studio-freight/tempus'
import { CustomEase } from 'gsap/dist/CustomEase'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { Draggable } from 'gsap/dist/Draggable'
import { ScrambleTextPlugin } from 'gsap/dist/ScrambleTextPlugin'
import { SplitText } from 'gsap/dist/SplitText'

gsap.registerPlugin(
  ScrollTrigger,
  CustomEase,
  Draggable,
  ScrambleTextPlugin,
  SplitText
)
ScrollTrigger.defaults({
  onToggle: (scrollTrigger) => {
    scrollTrigger.refresh()
  },
})

const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2
const RECIPROCAL_GR = 1 / GOLDEN_RATIO
const DURATION = RECIPROCAL_GR
const EASE = CustomEase.create('default', '0.9, 0, 0.05, 1')
CustomEase.create('ease-in-sine', '0.47, 0, 0.745, 0.715')
CustomEase.create('ease-out-sine', '0.39, 0.575, 0.565, 1')
CustomEase.create('ease-in-out-sine', '0.445, 0.05, 0.55, 0.95')

CustomEase.create('ease-in-quad', '0.55, 0.085, 0.68, 0.53')
CustomEase.create('ease-out-quad', '0.25, 0.46, 0.45, 0.94')
CustomEase.create('ease-in-out-quad', '0.455, 0.03, 0.515, 0.955')

CustomEase.create('ease-in-cubic', '0.55, 0.055, 0.675, 0.19')
CustomEase.create('ease-out-cubic', '0.215, 0.61, 0.355, 1')
CustomEase.create('ease-in-out-cubic', '0.645, 0.045, 0.355, 1')

CustomEase.create('ease-in-quart', '0.895, 0.03, 0.685, 0.22')
CustomEase.create('ease-out-quart', '0.165, 0.84, 0.44, 1')
CustomEase.create('ease-in-out-quart', '0.77, 0, 0.175, 1')

CustomEase.create('ease-in-quint', '0.755, 0.05, 0.855, 0.06')
CustomEase.create('ease-out-quint', '0.23, 1, 0.32, 1')
CustomEase.create('ease-in-out-quint', '0.86, 0, 0.07, 1')

CustomEase.create('ease-in-expo', '0.95, 0.05, 0.795, 0.035')
CustomEase.create('ease-out-expo', '0.19, 1, 0.22, 1')
CustomEase.create('ease-in-out-expo', '1, 0, 0, 1')

CustomEase.create('ease-in-circ', '0.6, 0.04, 0.98, 0.335')
CustomEase.create('ease-out-circ', '0.075, 0.82, 0.165, 1')
CustomEase.create('ease-in-out-circ', '0.785, 0.135, 0.15, 0.86')

CustomEase.create('ease-in-back', '0.6, -0.28, 0.735, 0.045')
CustomEase.create('ease-out-back', '0.175, 0.885, 0.32, 1')
CustomEase.create('ease-in-out-back', '0.68, -0.55, 0.265, 1.55')

if (typeof window !== 'undefined') {
  // Configuring GSAP with custom settings that aren't Tween-specific
  gsap.config({
    autoSleep: 60,
    nullTargetWarn: false,
  })

  // Setting default animation properties that should be inherited by ALL tweens
  gsap.defaults({
    duration: DURATION,
    ease: EASE,
  })

  gsap.ticker.lagSmoothing(0)
  gsap.ticker.remove(gsap.updateRoot)

  raf.add((time) => {
    gsap.updateRoot(time / 1000)
  }, 0)
}

export {
  CustomEase,
  ScrollTrigger,
  ScrambleTextPlugin,
  Draggable,
  DURATION,
  EASE,
  GOLDEN_RATIO,
  gsap,
  SplitText,
}
