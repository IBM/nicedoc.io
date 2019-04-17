'use strict'

const test = require('ava')

const { normalizeParams } = require('../../../core/github')

test('infer master branch by default', t => {
  t.is(normalizeParams({ owner: 'kikobeats', repo: 'voll' }).ref, 'master')
  t.is(normalizeParams({ owner: 'kikobeats', repo: 'voll@master' }).ref, 'master')
})

test('detect brach after @', t => {
  t.is(normalizeParams({ owner: 'kikobeats', repo: 'voll@next' }).ref, 'next')
  t.is(normalizeParams({ owner: 'kikobeats', repo: 'voll@next' }).ref, 'next')
})

test('detect from github blob url', t => {
  const query = normalizeParams({
    owner: 'glorious-codes',
    repo: 'glorious-pitsby',
    path: 'blob/master/docs/documentation.md'
  })

  t.is(query.ref, 'master')
  t.deepEqual(query.paths, ['/docs/documentation.md'])
})
