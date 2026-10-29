import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Home from './pages/Home'

const isRegisterPage = window.location.pathname.replace(/\/+$/, '') === '/cadastro'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isRegisterPage ? <Register /> : <Login />}
    {/* <Home /> */}
  </StrictMode>,
)
