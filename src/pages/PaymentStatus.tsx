import { useAuth } from '@/auth/AuthProvider'
import Loading from '@/components/global/molecules/Loading'
import busAPI from '@/lib/busAPI'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}
function PaymentStatus() {
  const query = useQuery()
  const navigate = useNavigate()
  const { token } = useAuth()
  useEffect(() => {
    const handleResponse = async () => {
      const responseCode = query.get('vnp_ResponseCode')
      const bookingId = query.get('vnp_TxnRef')
      const putData = {
        bookingId: bookingId,
        vnPayResponseCode: responseCode
      }
      if (responseCode === '00') {
        try {
          await busAPI.put('/booking-management/managed-bookings', putData)
          navigate('/payment-success')
        } catch (error) {
          console.error('Error calling the success API:', error)
        }
      } else if (responseCode === '01') {
        // Redirect to success-fail page
        navigate('/payment-fail')
      }
    }

    handleResponse()
  }, [query, navigate, token])
  return (
    <div className='w-full h-full'>
      <Loading />
    </div>
  )
}

export default PaymentStatus
