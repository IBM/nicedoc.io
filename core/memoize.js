import mem from 'mem'

const ONE_MIN_MS = 60 * 1000

const MEM_OPTS = {
  maxAge: ONE_MIN_MS * 5
}

const { NODE_ENV = 'development' } = process.env || {}

export default fn => (NODE_ENV === 'development' ? fn : mem(fn, MEM_OPTS))
