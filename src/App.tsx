import { PersonalInformation } from '@/components/profile'

export function App() {
  return (
    <PersonalInformation
      avatar={'https://picsum.photos/200'}
      email={'your_email@domain.com'}
      name={'John Doe'}
    />
  )

  /*return <Router />*/
}
