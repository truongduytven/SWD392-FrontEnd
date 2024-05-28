import { Bus, CircleCheckBig, HandPlatter, TicketCheck } from "lucide-react"

function CriteriaTags() {
  return (
    <div className='w-full flex justify-around'>
      <div className='border rounded-md flex items-center w-1/5 h-32 space-x-2 p-2 shadow-md hover:scale-110 hover:-translate-y-3'>
        <Bus color='#0F19FD' className='w-1/4 h-1/3' />
        <div className='flex flex-col'>
          <span className='text-center font-bold'>Nhiều hãng xe chất lượng</span>
          <span className='text-center text-sm'>30+ tuyến đường trên nhiều tỉnh thành, đa dạng, nhiều sự lựa chọn</span>
        </div>
      </div>
      <div className='border rounded-md flex items-center w-1/5 h-32 space-x-2 p-2 shadow-md hover:scale-110 hover:-translate-y-3'>
        <TicketCheck color='#DC3510' className='w-1/4 h-1/3' />
        <div className='flex flex-col'>
          <span className='text-center font-bold'>Đặt vé dễ dàng</span>
          <span className='text-center text-sm'>Đặt vé chỉ với 60s. Chọn xe yêu thích cực nhanh và thuận tiện.</span>
        </div>
      </div>
      <div className='border rounded-md flex items-center w-1/5 h-32 space-x-2 p-2 shadow-md hover:scale-110 hover:-translate-y-3'>
        <CircleCheckBig color='#24D007' className='w-1/4 h-1/3' />
        <div className='flex flex-col'>
          <span className='text-center font-bold'>Đảm bảo có vé</span>
          <span className='text-center text-sm'>Hoàn ngay 150% nếu không có vé, mang đến hành trình trọn vẹn.</span>
        </div>
      </div>
      <div className='border rounded-md flex items-center w-1/5 h-32 space-x-2 p-2 shadow-md hover:scale-110 hover:-translate-y-3'>
        <HandPlatter color='#FB37FF' className='w-1/4 h-1/3' />
        <div className='flex flex-col'>
          <span className='text-center font-bold'>Nhiều dịch vụ hấp dẫn</span>
          <span className='text-center text-sm'>Chọn dịch vụ phù hợp giúp chuyến đi của bạn trở nên thú vị hơn.</span>
        </div>
      </div>
    </div>
  )
}

export default CriteriaTags
