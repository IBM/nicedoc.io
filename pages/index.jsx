import React, { Component } from 'react'
import { Li, Text, Container, Box, Flex, Link } from 'components'

export default class Index extends Component {
  render () {
    return (
      <Container>
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
            <Text style={{ margin: 'auto' }} maxWidth={'24em'} pt={3}>
              Prettify any README file
            </Text>
            <Box py={3}>
              <code>nicedoc.io/:org/:repo[@:ref]</code>
            </Box>
          </Box>
          <Box>
            <h2>Features</h2>
            <ul>
              <Li>
                Automatically generated documentation sites for your markdown
                files.
              </Li>
              <Li>Compatible with any doc file hosted on GitHub.</Li>
              <Li>
                Point to a git hash reference in any{' '}
                <Link href='https://github.com/github/markup#markups'>
                  markup
                </Link>{' '}
                format.
              </Li>
              <Li>Light & Dark mode support.</Li>
            </ul>
            <h2>Why</h2>
            <Text>
              Software documentation is a lie: nobody wants to do it but
              everyone wants to have it.
            </Text>
            <Text>
              We can't write your project documentation for you, but we can help
              you have an instant documentation site ready for your users.
            </Text>
            <h2>Examples</h2>
            <ul>
              <Li>
                <Link href='/jamiebuilds/react-loadable'>
                  jamiebuilds/react-loadable
                </Link>
              </Li>
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
                <Link href='/GoogleChromeLabs/quicklink'>
                  GoogleChromeLabs/quicklink
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
