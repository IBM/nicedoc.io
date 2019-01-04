import { Box, Flex } from '@rebass/grid'
import Head from 'next/head'
import NextLink from 'next/link'
import styled from 'styled-components'

const linkStyle = {
  margin: '0 10px 0 0'
}

const Link = ({ style, href, prefetch = false, ...props }) => (
  <NextLink prefetch={prefetch} href={href}>
    <a style={{ ...linkStyle, ...style }} {...props} />
  </NextLink>
)

const Container = styled('div')`
  margin-left: auto;
  margin-right: auto;
  max-width: 650px;
`

export { Container, Link, Head, Box, Flex }
