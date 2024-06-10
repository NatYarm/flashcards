import { BrowserRouter, Link } from 'react-router-dom'

import { LoginForm } from '@/components/auth/login-form'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import { LogOut, MoreVerticalOutline, PersonOutline } from './assets/icons/components'
import { Header } from './components/layout/header/header'
import { Layout } from './components/layout/layout'
import { DecksPage } from './components/pages/decks-page/decks-page'
import { DropdownMenu, DropdownSeparator } from './components/ui/dropdown'
import { DropdownMenuItem } from './components/ui/dropdown/dropdownMenuItem'
import { Tabs } from './components/ui/tabs'

export function App() {
  return (
    <Layout>
      <DecksPage />
    </Layout>
  )
}
