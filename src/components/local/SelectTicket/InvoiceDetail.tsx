import { useInvoice } from "@/contexts/InvoiceContext";
import { formatDate, formatPrice } from "@/lib/utils";

function InvoiceDetail() {
  const { invoiceData } = useInvoice()
  const { startLocation, endLocation, timeStart, tickets } = invoiceData;
  const totalTicketPrice = tickets?.reduce((sum, ticket) => sum + ticket.price, 0);
  const totalServicePrice = tickets?.reduce(
    (total, ticket) =>
      total + ticket.services.reduce((serviceTotal, service) => serviceTotal + service.price * service.quantity, 0),
    0
  )
  return (
    <div className='shadow-lg border rounded-xl p-3'>
      <span className='font-bold text-xl uppercase'>Chi tiết hóa đơn</span>
      <div className='flex flex-col space-y-3 mt-3'>
        <div className='flex justify-between'>
          <span>Tuyến xe: </span>
          <span>{startLocation} - {endLocation}</span>
        </div>
        <div className='flex justify-between'>
          <span>Thời gian xuất bến: </span>
          <span>{formatDate(timeStart)}</span>
        </div>
        <div className='flex justify-between'>
          <span>Mã số ghế đã chọn: </span>
          <span>{tickets.map(ticket => ticket.seatCode).join(', ')}</span>
        </div>
        <hr />
        <div className='flex justify-between'>
          <span>Tiền vé: </span>
          <span>{formatPrice(totalTicketPrice)}</span>
        </div>
        <div className='flex justify-between'>
          <span>Tiền dịch vụ: </span>
          <span>{formatPrice(totalServicePrice)}</span>
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
