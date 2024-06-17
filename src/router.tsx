import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

<<<<<<< HEAD
import { MyDeck } from '@/components/decks/my-deck'
import { RecoveryPasswordPage } from '@/pages/recovery-password-page/recovery-password-page'
import { SignUpPage } from '@/pages/sign-up-page/sign-up-page'

import { Layout } from './components/layout/layout'
import { DecksPage } from './pages/decks-page/decks-page'
import { SignInPage } from './pages/sign-in-page/sign-in-page'
=======
import { DecksListPage } from './features/decks/ui/decks-list/DecksListPage'

import { RecoveryPasswordPage } from './features/auth/recovery-password/ui/RecoveryPasswordPage'
import { SignUpPage } from './features/auth/sign-up/ui/SignUpPage'
import { Layout } from './features/layout/Layout'
import { Deck } from './features/decks/ui/deck/Deck'
import { SignInPage } from './features/auth/sign-in/ui/SignInPage'
>>>>>>> cf651addbcebbe2c1c79869b5831b0fccc8ba67d

const publicRoutes: RouteObject[] = [
  {
    children: [
      {
        element: <SignInPage />,
        path: '/sign-in',
      },
      {
        element: <SignUpPage />,
        path: '/sign-up',
      },
      {
        element: <RecoveryPasswordPage />,
        path: '/recovery-password',
      },
      {
        element: <Deck />,
        path: '/my-deck',
      },
    ],
    element: <Outlet />,
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <DecksListPage />,
    path: '/',
  },
]

const router = createBrowserRouter([
  {
    children: [
      {
        children: privateRoutes,
        element: <PrivateRoutes />,
      },
      ...publicRoutes,
    ],
    element: <Layout />,
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  //const { isAuthenticated } = useAuthContext()
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to={'/sign-in'} />
}
