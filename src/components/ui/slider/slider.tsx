import { ComponentPropsWithoutRef, ElementRef, forwardRef, useEffect } from 'react'

import * as SliderPrimitive from '@radix-ui/react-slider'
import { clsx } from 'clsx'

import s from './slider.module.scss'

import { Label } from '../label/label'

type SliderProps = {
  value?: null | number[]
  label?: string
} & ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
const Slider = 

(({className, label, max, onValueChange, value, ...props }: SliderProps) => {

  return (
    <div>
      {label && <Label>{label}</Label>}
      <div className={s.container}>
        <span className={s.valueDisplay}>{value?.[0]}</span>
        <SliderPrimitive.Root
          className={clsx(s.root, className)}
          max={max}
          value={value}
          onValueChange={onValueChange}
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
})



export { Slider }
