import React, { useState } from 'react'
import Ticket from '@/components/local/myticket/Ticket'
type TicketData = {
  date: string;
  event: string;
  title: string;
  schedule: string;
  location: string;
};

const tabs = [
  { id: 1, label: 'Tất cả' },
  { id: 2, label: 'Chưa sử dụng' },
  { id: 3, label: 'Đã sử dụng' },
  { id: 4, label: 'Đã hủy' }
];

const allTickets: TicketData[] = [
  { date: '23 Feb', event: 'Music Event', title: 'Live In Sydney', schedule: 'Monday 15th 2016 <br> 15:20 PM & 11:00 AM', location: 'North, South, United State, Amre <br> Party Number 16, 20' },
  { date: '12 Mar', event: 'Art Exhibition', title: 'Art in New York', schedule: 'Wednesday 20th 2017 <br> 10:00 AM & 2:00 PM', location: 'East, West, United State, Amre <br> Gallery Number 5, 8' },
  // More ticket data
];

const unusedTickets: TicketData[] = [
  { date: '05 Apr', event: 'Theater Play', title: 'Drama in Paris', schedule: 'Friday 25th 2018 <br> 6:00 PM & 9:00 PM', location: 'Central, South, France <br> Theater Number 3, 6' },
  // More ticket data
];

const usedTickets: TicketData[] = [
  { date: '30 May', event: 'Dance Show', title: 'Dance in Tokyo', schedule: 'Sunday 10th 2019 <br> 1:00 PM & 4:00 PM', location: 'North, South, Japan <br> Hall Number 7, 9' },
  // More ticket data
];

const canceledTickets: TicketData[] = [
  { date: '18 Jun', event: 'Comedy Night', title: 'Laugh in London', schedule: 'Saturday 12th 2020 <br> 8:00 PM & 10:00 PM', location: 'Central, East, UK <br> Club Number 12, 15' },
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
    <div className='w-full max-w-5xl mx-auto mt-10'>
    <div className='relative flex border-b py-1 border-gray-200 bg-muted rounded-md'>
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

    <div className='mt-4 bg-muted'>
        {activeData.map((ticket, index) => (
          <Ticket
            key={index}
            date={ticket.date}
            event={ticket.event}
            title={ticket.title}
            schedule={ticket.schedule}
            location={ticket.location}
          />
        ))}
      </div>
  </div>
  )
}

export default MyTicketPage
