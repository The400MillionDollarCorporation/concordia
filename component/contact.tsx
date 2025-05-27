import { Image, Link } from '~/shared'
import s from './home.module.scss'
import { useLenis } from 'lenis/react'
import { Lines } from './lines'
import cn from '~/libs/cn'

const links = [
  {
    name: 'Twitter',
    url: 'https://twitter.com/ConcordiaAI',
    icon: '/twitter.svg',
  },
  {
    name: 'Telegram',
    url: 'https://t.me/ConcordiaAI',
    icon: '/telegram.svg',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/ConcordiaAI',
    icon: '/github.svg',
  },
  {
    name: 'Discord',
    url: 'https://discord.gg/ConcordiaAI',
    icon: '/discord.svg',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/concordia-ai/',
    icon: '/linkedin.svg',
  },
]

const Contact = () => {
  const lenis = useLenis()

  return (
    <section id="contact" className={s['contact']}>
      <Lines />
      <Image
        className={s['contact-img']}
        src="/footer.png"
        width={983}
        height={966}
        alt=""
      />

      <div className={s['contact-main']}>
        <Image
          className={cn('logo-ft', s['logo'])}
          src="/logo.svg"
          width={292}
          height={32}
          alt="concordia"
          onClick={() => {
            lenis.scrollTo(0)
          }}
        />
        <p>
          Advanced Analytics for Solana Wallets. <br /> Real-Time. AI-Driven.
          Actionable.
        </p>

        <ul>
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.url}
                title={link.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={link.icon} width={12} height={12} alt={link.name} />
              </Link>
            </li>
          ))}
        </ul>

        <div className={s['nav-ref']}></div>
      </div>
    </section>
  )
}

export default Contact
