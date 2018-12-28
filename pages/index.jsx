import React, { Component, Fragment } from 'react'
import { Box, Flex, Link } from 'components'

export default class Index extends Component {
  render () {
    return (
      <Fragment>
        <Flex flexDirection='column'>
          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            as='header'
          >
            <h1 style={{ marginTop: 0 }}>nicedoc.io</h1>
            <Box style={{ textAlign: 'center' }}>
              <p style={{ marginBottom: '4px' }}>Pretty README as service</p>
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
              From the most simple way: Just point the url against{' '}
              <b>nicedoc.io</b> instead of github.com
            </p>

            <p>
              E.g:{' '}
              <Link
                href='/substack/stream-handbook'
                children='nicedoc.io/substack/stream-handbook'
              />{' '}
            </p>
            <p>That's all!</p>
          </Flex>
        </Flex>
      </Fragment>
    )
  }
}
