import localFont from 'next/font/local'
import { Cormorant_Garamond, Geist_Mono } from 'next/font/google'
import { useEffectOnce, useFoucFix } from '@studio-lumio/hooks'
import { useAvif } from '~/hooks'
import { useStore } from '~/libs/store'

const opensauce = localFont({
  display: 'swap',
  src: [
    {
      path: '../public/fonts/OpenSauce.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/OpenSauceTwo-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-opensauce',
})

const cormorant_garamond = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  style: ['normal', 'italic'],
  weight: ['400', '500', '700'],
  variable: '--font-cormorant',
})

const geist_mono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist',
})

export function useAppUtilities() {
  useFoucFix()
  useAvif({ setState: useStore.getState().setAvifSupport })

  useEffectOnce(() => {
    document.body.classList.add(
      cormorant_garamond.variable,
      geist_mono.variable,
      opensauce.className
    )
  })

  return null
}
