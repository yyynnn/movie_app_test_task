import { ROUTES } from './consts/routes'
import { ExampleFeaturePage } from './features/exampleFeature/ExampleFeaturePage'
import { HomePage } from './features/home/HomePage'
// import { KpiPage } from './features/kpi/KpiPage'
import { ForgotPasswordPage } from './features/login/ForgotPasswordPage'
import { LoginPage } from './features/login/LoginPage'

export const routes = [
  {
    element: <LoginPage />,
    path: ROUTES.LOGIN,
    privatePage: false,
    featureActive: true
  },

  {
    element: <ForgotPasswordPage />,
    path: ROUTES.FORGOT_PASSWORD,
    privatePage: false,
    featureActive: true
  },
  {
    element: <div />,
    path: ROUTES.UNDER_CONSTRUCTION,
    privatePage: true,
    featureActive: false
  },
  {
    element: <ExampleFeaturePage />,
    path: '/example',
    privatePage: true,
    featureActive: true
  },
  {
    element: <HomePage />,
    path: ROUTES.HOME,
    privatePage: true,
    featureActive: true
  },
  {
    element: <HomePage />,
    path: ROUTES.ROOT,
    privatePage: true,
    featureActive: true
  }
]
