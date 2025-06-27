import { Image, Link } from '~/shared'
import { slugify } from '~/libs/slugify'
import s from './home.module.scss'
import { useLenis } from 'lenis/react'
import { useDeviceDetection } from '~/shared/device-detection'
import { gsap, ScrollTrigger } from '~/libs/gsap'
import { useState, useRef, useEffect } from 'react'
import { getOffset } from '~/libs/animations/dom'
import cn from '~/libs/cn'

const links = [
  'Overview',
  'Features',
  'Supported protocols',
  'How it works',
  'Integrate with claude',
]

export const Nav = () => {
  const lenis = useLenis()

  return (
    <>
      <div className={cn('logo-wrapper', s['logo-wrapper'])}>
        <Image
          className={cn('logo', s['logo'])}
          src="/logo.svg"
          width={292}
          height={32}
          alt="concordia"
          onClick={() => {
            lenis.scrollTo(0)
          }}
        />
      </div>

      <NavMain />
    </>
  )
}

export const NavMain = () => {
  const lenis = useLenis()

  const { isMobile3x } = useDeviceDetection()

  // eslint-disable-next-line no-unused-vars
  const [navOpen, setNavOpen] = useState(false)
  const tlRef = useRef<gsap.core.Timeline>()

  useEffect(() => {
    const nav = document.querySelector(`.${s['nav']}`)
    const navMobile = document.querySelector(`.${s['nav-mobile']}`)
    const ref = document.querySelector(`.${s['nav-ref']}`)
    const navBottom = nav.getBoundingClientRect().bottom

    const animation = gsap
      .timeline({ paused: true })
      .to(navMobile, { paddingBottom: '25vh', ease: 'none' })

    gsap.to('.logo-wrapper', {
      autoAlpha: 0,
      y: '-100%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.logo-ft',
        start: 'top 100%',
        end: 'top 90%',
        scrub: true,
      },
    })

    ScrollTrigger.create({
      trigger: ref,
      endTrigger: '#contact',
      start: `top ${navBottom - 50}px`,
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: () => {
        const offset = getOffset(ref)
        gsap.set(nav, {
          top: offset.top,
        })
      },
      animation,
    })
  }, [])

  useEffect(() => {
    const btn = document.querySelector(`.${s['nav-btn']}`)
    const btnDiv = document.querySelectorAll(`.${s['nav-btn-div']}`)
    const nav = document.querySelector(`.${s['nav']}`)
    const overlay = document.querySelector(`.${s['nav-overlay']}`)

    tlRef.current = gsap
      .timeline({
        paused: true,
        reversed: true,
        defaults: { ease: 'power4.inOut', duration: 0.75 },
      })
      .to(btn, {
        width: '100%',
      })
      .to(
        btnDiv,
        {
          y: '-100%',
        },
        0
      )
      .to(
        overlay,
        {
          autoAlpha: 1,
        },
        0
      )
      .to(
        nav,
        {
          clipPath: 'inset(0% 0% 0% 0%)',
        },
        0.4
      )
  }, [])

  useEffect(() => {
    let scramble
    const navButtons = document.querySelectorAll('[data-cta]')
    navButtons.forEach((button) => {
      const originalText = button.textContent
      button.setAttribute('data-original', originalText || '')

      scramble = () => {
        gsap.to(button, {
          duration: 1,
          ease: 'sine.in',
          scrambleText: {
            text: button.getAttribute('data-original'),
            chars: 'lowerCase',
          },
        })
      }

      button.addEventListener('pointerenter', scramble)
      button.addEventListener('focus', scramble)
    })

    return () => {
      navButtons.forEach((button) => {
        button.removeEventListener('pointerenter', scramble)
        button.removeEventListener('focus', scramble)
      })
    }
  }, [])

  const handleClick = () => {
    setNavOpen((prev) => {
      const open = !prev
      if (tlRef.current) {
        open ? tlRef.current.play() : tlRef.current.reverse()
      }
      return open
    })
  }

  return (
    <>
      {isMobile3x ? (
        <div className={s['nav-mobile']}>
          <div className={s['nav-overlay']}></div>
          <nav className={s['nav']}>
            {links.map((link) => (
              <button
                data-cta
                className={s['nav-button']}
                key={link}
                data-link={slugify(link)}
                onClick={() => {
                  lenis.scrollTo(`#${slugify(link)}`)
                }}
              >
                {link}
              </button>
            ))}
            <Link
              href="https://docs.concordia-mcp.pro/"
              target="_blank"
              rel="noopener noreferrer"
              data-cta
              className={s['nav-button']}
            >
              Docs
            </Link>
          </nav>
          <button onClick={handleClick} className={s['nav-btn']}>
            <div className={s['nav-btn-w']}>
              <span className={s['nav-btn-div']}>
                Menu
                <svg
                  width="15"
                  height="8"
                  viewBox="0 0 15 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 1H15" stroke="#9A886C" />
                  <path d="M0 7H15" stroke="#9A886C" />
                </svg>
              </span>
              <span className={s['nav-btn-div']}>
                Close
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.696655 0.696777L11.3033 11.3034"
                    stroke="#9A886C"
                  />
                  <path
                    d="M0.696655 11.3032L11.3033 0.696621"
                    stroke="#9A886C"
                  />
                </svg>
              </span>
            </div>
          </button>
        </div>
      ) : (
        <nav className={s['nav']}>
          {links.map((link) => (
            <button
              data-cta
              className={s['nav-button']}
              key={link}
              data-link={slugify(link)}
              onClick={() => {
                lenis.scrollTo(`#${slugify(link)}`)
              }}
            >
              {link}
            </button>
          ))}
          <Link
            href="https://docs.concordia-mcp.pro/"
            target="_blank"
            rel="noopener noreferrer"
            data-cta
            className={s['nav-button']}
          >
            Docs
          </Link>
        </nav>
      )}
    </>
  )
}
