import { Box, Flex } from '@rebass/grid'
import Head from 'next/head'
import NextLink from 'next/link'

const Link = ({ href, prefetch = false, ...props }) => (
  <NextLink prefetch={prefetch} href={href}>
    <a {...props} />
  </NextLink>
)

export { Link, Head, Box, Flex }
