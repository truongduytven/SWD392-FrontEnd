import Loading from '@/components/global/molecules/Loading'
import OtpForm from '@/components/global/organisms/OtpForm'
// import RatingForm from '@/components/global/organisms/RatingForm'
import RootLayout from '@/components/global/templates/RootLayout'
import SignInSignUp from '@/components/global/templates/SignIn_SignUp'
import HomePage from '@/pages/HomePage'
import InfoPayment from '@/pages/InfoPayment'
import MyTicketPage from '@/pages/MyTicketPage'
import NotFoundPage from '@/pages/NotFoundPage'
import ProfilePage from '@/pages/ProfilePage'
import SearchPage from '@/pages/SearchPage'
import SearchTicket from '@/pages/SearchTicket'
import SelectService from '@/pages/SelectService'
import SelectTicket from '@/pages/SelectTicket'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './auth/ProtectedRoute'
import PaymentStatus from './pages/PaymentStatus'
import PaymentSuccess from './pages/PaymentSuccess'
import PaymentFailure from './pages/PaymentFailure'
import ProtectUserRoute from './auth/ProtectUserRoute'
function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/Loading' element={<Loading />} />
        <Route path='/search' element={<SearchPage />} />
        <Route element={<ProtectUserRoute />}>
          <Route path='/selectTicket' element={<SelectTicket />} />
          <Route path='/selectService' element={<SelectService />} />
          <Route path='/infopayment' element={<InfoPayment />} />
        </Route>
        <Route path='/ticketInfo' element={<SearchTicket />} />
        <Route path='/payment-success/:id' element={<PaymentStatus />} />
        <Route path='/payment-success' element={<PaymentSuccess />} />
        <Route path='/payment-fail' element={<PaymentFailure />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/myticket/:id' element={<MyTicketPage />} />
      </Route>
      <Route
        path='/login'
        element={
          <ProtectedRoute>
            <SignInSignUp />
          </ProtectedRoute>
        }
      />

      <Route
        path='/register'
        element={
          <ProtectedRoute>
            <SignInSignUp />
          </ProtectedRoute>
        }
      />
      <Route
        path='/otp-verified/:email'
        element={
          <ProtectedRoute>
            <OtpForm />
          </ProtectedRoute>
        }
      />

      {/* <Route path='/login' element={<SignInSignUp />} />
      <Route path='/register' element={<SignInSignUp />} />
      <Route path='/otp-verified' element={<OtpForm />} /> */}
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
