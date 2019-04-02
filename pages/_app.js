import React from 'react'
import { ThemeProvider } from 'styled-components'
import App, { Container } from 'next/app'
import codecopy from 'codecopy'
import theme from 'styles'

import 'styles/index.scss'

export default class MyApp extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  componentDidMount () {
    codecopy('pre')
    import('zoom-vanilla.js')
  }

  render () {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    )
  }
}
