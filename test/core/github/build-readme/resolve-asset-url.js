import test from 'ava'

import { resolveAssetUrl } from '../../../../core/github/build-readme/util.js'

test('resolve relative into absolute', t => {
  const url = resolveAssetUrl('media/logo.svg', {
    path: 'readme.md',
    owner: 'sindresorhus',
    repo: 'got',
    ref: 'master'
  })

  t.is(url, 'https://raw.githubusercontent.com/sindresorhus/got/master/media/logo.svg')
})

test('resolve relative with dots into absolute', t => {
  const url = resolveAssetUrl('../img/assembly/1.JPG', {
    path: '/doc/en/soldering.md',
    owner: 'hsgw',
    repo: 'plaid',
    ref: 'master'
  })
  t.is(url, 'https://raw.githubusercontent.com/hsgw/plaid/master/doc/img/assembly/1.JPG')
})
