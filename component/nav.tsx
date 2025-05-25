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
    <nav className={s['nav']}>
      {links.map((link) => (
        <button
          key={link}
          onClick={() => {
            lenis.scrollTo(slugify(link))
          }}
        >
          {link}
        </button>
      ))}
    </nav>
  )
}

export default Nav
