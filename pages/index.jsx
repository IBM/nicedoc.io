import React, { useState, useEffect, Component } from 'react'
import { Li, Text, Container, Box, Flex, Link } from 'components'

const ThemeToggle = () => {
  const [theme, setTheme] = useState(null)
  useEffect(() => {
    setTheme(window.__theme)
    window.__onThemeChange = () => setTheme(window.__theme)
  }, [])

  const isDark = theme === 'dark'
  const isLight = !isDark

  return (
    <>
      <span
        className={isDark ? 'blue' : undefined}
        style={{ cursor: isDark ? 'pointer' : 'inherit' }}
        onClick={() => window.__setPreferredTheme('light')}
      >Light
      </span>
      <span> / </span>
      <span
        className={isLight ? 'blue' : undefined}
        onClick={() => window.__setPreferredTheme('dark')}
        style={{ cursor: isLight ? 'pointer' : 'inherit' }}
      >Dark
      </span>
    </>
  )
}

export default class Index extends Component {
  render () {
    return (
      <Container maxWidth={700}>
        <Flex flexDirection='column'>
          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            as='header'
          >
            <img src='/static/caption.svg' />
          </Flex>

          <Box style={{ textAlign: 'center' }}>
            <Text style={{ margin: 'auto' }} maxWidth='24em' pt={3}>
              pretty README as service (<Text fontSize='16px' as='span'><Link icon={false} href='https://github.com/IBM/nicedoc.io'>source code</Link></Text>).
            </Text>
            <Box py={3}>
              <code>nicedoc.io/:org/:repo[@:ref]</code>
            </Box>
          </Box>
          <Box>
            <h2>Features</h2>
            <ul>
              <Li>Instant beautiful documentation for any github.com repository.</Li>
              <Li>Compatible with any <Link href='https://github.com/github/markup#markups'>markup</Link>{' '} format.</Li>
              <Li>Point to any git hash or branch.</Li>
              <Li>File-system based routing.</Li>
              <Li><ThemeToggle /> theme support.</Li>
            </ul>
            <h2>Why</h2>
            <Text>
              <b>nicedoc.io</b> aims to reduce the documentation friction, converting any markup file hosted on github.com into an instant beauty documentation.
            </Text>
            <Text fontSize={2}>
              <Text mb={0} fontSize={1}>any repository</Text>
              <Link href='/sindresorhus/got'>nicedoc.io/sindresorhus/got</Link>
            </Text>
            <Text fontSize={2}>
              <Text mb={0} fontSize={1}>any markup file into subdirectory</Text>
              <Link href='/thejameskyle/babel-handbook/translations/en/user-handbook.md'>nicedoc.io/thejameskyle/…/user-handbook.md</Link>
            </Text>
            <Text fontSize={2}>
              <Text mb={0} fontSize={1}>any git reference</Text>
              <Link href='/GoogleChromeLabs/quicklink@1.0.0'>nicedoc.io/GoogleChromeLabs/quicklink@1.0.0</Link>
            </Text>
            <Text>
              We can't write your project documentation for you, but we can help
              you have an instant documentation site ready for your users.
            </Text>
            <h2>Examples</h2>
            <ul>
              <Li>
                <Link href='/substack/stream-handbook'>
                  substack/stream-handbook
                </Link>
              </Li>
              <Li>
                <Link href='/jsdom/jsdom'>jsdom/jsdom</Link>
              </Li>
              <Li>
                <Link href='/cheeriojs/cheerio'>cheeriojs/cheerio</Link>
              </Li>
              <Li>
                <Link href='/jamiebuilds/babel-handbook'>
                  jamiebuilds/babel-handbook
                </Link>
              </Li>
              <Li>
                <Link href='/anubhavsrivastava/awesome-ui-component-library'>
                  awesome-ui-component-library
                </Link>
              </Li>
              <Li>
                <Link href='/cyrilwanner/next-optimized-images'>
                  cyrilwanner/next-optimized-images
                </Link>
              </Li>
            </ul>
          </Box>
        </Flex>
      </Container>
    )
  }
}
