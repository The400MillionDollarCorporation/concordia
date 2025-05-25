/* eslint-disable quotes */
import Head from 'next/head'

const PAGE_ICON = '/icon.svg'
const PAGE_THEME = '#ff6a00'

const PAGE_URL = 'https://adebisi.design/'
const PAGE_CREATOR = '@studio_lumio'
const PAGE_KEYWORDS =
  'concordia,mcp,model context protocol,defi,decentralized finance,portfolio insights,behavioral analytics,ai-powered recommendations,solana ecosystem,real-time analytics,blockchain,scalable server,financial analytics,crypto analytics'

export const Metadata = ({
  PAGE_TITLE = 'Concordia',
  PAGE_DESC = 'Concordia MCP is a next-generation Model Context Protocol (MCP) server built for serious DeFi participants. It delivers real-time portfolio insights, behavioral analytics, and AI-powered strategy recommendations—all within the fast, scalable Solana ecosystem.',
  PAGE_OG_IMG = '/og.png',
}: {
  PAGE_OG_IMG?: string
  PAGE_TITLE?: string
  PAGE_DESC?: string
}) => {
  return (
    <Head>
      <title>{PAGE_TITLE}</title>
      {/* META TAGS */}
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="apple-mobile-web-app-title" content={PAGE_TITLE} />
      <meta name="description" content={PAGE_DESC} />
      <meta name="referrer" content="no-referrer" />
      <meta name="format-detection" content="telephone=no" />
      <meta httpEquiv="x-dns-prefetch-control" content="off" />
      <meta httpEquiv="Window-Target" content="_value" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="application-name" content={PAGE_TITLE} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta
        name="robots"
        content={
          process.env.NODE_ENV !== 'development'
            ? 'index,follow'
            : 'noindex,nofollow'
        }
      />
      <meta
        name="googlebot"
        content={
          process.env.NODE_ENV !== 'development'
            ? 'index,follow'
            : 'noindex,nofollow'
        }
      />

      {/*FAVICON */}
      <link rel="shortcut icon" href={PAGE_ICON} />
      <link href={PAGE_ICON} rel="icon" type="image/svg" sizes="16x16" />
      <link rel="apple-touch-icon" href={PAGE_ICON}></link>
      <meta name="theme-color" content={PAGE_THEME} />
      <meta name="msapplication-TileColor" content={PAGE_THEME} />
      <link rel="mask-icon" href="/icon-white.svg" color={PAGE_THEME} />

      <link rel="manifest" href="/manifest.json" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content={PAGE_URL} />
      <meta name="twitter:title" content={PAGE_TITLE} />
      <meta name="twitter:description" content={PAGE_DESC} />
      <meta name="twitter:image" content={PAGE_OG_IMG} />
      <meta name="twitter:creator" content={PAGE_CREATOR} />

      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={PAGE_TITLE} />
      <meta property="og:description" content={PAGE_DESC} />
      <meta property="og:site_name" content={PAGE_TITLE} />
      <meta property="og:url" content={PAGE_URL} />
      <meta property="og:image" content={PAGE_OG_IMG} />
      <meta name="keywords" content={PAGE_KEYWORDS} />
    </Head>
  )
}

export default Metadata
