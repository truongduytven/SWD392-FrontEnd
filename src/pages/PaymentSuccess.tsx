import React from 'react'
import { Link } from 'react-router-dom'
import paymentSuccess from '@/assets/paymentSuccess.jpeg'
function PaymentSuccess() {
  return (
    <div className='w-screen flex justify-center items-center mb-8'>
      <div className='flex flex-col items-center'>
        <img src={paymentSuccess} className='w-[450px] h-[450px]' />
        <div className='text-2xl font-medium'>
         Thanh toán thành công
        </div>
        <p className='text-lg mt-4'>
          Cảm ơn vì đã tin tưởng <span className='text-primary font-medium'>The Bus Journey</span>
        </p>

        <Link to='/' className='underline hover:text-primary font-medium text-xl mt-8'>
          Quay lại trang chủ
        </Link>
      </div>
    </div>
  )
}

export default PaymentSuccess