import { Image, Link } from '~/shared'
import s from './home.module.scss'
import { Lines } from './lines'
import { useEffectOnce, useWindowSize } from '@studio-lumio/hooks'
import { useEffect, useState } from 'react'
import { gsap, SplitText } from '~/libs/gsap'
import cn from '~/libs/cn'
import { OpacityReveal, TextReveal } from '~/libs/animations/classes'

const overviewItems = [
  'Wallet Overview & History...',
  'Transaction Pattern Analysis...',
  'Behavioral Profile...',
  'DeFi Engagement...',
  'Transaction Detail Analysis...',
  'Optimization Opportunities...',
  'Advanced Strategy Recommen...',
  'Security Assessment & Recom...',
]

export const Overview = () => {
  const { width, height } = useWindowSize()

  const [startAnimations, setStartAnimations] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setStartAnimations(true)
    }, 1000)
  }, [])

  useEffect(() => {
    if (!startAnimations) return
    const h1 = document.querySelector('.overview-h1')
    const nav = document.querySelector(`.${s['nav']}`)
    const logo = document.querySelectorAll(`.${s['logo']}`)
    const gs = document.querySelectorAll(`.${s['gs']}`)
    const hf = document.querySelectorAll(`.${s['hero-fade']}`)
    const navMobile = document.querySelector(`.${s['nav-mobile']}`)
    const hScramble = document.querySelectorAll('.hero-scramble')

    const delay = 0.7

    SplitText.create(h1, {
      type: 'words',
      onSplit(self) {
        gsap.set(h1, { autoAlpha: 1 })

        gsap.from(self.words, {
          duration: 1.5,
          y: 100,
          autoAlpha: 0,
          stagger: 0.05,
          ease: 'expo.inOut',
        })
      },
    })

    gsap
      .timeline({ delay: delay, defaults: { ease: 'none', duration: 0.75 } })
      .to([nav, navMobile, logo, gs, hf], { autoAlpha: 1 })

    hScramble.forEach((text, idx) => {
      gsap.set(text, { opacity: 0 })

      gsap.to(text, {
        scrambleText: {
          text: text.textContent,
          chars: 'lowerCase',
        },
        duration: 2,
        delay: idx * 0.3 + delay,
        onStart: () => {
          gsap.set(text, { opacity: 1 })
        },
      })
    })
  }, [startAnimations])

  useEffectOnce(() => {
    setTimeout(() => {
      new TextReveal({
        el: '[data-paragraph]',
        delay: 0.2,
        duration: 2,
        threshold: 0.5,
      })

      new OpacityReveal({
        el: '[data-reveal]',
      })
    }, 500)
  })

  return (
    <>
      <video
        width={width}
        height={height}
        muted
        autoPlay
        playsInline
        loop
        className={s['overview-video']}
        src="/flow.mp4"
      />

      <div className={s['overview-bg']}></div>
      <section id="overview" className={s['overview']}>
        <h1 className="overview-h1">
          <em>Solana</em> Portfolio <br /> Tracker MCP
        </h1>
        <GetStarted />

        <figure className={cn(s['hero-fade'], s['overview-i'])}>
          <div className={s['overview-i-ul-w']}>
            <svg
              width="262"
              height="167"
              viewBox="0 0 262 167"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_669_2)">
                <path d="M261.5 0.5H0.5V166.5H261.5V0.5Z" fill="#F8F8F6" />
                <path d="M261.5 0.5H0.5V166.5H261.5V0.5Z" stroke="#9A886C" />
                <mask
                  id="mask0_669_2"
                  style={{ maskType: 'luminance' }}
                  maskUnits="userSpaceOnUse"
                  x="8"
                  y="8"
                  width="246"
                  height="151"
                >
                  <path
                    d="M244 8C244 13.5228 248.477 18 254 18V149C248.477 149 244 153.477 244 159H18C18 153.477 13.5228 149 8 149V18C13.5228 18 18 13.5228 18 8H244Z"
                    fill="white"
                  />
                </mask>
                <g mask="url(#mask0_669_2)">
                  <path
                    d="M244 8H245V7H244V8ZM254 18H255V17H254V18ZM254 149V150H255V149H254ZM244 159V160H245V159H244ZM18 159H17V160H18V159ZM8 149H7V150H8V149ZM8 18V17H7V18H8ZM18 8V7H17V8H18ZM244 8H243C243 14.0751 247.925 19 254 19V18V17C249.029 17 245 12.9706 245 8H244ZM254 18H253V149H254H255V18H254ZM254 149V148C247.925 148 243 152.925 243 159H244H245C245 154.029 249.029 150 254 150V149ZM244 159V158H18V159V160H244V159ZM18 159H19C19 152.925 14.0751 148 8 148V149V150C12.9706 150 17 154.029 17 159H18ZM8 149H9V18H8H7V149H8ZM8 18V19C14.0751 19 19 14.0751 19 8H18H17C17 12.9706 12.9706 17 8 17V18ZM18 8V9H244V8V7H18V8Z"
                    fill="#9A886C"
                  />
                </g>
              </g>
              <defs>
                <clipPath id="clip0_669_2">
                  <rect width="262" height="167" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <ul className={s['overview-i-ul']}>
              {overviewItems.map((item) => (
                <li key={item} className="hero-scramble">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Image
            src={'/overview.png'}
            width={652}
            height={549}
            alt="Overview"
          />
        </figure>

        <p data-paragraph className={s['overview-p']}>
          Concordia MCP is a next-generation Model Context Protocol (MCP) server
          built for serious DeFi participants. It delivers real-time portfolio
          insights, behavioral analytics, and AI-powered strategy
          recommendations—all within the fast, scalable Solana ecosystem.
        </p>

        <Image
          className={cn(s['hero-fade'], s['overview-column-1'])}
          src={'/greekcolumn.png'}
          width={253}
          height={819}
          alt=""
        />
        <Image
          className={cn(s['hero-fade'], s['overview-column-2'])}
          src={'/greekcolumn.png'}
          width={253}
          height={819}
          alt=""
        />

        <Lines />
      </section>
    </>
  )
}

export const GetStarted = () => {
  return (
    <Link
      href="https://github.com/The400MillionDollarCorporation/Concordia-MCP"
      className={s['gs']}
    >
      <svg
        width="159"
        height="44"
        viewBox="0 0 159 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask id="path-1-inside-1_188_413" fill="white">
          <path d="M149 0C149 5.52285 153.477 10 159 10V34C153.477 34 149 38.4772 149 44H10C10 38.4772 5.52285 34 0 34V10C5.52285 10 10 5.52285 10 0H149Z" />
        </mask>
        <path
          d="M149 0C149 5.52285 153.477 10 159 10V34C153.477 34 149 38.4772 149 44H10C10 38.4772 5.52285 34 0 34V10C5.52285 10 10 5.52285 10 0H149Z"
          fill="#F8F8F6"
        />
        <path
          d="M149 0H150V-1H149V0ZM159 10H160V9H159V10ZM159 34V35H160V34H159ZM149 44V45H150V44H149ZM10 44H9V45H10V44ZM0 34H-1V35H0V34ZM0 10V9H-1V10H0ZM10 0V-1H9V0H10ZM149 0H148C148 6.07513 152.925 11 159 11V10V9C154.029 9 150 4.97056 150 0H149ZM159 10H158V34H159H160V10H159ZM159 34V33C152.925 33 148 37.9249 148 44H149H150C150 39.0294 154.029 35 159 35V34ZM149 44V43H10V44V45H149V44ZM10 44H11C11 37.9249 6.07513 33 0 33V34V35C4.97056 35 9 39.0294 9 44H10ZM0 34H1V10H0H-1V34H0ZM0 10V11C6.07513 11 11 6.07513 11 0H10H9C9 4.97056 4.97056 9 0 9V10ZM10 0V1H149V0V-1H10V0Z"
          fill="#9A886C"
          mask="url(#path-1-inside-1_188_413)"
        />
      </svg>
      <span data-cta>Get Started</span>
    </Link>
  )
}
