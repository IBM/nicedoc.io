import Document, { Head as HeadDocument, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import stylesheet from 'styles/index.scss'
import { Head } from 'components'

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    )
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render () {
    return (
      <html>
        <HeadDocument>
          {this.props.styleTags}
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        </HeadDocument>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
