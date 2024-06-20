import React, { useState } from 'react'
import Ticket from '@/components/local/myticket/Ticket'
import { userAllTickets } from '@/apis/userAllTicket'
import Loading from '@/components/local/login/Loading'
// type TicketData = {
//   date: string
//   startTime: string
//   locationTo: string
//   locationFrom: string
//   seatCode: string
//   priceTicket: string
//   priceService: string
//   endTime: string
//   status: string
// }

// const dataFromBe =[
//   {
//     "bookingID": "7910be2c-e416-4f2b-9ef5-53b46c501acd",
//     "ticketDetailID": "612e536f-e3a2-4580-9e5a-9575db3e572c",
//     "companyName": "Phuong Trang",
//     "startDate": "2024-06-15",
//     "startTime": "11:30",
//     "endDate": "2024-06-25",
//     "endTime": "11:30",
//     "totalTime": "10.00:00:00",
//     "startCity": "TP. Hồ Chí Minh",
//     "endCity": "Thừa Thiên Huế",
//     "seatCode": "A1",
//     "ticketPrice": 100000,
//     "totalServicePrice": 700000,
//     "status": "UNUSED"
//   },
//   {
//     "bookingID": "7176e559-7dd4-4fa5-8346-6d7481ef5283",
//     "ticketDetailID": "d271e917-62fb-4058-8071-b7bfb8cf8ef3",
//     "companyName": "Ngoc Tuan",
//     "startDate": "2024-07-05",
//     "startTime": "17:45",
//     "endDate": "2024-07-09",
//     "endTime": "17:45",
//     "totalTime": "4.00:00:00",
//     "startCity": "Bến Tre",
//     "endCity": "Thái Nguyên",
//     "seatCode": "A1",
//     "ticketPrice": 160000,
//     "totalServicePrice": 320000,
//     "status": "UNUSED"
//   },
//   {
//     "bookingID": "23547afa-d64c-4692-9bc4-7fd2de51274e",
//     "ticketDetailID": "d11f3792-9c2b-409d-802a-358f9f8fa357",
//     "companyName": "My Thuong",
//     "startDate": "2024-07-05",
//     "startTime": "17:45",
//     "endDate": "2024-07-08",
//     "endTime": "17:45",
//     "totalTime": "3.00:00:00",
//     "startCity": "Bà Rịa - Vũng Tàu",
//     "endCity": "TP. Hồ Chí Minh",
//     "seatCode": "A1",
//     "ticketPrice": 80000,
//     "totalServicePrice": 850000,
//     "status": "UNUSED"
//   },
//   {
//     "bookingID": "23547afa-d64c-4692-9bc4-7fd2de51274e",
//     "ticketDetailID": "d13f2b04-492d-4576-b03d-6eae3da8514d",
//     "companyName": "My Thuong",
//     "startDate": "2024-07-05",
//     "startTime": "17:45",
//     "endDate": "2024-07-08",
//     "endTime": "17:45",
//     "totalTime": "3.00:00:00",
//     "startCity": "Bà Rịa - Vũng Tàu",
//     "endCity": "TP. Hồ Chí Minh",
//     "seatCode": "A2",
//     "ticketPrice": 80000,
//     "totalServicePrice": 665000,
//     "status": "UNUSED"
//   },
//   {
//     "bookingID": "23547afa-d64c-4692-9bc4-7fd2de51274e",
//     "ticketDetailID": "c2cbc05b-d4cb-4403-b67a-ea135f2cd058",
//     "companyName": "My Thuong",
//     "startDate": "2024-07-05",
//     "startTime": "17:45",
//     "endDate": "2024-07-08",
//     "endTime": "17:45",
//     "totalTime": "3.00:00:00",
//     "startCity": "Bà Rịa - Vũng Tàu",
//     "endCity": "TP. Hồ Chí Minh",
//     "seatCode": "A3",
//     "ticketPrice": 80000,
//     "totalServicePrice": 695000,
//     "status": "USED"
//   },
//   {
//     "bookingID": "06819066-6db7-49f8-a0bd-9e13577cdb1a",
//     "ticketDetailID": "a814f428-1cdd-4510-a48b-7a0338e93d90",
//     "companyName": "Phuong Trang",
//     "startDate": "2024-06-15",
//     "startTime": "11:30",
//     "endDate": "2024-06-19",
//     "endTime": "15:30",
//     "totalTime": "4.04:00:00",
//     "startCity": "TP. Hồ Chí Minh",
//     "endCity": "Thừa Thiên Huế",
//     "seatCode": "A1",
//     "ticketPrice": 120000,
//     "totalServicePrice": 1170000,
//     "status": "UNUSED"
//   },
//   {
//     "bookingID": "af267c27-cf64-4fe8-a3f4-b1f8af74bc8e",
//     "ticketDetailID": "61a30576-8a09-47d2-85a0-1767a4108fdb",
//     "companyName": "Phuong Trang",
//     "startDate": "2024-06-15",
//     "startTime": "11:30",
//     "endDate": "2024-06-25",
//     "endTime": "11:30",
//     "totalTime": "10.00:00:00",
//     "startCity": "TP. Hồ Chí Minh",
//     "endCity": "Thừa Thiên Huế",
//     "seatCode": "A2",
//     "ticketPrice": 90000,
//     "totalServicePrice": 360000,
//     "status": "CANCEL"
//   },
//   {
//     "bookingID": "af267c27-cf64-4fe8-a3f4-b1f8af74bc8e",
//     "ticketDetailID": "467e43ae-9254-4481-a93f-2036b2d6a9df",
//     "companyName": "Phuong Trang",
//     "startDate": "2024-06-15",
//     "startTime": "11:30",
//     "endDate": "2024-06-25",
//     "endTime": "11:30",
//     "totalTime": "10.00:00:00",
//     "startCity": "TP. Hồ Chí Minh",
//     "endCity": "Thừa Thiên Huế",
//     "seatCode": "A1",
//     "ticketPrice": 90000,
//     "totalServicePrice": 1660000,
//     "status": "USED"
//   },
//   {
//     "bookingID": "af267c27-cf64-4fe8-a3f4-b1f8af74bc8e",
//     "ticketDetailID": "a0c5a723-e763-4211-9805-d07ef93941cc",
//     "companyName": "Phuong Trang",
//     "startDate": "2024-06-15",
//     "startTime": "11:30",
//     "endDate": "2024-06-25",
//     "endTime": "11:30",
//     "totalTime": "10.00:00:00",
//     "startCity": "TP. Hồ Chí Minh",
//     "endCity": "Thừa Thiên Huế",
//     "seatCode": "A3",
//     "ticketPrice": 90000,
//     "totalServicePrice": 455000,
//     "status": "USED"
//   }
// ]
const tabs = [
  { id: 1, label: 'Tất cả' },
  { id: 2, label: 'Chưa sử dụng' },
  { id: 3, label: 'Đã sử dụng' },
  { id: 4, label: 'Đã hủy' }
]

