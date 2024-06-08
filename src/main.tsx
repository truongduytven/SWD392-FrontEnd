import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { SearchProvider } from './contexts/SearchContext.tsx'
import { InvoiceProvider } from './contexts/InvoiceContext.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <SearchProvider>
          <InvoiceProvider>
            <Toaster richColors position='top-right' />
            <App />
          </InvoiceProvider>
        </SearchProvider>
      </QueryClientProvider>
    </React.StrictMode>
  </BrowserRouter>
)
