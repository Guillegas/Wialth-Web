import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App        from './App.jsx'
import Privacidad from './pages/Privacidad.jsx'
import AvisoLegal from './pages/AvisoLegal.jsx'
import Cookies    from './pages/Cookies.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/"            element={<App />} />
        <Route path="/privacidad"  element={<Privacidad />} />
        <Route path="/aviso-legal" element={<AvisoLegal />} />
        <Route path="/cookies"     element={<Cookies />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
