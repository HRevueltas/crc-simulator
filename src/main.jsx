import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Simulador } from './SImulador'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Simulador />     
  </StrictMode>,
)
