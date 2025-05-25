import localFont from 'next/font/local'
import { Merriweather } from 'next/font/google'
import { useEffectOnce, useFoucFix } from '@studio-lumio/hooks'
import { useAvif } from '~/hooks'
import { useStore } from '~/libs/store'

const opensauce = localFont({
  display: 'swap',
  src: [
    {
      path: '../public/fonts/OpenSauceTwo-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/OpenSauceTwo-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../public/fonts/OpenSauceTwo-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/OpenSauceTwo-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-opensauce',
})
const merriweather = Merriweather({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  style: ['normal', 'italic'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-merriweather',
})

export function useAppUtilities() {
  useFoucFix()
  useAvif({ setState: useStore.getState().setAvifSupport })

  useEffectOnce(() => {
    document.body.classList.add(merriweather.variable, opensauce.className)
  })

  return null
}
