import { Route, Routes } from 'react-router-dom'
import RootLayout from './components/global/templates/RootLayout'
import HomePage from './pages/HomePage'
import SignInSignUp from './components/global/templates/SignIn_SignUp'
import Loading from './components/global/molecules/Loading'
import SearchPage from './pages/SearchPage'
import SelectTicket from './pages/SelectTicket'
import SearchTicket from './pages/SearchTicket'
import PaymentSuccess from './pages/PaymentSuccess'
import PaymentFailure from './pages/PaymentFailure'
import NotFoundPage from './pages/NotFoundPage'
import OtpForm from './components/global/organisms/OtpForm'
function App() {
  return (
    <Routes>
        <Route element={<RootLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/Loading' element={<Loading />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/selectTicket' element={<SelectTicket />} />
          <Route path='/ticketInfo' element={<SearchTicket />} />
          <Route path='/payment-success' element={<PaymentSuccess />} />
          <Route path='/payment-failure' element={<PaymentFailure />} />

        </Route>
      <Route path='/login' element={<SignInSignUp />} />
      <Route path='/register' element={<SignInSignUp />} />
      <Route path='/otp-verified' element={<OtpForm />} />
      <Route path='*' element={<NotFoundPage />} />
      
    </Routes>
  )
}

export default App
