import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { path } from '@/common/enams'
import { useGetMeQuery } from '@/features/auth/api/authApi'

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
        path: path.signIn,
      },
      {
        element: <SignUpPage />,
        path: path.signUp,
      },
      {
        element: <RecoveryPasswordPage />,
        path: path.recoveryPassword,
      },
    ],
    element: <Outlet />,
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <DecksListPage />,
    path: path.base,
  },
  {
    element: <Deck />,
    path: `${path.decks}/:id`,
  },
  {
    element: <LearnCardsPage />,
    path: `${path.decks}/:id/learn`,
  },
]

const PrivateRoutes = () => {
  const { isSuccess } = useGetMeQuery()

  return isSuccess ? <Outlet /> : <Navigate to={path.signIn} />
}

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
