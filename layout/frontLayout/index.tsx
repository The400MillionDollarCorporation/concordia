import { useEffect } from 'react'
import { useEffectOnce } from '@studio-lumio/hooks'
import { useLenis, ReactLenis } from 'lenis/react'
import { ScrollTrigger } from '~/libs/gsap'

import S from './Layout.module.scss'

import { Metadata } from '~/shared'
import cn from '~/libs/cn'
import { scrollOptions } from '~/config/variables'
import Router from 'next/router'
import { capitalize } from '~/libs/utils'

const FrontLayout = ({
  children,
  page,
  desc,
  title = 'Concordia',
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

  const pageDesc =
    'Concordia MCP is a next-generation Model Context Protocol (MCP) server built for serious DeFi participants. It delivers real-time portfolio insights, behavioral analytics, and AI-powered strategy recommendations—all within the fast, scalable Solana ecosystem.'
  return (
    <ReactLenis root options={{ ...scrollOptions }}>
      <Metadata
        PAGE_OG_IMG={img}
        PAGE_TITLE={`${capitalize(title)}`}
        PAGE_DESC={desc || pageDesc}
      />

      <main className={cn(`theme-${theme}`, S.layout)}>
        <div className={S.child} data-page={page}>
          {children}
        </div>
      </main>
    </ReactLenis>
  )
}

export default FrontLayout
