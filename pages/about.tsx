import FrontLayout from '@/layout/frontLayout'
import { gsap } from '~/libs/gsap'
import { useTextAnimation } from '~/libs/animations'
import { usePageTransition } from '@14islands/react-page-transitions'
import { useStore } from '~/libs/store'

const AboutPage = () => {
  const preloaded = useStore(({ preloaded }) => preloaded)
  const preloadDuration = useStore(({ preloadDuration }) => preloadDuration)
  const { showTextAnimation, resetTextAnimation, hideTextAnimation } =
    useTextAnimation('[data-animation="about-text"]')

  usePageTransition({
    onEnter() {
      resetTextAnimation()
    },
    onEntering() {
      gsap
        .timeline({
          delay: preloaded ? 0 : preloadDuration,
        })
        .call(() => showTextAnimation())
    },
    onExiting: async ({ done }) => {
      gsap.timeline().call(() =>
        hideTextAnimation().then(() => {
          done()
        })
      )
    },
  })

  return (
    <FrontLayout page="about">
      <section>
        <h1 data-animation="about-text">About</h1>
        <h1 data-animation="about-text">Paragraph</h1>
      </section>
    </FrontLayout>
  )
}

export default AboutPage
