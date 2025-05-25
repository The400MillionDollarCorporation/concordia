import S from './Preloader.module.scss'
import { useGSAP } from '@gsap/react'
import { useStore } from '~/libs/store'
import { gsap } from '~/libs/gsap'

export const Preloader = () => {
  const setPreloaded = useStore(({ setPreloaded }) => setPreloaded)
  const setPreloadDuration = useStore(
    ({ setPreloadDuration }) => setPreloadDuration
  )

  useGSAP(() => {
    gsap
      .timeline({
        onStart() {
          setPreloadDuration(this.duration())
        },
        onComplete: () => {
          setPreloaded(true)
        },
      })
      .to('[data-animation="preloader"]', {
        autoAlpha: 0,
        delay: 2,
      })
  }, [])

  return (
    <div className={S.preloader} data-animation="preloader">
      <h1 data-animation="preloader-text">Preloader</h1>
    </div>
  )
}

export default Preloader
