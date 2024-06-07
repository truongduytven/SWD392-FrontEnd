import { Button } from '@/components/global/atoms/button'
import Container from '@/components/global/atoms/container'
import TicketService from '@/components/local/SelectService/TicketService'
import InvoiceDetail from '@/components/local/SelectTicket/InvoiceDetail'
import { useInvoice } from '@/contexts/InvoiceContext'
import { formatPrice } from '@/lib/utils'
import { format } from 'date-fns'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import OOPS from '@/assets/oops.jpg'

function SelectService() {
  const navigate = useNavigate()
  const { invoiceData } = useInvoice()
  return invoiceData.tickets.length > 0 ? (
    <Container>
      <div className='h-full flex flex-col mt-10 mb-12'>
        <div className='flex justify-start items-center'>
          <Button
            onClick={() => navigate(-1)}
            className='text-black bg-transparent hover:bg-transparent hover:underline hover:text-primary hover:font-bold'
          >
            <ArrowLeft className='scale-75' />
            Quay lại
          </Button>
        </div>
        <div className='flex justify-center uppercase font-bold text-4xl mb-12 text-primary'>chọn dịch vụ</div>
        <div className='flex justify-evenly'>
          <div className='w-1/2 flex flex-col space-y-3'>
            {invoiceData &&
              invoiceData.tickets.map((ticket, index) => {
                const servicePrice = ticket.services?.reduce(
                  (total, service) => total + service.price * service.quantity,
                  0
                )
                return (
                  <div className='flex text-sm border shadow-md'>
                    <div className='w-5/12 flex flex-col justify-center border-r-2 border-dashed p-2 items-center space-y-2'>
                      <span>Giờ xuất bến</span>
                      <span className='font-bold text-lg'>{format(invoiceData.timeStart, 'p')}</span>
                      <span className='font-semibold'>{format(invoiceData.timeStart, 'P')}</span>
                      <span className='text-tertiary'>Đang chờ thanh toán</span>
                    </div>
                    <div className='w-full flex flex-col'>
                      <div className='p-2'>
                        <div className='flex gap-3 justify-between items-center'>
                          <div className='flex gap-3 justify-start items-center'>
                            <div></div>
                            <div className=' h-full flex justify-between items-center'>
                              <svg xmlns='http://www.w3.org/2000/svg' width='14' height='74' viewBox='0 0 14 74'>
                                <path
                                  fill='none'
                                  stroke='#484848'
                                  stroke-linecap='round'
                                  stroke-width='2'
                                  stroke-dasharray='0 7'
                                  d='M7 13.5v46'
                                ></path>
                                <g fill='none' stroke='#DC2910' stroke-width='3'>
                                  <circle cx='7' cy='7' r='7' stroke='none'></circle>
                                  <circle cx='7' cy='7' r='5.5'></circle>
                                </g>
                                <path
                                  d='M7 58a5.953 5.953 0 0 0-6 5.891 5.657 5.657 0 0 0 .525 2.4 37.124 37.124 0 0 0 5.222 7.591.338.338 0 0 0 .506 0 37.142 37.142 0 0 0 5.222-7.582A5.655 5.655 0 0 0 13 63.9 5.953 5.953 0 0 0 7 58zm0 8.95a3.092 3.092 0 0 1-3.117-3.06 3.117 3.117 0 0 1 6.234 0A3.092 3.092 0 0 1 7 66.95z'
                                  fill='#188B05'
                                ></path>
                              </svg>
                            </div>

                            <div className='flex flex-col items-start justify-between gap-1'>
                              <p className='m-0 p-0'>
                                <span className='font-bold mr-2 text-lg'>6:00</span>
                                {invoiceData.startLocation}
                              </p>
                              <p className='text-muted-foreground'>2 giờ</p>
                              <p>
                                <span className='font-bold mr-2 text-lg'>8:30</span>
                                {invoiceData.endLocation}
                              </p>
                            </div>
                          </div>
                          <div className='flex flex-col items-end space-y-2'>
                            <span>
                              Số ghế: <span className='font-bold'>{ticket.seatCode}</span>
                            </span>
                            <span>Giá vé: <span className='font-bold'>{formatPrice(ticket.price)}</span></span>
                            {ticket.services && <span>Giá dịch vụ: <span className='font-bold'>{formatPrice(servicePrice)}</span></span>}
                          </div>
                        </div>
                      </div>
                      <TicketService key={index} {...ticket} />
                    </div>
                  </div>
                )
              })}
          </div>
          <div className='flex flex-col space-y-10 w-4/12'>
            <InvoiceDetail />
            <div className='flex justify-end'>
              <Link to='/infopayment'>
                <Button className='bg-primary text-secondary hover:scale-110 transform scale-100 transition duration-200'>
                  Tiếp tục
                  <ArrowRight className='ml-1 scale-75' />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  ) : (
    <Container>
      <div className='w-full flex justify-center items-center mb-8'>
        <div className='flex flex-col items-center'>
          <img src={OOPS} className='w-[450px] h-[450px]' />
          <div className='text-2xl font-medium'>Dường như bạn chưa chọn ghế</div>
          <p className='text-lg mt-4'>Vui lòng chọn vé trước khi muốn chọn dịch vụ</p>

          <Link to='/selectTicket' className='underline hover:text-primary font-medium text-xl mt-8'>
            Quay lại trang chọn vé
          </Link>
        </div>
      </div>
    </Container>
  )
}

export default SelectService
