import Banner from '@/assets/banner.jpeg'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/global/atoms/carousel'
import { SearchForm } from '@/components/local/Search/SearchForm'
import PopularTrip from './PopularTrip'
import { Bus, CircleCheckBig, HandPlatter, TicketCheck } from 'lucide-react'
import { popularTripData } from '@/constants/PopularTrip'
function HomePage() {
  return (
    <div>
      <div className='h-[600px]'>
        <img className='h-full w-screen' src={Banner} alt='banner' />
      </div>
      <div className='w-full flex justify-center absolute top-[300px]'>
        <SearchForm />
      </div>
      <div className='w-full flex flex-col mt-20 items-center space-y-14'>
        <div className='uppercase text-3xl font-bold text-primary'>Nền tảng kết nối người dùng và nhà xe</div>
        <div className='w-full flex justify-around'>
            <div className='border rounded-md flex items-center w-1/5 h-32 space-x-2 p-2 shadow-md hover:scale-110 hover:-translate-y-3'>
              <Bus color='#0F19FD' className='w-1/4 h-1/3'/>
              <div className='flex flex-col'>
                <span className='text-center font-bold'>Nhiều hãng xe chất lượng</span>
                <span className='text-center text-sm'>30+ tuyến đường trên nhiều tỉnh thành, đa dạng, nhiều sự lựa chọn</span>
              </div>
            </div>
            <div className='border rounded-md flex items-center w-1/5 h-32 space-x-2 p-2 shadow-md hover:scale-110 hover:-translate-y-3'>
              <TicketCheck color='#DC3510' className='w-1/4 h-1/3'/>
              <div className='flex flex-col'>
                <span className='text-center font-bold'>Đặt vé dễ dàng</span>
                <span className='text-center text-sm'>Đặt vé chỉ với 60s. Chọn xe yêu thích cực nhanh và thuận tiện.</span>
              </div>
            </div>
            <div className='border rounded-md flex items-center w-1/5 h-32 space-x-2 p-2 shadow-md hover:scale-110 hover:-translate-y-3'>
              <CircleCheckBig color='#24D007' className='w-1/4 h-1/3'/>
              <div className='flex flex-col'>
                <span className='text-center font-bold'>Đảm bảo có vé</span>
                <span className='text-center text-sm'>Hoàn ngay 150% nếu không có vé, mang đến hành trình trọn vẹn.</span>
              </div>
            </div>
            <div className='border rounded-md flex items-center w-1/5 h-32 space-x-2 p-2 shadow-md hover:scale-110 hover:-translate-y-3'>
              <HandPlatter color='#FB37FF' className='w-1/4 h-1/3'/>
              <div className='flex flex-col'>
                <span className='text-center font-bold'>Nhiều dịch vụ hấp dẫn</span>
                <span className='text-center text-sm'>Chọn dịch vụ phù hợp giúp chuyến đi của bạn trở nên thú vị hơn.</span>
              </div>
            </div>
        </div>
      </div>
      <div className='w-full flex flex-col justify-center items-center mt-20 mb-10'>
        <div className='uppercase text-3xl font-bold text-primary'>Chuyến đi phổ biến</div>
        <Carousel
          opts={{
            align: 'start'
          }}
          className='w-full max-w-6xl'
        >
          <CarouselContent>
            {popularTripData &&
              popularTripData.map((item, index) => (
                <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/3 hover:scale-110'>
                  <div className='p-10'>
                    <PopularTrip data={item} />
                  </div>
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}

export default HomePage
