import BeatLoader from 'react-spinners/BeatLoader'
<<<<<<< HEAD
export const Loader = () => {
  return <BeatLoader color={'#8c61ff'} />
=======
import { Page } from '../page'

export const Loader = () => {
  return (
    <Page mt={'100px'} style={{ textAlign: 'center' }}>
      <BeatLoader color="#8c61ff" />
    </Page>
  )
>>>>>>> 7fd046f0892a52b696eecbaaef6abb1a1e08acc5
}
