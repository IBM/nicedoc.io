import React, { Component } from 'react'
import { Container, Box, Flex, Link } from 'components'

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
            <img
              style={{ marginTop: 0, maxWidth: '12rem' }}
              src='/static/caption.svg'
            />
            <Box style={{ textAlign: 'center' }}>
              <p style={{ margin: '8px 0' }}>Pretty README as service</p>
              <code>nicedoc.io/:org/:repo</code>
            </Box>
          </Flex>

          <Flex flexDirection='column'>
            <h2>Why</h2>
            <p>
              Software documentation is a lie: nobody wants to do it but
              everyone wants to have it.
            </p>
            <p>
              We can't write your project documentation, but we can help
              creating a bridge to reduce the quantity of time you need to setup
              a beautiful documentation portal.
            </p>
            <p>
              <b>nicedoc.io</b> is a simple way for automagically generate
              pretty README for any GitHub repository.
            </p>
            <h2>How</h2>
            <p>
              Just point the url against <b>nicedoc.io</b> instead of github.com
            </p>

            <p>
              e.g:{' '}
              <Link
                href='/rebassjs/rebass'
                children='nicedoc.io/rebassjs/rebass'
              />{' '}
            </p>
            <p>
              You can point to any git reference, e.g{' '}
              <Link
                href='/rebassjs/rebass'
                children='nicedoc.io/rebassjs/rebass@v2'
              />{' '}
            </p>
            <p>That's all!</p>
          </Flex>
        </Flex>
      </Container>
    )
  }
}
