import '@fontsource/plus-jakarta-sans/index.css'
import '@fontsource/plus-jakarta-sans/latin.css'
import './features/theming/index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { setConfiguration } from 'react-grid-system'
import { BrowserRouter, createBrowserRouter, Outlet, Route, Router, RouterProvider, Routes } from 'react-router-dom'

import { BREAKPOINTS } from './consts/common'
import { ROUTES } from './consts/routes'
import { AuthProvider, RequireAuth } from './features/auth/AuthProvider'
import { NotFound } from './features/errors/NotFound'
import { HomePage } from './features/home/HomePage'
import { GlobalLayout } from './features/layouts/GlobalLayout'
import { ForgotPasswordPage } from './features/login/ForgotPasswordPage'
import { LoginPage } from './features/login/LoginPage'
import BrandingProvider from './features/theming/BrandingProvider'

setConfiguration({ gutterWidth: 20, breakpoints: BREAKPOINTS, containerWidths: [540, 740, 1100, 1280, 1540, 1810] })

export const App = () => {
  return (
    <BrandingProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<GlobalLayout />}>
              <Route
                index
                path={ROUTES.ROOT}
                element={
                  <RequireAuth>
                    <HomePage />
                  </RequireAuth>
                }
              />
              <Route path={ROUTES.LOGIN} element={<LoginPage />} />
              <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />

              <Route
                path={ROUTES.HOME}
                element={
                  <RequireAuth>
                    <HomePage />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </BrandingProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)
