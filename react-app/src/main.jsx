import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
// Bundled locally (not a CDN link) so icons never disappear because of a
// blocked/slow network — the original static site relied on a CDN link for
// this, which is why icons could silently vanish on some networks.
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
