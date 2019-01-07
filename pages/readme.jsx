import React, { useEffect, Fragment } from 'react'
import { Container } from 'components'
import { getReadme, getMeta, buildMeta } from 'core'
import ScrollProgress from 'scrollprogress'
import NProgress from 'nprogress'
import AnchorJS from 'anchor-js'

import Head from 'next/head'

function Readme (props) {
  useReadProgress()
  useAnchorTitles()

  const { meta, readme } = props
  return (
    <Fragment>
      <Head>{buildMeta(meta)}</Head>
      <Container dangerouslySetInnerHTML={{ __html: readme }} />
    </Fragment>
  )
}

Readme.getInitialProps = async ({ query }) => {
  if (query) {
    const [readme, meta] = await Promise.all([getReadme(query), getMeta(query)])
    return { meta, readme }
  }
}

function useAnchorTitles () {
  useEffect(() => {
    new AnchorJS({ icon: '#' }).add('h2, h3, h4, h5, h6')
  })
}

function useReadProgress () {
  useEffect(() => {
    NProgress.configure({
      trickle: false,
      trickleSpeed: 0,
      minimum: 0.001,
      speed: 0,
      showSpinner: false
    }).start()

    const progressObserver = new ScrollProgress((x, y) => {
      y >= 0.999 ? NProgress.set(0.999) : NProgress.set(y)
    })

    return () => progressObserver.destroy()
  }, [])
}

export default Readme
