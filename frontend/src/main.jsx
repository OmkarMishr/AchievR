import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './components/login/login.jsx'
import signup from './components/signup/signup.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login />
    <SignUp />
  </StrictMode>,
)
