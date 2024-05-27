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
      <div className='w-full flex flex-col mt-20 items-center space-y-10'>
        <div className='uppercase text-3xl font-bold text-primary'>Nền tảng kết nối người dùng và nhà xe</div>
        <div className='w-full flex justify-evenly space-x-10'>
            <div className='border rounded-md flex items-center w-1/5 h-32'>
              <Bus color='#0F19FD' className='w-1/2 h-1/3'/>
              <div className='flex flex-col'>
                <span className='text-primary font-bold'>Nhiều hãng xe chất lượng</span>
                <span className=''>30+ tuyến đường trên nhiều tỉnh thành, đa dạng, nhiều sự lựa chọn</span>
              </div>
            </div>
            <div className='border rounded-md flex items-center w-1/5 h-32'>
              <TicketCheck color='#FA941C' className='w-1/2 h-1/3'/>
              <div className='flex flex-col'>
                <span className='text-primary font-bold'>Nhiều dịch vụ hấp dẫn</span>
                <span className=''>30+ tuyến đường trên nhiều tỉnh thành, đa dạng, nhiều sự lựa chọn</span>
              </div>
            </div>
            <div className='border rounded-md flex items-center w-1/5 h-32'>
              <CircleCheckBig color='#24D007' className='w-1/2 h-1/3'/>
              <div className='flex flex-col'>
                <span className='text-primary font-bold'>Nhiều dịch vụ hấp dẫn</span>
                <span className=''>30+ tuyến đường trên nhiều tỉnh thành, đa dạng, nhiều sự lựa chọn</span>
              </div>
            </div>
            <div className='border rounded-md flex items-center w-1/5 h-32'>
              <HandPlatter color='#FB37FF' className='w-1/2 h-1/3'/>
              <div className='flex flex-col'>
                <span className='text-primary font-bold'>Nhiều dịch vụ hấp dẫn</span>
                <span className=''>30+ tuyến đường trên nhiều tỉnh thành, đa dạng, nhiều sự lựa chọn</span>
              </div>
            </div>
        </div>
      </div>
      <div className='w-full flex flex-col justify-center items-center space-y-10 mt-20 mb-10'>
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
                <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/3 hover:scale-105'>
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
