import React from 'react'
import App, { Container } from 'next/app'

export default class MyApp extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  componentDidMount () {
    const { navigator } = global.window
    const isSlowConnection = navigator.connection.effectiveType.includes('2g')
    if (!isSlowConnection) {
      require('zoom-vanilla.js')
      require('codecopy')('pre')
    }
  }

  render () {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    )
  }
}
