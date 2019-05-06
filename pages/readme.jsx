import { fetchRepo, fetchMeta, buildReadme } from 'core'
import { ExternalLink, NavBar, Container, Head } from 'components'
import React, { useEffect, Fragment } from 'react'
import ScrollProgress from 'scrollprogress'
import NProgress from 'nprogress'
import Error from './_error'

import { navbar } from 'styles'

function Readme (props) {
  useReadProgress()

  const { query, meta, readme } = props

  if (!readme) {
    return (
      <Error
        title='Readme Not Found'
        explanation='Readme Not Found'
        statusCode={404}
      >
        Looks like <ExternalLink href={`https://github.com/${query.repo}/${query.owner}`}>github.com/{query.repo}/{query.owner}</ExternalLink> doesn't exist.
      </Error>
    )
  }

  return (
    <Fragment>
      <Head {...meta} />
      <NavBar meta={meta} />
      <Container
        pt={`${navbar}px`}
        dangerouslySetInnerHTML={{ __html: readme }}
      />
    </Fragment>
  )
}

Readme.getInitialProps = async ({ query }) => {
  if (query) {
    const { markdown, source, ...info } = await fetchRepo(query)

    if (!markdown) return { query }

    const [{ html, image }, meta] = await Promise.all([
      buildReadme({ markdown, source }),
      fetchMeta({ source, info })
    ])

    return {
      query,
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
