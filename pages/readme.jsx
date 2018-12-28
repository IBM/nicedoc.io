import React, { Component } from 'react'
import { getPackageInfo } from 'helpers'
import Markdown from 'react-markdown'

export default class Readme extends Component {
  static async getInitialProps ({ query }) {
    const { readme: readmeHtml } = await getPackageInfo(query.repo)
    return { readmeHtml }
  }

  render () {
    const { readmeHtml } = this.props
    return <Markdown escapeHtml={false} source={readmeHtml} />
  }
}
