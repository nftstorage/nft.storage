import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  /**
   * @param {import("next/document").DocumentContext} ctx
   */
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="manifest" href="/manifest.webmanifest"></link>
          <link rel="icon" href="/favicon.ico" />
          <link rel="icon" href="/icon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link
            rel="preload"
            href="/fonts/ChicagoFLF.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="true"
          ></link>
          <meta name="theme-color" content="#F5C32C" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
