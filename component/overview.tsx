import { Image } from '~/shared'
import s from './home.module.scss'

const Overview = () => {
  return (
    <section className={s['overview']}>
      <Image
        className={s['overview-logo']}
        src="/logo.svg"
        width={292}
        height={32}
        alt="concordia"
      />
    </section>
  )
}

export default Overview
