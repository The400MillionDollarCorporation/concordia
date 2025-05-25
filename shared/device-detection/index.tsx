'use client'

import { useMediaQuery } from '@studio-lumio/hooks'
import { isBoolean } from 'lodash'
import { createContext, useContext } from 'react'
import { breakpoints } from '~/config/variables'

interface IDeviceContext {
  isTablet: boolean
  isDesktop: boolean
  isTablet2x: boolean
  isTablet3x: boolean
  isReducedMotion: boolean
  isWebGL: boolean
  isMobile3x: boolean
}

const DeviceDetectionContext = createContext<IDeviceContext>({
  isTablet: undefined,
  isTablet2x: undefined,
  isTablet3x: undefined,
  isDesktop: undefined,
  isReducedMotion: undefined,
  isWebGL: undefined,
  isMobile3x: undefined,
})

export const useDeviceDetection: () => IDeviceContext = () => {
  return useContext(DeviceDetectionContext)
}

export function DeviceDetectionProvider({ children }) {
  const tablet = Number(breakpoints.tablet.replace('px', ''))
  const tablet2x = Number(breakpoints.tablet2x.replace('px', ''))
  const tablet3x = Number(breakpoints.tablet3x.replace('px', ''))
  const mobile3x = Number(breakpoints.mobile3x.replace('px', ''))

  const isMobile3x = useMediaQuery(`(max-width: ${mobile3x}px)`)
  const isTablet = useMediaQuery(`(max-width: ${tablet}px)`)
  const isTablet2x = useMediaQuery(`(max-width: ${tablet2x}px)`)
  const isTablet3x = useMediaQuery(`(max-width: ${tablet3x}px)`)
  const isDesktop = useMediaQuery(`(min-width: ${tablet2x + 1}px)`)
  const isReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const isWebGL = !isReducedMotion

  return (
    <DeviceDetectionContext.Provider
      value={{
        isTablet,
        isDesktop,
        isTablet2x,
        isMobile3x,
        isTablet3x,
        isReducedMotion,
        isWebGL,
      }}
    >
      {isBoolean(isTablet) && children}
    </DeviceDetectionContext.Provider>
  )
}
