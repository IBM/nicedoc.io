import React, { Fragment, Component } from 'react'
import { Container } from 'components'
import { getReadme, getMeta, buildMeta } from 'core'
import ScrollProgress from 'scrollprogress'
import Markdown from 'react-markdown'
import NProgress from 'nprogress'

import Head from 'next/head'

export default class Readme extends Component {
  constructor (props) {
    super(props)

    if (global.document) {
      NProgress.configure({
        trickle: false,
        trickleSpeed: 0,
        speed: 0,
        showSpinner: false
      }).start()
    }
  }
  static async getInitialProps ({ query }) {
    if (query) {
      const [readme, meta] = await Promise.all([
        getReadme(query),
        getMeta(query)
      ])
      return { meta, readme }
    }
  }

  componentDidMount () {
    this.progressObserver = new ScrollProgress((x, y) => {
      y >= 0.999 ? NProgress.set(0.999) : NProgress.set(y)
    })
  }

  componentWillUnmount () {
    this.progressObserver.destroy()
  }

  render () {
    const { meta, readme } = this.props
    return (
      <Fragment>
        <Head>{buildMeta(meta)}</Head>
        <Container>
          <Markdown escapeHtml={false} source={readme} />
        </Container>
      </Fragment>
    )
  }
}
