import { Box, Flex } from '@rebass/grid'
import styled from 'styled-components'
import Head from 'next/head'

import { constants } from 'styles'
import Link from './link'

const Container = styled('div')`
  margin-left: auto;
  margin-right: auto;
  max-width: ${constants.layout}px;
`

export { Container, Link, Head, Box, Flex }
