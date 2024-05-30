import type { SVGProps } from 'react'
import { Ref, forwardRef, memo } from 'react'
const SvgMoreVerticalOutline = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={24}
    ref={ref}
    width={24}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <circle cx={12} cy={12} r={8.5} stroke={'#000'} />
    <g clipPath={'url(#more-vertical-outline_svg__a)'} fill={'#000'}>
      <path
        d={
          'M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2M12 9.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2M12 16.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2'
        }
      />
    </g>
    <defs>
      <clipPath id={'more-vertical-outline_svg__a'}>
        <path d={'M6 6h12v12H6z'} fill={'currentcolor'} />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgMoreVerticalOutline)
const Memo = memo(ForwardRef)

export default Memo
