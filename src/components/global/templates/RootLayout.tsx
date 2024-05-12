import { Outlet } from 'react-router-dom'
import Header from '@/components/global/organisms/Header'
import Footer from '@/components/global/organisms/Footer'

function RootLayout() {
  return (
    <div className="h-screen">
      <Header />
      <div className="flex min-h-full px-4 pb-12 pt-28">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default RootLayout