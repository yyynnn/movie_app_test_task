import '@fontsource/plus-jakarta-sans/index.css'
import '@fontsource/plus-jakarta-sans/latin.css'
import './features/theming/index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { setConfiguration } from 'react-grid-system'
import { BrowserRouter, createBrowserRouter, Outlet, Route, Router, RouterProvider, Routes } from 'react-router-dom'

import { BREAKPOINTS } from './consts/common'
import { ROUTES } from './consts/routes'
import { AuthProvider, RequireAuth } from './features/auth/AuthProvider'
import { NotFound } from './features/errors/NotFound'
import { UnderConstruction } from './features/errors/UnderConstruction'
import { HomePage } from './features/home/HomePage'
import { GlobalLayout } from './features/layouts/GlobalLayout'
import { ForgotPasswordPage } from './features/login/ForgotPasswordPage'
import { LoginPage } from './features/login/LoginPage'
import BrandingProvider from './features/theming/BrandingProvider'
import { AccidentHealth } from './features/tickets/health/AccidentHealth'
import { Nearmiss } from './features/tickets/health/Nearmiss'
import { PossibleAccident } from './features/tickets/health/PossibleAccident'

setConfiguration({ gutterWidth: 20, breakpoints: BREAKPOINTS, containerWidths: [540, 740, 1100, 1280, 1540, 1810] })

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000
    }
  }
})

const routes = [
  {
    element: <LoginPage />,
    path: ROUTES.LOGIN,
    private: false
  },
  {
    element: <ForgotPasswordPage />,
    path: ROUTES.FORGOT_PASSWORD,
    private: false
  },
  {
    element: <AccidentHealth />,
    path: ROUTES.HEALTH.ACCIDENT.CREATE,
    private: true,
    notReady: true
  },
  {
    element: <Nearmiss />,
    path: ROUTES.HEALTH.NEAR_MISS.CREATE,
    private: true
  },
  {
    element: <PossibleAccident />,
    path: ROUTES.HEALTH.POSIBLE_ACCIDENT.CREATE,
    private: true,
    notReady: true
  },
  {
    element: <HomePage />,
    path: ROUTES.HOME,
    private: true
  },
  {
    element: <HomePage />,
    path: ROUTES.ROOT,
    private: true
  }
]

export const App = () => {
  return (
    <BrandingProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Routes>
              <Route element={<GlobalLayout />}>
                {routes.map((route) => {
                  const comp = route.notReady ? <UnderConstruction /> : route.private ? <RequireAuth>{route.element}</RequireAuth> : route.element
                  return <Route key={route.path} path={route.path} element={comp} />
                })}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </BrandingProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)
