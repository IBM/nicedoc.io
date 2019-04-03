import Svg from '../svg'

export default ({ style, ...props }) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    aria-hidden='true'
    width='14'
    height='14'
    viewBox='0 0 24 24'
    fill='none'
    stroke='#c0bfc0'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    style={{ marginLeft: '2px', ...style }}
    className='external-link-icon'
    {...props}
  >
    <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' />
    <polyline points='15 3 21 3 21 9' />
    <line x1='10' y1='14' x2='21' y2='3' />
  </Svg>
)
