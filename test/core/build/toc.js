import test from 'ava'

import toTOC from 'core/build/toc'

test('should generate a table of content based on the content headings', async t => {
  const toc = await toTOC.process(`
# Package Name
## Installation
npm install lowlight
## API
### processor.use(stringify[, options])
### stringify.Compiler
## License
Mit`)

  t.snapshot(String(toc))
})

test('should use existing table of content if it is already present on the content', async t => {
  const toc = await toTOC.process(`
# Package Name
## Installation
npm install lowlight
## Table of Contents
* [API definition](#api)
* [License](#license)
## API
### processor.use(stringify[, options])
### stringify.Compiler
## License
Mit`)

  t.snapshot(String(toc))
})
