import BeatLoader from 'react-spinners/BeatLoader'
import { Page } from '../page'

export const Loader = () => {
  return (
    <Page mt={'100px'} style={{ textAlign: 'center' }}>
      <BeatLoader color="#8c61ff" />
    </Page>
  )
}
