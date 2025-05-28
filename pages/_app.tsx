import '../styles/index.scss'

import dynamic from 'next/dynamic'
import type { AppProps } from 'next/app'

import { Manrope } from 'next/font/google'
const manrope = Manrope({ subsets: ['latin'] })

import { DeviceDetectionProvider } from '~/shared/device-detection'
import { Analytics } from '~/libs/analytics'

import { useLenis } from 'lenis/react'

import { Metadata } from '~/shared'
import { useAppUtilities } from '~/hooks/useAppUtilities'
import { useRealViewport } from '@studio-lumio/hooks'
import { useEffect } from 'react'
import { ScrollTrigger } from '~/libs/gsap'
const [Scrollbar] = [
  dynamic(() => import('~/shared').then(({ Scrollbar }) => Scrollbar), {
    ssr: false,
  }),
]

function MyApp({ Component, pageProps }: AppProps) {
  useAppUtilities()
  useRealViewport()

  const lenis = useLenis()
  if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    lenis?.start()

    ScrollTrigger.refresh()
    lenis?.scrollTo(0, { immediate: true })
  }, [lenis])

  return (
    <main className={manrope.className}>
      <Analytics />
      <Metadata />

      <DeviceDetectionProvider>
        <Component {...pageProps} />
      </DeviceDetectionProvider>
      <Scrollbar />
    </main>
  )
}

export default MyApp
