import SeatLayout from "@/components/local/SelectTicket/SeatCodeLayout"
import { defaultSeats } from "@/constants/SeatData"
import { formatPrice } from "@/lib/utils"

function ChooseSeatCode() {
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
        {defaultSeats.map((seat, index) => (
          <div key={index} className='flex items-center space-x-3 text-sm'>
            <div className={`h-5 w-5 rounded-sm ${Colors[index]}`} />
            <span>{seat.TicketTypeName === 'front' ? 'Hàng trên' : seat.TicketTypeName === 'back' ? 'Hàng cuối' : 'Hàng giữa'} - {formatPrice(seat.price)}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-evenly text-center h-full mb-4 space-x-3">
        <SeatLayout />
      </div>
    </div>
  )
}

export default ChooseSeatCode
