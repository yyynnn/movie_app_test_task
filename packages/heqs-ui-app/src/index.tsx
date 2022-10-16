import React from 'react'
import ReactDOM from 'react-dom/client'
import './features/theming/index.css'
import '@fontsource/plus-jakarta-sans'

export const App = () => {
  return <div>app</div>
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)
