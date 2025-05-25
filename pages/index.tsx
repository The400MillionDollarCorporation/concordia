import FrontLayout from '@/layout/frontLayout'
import { useStore } from '~/libs/store'
import { gsap } from '~/libs/gsap'
import { useTextAnimation } from '~/libs/animations'
import { usePageTransition } from '@14islands/react-page-transitions'

const HomePage = () => {
  const preloaded = useStore(({ preloaded }) => preloaded)
  const preloadDuration = useStore(({ preloadDuration }) => preloadDuration)
  const { showTextAnimation, resetTextAnimation, hideTextAnimation } =
    useTextAnimation('[data-animation="home-text"]')

  usePageTransition({
    onEnter() {
      resetTextAnimation()
    },
    onEntering: async ({ done }) => {
      gsap
        .timeline({
          delay: preloaded ? 0 : preloadDuration,
        })
        .call(() =>
          showTextAnimation().then(() => {
            done()
          })
        )
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
    <FrontLayout page="home">
      <section className="home">
        <h1 data-animation="home-text">Home</h1>
        <h1 data-animation="home-text">Paragraph</h1>
      </section>
    </FrontLayout>
  )
}

export default HomePage
