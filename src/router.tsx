import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { DecksListPage } from './features/decks/ui/decksList/DecksListPage'
import {path} from '@/common/enams'
import { RecoveryPasswordPage } from './features/auth/recoverPassword/RecoverPasswordPage'
import { SignUpPage } from './features/auth/signUp/SignUpPage'
import { Layout } from './features/layout/Layout'
import { Deck } from './features/decks/ui/deck/Deck'

import { LearnCardsPage } from './features/cards/LearnCardsPage'
import { SignInPage } from './features/auth/signIn/SignInPage'

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
      {
			element: <Deck />,
			path: `${path.decks}/:id`,
		 },
		 {
			element: <LearnCardsPage />,
			path: `${path.decks}/:id/learn`,
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
]

/* const PrivateRoutes = () => {
	const { isSuccess } = useGetMeQuery()
 
	return isSuccess ? <Outlet /> : <Navigate to={path.signIn} />
 } */

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
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to={path.signIn} />
}
