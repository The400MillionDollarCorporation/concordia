import '../styles/index.scss'

import dynamic from 'next/dynamic'
import type { AppProps } from 'next/app'

import { Manrope } from 'next/font/google'
const manrope = Manrope({ subsets: ['latin'] })

import { DeviceDetectionProvider } from '~/shared/device-detection'
import { Analytics } from '~/libs/analytics'

import { Metadata } from '~/shared'
import { useAppUtilities } from '~/hooks/useAppUtilities'
import { useRealViewport } from '@studio-lumio/hooks'
const [Scrollbar] = [
  dynamic(() => import('~/shared').then(({ Scrollbar }) => Scrollbar), {
    ssr: false,
  }),
]

function MyApp({ Component, pageProps }: AppProps) {
  useAppUtilities()
  useRealViewport()

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
