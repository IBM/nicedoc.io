import React, { Fragment } from 'react'
import fetch from 'isomorphic-unfetch'
import mem from 'mem'
import pkg from '../package.json'

const { GITHUB_TOKEN } = process.env

const DEFAULT_META = {
  name: pkg.name,
  description: pkg.description,
  url: pkg.homepage,
  image: '/static/img/logo.png',
  logo: '/static/img/banner.png'
}

const ONE_MIN_MS = 60 * 1000

const MEM_OPTS = {
  maxAge: ONE_MIN_MS * 5
}

const memoize = fn => mem(fn, MEM_OPTS)

export const getMeta = memoize(async ({ owner, repo }) => {
  if (repo.includes('@')) [repo] = repo.split('@')

  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`
    }
  })

  const meta = await res.json()
  return meta
})

export const getReadme = memoize(async ({ owner, repo }) => {
  let ref = 'master'
  if (repo.includes('@')) [repo, ref] = repo.split('@')

  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/readme?ref=${ref}`,
    {
      headers: {
        Accept: 'application/vnd.github.v3.raw',
        Authorization: `token ${GITHUB_TOKEN}`
      }
    }
  )

  const body = await res.text()
  return body
})

export const buildMeta = opts => {
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
      <title children={meta.title || `${meta.name} | ${meta.description}`} />
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
