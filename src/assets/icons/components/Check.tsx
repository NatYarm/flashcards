import type { SVGProps } from 'react'
import { Ref, forwardRef, memo } from 'react'
const SvgCheck = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={'1em'}
    ref={ref}
    viewBox={'0 0 24 24'}
    width={'1em'}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <rect
      fill={'#fff'}
      height={22}
      rx={4}
      ry={4}
      stroke={'currentcolor'}
      strokeWidth={2}
      width={22}
      x={1}
      y={1}
    />
    <path d={'m6 12 4 4 8-8'} stroke={'currentcolor'} strokeWidth={2} />
  </svg>
)
const ForwardRef = forwardRef(SvgCheck)
const Memo = memo(ForwardRef)

export default Memo
