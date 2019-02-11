import React from 'react'
import App, { Container } from 'next/app'
import { ThemeProvider } from 'styled-components'
import theme from 'styles'

import codecopy from 'codecopy'

const isSlowConnection = () => {
  if (!global.window) return false
  if (navigator.connection.effectiveType.includes('2g')) return true
  if (navigator.connection.saveData) return true
}

export default class MyApp extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  componentDidMount () {
    const isSlow = isSlowConnection()
    if (!isSlow) {
      codecopy('pre')
      import('zoom-vanilla.js')
    }
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
