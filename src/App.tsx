import { Route, Routes } from 'react-router-dom'
import RootLayout from './components/global/templates/RootLayout'
import HomePage from './pages/Home/HomePage'

function App() {
  return <Routes>
      <Route element={<RootLayout/>}>
        <Route path='/' element={<HomePage />} />
      </Route>
  </Routes>
}

export default App
