
import { useInvoice } from '@/contexts/InvoiceContext'
import { formatDateString, formatPrice } from '@/lib/utils'

function InvoiceDetail() {
  const { invoiceData } = useInvoice()
  const { startLocation, endLocation, startTime, startDate, tickets, companyName } = invoiceData
  const totalTicketPrice = tickets?.reduce((sum, ticket) => sum + ticket.price, 0)
  const totalServicePrice = tickets?.reduce(
    (total, ticket) =>
      total + ticket.services.reduce((serviceTotal, service) => serviceTotal + service.Price * service.quantity, 0),
    0
  )
  return (
    <div className='shadow-lg border rounded-xl p-3'>
      <span className='font-bold text-xl uppercase'>Chi tiết hóa đơn</span>
      <div className='flex flex-col space-y-3 mt-3'>
        <div className='flex justify-between'>
          <span>Nhà xe: </span>
          <span className='font-semibold'>{companyName}</span>
        </div>
        <div className='flex justify-between'>
          <span>Tuyến xe từ: </span>
          <span className='font-semibold'>
            {startLocation}
          </span>
        </div>
        <div className='flex justify-between'>
          <span>Đến: </span>
          <span className='font-semibold'>
            {endLocation}
          </span>
        </div>
        <div className='flex justify-between'>
          <span>Thời gian xuất bến: </span>
          <span className='font-semibold'>{startTime} - {formatDateString(startDate)}</span>
        </div>
        <div className='flex justify-between'>
          <span>Mã số ghế đã chọn: </span>
          <span className='font-semibold'>{tickets.map((ticket) => ticket.seatCode).join(', ')}</span>
        </div>
        <hr />
        <div className='flex justify-between'>
          <span>Tiền vé: </span>
          <span className='font-semibold'>{formatPrice(totalTicketPrice)}</span>
        </div>
        <div className='flex justify-between'>
          <span>Tiền dịch vụ: </span>
          <span className='font-semibold'>{formatPrice(totalServicePrice)}</span>
        </div>
        <hr />
        <div className='flex justify-between font-bold'>
          <span>Tổng tiền</span>
          <span>{formatPrice(totalTicketPrice + totalServicePrice)}</span>
        </div>
      </div>
    </div>
  )
}

export default InvoiceDetail
