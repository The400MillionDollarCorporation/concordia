'use client'

import { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export function ClientPortal({ children, selector = '#portal' }: any) {
  const ref = useRef<any>()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.querySelector(selector)
    setMounted(true)
  }, [selector])

  return mounted ? createPortal(children, ref.current) : null
}
