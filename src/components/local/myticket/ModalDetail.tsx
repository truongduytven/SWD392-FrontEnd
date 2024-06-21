import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { fetchTicketDetail } from '@/apis/ticketDetail';
import Loader from '../TabCardTrip/Loader';
import { formatPrice } from '@/lib/utils';
interface ModalDetailProps {
  ticketDetailID: string; // Define props interface to accept ticketDetailID
}
const data ={
  "bookingID": "7910be2c-e416-4f2b-9ef5-53b46c501acd",
  "customerName": "Nguyen Ngoc Tuan",
  "companyName": "Phuong Trang",
  "startDate": "2024-06-15",
  "startTime": "11:30",
  "endDate": "2024-06-25",
  "endTime": "11:30",
  "startCity": "TP. Hồ Chí Minh",
  "endCity": "Thừa Thiên Huế",
  "seatCode": "A1",
  "ticketPrice": 100000,
  "totalServicePrice": 700000,
  "sumOfPrice": 800000,
  "status": "UNUSED",
  "qrCodeImage": "",
  "qrCode": "44444",
  "serviceDetailList": [
    {
      "serviceName": "Com xeo",
      "quantity": 1,
      "servicePrice": 120000,
      "serviceInStation": "Nhà Xe Hồng Phượng"
    },
    {
      "serviceName": "Trái cây",
      "quantity": 1,
      "servicePrice": 180000,
      "serviceInStation": "Nhà Xe Hồng Phượng"
    },
    {
      "serviceName": "Hamburger",
      "quantity": 1,
      "servicePrice": 130000,
      "serviceInStation": "Nhà Xe Hồng Phượng"
    },
    {
      "serviceName": "Pho",
      "quantity": 3,
      "servicePrice": 90000,
      "serviceInStation": "Trạm Dừng Chân Sáu Nho"
    }
  ]
}
function ModalDetail({ticketDetailID}:ModalDetailProps) {
  // const { data, isLoading, isError } = useQuery(['ticketDetail', ticketDetailID], () => fetchTicketDetail(ticketDetailID));
  const { data, isLoading, isError } = useQuery({
    queryKey: ['ticketDetail', ticketDetailID], // Correctly structured queryKey
    queryFn: () => fetchTicketDetail(ticketDetailID), // Function to fetch ticket detail
  });
  if (isLoading) {
    return <Loader/>;
  }

  if (isError) {
    return <div>Đã xảy ra lỗi trong quá trình tải. Vui lòng thử lại sau</div>;
  }
  console.log("ve cua tui ne", data)
  return (
    <div className='ribbondetail my-4 p-6 shadow-md rounded-md ring-1 ring-black ring-opacity-5 w-[350px]'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-lg font-bold text-primary'>{data?.companyName}</h1>
        {/* <div className='text-lg font-bold'>{data?.qrCode}</div> */}
      </div>
      <div className='flex flex-col space-y-2'>
        <div className='flex items-center justify-between'>
          <div className='text-xs text-gray-500'>Khách hàng:</div>
          <div className='text-sm font-semibold'>{data?.customerName}</div>
        </div>
        <div className='flex items-center justify-between'>
          <div className='text-xs text-gray-500'>Ngày:</div>
          <div className='text-sm font-semibold'>{data?.startDate}</div>
        </div>
        <div className='flex items-center justify-between'>
          <div className='text-xs text-gray-500'>Thời gian:</div>
          <div className='text-sm font-semibold'>{data?.startTime} - {data?.endTime}</div>
        </div>
        <div className='flex items-center justify-between'>
          <div className='text-xs text-gray-500'>Từ:</div>
          <div className='text-sm font-semibold'>{data?.startCity}</div>
        </div>
        <div className='flex items-center justify-between'>
          <div className='text-xs text-gray-500'>Đến:</div>
          <div className='text-sm font-semibold'>{data?.endCity}</div>
        </div>
        <div className='flex items-center justify-between'>
          <div className='text-xs text-gray-500'>Ghế:</div>
          <div className='text-sm font-semibold'>{data?.seatCode}</div>
        </div>
        <div className='flex items-center justify-between'>
          <div className='text-xs text-gray-500'>Giá:</div>
          <div className='text-sm font-semibold'>{formatPrice(data?.ticketPrice ??0)}</div>
        </div>
        <div className='flex items-center justify-between'>
          <div className='text-xs text-gray-500'>Dịch vụ:</div>
          <div className='text-sm font-semibold'>{formatPrice(data?.totalServicePrice ?? 0)}</div>
        </div>
        <div className='flex items-center justify-between'>
          <div className='text-xs text-gray-500'>Tổng cộng:</div>
          <div className='text-sm font-semibold'>  {formatPrice( (data?.ticketPrice ?? 0) + (data?.totalServicePrice ?? 0)) }
          </div>
        </div>
      </div>
      <hr className='my-3 border-t-2 border-orange-200' />
      <div className='text-sm'>
      <p className='font-semibold mb-1 text-primary'>Dịch vụ:</p>
      <ul>
        {data?.serviceDetailList.map((service, index) => (
          <li key={index} className='flex justify-between items-center'>
            <span>{service.serviceName} (x{service.quantity})</span>
            <span className='font-medium'>{service.servicePrice.toLocaleString()}đ</span>
            <span>{service.serviceInStation}</span>
          </li>
        ))}
      </ul>
    </div>
      <div className='flex flex-col justify-center items-center mt-4'>
        <img
          src={data?.qrCodeImage}
          alt='QR Code'
          className='w-24 h-24'
        />
        <div className='text-lg font-bold'>{data?.qrCode}</div>
      </div>
      <hr className='my-3 border-t-2 border-orange-200' />
      <div className='text-sm text-center'>
        <p>
          Cảm ơn quý khách đã tin tưởng <span className='font-bold ml-1 text-primary'>The Bus Journey</span>
        </p>
      </div>
      {/* <div className="ribbondetail"> */}
      <span className='ribbondetail1'>
        <span>{data?.status}</span>
      </span>
    </div>

    //   </div>
  )
}

export default ModalDetail
