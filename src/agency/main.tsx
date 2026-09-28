import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AgencyApp from './AgencyApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AgencyApp />
  </StrictMode>,
)
