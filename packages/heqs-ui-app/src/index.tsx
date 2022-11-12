import '@fontsource/plus-jakarta-sans/index.css'
import '@fontsource/plus-jakarta-sans/latin.css'
import './features/themingAndStyling/index.css'

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'
import { setConfiguration } from 'react-grid-system'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { BREAKPOINTS } from './consts/common'
import { AuthProvider, RequireAuth } from './features/auth/AuthProvider'
import { NotFound } from './features/errors/NotFound'
import { UnderConstruction } from './features/errors/UnderConstruction'
import { GlobalLayout } from './features/layouts/GlobalLayout'
import BrandingProvider from './features/themingAndStyling/BrandingProvider'
import { routes } from './routes'

setConfiguration({ gutterWidth: 20, breakpoints: BREAKPOINTS, containerWidths: [540, 740, 1100, 1280, 1540, 1810] })

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000
    }
  }
})

export const App = () => {
  return (
    <BrandingProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Routes>
                <Route element={<GlobalLayout />}>
                  {routes.map((route) => {
                    const isProd = process.env.NODE_ENV === 'production'
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
            </LocalizationProvider>
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </BrandingProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)
