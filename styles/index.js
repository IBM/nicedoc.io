import { css } from 'styled-components'

const sizes = {
  large: props => `
  @media screen and (min-width: 64em)  {
    ${css(...props)}
  }`,
  medium: props => `
  @media screen and (min-width: 48em) and (max-width: 64em) {
    ${css(...props)}
  }
  `,
  notSmall: props => `
  @media screen and (min-width: 48em) {
    ${css(...props)}
  }`
}

export const media = Object.keys(sizes).reduce(
  (acc, size) => ({
    ...acc,
    [size]: (...args) => sizes[size](args)
  }),
  {}
)

export const constants = {
  layout: 650
}
