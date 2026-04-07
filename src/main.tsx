import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/variables.css'
import './styles/base.css'
import './styles/navbar.css'
import './styles/hero.css'
import './styles/sections.css'
import './styles/modals.css'
import './styles/responsive.css'
import './styles/pages.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
