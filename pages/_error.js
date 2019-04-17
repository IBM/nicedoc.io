import React, { Fragment } from 'react'
import { Head, Flex } from 'components'

export default class Error extends React.Component {
  static getInitialProps ({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { statusCode }
  }

  render () {
    const {
      title = 'Page Not Found',
      explanation = 'Things are a little unstable here.',
      children = 'I suggest come back later.',
      statusCode = 500
    } = this.props
    return (
      <Fragment>
        <Head title={title} />
        <Flex flexDirection='column' alignItems='center' justifyContent='center'>
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
            {explanation}
          </h5>
          <h5 style={{ fontWeight: 'normal', margin: 0 }}>{children}</h5>
        </Flex>
      </Fragment>
    )
  }
}
