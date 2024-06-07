import React, { useState } from 'react'
import Ticket from '@/components/local/myticket/Ticket'
type TicketData = {
  date: string;
  startTime:string
  locationTo: string;
  locationFrom: string;
  seatCode: string;
  priceTicket: string;
  priceService: string;
  endTime: string;
  status:string
};

const tabs = [
  { id: 1, label: 'Tất cả' },
  { id: 2, label: 'Chưa sử dụng' },
  { id: 3, label: 'Đã sử dụng' },
  { id: 4, label: 'Đã hủy' }
];

const allTickets: TicketData[] = [
  { date: '23-01-2023', startTime:"9:00",endTime:"13:00", locationTo: 'Music Event', locationFrom: 'United State',seatCode:"A01", priceTicket:"600.000",priceService:"120.000",status:"Đã sử dụng" },
  { date: '24-02-2023', startTime:"2:00",endTime:"7:00", locationTo: 'Bến Tre', locationFrom: 'United State',seatCode:"B01", priceTicket:"6.000.000",priceService:"1.200.000",status:"Đã hủy" },
  { date: '01-01-2024', startTime:"3:00",endTime:"13:00", locationTo: 'Hà Nội', locationFrom: 'Bình Thuận',seatCode:"A09", priceTicket:"300.000",priceService:"210.000",status:"Chưa sử dụng" },


  // More ticket data
];

const unusedTickets: TicketData[] = [
  { date: '01-01-2024', startTime:"3:00",endTime:"13:00", locationTo: 'Hà Nội', locationFrom: 'Bình Thuận',seatCode:"A09", priceTicket:"300.000",priceService:"210.000",status:"Chưa sử dụng" },

  // More ticket data
];

const usedTickets: TicketData[] = [
  { date: '01-07-2029', startTime:"12:00",endTime:"21:00", locationTo: 'Hà Nội', locationFrom: 'Lâm Đồng',seatCode:"A09", priceTicket:"300.000",priceService:"210.000",status:"Đã sử dụng" },
  // More ticket data
];

const canceledTickets: TicketData[] = [
  { date: '04-08-2025', startTime:"21:00",endTime:"3:00", locationTo: 'Lâm Đồng', locationFrom: 'Bình Thuận',seatCode:"A09", priceTicket:"300.000",priceService:"210.000",status:"Đã hủy" },
  // More ticket data
];

const dataMapping: Record<number, TicketData[]> = {
  1: allTickets,
  2: unusedTickets,
  3: usedTickets,
  4: canceledTickets,
};
function MyTicketPage() {
  const [activeTab, setActiveTab] = useState(1);
  const activeData = dataMapping[activeTab];

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

    <div className='mt-4 bg-muted rounded-md'>
        {activeData.map((ticket, index) => (
          <Ticket
            key={index}
            date={ticket.date}
            startTime={ticket.startTime}
            endTime={ticket.endTime}
            locationTo={ticket.locationTo}
            locationFrom={ticket.locationFrom}
            seatCode={ticket.seatCode}
            priceTicket={ticket.priceTicket}
            priceService={ticket.priceService}
            status={ticket.status}
          />
        ))}
      </div>
  </div>
  )
}

export default MyTicketPage
