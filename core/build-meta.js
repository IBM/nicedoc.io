import { Fragment } from 'react'

import pkg from '../package.json'

const DEFAULT_META = {
  name: pkg.name,
  description: pkg.description,
  url: pkg.homepage,
  image: '/static/img/logo.png',
  logo: '/static/img/banner.png'
}

export default opts => {
  const meta = Object.assign({}, DEFAULT_META, opts)

  return (
    <Fragment>
      {/* <!-- Basic --> */}
      <meta charSet='utf-8' />
      <meta httpEquiv='X-UA-Compatible' content='IE=edge,chrome=1' />
      <link rel='icon' href='/static/favicon.ico' type='image/x-icon' />

      {/* <!-- Search Engine --> */}
      <meta name='description' content={meta.description} />
      <meta name='image' content={meta.image} />
      <link rel='canonical' href={meta.url} />
      <title
        children={
          meta.title || `${meta.full_name || meta.name}: ${meta.description}`
        }
      />
      <meta name='author' content={meta.author} />
      <meta
        name='viewport'
        content='width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'
      />

      {/* <!-- Twitter --> */}
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:creator' content={`@${meta.author}`} />
      <meta name='twitter:title' content={meta.name} />
      <meta name='twitter:description' content={meta.description} />
      <meta name='twitter:image' content={meta.image} />

      {/* <!-- Open Graph general (Facebook, Pinterest & Google+) --> */}
      <meta property='og:title' content={meta.name} />
      <meta property='og:logo' content={meta.logo} />
      <meta property='og:description' content={meta.description} />
      <meta property='og:image' content={meta.image} />
      <meta property='og:url' content={meta.url} />
      <meta property='og:type' content='website' />
      <meta property='og:locale' content='en_US' />

      {/* <!-- Schema.org for Google  --> */}
      <meta itemProp='name' content={meta.name} />
      <meta itemProp='description' content={meta.description} />
      <meta itemProp='image' content={meta.image} />
    </Fragment>
  )
}
