import s from './decks-page.module.scss'

import { Page } from '../../page/page'
import { Button } from '../../ui/button'
import { TextField } from '../../ui/text-field'
import { Typography } from '../../ui/typography'

export const DecksPage = () => {
  return (
    <Page>
      <div className={s.pageHeader}>
        <Typography as={'h1'} variant={'h1'}>
          Decks List
        </Typography>
        <Button>Add new deck</Button>
      </div>
      <div>
        <TextField placeholder={'Search'} type={'search'} />
        {/* <Tabs></Tabs> */}
      </div>
    </Page>
  )
}
