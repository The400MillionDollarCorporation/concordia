import { Image } from '~/shared'
import s from './home.module.scss'
import { GetStarted } from './overview'

const steps = [
  'Install and Run',
  'Configure Your Environment',
  'Start Tracking',
]

export const GetStartedMain = () => {
  return (
    <section id="how-it-works" className={s['get-started']}>
      <Image className={s['get-started-i']} src="/gs.png" fill alt="" />

      <div className={s['get-started-top']}>
        <div className={s['get-started-top-text']}>
          <h1>
            Get Started In <br /> minutes
          </h1>
          <small>Prerequisite</small>
          <p>
            Node.js v16+{' '}
            <svg
              width="4"
              height="5"
              viewBox="0 0 4 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="2" cy="2.5" r="2" fill="#F8F8F6" />
            </svg>
            pnpm{' '}
            <svg
              width="4"
              height="5"
              viewBox="0 0 4 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="2" cy="2.5" r="2" fill="#F8F8F6" />
            </svg>
            Solana RPC endpoint
          </p>
        </div>
      </div>

      <ul>
        {steps.map((step, idx) => (
          <li key={step}>
            <svg
              width="386"
              height="124"
              viewBox="0 0 386 124"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_673_156)">
                <mask
                  id="mask0_673_156"
                  style={{ maskType: 'luminance' }}
                  maskUnits="userSpaceOnUse"
                  x="1"
                  y="1"
                  width="384"
                  height="122"
                >
                  <path d="M385 1H1V123H385V1Z" fill="white" />
                </mask>
                <g mask="url(#mask0_673_156)">
                  <mask
                    id="mask1_673_156"
                    style={{ maskType: 'luminance' }}
                    maskUnits="userSpaceOnUse"
                    x="9"
                    y="9"
                    width="368"
                    height="106"
                  >
                    <path
                      d="M367 9C367 14.5228 371.477 19 377 19V105C371.477 105 367 109.477 367 115H19C19 109.477 14.5228 105 9 105V19C14.5228 19 19 14.5228 19 9H367Z"
                      fill="white"
                    />
                  </mask>
                  <g mask="url(#mask1_673_156)">
                    <path
                      d="M367 9H368V8H367V9ZM377 19H378V18H377V19ZM377 105V106H378V105H377ZM367 115V116H368V115H367ZM19 115H18V116H19V115ZM9 105H8V106H9V105ZM9 19V18H8V19H9ZM19 9V8H18V9H19ZM367 9H366C366 15.0751 370.925 20 377 20V19V18C372.029 18 368 13.9706 368 9H367ZM377 19H376V105H377H378V19H377ZM377 105V104C370.925 104 366 108.925 366 115H367H368C368 110.029 372.029 106 377 106V105ZM367 115V114H19V115V116H367V115ZM19 115H20C20 108.925 15.0751 104 9 104V105V106C13.9706 106 18 110.029 18 115H19ZM9 105H10V19H9H8V105H9ZM9 19V20C15.0751 20 20 15.0751 20 9H19H18C18 13.9706 13.9706 18 9 18V19ZM19 9V10H367V9V8H19V9Z"
                      fill="#F8F8F6"
                    />
                  </g>
                  <path
                    d="M227.5 0.5C227.5 -18.83 211.83 -34.5 192.5 -34.5C173.17 -34.5 157.5 -18.83 157.5 0.5C157.5 19.83 173.17 35.5 192.5 35.5C211.83 35.5 227.5 19.83 227.5 0.5Z"
                    fill="#708238"
                  />
                  <path
                    d="M227.5 0.5C227.5 -18.83 211.83 -34.5 192.5 -34.5C173.17 -34.5 157.5 -18.83 157.5 0.5C157.5 19.83 173.17 35.5 192.5 35.5C211.83 35.5 227.5 19.83 227.5 0.5Z"
                    stroke="#F8F8F6"
                  />
                </g>
                <path d="M385 1H1V123H385V1Z" stroke="#F8F8F6" />
              </g>
              <defs>
                <clipPath id="clip0_673_156">
                  <rect width="386" height="124" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <div>
              <small>00{idx + 1}</small>
              <p>{step}</p>
            </div>
          </li>
        ))}
      </ul>

      <GetStarted />
    </section>
  )
}
