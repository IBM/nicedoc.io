import React, { useEffect } from 'react'
import ScrollProgress from 'scrollprogress'
import { display } from 'styled-system'
import NProgress from 'nprogress'

import {
  Aside,
  Hide,
  ExternalLink,
  Nav,
  Container,
  Head,
  Flex
} from 'components'

import { useCurrentHash } from 'components/hook'

import { fetchRepo, fetchMeta, buildReadme } from 'core'
import { layout, speed, aside, navbar } from 'styles'
import styled from 'styled-components'
import Error from './_error'

const Article = styled(Flex)`
  ${display}
`

Article.defaultProps = {
  ...Flex.displayProps,
  as: 'article',
  display: ['block', 'flex', 'flex']
}

function Readme (props) {
  const hash = useCurrentHash()

  useEffect(() => {
    window.scroll = require('smooth-scroll')('a[href*="#"]', { speed: speed.normal })
    addProgressBar()
  }, [])

  useEffect(() => scrollToHash(hash), [hash])

  const { toc, query, meta, readme } = props

  if (!readme) {
    const slug = `${query.owner}/${query.repo}`
    return (
      <Error
        title='Readme Not Found'
        explanation='Readme Not Found'
        statusCode={404}
      >
        Looks like{' '}
        <ExternalLink href={`https://github.com/${slug}`}>
          github.com/{slug}
        </ExternalLink>{' '}
        doesn't exist.
      </Error>
    )
  }

  const pr = navbar.map((s, index) => s * (index / navbar.length))
  const pl = pr.map((s, index) => s + aside[index])
  const maxWidth = layout.map((layout, index) => layout - pl[index])

  return (
    <>
      <Head {...meta} />
      <Nav hash={hash} meta={meta} />
      <Container as='main' mx='auto'>
        <Article pt={navbar}>
          <Hide breakpoints={[0]}>
            <Aside
              hash={hash}
              pr={pr}
              width={aside}
              pt={navbar}
              top={navbar}
              dangerouslySetInnerHTML={{ __html: toc }}
            />
          </Hide>
          <Container
            as='section'
            maxWidth={maxWidth}
            pl={pl}
            dangerouslySetInnerHTML={{ __html: readme }}
          />
        </Article>
      </Container>
    </>
  )
}

Readme.getInitialProps = async ({ query }) => {
  if (query) {
    const { markdown, source, ...info } = await fetchRepo(query)

    if (!markdown) return { query }

    const [{ toc, html, image }, meta] = await Promise.all([
      buildReadme({ markdown, source }),
      fetchMeta({ source, info })
    ])

    return {
      query,
      toc,
      readme: html,
      meta: { ...meta, image }
    }
  }
}

function addProgressBar () {
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
}

function scrollToHash (hash) {
  if (hash) {
    const node = document.querySelector(hash)
    if (node) {
      setTimeout(() => window.scroll.animateScroll(node))
    }
  }
}

export default Readme
