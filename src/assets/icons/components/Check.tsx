import type { SVGProps } from "react";
import { Ref, forwardRef, memo } from "react";
const SvgCheck = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" ref={ref} {...props}><rect width={22} height={22} x={1} y={1} fill="#fff" stroke="currentcolor" strokeWidth={2} rx={4} ry={4} /><path stroke="currentcolor" strokeWidth={2} d="m6 12 4 4 8-8" /></svg>;
const ForwardRef = forwardRef(SvgCheck);
const Memo = memo(ForwardRef);
export default Memo;