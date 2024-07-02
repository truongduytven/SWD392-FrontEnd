import ReactDOM from 'react-dom/client'
import App from '@/App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { SearchProvider } from '@/contexts/SearchContext.tsx'
import { InvoiceProvider } from '@/contexts/InvoiceContext.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@/auth/AuthProvider.tsx'
import ErrorBoundary from './ErrorBoundary'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SearchProvider>
          <InvoiceProvider>
            <Toaster richColors position='top-right' duration={1000} />
            <ErrorBoundary>
              
            <App />
            </ErrorBoundary>
          </InvoiceProvider>
        </SearchProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
)
