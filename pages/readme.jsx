import { Aside, Hide, ExternalLink, Nav, Container, Head, Flex, Box } from 'components'

import { fetchRepo, fetchMeta, buildReadme } from 'core'
import React, { useEffect, Fragment } from 'react'
import ScrollProgress from 'scrollprogress'
import styled from 'styled-components'
import { top } from 'styled-system'
import NProgress from 'nprogress'

import Error from './_error'

import { speed, aside, navbar, transition, fontSizes } from 'styles'

if (global.window) {
  window.scroll = require('smooth-scroll')('a[href*="#"]', { speed: speed.normal })
}

function Readme (props) {
  useReadProgress()

  const { toc, query, meta, readme } = props

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

  const pr = navbar.map((s, index) => s * (index / navbar.length))
  const pl = pr.map((s, index) => s + aside[index])

  return (
    <Fragment>
      <Head {...meta} />
      <Nav meta={meta} />
      <Container as='main' mx='auto'>
        <Hide breakpoints={[1, 2]}>
          <Box as='section' dangerouslySetInnerHTML={{ __html: readme }} />
        </Hide>
        <Hide breakpoints={[0]}>
          <Flex as='article' pt={navbar}>
            <Aside pr={pr} width={aside} pt={navbar} top={navbar} dangerouslySetInnerHTML={{ __html: toc }} />
            <Box as='section' pl={pl} dangerouslySetInnerHTML={{ __html: readme }} />
          </Flex>
        </Hide>
      </Container>
    </Fragment>
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
