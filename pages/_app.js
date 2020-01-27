import { ThemeProvider } from 'styled-components'
import App, { Container } from 'next/app'
import codecopy from 'codecopy'
import React from 'react'

import { HashContextProvider } from 'components/hook'
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
    require('zoom-vanilla.js')
  }

  render () {
    const { Component, pageProps } = this.props
    return (
      <HashContextProvider>
        <ThemeProvider theme={theme}>
          <Container>
            <Component {...pageProps} />
          </Container>
        </ThemeProvider>
      </HashContextProvider>
    )
  }
}
