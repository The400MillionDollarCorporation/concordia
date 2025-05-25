import Script from 'next/script'
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google'

export const Analytics = ({
  GA_ID,
  GTM_ID,
  HOTJAR_ID,
  CF_TOKEN,
}: {
  GA_ID?: string
  GTM_ID?: string
  HOTJAR_ID?: string
  CF_TOKEN?: string
}) => {
  return (
    <>
      {process.env.NODE_ENV !== 'development' && (
        <>
          {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
          {GA_ID && <GoogleAnalytics gaId={GA_ID} />}

          {/* Hotjar Analytics*/}
          {HOTJAR_ID && (
            <Script strategy="worker" id="hotjar">{`
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:${HOTJAR_ID},hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}</Script>
          )}

          {/* Cloudflare Analytics*/}
          {CF_TOKEN && (
            <Script
              strategy="worker"
              src="https://static.cloudflareinsights.com/beacon.min.js"
              data-cf-beacon={`{"token": "${CF_TOKEN}"}`}
            ></Script>
          )}
        </>
      )}
    </>
  )
}
