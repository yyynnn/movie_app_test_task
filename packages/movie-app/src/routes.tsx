import { ROUTES } from './consts/routes'
import { HomePage } from './features/home/HomePage'
import { MemoCallBacksPage } from './features/lessons/1. memoAndCallbacks/MemoCallBacksPage'

export const routes = [
  {
    element: <div />,
    path: ROUTES.UNDER_CONSTRUCTION,
    privatePage: false,
    featureActive: false
  },
  {
    element: <MemoCallBacksPage />,
    path: '/memo',
    privatePage: false,
    featureActive: true
  },
  {
    element: <HomePage />,
    path: ROUTES.HOME,
    privatePage: false,
    featureActive: true
  },
  {
    element: <HomePage />,
    path: ROUTES.ROOT,
    privatePage: false,
    featureActive: true
  }
]
