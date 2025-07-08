import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyles from './context/GlobalStyles'
import AuthContextProvider from './context/authen/authContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AuthContextProvider>
        <GlobalStyles>
          <App />
        </GlobalStyles>
      </AuthContextProvider>
    </Router>
  </StrictMode>,
)
