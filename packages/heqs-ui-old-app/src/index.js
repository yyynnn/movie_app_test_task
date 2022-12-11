import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import App from './components/app/App'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
import './css/font/fonts.css'

import { createStore } from './store/store'
import { Provider } from 'react-redux'

const history = createBrowserHistory()
const store = createStore()

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
