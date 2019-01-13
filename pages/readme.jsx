import React, { useEffect, Fragment } from 'react'
import { getReadme, getMeta, buildMeta } from 'core'
import { Container, Flex, Box } from 'components'
import ScrollProgress from 'scrollprogress'
import NProgress from 'nprogress'
import AnchorJS from 'anchor-js'
import styled from 'styled-components'

import Head from 'next/head'

function Readme (props) {
  useReadProgress()
  useAnchorTitles()

  const { meta, readme, toc } = props
  return (
    <Fragment>
      {buildMeta(meta)}
      <ReadmeContainer>
        <Flex>
          <SideBar width={320} pr={20} dangerouslySetInnerHTML={{ __html: toc }}/>
          <Box pl={40} dangerouslySetInnerHTML={{ __html: readme }}/>
        </Flex>
      </ReadmeContainer>
    </Fragment>
  )
}

const ReadmeContainer = styled(Container)`
  max-width: 1060px;  
`

const SideBar = styled(Box)`
  border-right: 1px solid #eaeaea;
  font-size: .7rem;
  
  ul {
    list-style:  none;
    margin-left: 0;
    margin-bottom: 0;
  }
  
  li {
    margin-left: 0.3rem;
    margin-bottom: 0.2rem;    
  }    
`

Readme.getInitialProps = async ({ query }) => {
  if (query) {
    const [readme, metaProps] = await Promise.all([getReadme(query), getMeta(query)])

    const { meta, html, toc } = readme

    return {
      meta: { ...meta, ...metaProps },
      readme: html,
      toc
    }
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
