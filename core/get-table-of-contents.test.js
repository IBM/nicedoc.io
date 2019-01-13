import { getTableOfContents } from "./get-table-of-contents";

describe("get-table-of-contents", () => {
  it("should generate a table of content based on the content headings", async () => {
    const md = `
# Package Name    
## Installation
npm install lowlight

## API
### processor.use(stringify[, options])
### stringify.Compiler

## License
Mit
    `;
    const { contents } = await getTableOfContents(md);
    expect(contents).toMatchInlineSnapshot(`
"-   [Package Name](#package-name)
    -   [Installation](#installation)
    -   [API](#api)
        -   [processor.use(stringify, options)](#processorusestringify-options)
        -   [stringify.Compiler](#stringifycompiler)
    -   [License](#license)
"
`);
  });

  it("should use existing table of content if it is already present on the content", async () => {
    const md = `
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
Mit
    `;
    const { contents } = await getTableOfContents(md);
    expect(contents).toMatchInlineSnapshot(`
"-   [API definition](#api)
-   [License](#license)
"
`);
  });
});
