import { useEffect } from 'react'
import { useEffectOnce } from '@studio-lumio/hooks'
import { useLenis, ReactLenis } from 'lenis/react'
import { ScrollTrigger } from '~/libs/gsap'

import S from './Layout.module.scss'

import { Link, Metadata } from '~/shared'
import cn from '~/libs/cn'
import { scrollOptions } from '~/config/variables'
import Router from 'next/router'
import { capitalize } from '~/libs/utils'

const FrontLayout = ({
  children,
  page,
  desc,
  title = 'Starter',
  theme = 'light',
  img,
}: {
  children: any
  page: string
  desc?: string
  title?: string
  img?: string
  theme?: 'light' | 'dark'
}) => {
  type ILinks = { href: string; name: string }
  const links: ILinks[] = [
    {
      href: '/',
      name: 'Home',
    },
    {
      href: '/about',
      name: 'About',
    },
    {
      href: '/contact',
      name: 'Contact',
    },
    {
      href: '/works/zekast',
      name: 'Works',
    },
  ]

  useEffectOnce(() => {
    document.body.classList.add(`theme-${theme}`)
  })
  const lenis = useLenis(() => ScrollTrigger.update())
  useEffect(() => ScrollTrigger.refresh(), [lenis])
  useEffect(() => {
    function onHashChangeStart(url) {
      url = '#' + url.split('#').pop()
      lenis.scrollTo(url)
    }

    Router.events.on('hashChangeStart', onHashChangeStart)

    return () => {
      Router.events.off('hashChangeStart', onHashChangeStart)
    }
  }, [lenis])

  const pageDesc = 'starter file for studio lumio'
  return (
    <ReactLenis root options={{ ...scrollOptions }}>
      <Metadata
        PAGE_OG_IMG={img}
        PAGE_TITLE={`${capitalize(title)} - Starter`}
        PAGE_DESC={desc || pageDesc}
      />

      <main className={cn(`theme-${theme}`, S.layout)}>
        <header className={S.header}>
          <div className={S['header-left']}>
            <ul>
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </header>

        <div className={S.child} data-page={page}>
          {children}
        </div>
      </main>
    </ReactLenis>
  )
}

export default FrontLayout
