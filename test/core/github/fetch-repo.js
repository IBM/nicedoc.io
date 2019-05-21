'use strict'
const test = require('ava')
const { setupTests } = require('ava-nock')
const { fetchRepo } = require('../../../core/github')

setupTests()

test('infer master branch by default', async t => {
  const { source } = await fetchRepo({ owner: 'CKGrafico', repo: 'Frontend-Boilerplates' })
  t.is(source.ref, 'vue')
})

test('resolve first valid path', async t => {
  const { source } = await fetchRepo({ owner: 'CKGrafico', repo: 'Frontend-Boilerplates' })
  t.is(source.path, 'README.md')
})

test('support @ notation', async t => {
  t.is((await fetchRepo({ owner: 'kikobeats', repo: 'voll@master' })).source.ref, 'master')

  t.is((await fetchRepo({ owner: 'kikobeats', repo: 'voll@next' })).source.ref, 'next')
})

test('detect from github blob url', async t => {
  const query = await fetchRepo({
    owner: 'glorious-codes',
    repo: 'glorious-pitsby',
    path: 'blob/master/docs/documentation.md'
  })

  t.is(query.source.ref, 'master')
  t.deepEqual(query.source.paths, ['/docs/documentation.md'])
})
