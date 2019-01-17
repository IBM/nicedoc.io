import React, { useEffect, Fragment } from 'react'
import { getReadme, getMeta, buildMeta } from 'core'
import { Container } from 'components'
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
      {buildMeta(meta)}
      <Container dangerouslySetInnerHTML={{ __html: readme }} />
    </Fragment>
  )
}

Readme.getInitialProps = async ({ query }) => {
  if (query) {
    const [readme, metaProps] = await Promise.all([
      getReadme(query),
      getMeta(query)
    ])

    const { meta, html } = readme

    return {
      meta: { ...meta, ...metaProps },
      readme: html
    }
  }
}

function useAnchorTitles () {
  useEffect(() => {
    new AnchorJS({ icon: '#' }).add('h1, h2, h3, h4, h5, h6')
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
