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

test('resolve absolute github urls', t => {
  const url = resolveAssetUrl(
    'https://github.com/omkbd/picture/blob/master/ergodash-rev1.2-PCB.png',
    {
      path: '/Doc/build-en.md',
      owner: 'omkbd',
      repo: 'ErgoDash',
      ref: 'master'
    }
  )
  t.is(url, 'https://raw.githubusercontent.com/omkbd/picture/master/ergodash-rev1.2-PCB.png')
})

test("don't resolve external urls", t => {
  const url = resolveAssetUrl('https://i.imgur.com/NVRZLHv.png', {
    path: '/README.md',
    owner: 'GoogleChromeLabs',
    repo: 'quicklink',
    ref: '1.0.0'
  })
  t.is(url, 'https://i.imgur.com/NVRZLHv.png')
})
