import React from 'react'

import * as RadioGroup from '@radix-ui/react-radio-group'

import s from './radioGroup.module.scss'

type RadioItem = {
  id: string
  value: string
}

type RadioGroupComponentProps = {
  currentValue?: string
  defaultValue?: string
  label?: string
  radioGroupItems: RadioItem[]
  setCurrentValue?: (value: string) => void
  showRadioLables?: boolean
  vertical?: boolean
}

export const RadioGroupComponent: React.FC<RadioGroupComponentProps> = ({
  currentValue,
  defaultValue = 'default',
  label,
  radioGroupItems,
  setCurrentValue,
  showRadioLables = true,
  vertical = false,
}) => {
  return (
    <>
      {label ? (
        <label className={s.Label} htmlFor={'r1'}>
          {label}
        </label>
      ) : null}
      <RadioGroup.Root
        aria-label={'View density'}
        className={s.RadioGroupRoot}
        defaultValue={defaultValue}
        onValueChange={setCurrentValue}
        value={currentValue ? currentValue : undefined}
      >
        <div className={`${s.RadioGroupWrapper} ${vertical ? s.RadioGroupWrapperVertical : ''}`}>
          {radioGroupItems.map(item => {
            return (
              <div className={s.RadioGroupItemWrapper} key={item.id}>
                <RadioGroup.Item className={s.RadioGroupItem} id={item.id} value={item.value}>
                  <RadioGroup.Indicator className={s.RadioGroupIndicator} />
                </RadioGroup.Item>
                {showRadioLables ? item.value : null}
              </div>
            )
          })}
        </div>
      </RadioGroup.Root>
    </>
  )
}
