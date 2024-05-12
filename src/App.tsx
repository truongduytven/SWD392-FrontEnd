import { Route, Routes} from 'react-router-dom'
import FormLogin from './components/global/templates/FormLogin'
function App() {
  return <>
  <Routes>
    <Route path='/login' element={<FormLogin/>}></Route>
  </Routes>
    
  </>
}

export default App
