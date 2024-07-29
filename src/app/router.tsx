import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { path } from '@/common/enums'
import { useGetMeQuery } from '@/features/auth/api/authApi'
import { PageNewPassword } from '@/features/auth/newPassword/PageNewPassword'
import { ProfilePage } from '@/features/auth/profile/ProfilePage'
import { RecoveryPasswordPage } from '@/features/auth/recoverPassword'
import { SignInPage } from '@/features/auth/signIn/SignInPage'
import { SignUpPage } from '@/features/auth/signUp/SignUpPage'
import { LearnCardsPage } from '@/features/cards/LearnCardsPage'
import { Deck } from '@/features/decks/ui/deck/Deck'
import { DecksListPage } from '@/features/decks/ui/decksList/DecksListPage'
import { Error } from '@/features/error/Error'
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
        element: <PageNewPassword />,
        path: path.newPassword,
      },
    ],
    element: <Outlet />,
  },
]

const privateRoutes: RouteObject[] = [
  {
    children: [
      {
        element: <Navigate to={path.decks} />,
        path: path.base,
      },
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
    ],
    element: <Outlet />,
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
      {
        element: <Error />,
        path: path.error,
      },
    ],
    element: <Layout />,
    path: path.base,
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}
