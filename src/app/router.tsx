import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { path } from '@/common/enums'
import { useGetMeQuery } from '@/features/auth/api/authApi'
import { CheckEmail } from '@/features/auth/checkEmail'
import { ProfilePage } from '@/features/auth/profile/ProfilePage'
import { RecoveryPasswordPage } from '@/features/auth/recoverPassword'
import { SignInPage } from '@/features/auth/signIn/SignInPage'
import { SignUpPage } from '@/features/auth/signUp/SignUpPage'
import { LearnCardsPage } from '@/features/cards/LearnCardsPage'
import { Deck } from '@/features/decks/ui/deck/Deck'
import { DecksListPage } from '@/features/decks/ui/decksList/DecksListPage'
import { Layout } from '@/features/layout/Layout'

export const publicRoutes: RouteObject[] = [
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
      {
        element: <CheckEmail />,
        path: path.email,
      },
    ],
    element: <Outlet />,
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <DecksListPage />,
    path: path.decks,
  },
  {
    element: <Deck />,
    path: `${path.decks}/:id`,
  },
  {
    element: <LearnCardsPage />,
    path: `${path.decks}/:id/learn`,
  },
  {
    element: <ProfilePage />,
    path: path.profile,
  },
]

const PrivateRoutes = () => {
  const { isSuccess } = useGetMeQuery()

  return isSuccess ? <Outlet /> : <Navigate to={path.signIn} />
}

export const router = createBrowserRouter([
  {
    children: [
      {
        children: privateRoutes,
        element: <PrivateRoutes />,
      },
      ...publicRoutes,
    ],
    element: <Layout />,
    path: path.base,
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}
