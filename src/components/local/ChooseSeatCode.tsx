function ChooseSeatCode() {
  return (
    <div className='flex justify-between p-4 h-full'>
      <div className='w-1/3 flex justify-center'>
        <div className="flex flex-col items-start justify-center space-y-3">
          <div className='flex items-center space-x-3 text-sm'>
            <div className='h-5 w-5 rounded-sm bg-gray-300' />
            <span>Đã bán</span>
          </div>
          <div className='flex items-center space-x-3 text-sm'>
            <div className='h-5 w-5 rounded-sm bg-red-500' />
            <span>Đang chọn</span>
          </div>
          <div className='flex items-center space-x-3 text-sm'>
            <div className='h-5 w-5 rounded-sm bg-green-500' />
            <span>Ghế hàng đầu - 140.000đ</span>
          </div>
          <div className='flex items-center space-x-3 text-sm'>
            <div className='h-5 w-5 rounded-sm bg-green-500' />
            <span>Ghế hàng cuối - 120.000đ</span>
          </div>
        </div>
      </div>
      <div className='w-1/4'>tầng trên</div>
      <div className='w-1/4'>tầng dưới</div>
    </div>
  )
}

export default ChooseSeatCode
