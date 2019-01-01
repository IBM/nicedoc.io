import React, { Fragment, Component } from 'react'
import { getReadme, getMeta, buildMeta } from 'helpers'
import Markdown from 'react-markdown'
import Head from 'next/head'

export default class Readme extends Component {
  static async getInitialProps ({ query }) {
    const [readme, meta] = await Promise.all([getReadme(query), getMeta(query)])
    return { meta, readme }
  }

  render () {
    const { meta, readme } = this.props

    return (
      <Fragment>
        <Head>{buildMeta(meta)}</Head>
        <Markdown escapeHtml={false} source={readme} />
      </Fragment>
    )
  }
}
