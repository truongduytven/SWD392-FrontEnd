import SeatLayout from "@/components/local/SelectTicket/SeatCodeLayout"
import { formatPrice } from "@/lib/utils"
import { ITicketData } from "@/types/ticketInterface";

interface ChooseSeatCodeProps {
  data: ITicketData,
}

function ChooseSeatCode({ data }: ChooseSeatCodeProps) {
  const Colors = ['bg-tertiary', 'bg-pink-400', 'bg-blue-400']
  return (
    <div className='flex justify-around p-4 h-full'>
      <div className='flex flex-col items-start justify-center space-y-10 mt-10'>
        <div className='flex items-center space-x-3 text-sm'>
          <div className='h-5 w-5 rounded-sm bg-gray-300' />
          <span>Đã bán</span>
        </div>
        <div className='flex items-center space-x-3 text-sm'>
          <div className='h-5 w-5 rounded-sm bg-red-500' />
          <span>Đang chọn</span>
        </div>
        {data.ticketType_TripModels.map((seat, index) => (
          <div key={index} className='flex items-center space-x-3 text-sm'>
            <div className={`h-5 w-5 rounded-sm ${seat.ticketName === 'Hàng đầu' ? Colors[0] : seat.ticketName === 'Hàng sau' ? Colors[2] : Colors[1]}`} />
            <span>{seat.ticketName} - {formatPrice(seat.price)}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-evenly text-center h-full mb-4 space-x-3">
        {data && <SeatLayout seatBooked={data.seatBooked} tripModels={data.ticketType_TripModels}/>}
      </div>
    </div>
  )
}

export default ChooseSeatCode
