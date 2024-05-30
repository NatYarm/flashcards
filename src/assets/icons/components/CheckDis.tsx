import type { SVGProps } from 'react'
import { Ref, forwardRef, memo } from 'react'
const SvgCheckDis = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={24}
    ref={ref}
    width={24}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <path d={'M4 6h16v12H4z'} fill={'#DCDAE0'} />
    <path
      d={
        'M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-9 14-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8z'
      }
      fill={'gray'}
    />
  </svg>
)
const ForwardRef = forwardRef(SvgCheckDis)
const Memo = memo(ForwardRef)

export default Memo
