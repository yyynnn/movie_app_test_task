import Document, { Head, Main, NextScript } from 'next/document'
import { Html } from 'next/document'
import Script from 'next/script'
import { ServerStyleSheet } from 'styled-components'

const attrs = {
  xmlns: 'http://www.w3.org/1999/xhtml',
  'xmlns:fb': 'http://ogp.me/ns/fb#'
}
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang="ru" prefix="og: http://ogp.me/ns#" {...attrs}>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
