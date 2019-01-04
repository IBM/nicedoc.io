import React, { Fragment } from 'react'
import { Container } from 'components'
import { getReadme, getMeta, buildMeta } from 'core'
import ScrollProgress from 'scrollprogress'
import Markdown from 'react-markdown'
import NProgress from 'nprogress'

import Head from 'next/head'

export default function Readme(props) {
  useProgressBar()
  const { meta, readme } = props
  return (
    <Fragment>
      <Head>{buildMeta(meta)}</Head>
      <Container>
        <Markdown escapeHtml={false} source={readme} />
      </Container>
    </Fragment>
  )
}

Readme.getInitialProps = async ({ query}) => {
  if (query) {
    const [readme, meta] = await Promise.all([
      getReadme(query),
      getMeta(query)
    ])
    return { meta, readme }
  }
}

function useProgressBar() {
  React.useEffect(() => {
    NProgress.configure({
      trickle: false,
      trickleSpeed: 0,
      speed: 0,
      showSpinner: false
    }).start()

    const progressObserver = new ScrollProgress((x, y) => {
      y >= 0.999 ? NProgress.set(0.999) : NProgress.set(y)
    })

    return () => progressObserver.destroy()
  }, [])
}
