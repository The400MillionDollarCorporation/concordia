import { Image } from '~/shared'
import s from './home.module.scss'

const protocols = [
  {
    title: 'DEX & Swaps',
    subs: [
      {
        name: 'Jupiter',
        icon: '/jupiter.svg',
      },
      {
        name: 'Orca',
        icon: '/orca.svg',
      },
      {
        name: 'Raydium',
        icon: '/raydium.svg',
      },
    ],
  },
  {
    title: 'Liquid Staking',
    subs: [
      {
        name: 'metaplex',
        icon: '/metaplex.svg',
      },
      {
        name: 'Magic Eden',
        icon: '/magic-eden.svg',
      },
    ],
  },
  {
    title: 'Lending',
    subs: [
      {
        name: 'marinade',
        icon: '/marinade.svg',
      },
      {
        name: 'lido',
        icon: '/lido.svg',
      },
    ],
  },
  {
    title: 'Orderbook',
    subs: [
      {
        name: 'Serum DEX V3',
        icon: '/srm.svg',
      },
    ],
  },
  {
    title: 'NFT Marketplaces',
    subs: [
      {
        name: 'Solend',
        icon: '/solend.svg',
      },
      {
        name: 'Mango Markets',
        icon: '/mango.svg',
      },
    ],
  },
  {
    title: 'Concentrated Liquidity',
    subs: [
      {
        name: 'fluxbeam',
        icon: '/fluxbeam.svg',
      },
    ],
  },
]

export const SupportedProtocols = () => {
  return (
    <section id="supported-protocols" className={s['protocols']}>
      <h1>Supported platforms</h1>

      <div className={s['protocols-list']}>
        {protocols.map((protocol) => (
          <div key={protocol.title} className={s['protocols-list-item']}>
            <h2>{protocol.title}</h2>
            <div className={s['protocols-list-item-d']}>
              {protocol.subs.map((sub) => (
                <div key={sub.name} className={s['protocols-list-item-sub']}>
                  <Image
                    src="/contributions.svg"
                    width={194}
                    height={194}
                    alt=""
                    className={s['protocols-list-item-sub-i']}
                  />
                  <span>
                    <svg
                      width="5"
                      height="5"
                      viewBox="0 0 5 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="2.5" cy="2.5" r="2" fill="#708238" />
                    </svg>
                    {sub.name}
                  </span>
                  <img src={sub.icon} alt={sub.name} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
