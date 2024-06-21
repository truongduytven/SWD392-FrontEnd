import { userAllTickets } from '@/apis/userAllTicket'
import Loader from '@/components/local/TabCardTrip/Loader'
import Ticket from '@/components/local/myticket/Ticket'
import { useState } from 'react'

const tabs = [
  { id: 1, label: 'Tất cả' },
  { id: 2, label: 'Chưa sử dụng' },
  { id: 3, label: 'Đã sử dụng' },
  { id: 4, label: 'Đã hủy' }
]

function MyTicketPage() {
  const [activeTab, setActiveTab] = useState(1)
  const { data: allTickets = [], isLoading, isError } = userAllTickets()
  console.log('ve lay tư re', allTickets)
  const unusedTickets = allTickets.filter((ticket) => ticket.status === 'UNUSED')
  const usedTickets = allTickets.filter((ticket) => ticket.status === 'USED')
  const canceledTickets = allTickets.filter((ticket) => ticket.status === 'CANCEL')
  const dataMapping: Record<number, typeof allTickets> = {
    1: allTickets,
    2: unusedTickets,
    3: usedTickets,
    4: canceledTickets
  }
  const activeData = dataMapping[activeTab]

  return (
    <div className='w-full max-w-4xl mx-auto mt-10 '>
      <div className='relative flex  border-b py-1 border-gray-200 bg-muted rounded-md'>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`relative py-2 px-4 transition-colors hover:text-primary duration-300 ${
              activeTab === tab.id ? 'text-primary font-medium' : 'text-gray-500'
            }`}
            style={{ width: `calc(100% / ${tabs.length})` }}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
        <span
          className='absolute bottom-0 left-0 h-[3px] bg-primary transition-transform duration-300'
          style={{ width: `calc(100% / ${tabs.length})`, transform: `translateX(${(activeTab - 1) * 100}%)` }}
        />
      </div>
      <div className='mt-4 mb-14 bg-muted rounded-md'>
        {isLoading && (
          <div className='flex items-center justify-center h-40'>
            <Loader />
          </div>
        )}

        {isError && (
          <p className='text-red-600 text-center mt-4'>Xảy ra lỗi trong quá trình tải dữ liệu. Vui lòng thử lại sau.</p>
        )}

        {!isLoading && !isError && activeData.length === 0 && (
          <p className='text-gray-500 text-center mt-4'>Không có vé</p>
        )}

        {!isLoading &&
          !isError &&
          activeData.length > 0 &&
          activeData.map((ticket, index) => (
            <Ticket
              key={index}
              ticketDetailID={ticket.ticketDetailID}
              companyName={ticket.companyName}
              date={ticket.startDate}
              startTime={ticket.startTime}
              endTime={ticket.endTime}
              locationTo={ticket.endCity}
              locationFrom={ticket.startCity}
              seatCode={ticket.seatCode}
              priceTicket={ticket.ticketPrice}
              priceService={ticket.totalServicePrice}
              status={ticket.status}
            />
          ))}
      </div>
    </div>
  )
}

export default MyTicketPage
