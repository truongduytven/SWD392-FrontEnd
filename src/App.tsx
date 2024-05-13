import { Route, Routes} from 'react-router-dom'
import SignInSignUp from './components/global/templates/SignIn_SignUp' 
function App() {
  return <>
  <Routes>
    <Route path='/login' element={<SignInSignUp/>}></Route>
    <Route path='/register' element={<SignInSignUp/>}></Route>
  </Routes>
    
  </>
}

export default App
