import { ComponentPropsWithoutRef } from 'react'

import * as SliderPrimitive from '@radix-ui/react-slider'
import { clsx } from 'clsx'

import s from './slider.module.scss'

import { Label } from '../label/Label'

type SliderProps = {
  label?: string
  value?: null | number[]
} & ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
<<<<<<< HEAD:src/components/ui/slider/slider.tsx
const Slider = ({ className, label, max, onValueChange, value, ...props }: SliderProps) => {
=======
export const Slider = ({ className, label, max, onValueChange, value, ...props }: SliderProps) => {
>>>>>>> cf651addbcebbe2c1c79869b5831b0fccc8ba67d:src/common/components/slider/Slider.tsx
  return (
    <div>
      {label && <Label>{label}</Label>}
      <div className={s.container}>
        <span className={s.valueDisplay}>{value?.[0]}</span>
        <SliderPrimitive.Root
          className={clsx(s.root, className)}
          max={max}
          onValueChange={onValueChange}
          value={value}
          {...props}
        >
          <SliderPrimitive.Track className={s.track}>
            <SliderPrimitive.Range className={s.range} />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb className={s.thumb} />
          <SliderPrimitive.Thumb className={s.thumb} />
        </SliderPrimitive.Root>
        <span className={s.valueDisplay}>{value?.[1]}</span>
      </div>
    </div>
  )
}
<<<<<<< HEAD:src/components/ui/slider/slider.tsx

export { Slider }
=======
>>>>>>> cf651addbcebbe2c1c79869b5831b0fccc8ba67d:src/common/components/slider/Slider.tsx
