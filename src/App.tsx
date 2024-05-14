import { Route, Routes } from 'react-router-dom'
import RootLayout from './components/global/templates/RootLayout'
import HomePage from './pages/Home/HomePage'
import SignInSignUp from './components/global/templates/SignIn_SignUp'

function App() {
  return <Routes>
      <Route element={<RootLayout/>}>
        <Route path='/' element={<HomePage />} />
      </Route>
      <Route path='/login' element={<SignInSignUp/>} />
      <Route path='/register' element={<SignInSignUp/>} />
  </Routes>
}

export default App
