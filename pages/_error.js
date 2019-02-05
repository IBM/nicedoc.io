import React, { Fragment } from 'react'
import { Head, Flex } from 'components'

export default class Error extends React.Component {
  static getInitialProps ({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { statusCode }
  }

  render () {
    const { statusCode = 500 } = this.props
    return (
      <Fragment>
        <Head title='Page Not Found' />
        <Flex
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
        >
          <h1
            style={{
              fontSize: '34vw',
              marginTop: '0.5rem'
            }}
          >
            {statusCode}
          </h1>
          <h5
            style={{
              textAlign: 'center',
              marginTop: 0,
              marginBottom: '.5rem'
            }}
          >
            Things are a little unstable here.
          </h5>
          <h5 style={{ fontWeight: 'normal', margin: 0 }}>
            I suggest come back later.
          </h5>
        </Flex>
      </Fragment>
    )
  }
}
