import { Route, Routes } from 'react-router-dom'
import RootLayout from './components/global/templates/RootLayout'
import HomePage from './pages/Home/HomePage'
import SignInSignUp from './components/global/templates/SignIn_SignUp'
import Loading from './components/global/molecules/Loading'

function App() {
  return <Routes>
      <Route element={<RootLayout/>}>
        <Route path='/' element={<HomePage />} />
        <Route path='/Loading' element={<Loading />} />
      </Route>
      <Route path='/login' element={<SignInSignUp/>} />
      <Route path='/register' element={<SignInSignUp/>} />
  </Routes>
}

export default App
