import { Link } from 'react-router-dom'
import notFound from '@/assets/undraw_not_found_60pq.svg'

function NotFoundPage() {
  return (
    <div className='flex flex-col items-center justify-center h-screen w-screen bg-gray-100 p-4'>
    <img 
      src={notFound}
      alt='Not Found' 
      className='max-w-xs md:max-w-md lg:max-w-lg object-contain mb-8' 
    />
    <p className='text-lg font-medium md:text-xl lg:text-2xl text-gray-700 mb-4 text-center'>
      Opps, Có vẻ như bạn đã lạc đường!
    </p>
    <Link to='/'>
    <p className='text-primary hover:font-medium hover:text-orange-600 transition-transform transform hover:translate-y-1 text-center'>
          Quay về trang chủ
        </p>
    </Link>
  </div>
       
  )
}

export default NotFoundPage