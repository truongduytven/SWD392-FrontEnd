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
import { GoogleOAuthProvider } from '@react-oauth/google'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId='887412650578-vul7m42hbph5r7ubkqnl5kh335q35ka6.apps.googleusercontent.com'>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <InvoiceProvider>
          <AuthProvider>
            <SearchProvider>
              <Toaster richColors position='top-right' duration={1000} />
              <ErrorBoundary>
                <App />
              </ErrorBoundary>
            </SearchProvider>
          </AuthProvider>
        </InvoiceProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </GoogleOAuthProvider>
)
