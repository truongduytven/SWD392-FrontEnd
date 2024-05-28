import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { SearchProvider } from './contexts/SearchContext.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <React.StrictMode>
      <SearchProvider>
        <Toaster richColors />
        <App />
      </SearchProvider>
    </React.StrictMode>
  </BrowserRouter>
)
