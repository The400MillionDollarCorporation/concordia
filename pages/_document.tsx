import { Html, Head, Main, NextScript } from 'next/document'
import { PreloadFonts } from '~/shared'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <PreloadFonts fonts={[]} />
      </Head>
      <body>
        <div id="portal" />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
