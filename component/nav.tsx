import { Image } from '~/shared'
import { slugify } from '~/libs/slugify'
import s from './home.module.scss'
import { useLenis } from 'lenis/react'

const links = [
  'Overview',
  'Supported protocols',
  'How it works',
  'Integrate with claude',
  'Contact',
]

const Nav = () => {
  const lenis = useLenis()

  return (
    <>
      <Image
        className={s['logo']}
        src="/logo.svg"
        width={292}
        height={32}
        alt="concordia"
        onClick={() => {
          lenis.scrollTo(0)
        }}
      />

      <nav className={s['nav']}>
        {links.map((link) => (
          <button
            key={link}
            data-link={slugify(link)}
            onClick={() => {
              lenis.scrollTo(slugify(link))
            }}
          >
            {link}
          </button>
        ))}
      </nav>
    </>
  )
}

export default Nav
