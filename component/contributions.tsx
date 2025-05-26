import { Image } from '~/shared'
import s from './home.module.scss'

const contributionProcess = [
  'Fork the repo',
  'Create a feature branch',
  'Commit your changes',
  'Submit a pull request',
]

const blocks = [
  {
    title: 'License',
    content:
      'Solana Portfolio Tracker MCP is open source under the <a href="/">MIT License</a>.',
  },
  {
    title: 'Contact',
    content:
      'For questions or support, please open an issue on the GitHub repository.',
  },
]

const Contributions = () => {
  return (
    <section className={s['contributions']}>
      <div className={s['contributions-top']}>
        <h1>
          Contribute to <br /> the project
        </h1>
        <p>
          We welcome contributions from developers, <br /> researchers, and
          crypto nerds alike!
        </p>

        <ul>
          {contributionProcess.map((process, idx) => (
            <li key={idx}>
              <Image src="/contributions.svg" width={194} height={194} alt="" />
              <small className={s['process-step']}>00{idx + 1}</small>
              <p>{process}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className={s['contributions-bottom']}>
        {blocks.map((block, idx) => (
          <div key={idx} className={s['contributions-bottom-item']}>
            <h2>
              <svg
                width="4"
                height="5"
                viewBox="0 0 4 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="2" cy="2.5" r="2" fill="#708238" />
              </svg>
              {block.title}
            </h2>
            <div
              className={s['contributions-bottom-item-p']}
              dangerouslySetInnerHTML={{ __html: block.content }}
            ></div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Contributions
