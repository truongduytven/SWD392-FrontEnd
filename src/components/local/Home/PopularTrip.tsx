import { Card, CardContent } from '@/components/global/atoms/card'
import { Button } from '@/components/global/atoms/button'
import { Search } from 'lucide-react'
import { IPopularTrip } from '@/types/tripInterface'
import { formatPrice } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'
import { useSearch } from '@/contexts/SearchContext'

interface PopularTripProps {
  data: IPopularTrip; // Ensure 'data' prop is of type IPopularTrip
}



function PopularTrip({ data }: PopularTripProps) {
  const navigate = useNavigate()
  const { setSearchData } = useSearch()
  const handleClickPopular = () => {
    const searchData = {
      startLocation: data.FromCityID,
      endLocation: data.ToCityID,
      startDate: new Date(),
    }
    console.log('Click popular trip')
    setSearchData(searchData)
    navigate('/search')
  }
  return (
    <Card className='shadow-md'>
      <CardContent className='flex text-md flex-col aspect-auto items-center justify-center p-3 space-y-4'>
        <img src={data.ImageUrl.length > 0 ? data.ImageUrl[0] : "https://vcdn1-dulich.vnecdn.net/2022/05/25/DJI-0529-6875-1615787823-6137-1653453621.jpg?w=0&h=0&q=100&dpr=1&fit=crop&s=kN8Fro3etZjwu10anurIIg"} className='rounded-md h-44 w-full object-cover overflow-hidden' />
        <div className='flex flex-col w-full'>
          <span>Chuyến đi từ <span className='text-tertiary font-semibold'>{data.FromCity}</span></span>
          <span>Đến <span className='text-tertiary font-semibold'>{data.ToCity}</span></span>
          {/* <span>Loại <span className='text-tertiary font-semibold'>{data.data.type}</span></span> */}
          <span>Giá chỉ từ <span className='text-tertiary font-semibold'>{formatPrice(data.PriceFrom)}</span></span>
        </div>
        <div className='flex justify-end w-full '>
            <Button onClick={handleClickPopular}><Search className='h-fit mr-1'/> Tra cứu ngay</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default PopularTrip
