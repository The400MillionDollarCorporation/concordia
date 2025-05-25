import '../styles/index.scss'

import dynamic from 'next/dynamic'
import type { AppProps } from 'next/app'

import { Manrope } from 'next/font/google'
const manrope = Manrope({ subsets: ['latin'] })

import { PageTransitions } from '@14islands/react-page-transitions'

import { DeviceDetectionProvider } from '~/shared/device-detection'

import { Analytics } from '~/libs/analytics'
import { Canvas } from '~/libs/webgl/components/canvas'

import { Metadata } from '~/shared'
import { useAppUtilities } from '~/hooks/useAppUtilities'
import { useRealViewport } from '@studio-lumio/hooks'
const [Scrollbar] = [
  dynamic(() => import('~/shared').then(({ Scrollbar }) => Scrollbar), {
    ssr: false,
  }),
]

function MyApp({ Component, pageProps, router }: AppProps) {
  useAppUtilities()
  useRealViewport()

  return (
    <main className={manrope.className}>
      <Analytics />
      <Metadata />

      <Canvas>
        <DeviceDetectionProvider>
          <PageTransitions mode="sync" pageName={router.asPath}>
            <Component {...pageProps} />
          </PageTransitions>
        </DeviceDetectionProvider>
        <Scrollbar />
      </Canvas>
    </main>
  )
}

export default MyApp
