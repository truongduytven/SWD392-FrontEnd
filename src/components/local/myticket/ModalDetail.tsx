import { fetchTicketDetail } from '@/apis/ticketDetail'
import { formatPrice } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import Loader from '../TabCardTrip/Loader'
interface ModalDetailProps {
  ticketDetailID: string
}

function ModalDetail({ ticketDetailID }: ModalDetailProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['ticketDetail', ticketDetailID],
    queryFn: () => fetchTicketDetail(ticketDetailID)
  })
  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <div>Đã xảy ra lỗi trong quá trình tải. Vui lòng thử lại sau</div>
  }
  return (
    <div className='ribbondetail my-4 p-6 shadow-md rounded-md ring-1 ring-black ring-opacity-5 w-fit'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-lg font-bold text-primary'>{data?.CompanyName}</h1>
        {/* <div className='text-lg font-bold'>{data?.qrCode}</div> */}
      </div>
      <div className='flex flex-col space-y-2'>
        <div className='flex items-center justify-between'>
          <div className='text-xs text-gray-500'>Khách hàng:</div>
          <div className='text-sm font-semibold'>{data?.CustomerName}</div>
        </div>
        <div className='flex items-center justify-between'>
          <div className='text-xs text-gray-500'>Ngày:</div>
          <div className='text-sm font-semibold'>{data?.StartDate}</div>
        </div>
        <div className='flex items-center justify-between'>
          <div className='text-xs text-gray-500'>Thời gian:</div>
          <div className='text-sm font-semibold'>
            {data?.StartTime} - {data?.EndTime}
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <div className='text-xs text-gray-500'>Từ:</div>
          <div className='text-sm font-semibold'>{data?.StartCity}</div>
        </div>
        <div className='flex items-center justify-between'>
          <div className='text-xs text-gray-500'>Đến:</div>
          <div className='text-sm font-semibold'>{data?.EndCity}</div>
        </div>
        <div className='flex items-center justify-between'>
          <div className='text-xs text-gray-500'>Ghế:</div>
          <div className='text-sm font-semibold'>{data?.SeatCode}</div>
        </div>
        <div className='flex items-center justify-between'>
          <div className='text-xs text-gray-500'>Giá:</div>
          <div className='text-sm font-semibold'>{formatPrice(data?.TicketPrice ?? 0)}</div>
        </div>
        <div className='flex items-center justify-between'>
          <div className='text-xs text-gray-500'>Dịch vụ:</div>
          <div className='text-sm font-semibold'>{formatPrice(data?.TotalServicePrice ?? 0)}</div>
        </div>
        <div className='flex items-center justify-between'>
          <div className='text-xs text-gray-500'>Tổng cộng:</div>
          <div className='text-sm font-semibold'>
            {' '}
            {formatPrice((data?.TicketPrice ?? 0) + (data?.TotalServicePrice ?? 0))}
          </div>
        </div>
      </div>
      <hr className='my-3 border-t-2 border-orange-200' />
      <div className='text-sm '>
        <p className='font-semibold mb-1 text-primary'>Dịch vụ:</p>
        {data?.ServiceDetailList && data.ServiceDetailList.length > 0 ? (
          <ul>
            {data.ServiceDetailList.map((service, index) => (
              <li key={index} className='flex justify-between gap-2 items-center'>
                <span className='whitespace-nowrap'>
                  {service.ServiceName} (x{service.Quantity})
                </span>
                <span className='font-medium'>{service.ServicePrice.toLocaleString()}đ</span>
                <span className='whitespace-nowrap'>{service.ServiceInStation}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className='flex justify-between'>
          <div className='font-medium'>Không có dịch vụ</div>
          <div className='font-medium'>0đ</div>
            </div>
        )}
        {/* <ul>
          {data?.ServiceDetailList.map((service, index) => (
            <li key={index} className='flex justify-between gap-2 items-center'>
              <span className='whitespace-nowrap'>
                {service.ServiceName} (x{service.Quantity})
              </span>
              <span className='font-medium'>{service.ServicePrice.toLocaleString()}đ</span>
              <span className='whitespace-nowrap'>{service.ServiceInStation}</span>
            </li>
          )) }
        </ul> */}
      </div>
      <div className='flex flex-col justify-center items-center mt-4'>
        <img src={data?.QrCodeImage} alt='QR Code' className='w-24 h-24' />
        <div className='text-lg font-bold'>{data?.QrCode}</div>
      </div>
      <hr className='my-3 border-t-2 border-orange-200' />
      <div className='text-sm text-center'>
        <p>
          Cảm ơn quý khách đã tin tưởng <span className='font-bold ml-1 text-primary'>The Bus Journey</span>
        </p>
      </div>
      <span className='ribbondetail1'>
        <span>{data?.Status}</span>
      </span>
    </div>
  )
}

export default ModalDetail
