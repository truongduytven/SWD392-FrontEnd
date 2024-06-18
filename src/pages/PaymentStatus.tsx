import React from 'react'
import PaymentFailure from './PaymentFailure'
import PaymentSuccess from './PaymentSuccess'
function PaymentStatus() {
  return (
    <div className=''>PaymentStatus
    <PaymentFailure/>
    <PaymentSuccess/>
    </div>
  )
}

export default PaymentStatus