// const allTickets: TicketData[] = [
//   {
//     date: '23-01-2023',
//     startTime: '9:00',
//     endTime: '13:00',
//     locationTo: 'Music Event',
//     locationFrom: 'United State',
//     seatCode: 'A01',
//     priceTicket: '600.000',
//     priceService: '120.000',
//     status: 'Đã sử dụng'
//   },
//   {
//     date: '24-02-2023',
//     startTime: '2:00',
//     endTime: '7:00',
//     locationTo: 'Bến Tre',
//     locationFrom: 'United State',
//     seatCode: 'B01',
//     priceTicket: '6.000.000',
//     priceService: '1.200.000',
//     status: 'Đã hủy'
//   },
//   {
//     date: '01-01-2024',
//     startTime: '3:00',
//     endTime: '13:00',
//     locationTo: 'Hà Nội',
//     locationFrom: 'Bình Thuận',
//     seatCode: 'A09',
//     priceTicket: '300.000',
//     priceService: '210.000',
//     status: 'Chưa sử dụng'
//   }

//   // More ticket data
// ]

// const unusedTickets: TicketData[] = [
//   {
//     date: '01-01-2024',
//     startTime: '3:00',
//     endTime: '13:00',
//     locationTo: 'Hà Nội',
//     locationFrom: 'Bình Thuận',
//     seatCode: 'A09',
//     priceTicket: '300.000',
//     priceService: '210.000',
//     status: 'Chưa sử dụng'
//   }

//   // More ticket data
// ]

// const usedTickets: TicketData[] = [
//   {
//     date: '01-07-2029',
//     startTime: '12:00',
//     endTime: '21:00',
//     locationTo: 'Hà Nội',
//     locationFrom: 'Lâm Đồng',
//     seatCode: 'A09',
//     priceTicket: '300.000',
//     priceService: '210.000',
//     status: 'Đã sử dụng'
//   }
//   // More ticket data
// ]

// const canceledTickets: TicketData[] = [
//   {
//     date: '04-08-2025',
//     startTime: '21:00',
//     endTime: '3:00',
//     locationTo: 'Lâm Đồng',
//     locationFrom: 'Bình Thuận',
//     seatCode: 'A09',
//     priceTicket: '300.000',
//     priceService: '210.000',
//     status: 'Đã hủy'
//   }
//   // More ticket data
// ]



function MyTicketPage() {
  const [activeTab, setActiveTab] = useState(1)
  const { data: allTickets = [], isLoading, isError } = userAllTickets();
  console.log("ve lay tư re", allTickets)
  const unusedTickets = allTickets.filter(ticket => ticket.status === 'UNUSED');
  const usedTickets = allTickets.filter(ticket => ticket.status === 'USED');
  const canceledTickets = allTickets.filter(ticket => ticket.status === 'CANCEL');
  const dataMapping: Record<number, typeof allTickets> = {
    1: allTickets,
    2: unusedTickets,
    3: usedTickets,
    4: canceledTickets
  }
  const activeData = dataMapping[activeTab]

  if (isLoading) return <div className='m-auto'><Loading/>Đang tải</div>;
  if (isError) return <div className='m-auto'>Error loading tickets</div>;

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
