import test from 'ava'

import createFetchReadme from 'core/fetch-readme'
import { fetchReadme as fetchReadmeGitHub } from 'core/github'

const fetchReadme = createFetchReadme({ fetchReadme: fetchReadmeGitHub })

test('resolve first valid path', async t => {
  const { response, path } = await fetchReadme({
    owner: 'Kikobeats',
    repo: 'voll',
    ref: 'master',
    paths: ['readme.md', 'README.md']
  })

  t.is(response.url, 'https://api.github.com/repos/Kikobeats/voll/contents/README.md?ref=master')
  t.is(response.status, 200)
  t.is(path, 'README.md')
})

test('it not valid, return null', async t => {
  const { response, path } = await fetchReadme({
    owner: 'Kikobeats',
    repo: 'voll',
    ref: 'master',
    paths: ['readme.md', 'Readme.md']
  })

  t.is(response, undefined)
  t.is(path, undefined)
})
