import React, { useEffect, Fragment } from 'react'
import { fetchMeta } from 'core/github'
import { buildReadme } from 'core'
import { DocBar, Container, Head } from 'components'
import ScrollProgress from 'scrollprogress'
import NProgress from 'nprogress'
import AnchorJS from 'anchor-js'

import { navbar } from 'styles'

function Readme (props) {
  useReadProgress()
  useAnchorTitles()

  const { meta, readme } = props
  return (
    <Fragment>
      <Head {...meta} />
      <DocBar meta={meta} />
      <Container
        pt={`${navbar}px`}
        dangerouslySetInnerHTML={{ __html: readme }}
      />
    </Fragment>
  )
}

Readme.getInitialProps = async ({ query }) => {
  if (query) {
    const [readme, metaProps] = await Promise.all([
      buildReadme(query),
      fetchMeta(query)
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
