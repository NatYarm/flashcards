import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

<<<<<<< HEAD
import { RecoveryPasswordPage } from './features/auth/recovery-password/ui/RecoveryPasswordPage'
import { SignInPage } from './features/auth/sign-in/ui/SignInPage'
import { SignUpPage } from './features/auth/sign-up/ui/SignUpPage'
import { Deck } from './features/decks/ui/deck/Deck'
import { DecksListPage } from './features/decks/ui/decks-list/DecksListPage'
import { Layout } from './features/layout/Layout'
=======
import { DecksListPage } from './features/decks/ui/decksList/DecksListPage'

import { RecoveryPasswordPage } from './features/auth/recoverPassword/RecoverPasswordPage'
import { SignUpPage } from './features/auth/signUp/SignUpPage'
import { Layout } from './features/layout/Layout'
import { Deck } from './features/decks/ui/deck/Deck'

import { LearnCardsPage } from './features/cards/LearnCardsPage'
import { SignInPage } from './features/auth/signIn/SignInPage'
>>>>>>> 7fd046f0892a52b696eecbaaef6abb1a1e08acc5

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
        path: '/decks/:id',
      },
      {
        element: <LearnCardsPage />,
        path: '/decks/:id/learn',
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
