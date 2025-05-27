import { Image } from '~/shared'
import s from './home.module.scss'
const features = [
  {
    icon: '/feature-1.svg',
    title: 'Portfolio Performance Metrics',
    description: 'Get an intelligent breakdown of your wallet’s activity',
    points: [
      'Real-time asset allocation and ROI tracking',
      'Historical token balance visualization',
      'Investment returns vs. market benchmarks',
    ],
  },
  {
    icon: '/feature-2.svg',
    title: 'Unified Cross-Protocol Monitoring',
    description:
      'Track your positions across Solana’s DeFi protocols in one streamlined dashboard',
    points: [
      'DEXs, liquid staking, lending platforms, and more',
      'LP analytics with impermanent loss and APR/APY metrics',
    ],
  },
  {
    icon: '/feature-3.svg',
    title: 'Strategy Recommendations',
    description: 'Harness AI to make better moves',
    points: [
      'Custom strategy suggestions based on real behavior',
      'Compare your activity to similar wallets',
      'Identify yield opportunities and rebalance smartly',
    ],
  },
  {
    icon: '/feature-4.svg',
    title: 'Behavioral & Risk Intelligence',
    description: 'Understand how you invest—and how to do it better',
    points: [
      'Detect trading patterns and habits',
      'Receive gas efficiency tips and slippage alerts',
      'Smart contract risk assessments and protocol concentration warnings',
    ],
  },
]

export const Features = () => {
  return (
    <section id="features" className={s['features']}>
      <h1>Features</h1>

      <div className={s['features-div']}>
        <Image
          src="/ccd.png"
          width={403}
          height={537}
          alt=""
          className={s['features-div-i']}
        />
        <ul className={s['features-list']}>
          {features.map((feature, idx) => (
            <li key={idx} className={s['features-list-item']}>
              <Image
                src="/ft-bg.svg"
                width={385}
                height={522}
                alt=""
                className={s['features-list-item-i']}
              />
              <div className={s['features-list-item-div']}>
                <small>00{idx + 1}</small>
                <img src={feature.icon} alt="" />
                <div className={s['features-list-item-d']}>
                  <h2>{feature.title}</h2>
                  <p>{feature.description}</p>
                </div>
                <ul>
                  {feature.points.map((point) => (
                    <li key={point}>
                      <svg
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="4" cy="4" r="4" fill="#9A886C" />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Features
