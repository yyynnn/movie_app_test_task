import '@fontsource/plus-jakarta-sans/index.css'
import '@fontsource/plus-jakarta-sans/latin.css'
import './features/themingAndStyling/index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { setConfiguration } from 'react-grid-system'
import toast, { Toaster } from 'react-hot-toast'
import { BrowserRouter, createBrowserRouter, Outlet, Route, Router, RouterProvider, Routes } from 'react-router-dom'

import { BREAKPOINTS } from './consts/common'
import { ROUTES } from './consts/routes'
import { AllCorrectiveActionsPage } from './features/allCorrectiveActions/AllCorrectiveActionsPage'
import { AllTicketsPage } from './features/allTickets/AllTicketsPage'
import { AuthProvider, RequireAuth } from './features/auth/AuthProvider'
import { NotFound } from './features/errors/NotFound'
import { UnderConstruction } from './features/errors/UnderConstruction'
import { ExampleFeaturePage } from './features/exampleFeature/ExampleFeaturePage'
import { HomePage } from './features/home/HomePage'
import { GlobalLayout } from './features/layouts/GlobalLayout'
import { ForgotPasswordPage } from './features/login/ForgotPasswordPage'
import { LoginPage } from './features/login/LoginPage'
import BrandingProvider from './features/themingAndStyling/BrandingProvider'
import { TicketConstructor } from './features/ticketConstructor/TicketConstructor'
import { TicketSuccess } from './features/ticketConstructor/TicketSuccess'

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
    element: <AllTicketsPage />,
    path: ROUTES.ALL_TICKETS,
    privatePage: true,
    featureActive: true
  },
  {
    element: <AllCorrectiveActionsPage />,
    path: ROUTES.ALL_CORRECTIVE_ACTIONS,
    privatePage: true,
    featureActive: true
  },
  {
    element: <TicketConstructor heading="Accident" hasShortDescription={false} />,
    path: ROUTES.HEALTH.ACCIDENT.CREATE,
    privatePage: true,
    featureActive: false
  },
  {
    element: <TicketConstructor heading="Nearmiss (Occupational health and safety)" hasShortDescription={false} />,
    path: ROUTES.HEALTH.NEAR_MISS.CREATE,
    privatePage: true,
    featureActive: true
  },
  {
    element: <TicketConstructor heading="Posible accident" hasShortDescription={false} />,
    path: ROUTES.HEALTH.POSIBLE_ACCIDENT.CREATE,
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
    element: <TicketSuccess />,
    path: ROUTES.TICKET_SUCCESS,
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

export const App = () => {
  return (
    <BrandingProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Routes>
              <Route element={<GlobalLayout />}>
                {routes.map((route) => {
                  const comp = !route.featureActive ? <UnderConstruction /> : route.privatePage ? <RequireAuth>{route.element}</RequireAuth> : route.element
                  return <Route key={route.path} path={route.path} element={comp} />
                })}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
            <Toaster
              position="bottom-left"
              reverseOrder={false}
              gutter={8}
              containerClassName=""
              containerStyle={{}}
              toastOptions={{
                // Define default options
                className: '',
                duration: 5000,
                style: {
                  background: '#1a1e34',
                  color: '#fff'
                }
              }}
            />
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </BrandingProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)
