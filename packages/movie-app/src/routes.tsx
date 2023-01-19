import { ROUTES } from './consts/routes'
import { ExampleFeaturePage } from './features/exampleFeatures/ExampleFeaturePage'
import { MemoPage } from './features/exampleFeatures/memo/MemoPage'
import { HomePage } from './features/home/HomePage'

export const routes = [
  {
    element: <div />,
    path: ROUTES.UNDER_CONSTRUCTION,
    privatePage: false,
    featureActive: false
  },
  {
    element: <MemoPage />,
    path: '/memo',
    privatePage: false,
    featureActive: true
  },
  {
    element: <ExampleFeaturePage />,
    path: '/example',
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
