import React, { useEffect, Fragment } from 'react'
import { fetchMeta } from 'core/github'
import { buildReadme } from 'core'
import { DocBar, Container, Head } from 'components'
import ScrollProgress from 'scrollprogress'
import NProgress from 'nprogress'

import { navbar } from 'styles'

function Readme (props) {
  useReadProgress()

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
    const { html, image, ...normalizedQuery } = await buildReadme(query)
    const meta = await fetchMeta(normalizedQuery)

    return {
      readme: html,
      meta: { ...meta, image }
    }
  }
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

    return () => {
      NProgress.done()
      progressObserver.destroy()
    }
  }, [])
}

export default Readme
