import SeatLayout from "@/components/local/SelectTicket/SeatCodeLayout"

function ChooseSeatCode() {
  return (
    <div className='flex flex-col justify-between p-4 h-full'>
      <div className="flex justify-evenly text-center h-full mb-4 space-x-3">
        <SeatLayout />
      </div>
      <div className='flex items-center justify-evenly'>
        <div className='flex items-center space-x-3 text-sm'>
          <div className='h-5 w-5 rounded-sm bg-gray-300' />
          <span>Đã bán</span>
        </div>
        <div className='flex items-center space-x-3 text-sm'>
          <div className='h-5 w-5 rounded-sm bg-red-500' />
          <span>Đang chọn</span>
        </div>
        <div className='flex items-center space-x-3 text-sm'>
          <div className='h-5 w-5 rounded-sm bg-tertiary' />
          <span>Ghế còn trống - 400.000đ</span>
        </div>
        {/* <div className='flex items-center space-x-3 text-sm'>
          <div className='h-5 w-5 rounded-sm bg-pink-500' />
          <span>Ghế hàng cuối - 120.000đ</span>
        </div> */}
      </div>
    </div>
  )
}

export default ChooseSeatCode
