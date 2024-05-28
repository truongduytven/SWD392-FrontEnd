import { Card, CardContent } from '@/components/global/atoms/card'
import { Button } from '@/components/global/atoms/button'
import { Search } from 'lucide-react'

interface props {
  data: {
    img: string,
    startLocation: string,
    endLocation: string,
    price: string,
    type: string,
  }
}

function PopularTrip(data: props) {
  return (
    <Card className='shadow-md'>
      <CardContent className='flex text-md flex-col aspect-auto items-center justify-center p-3 space-y-4'>
        <img src={data.data.img} className='rounded-md' />
        <div className='flex flex-col w-full'>
          <span>Chuyến đi từ <span className='text-tertiary font-semibold'>{data.data.startLocation}</span></span>
          <span>Đến <span className='text-tertiary font-semibold'>{data.data.endLocation}</span></span>
          <span>Loại <span className='text-tertiary font-semibold'>{data.data.type}</span></span>
          <span>Giá chỉ từ <span className='text-tertiary font-semibold'>{data.data.price}</span></span>
        </div>
        <div className='flex justify-end w-full '>
            <Button><Search className='h-fit mr-1'/> Tra cứu ngay</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default PopularTrip
