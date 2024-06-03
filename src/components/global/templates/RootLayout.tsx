import { Outlet } from 'react-router-dom'
import Header from '@/components/global/organisms/Header'
import Footer from '@/components/global/organisms/Footer'

function RootLayout() {
  return (
    <div className="h-screen relative">
      <Header />
      <div className="flex min-h-[70%] pt-10">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default RootLayout