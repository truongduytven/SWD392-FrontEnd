import React from 'react'
import { Link } from 'react-router-dom'
import paymentFailure from '@/assets/paymentFailure.jpg'
function PaymentFailure() {
  return (
    <div className='w-screen'>
      <div className='flex flex-col items-center mb-8'>
        <img src={paymentFailure} className='h-[500px]' />
        <div className='text-2xl font-medium'>Thanh toán thất bại</div>

        <Link to='/' className='underline hover:text-primary font-medium text-xl mt-12'>
          Quay lại trang chủ
        </Link>
      </div>
    </div>
  )
}

export default PaymentFailure