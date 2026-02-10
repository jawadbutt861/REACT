import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './design-system/styles/base.css'
import './index.css'
import App from './App.jsx'
import { store } from './config/redux/store/store.js'
import { Provider } from 'react-redux'
import { ThemeProvider } from './design-system/index.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
