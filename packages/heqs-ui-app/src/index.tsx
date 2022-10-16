import '@fontsource/plus-jakarta-sans'
import './features/theming/index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, createBrowserRouter, Outlet, Route, Router, RouterProvider, Routes } from 'react-router-dom'

import { ROUTES } from './consts/routes'
import { AuthProvider, RequireAuth } from './features/auth/AuthProvider'
import { HomePage } from './features/home/HomePage'
import { GlobalLayout } from './features/layout/GlobalLayout'
import { LoginPage } from './features/login/LoginPage'
import BrandingProvider from './features/theming/BrandingProvider'

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
              <Route
                path={ROUTES.HOME}
                element={
                  <RequireAuth>
                    <HomePage />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<div />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </BrandingProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)
