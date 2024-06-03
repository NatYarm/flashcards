import * as RadioGroup from '@radix-ui/react-radio-group'

import s from './radioGroup.module.scss'

export const RadioGroupDemo = () => (
  <form>
    <RadioGroup.Root
      aria-label={'View density'}
      className={s.RadioGroupRoot}
      defaultValue={'default'}
    >
      <div style={{ alignItems: 'center', display: 'flex' }}>
        <RadioGroup.Item className={s.RadioGroupItem} id={'r1'} value={'default'}>
          <RadioGroup.Indicator className={s.RadioGroupIndicator} />
        </RadioGroup.Item>
        <label className={s.Label} htmlFor={'r1'}>
          RadioGroup
        </label>
      </div>
    </RadioGroup.Root>
  </form>
)
