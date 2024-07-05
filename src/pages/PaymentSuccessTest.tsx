import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import paymentSuccess from '@/assets/paymentSuccess.jpeg';
import { useAuth } from '@/auth/AuthProvider';
import axios from 'axios';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function PaymentSuccess() {
    const query = useQuery();
    const navigate = useNavigate();
    const { token } = useAuth();

    useEffect(() => {
        const handleResponse = async () => {
            const responseCode = query.get('vnp_ResponseCode');
            const bookingId = query.get('vnp_TxnRef');
            const putData = {
                bookingId: bookingId,
                vnPayResponseCode: responseCode,
            }
            if (responseCode === '00') {
                try {
                    const response = await axios.put('https://localhost:7081/booking-management/managed-bookings', putData, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    console.log(response);
                } catch (error) {
                    console.error('Error calling the success API:', error);
                }
            } else if (responseCode === '01') {
                // Redirect to success-fail page
                navigate('/payment-fail');
            }
        };

        handleResponse();
    }, [query, navigate, token]);

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
    );
}

export default PaymentSuccess;
