import React from 'react'
import { ThemeProvider } from 'styled-components'
import App, { Container } from 'next/app'
import { get } from 'lodash'
import theme from 'styles'

import codecopy from 'codecopy'

const isSlowConnection = () => {
  const saveData = get(global, 'navigator.connection.saveData', false)
  const effectiveType = get(global, 'window.navigator.connection.effectiveType', '')
  return saveData || effectiveType.includes('2g')
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
