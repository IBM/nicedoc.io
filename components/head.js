import Head from 'next/head'
import url from 'url'

import pkg from '../package.json'

const { SITE_URL } = process.env

const DEFAULT_META = {
  name: pkg.name,
  description: pkg.description,
  url: SITE_URL,
  image: url.resolve(SITE_URL, '/static/banner.jpg'),
  logo: url.resolve(SITE_URL, '/static/logo.png')
}

const FAVICON = {
  ico: url.resolve(SITE_URL, '/static/favicon.ico'),
  medium: url.resolve(SITE_URL, '/static/favicon-32x32.png'),
  small: url.resolve(SITE_URL, '/static/favicon-16x16.png')
}

export default ({ children, ...opts }) => {
  const meta = Object.assign({}, DEFAULT_META, opts)
  const name = meta.repo || meta.name
  const fullName =
    meta.owner && meta.repo ? `${meta.owner}/${meta.repo}` : meta.name

  return (
    <Head>
      {/* <!-- Basic --> */}
      <meta charSet='utf-8' />
      <meta httpEquiv='X-UA-Compatible' content='IE=edge,chrome=1' />
      <link rel='icon' href={FAVICON.ico} type='image/x-icon' />

      <link rel='icon' type='image/png' href={FAVICON.medium} sizes='32x32' />

      <link rel='icon' type='image/png' href={FAVICON.small} sizes='16x16' />

      {/* <!-- Search Engine --> */}
      <meta name='application-name' content='nicedoc.io' />
      <meta name='date' content={meta.updatedAt} />
      <meta name='description' content={meta.description} />
      <meta name='image' content={meta.image} />
      <link rel='canonical' href={meta.url} />
      <title children={meta.title || `${fullName}: ${meta.description}`} />
      <meta name='author' content={meta.owner} />
      <meta
        name='viewport'
        content='width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'
      />
      {/* <!-- Twitter --> */}
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:title' content={name} />
      <meta name='twitter:description' content={meta.description} />
      <meta name='twitter:image' content={meta.image} />
      {/* <!-- Open Graph general (Facebook, Pinterest & Google+) --> */}
      <meta property='og:site_name' content='nicedoc.io' />
      <meta property='og:title' content={name} />
      <meta property='og:logo' content={meta.logo} />
      <meta property='og:description' content={meta.description} />
      <meta property='og:image' content={meta.image} />
      <meta property='og:url' content={meta.url} />
      <meta property='og:type' content='website' />
      <meta property='og:locale' content='en_US' />
      <meta property='og:updated_time' content={meta.updatedAt} />
      {/* <!-- Schema.org for Google  --> */}
      <meta itemProp='name' content={name} />
      <meta itemProp='description' content={meta.description} />
      <meta itemProp='image' content={meta.image} />

      {children}
    </Head>
  )
}
