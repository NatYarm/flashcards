import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { RecoveryPasswordPage } from './features/auth/recoverPassword/RecoverPasswordPage'
import { SignInPage } from './features/auth/signIn/SignInPage'
import { SignUpPage } from './features/auth/signUp/SignUpPage'
import { LearnCardsPage } from './features/cards/LearnCardsPage'
import { Deck } from './features/decks/ui/deck/Deck'
import { DecksListPage } from './features/decks/ui/decksList/DecksListPage'
import { Layout } from './features/layout/Layout'

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
