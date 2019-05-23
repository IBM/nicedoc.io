const ASIDE = [0, 300, 300]

export const layout = [1200, 1200, 1200]

export const navbar = [65, 65, 65]

export const aside = ASIDE.map((aside, index) => aside - navbar[index])

export const breakpoints = ['40em', '52em', '64em']

export const fontSizes = [12, 14, 16, 20, 24, 32, 48, 64]

export const space = [0, 4, 8, 16, 32, 64, 128, 256]

export const fonts = {
  sans: 'system-ui, sans-serif',
  mono: 'Menlo, monospace'
}
export const shadows = {
  small: '0 0 4px rgba(0, 0, 0, .125)',
  large: '0 0 24px rgba(0, 0, 0, .125)'
}

export const colors = {
  black: '#000',
  white: '#fff'
}

export const speed = {
  quickly: 100,
  normal: 300,
  slowly: 450
}

export const transition = {
  short: `${speed.quickly}ms cubic-bezier(.25,.8,.25,1)`,
  medium: `${speed.normal}ms cubic-bezier(.25,.8,.25,1)`,
  long: `${speed.slowly} cubic-bezier(.4, 0, .2, 1)`
}

export default {
  breakpoints,
  colors,
  fonts,
  fontSizes,
  navbar,
  shadows,
  space,
  speed,
  transition
}
